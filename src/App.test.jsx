import { render, screen, fireEvent, within } from '@testing-library/react';
import App, { buildPhases, bringItems, japaneseName } from './App';

const profiles = ['student', 'researcher'].flatMap(role =>
  [false, true].map(work => ({ role, housing: 'confirmed', work }))
);
const tasksFor = (profile) => buildPhases(profile, 'en').flatMap(p => p.tasks);

describe('task data', () => {
  test.each(profiles)('is internally consistent for %o', (profile) => {
    const tasks = tasksFor(profile);
    const ids = tasks.map(tk => tk.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const tk of tasks) {
      expect(['required', 'recommended', 'optional']).toContain(tk.level);
      // A legal day-count deadline only makes sense on a mandatory task
      if (tk.deadline?.days) expect(tk.level).toBe('required');
      // Every task needs a key point: the why text now sits behind a modal
      expect(tk.keyPoint?.length).toBeGreaterThan(0);
      for (const dep of tk.deps || []) expect(ids).toContain(dep.taskId);
      for (const src of [tk.source ?? []].flat()) {
        expect(src.url).toMatch(/^https:\/\//);
        expect(src.verified).toMatch(/^\d{4}-\d{2}$/);
        // Several sources on one task are only distinguishable if each says what it backs
        if (Array.isArray(tk.source)) expect(src.label?.length).toBeGreaterThan(0);
      }
    }
  });

  // The counter sheet names a completed step by the Japanese in its title, so it must be there
  test('every step shown at a counter has a Japanese name in its title', () => {
    for (const profile of profiles)
      for (const phase of buildPhases(profile, 'en').filter(ph => ph.counterSheet))
        for (const tk of phase.tasks) expect(japaneseName(tk.title)).toBeTruthy();
  });

  test('only students get the Student ID and Student Payment Exception tasks', () => {
    const student = tasksFor({ role: 'student', housing: 'confirmed', work: false });
    const researcher = tasksFor({ role: 'researcher', housing: 'confirmed', work: false });
    for (const id of ['university', 'gakutoku']) {
      expect(student.map(tk => tk.id)).toContain(id);
      expect(researcher.map(tk => tk.id)).not.toContain(id);
    }
  });

  test('the work permit task appears only when the user plans to work', () => {
    const base = { role: 'student', housing: 'confirmed' };
    expect(tasksFor({ ...base, work: true }).map(tk => tk.id)).toContain('workpermit');
    expect(tasksFor({ ...base, work: false }).map(tk => tk.id)).not.toContain('workpermit');
  });

  // 空港で申請できるのは「留学」で新規入国した人だけ。研究者は地方出入国在留管理官署で申請する
  test('only students apply for the work permit at the airport', () => {
    const student = tasksFor({ role: 'student', housing: 'confirmed', work: true }).map(tk => tk.id);
    const researcher = tasksFor({ role: 'researcher', housing: 'confirmed', work: true }).map(tk => tk.id);
    expect(student).toContain('workpermit');
    expect(student).not.toContain('workpermitoffice');
    expect(researcher).toContain('workpermitoffice');
    expect(researcher).not.toContain('workpermit');
  });
});

describe('app', () => {
  beforeEach(() => {
    localStorage.clear();
    window.scrollTo = vi.fn();
  });

  const generateStudentRoadmap = () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Exchange Student' }));
    fireEvent.click(screen.getByRole('button', { name: /Yes — dorm/ }));
    fireEvent.click(screen.getByRole('button', { name: /Generate/ }));
  };

  test('keeps Generate disabled until housing is answered', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Exchange Student' }));
    expect(screen.getByRole('button', { name: /Generate/ })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /Yes — dorm/ }));
    expect(screen.getByRole('button', { name: /Generate/ })).toBeEnabled();
  });

  test('sends "Other / Not Sure" users to their sponsor instead of showing the form', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Other / Not Sure' }));
    expect(screen.getByText(/contact whoever sponsored your Certificate of Eligibility/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Generate/ })).not.toBeInTheDocument();
  });

  // Health insurance also has 14 days, but cities count them from arrival or from move-in, so only the moving-in notification gets the badge
  test('shows the 14-day deadline only on the moving-in notification', () => {
    generateStudentRoadmap();
    const badge = screen.getByText('Required · within 14 days of moving in');
    expect(document.getElementById('juminhyo')).toContainElement(badge);
  });

  test('tapping a task header toggles its details, but the checkbox does not', () => {
    generateStudentRoadmap();
    const card = within(document.getElementById('visa'));
    const chevron = card.getByRole('button', { expanded: false });

    fireEvent.click(card.getByText(/Apply for your Student \/ Researcher Visa/));
    expect(chevron).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(card.getByText(/Apply for your Student \/ Researcher Visa/));
    expect(chevron).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(card.getByRole('checkbox'));
    expect(chevron).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('1 / 12 Completed')).toBeInTheDocument();
  });

  test('the info button opens the explanation without expanding the card', () => {
    generateStudentRoadmap();
    const card = within(document.getElementById('health'));
    const chevron = card.getByRole('button', { expanded: false });

    fireEvent.click(card.getByRole('button', { name: 'What to know' }));
    expect(chevron).toHaveAttribute('aria-expanded', 'false');

    const dialog = within(screen.getByRole('dialog'));
    expect(dialog.getByText(/covers 70% of medical costs/)).toBeInTheDocument();
  });

  // 背景説明を持たないタスクで情報アイコンを押すと空のダイアログが開いてしまうため、ボタン自体を出さない
  test('hides the info button on a task that has no explanation', () => {
    generateStudentRoadmap();
    const card = within(document.getElementById('visa'));
    expect(card.queryByRole('button', { name: 'What to know' })).toBeNull();
  });

  // Deadlines, amounts and ordering live in keyPoint, and the source is the app's evidence:
  // both must be readable without hunting for the "?" button
  test('keeps the key point and the source on the card itself', () => {
    generateStudentRoadmap();
    const card = within(document.getElementById('health'));
    fireEvent.click(card.getByText('National Health Insurance (国民健康保険)'));
    expect(card.getByText(/Enroll within 14 days/)).toBeInTheDocument();
    // This task rests on three official pages, each labelled with what it backs
    expect(card.getAllByRole('link')).toHaveLength(3);
    expect(card.getByRole('link', { name: /14-day deadline/ })).toBeInTheDocument();
  });
});

describe('counter sheet', () => {
  beforeEach(() => {
    localStorage.clear();
    window.scrollTo = vi.fn();
  });

  const openCityHallSheet = () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Exchange Student' }));
    fireEvent.click(screen.getByRole('button', { name: /Yes — dorm/ }));
    fireEvent.click(screen.getByRole('button', { name: /Generate/ }));
    // Finish the moving-in notification so the sheet has one line of each kind
    fireEvent.click(within(document.getElementById('juminhyo')).getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /Show these phrases at the counter/ }));
    return within(screen.getByRole('dialog', { name: /Show these phrases at the counter/ }));
  };

  test('asks only for what is left, and names what is already done', () => {
    const sheet = openCityHallSheet();
    expect(sheet.getByText(/国民健康保険に加入したいです/)).toBeInTheDocument();
    expect(sheet.getByText('転入届')).toBeInTheDocument();
    // The completed step is named, not asked for again
    expect(sheet.queryByText(/転入届を提出したいです/)).not.toBeInTheDocument();
  });

  test('can be ticked off at the counter', () => {
    const sheet = openCityHallSheet();
    fireEvent.click(sheet.getByRole('checkbox', { name: /National Health Insurance/ }));
    expect(sheet.queryByText(/国民健康保険に加入したいです/)).not.toBeInTheDocument();
    expect(sheet.getByText('国民健康保険')).toBeInTheDocument();
  });
});

describe('bring list', () => {
  const cityHall = (profile) => buildPhases(profile, 'en').find(p => p.id === 'p3');

  test.each(profiles)('lists only what you carry from home for %o', (profile) => {
    const items = bringItems(cityHall(profile).tasks, {});
    // The residence record is issued at the first window of the same visit
    expect(items.some(i => /Residence record/i.test(i))).toBe(false);
    expect(items).toContain('Passport');
    // 後日交付の人はカードの代わりにパスポートを出すため、注記付きの1件にまとまる
    expect(items.filter(i => /^Residence Card/.test(i))).toHaveLength(1);
    // Passport and Residence Card each appear in several tasks of this phase
    expect(new Set(items).size).toBe(items.length);
  });

  test('keeps the fuller wording when the same item is worded two ways', () => {
    const airport = buildPhases({ role: 'student', housing: 'confirmed', work: true }, 'en')
      .find(p => p.id === 'p2');
    expect(bringItems(airport.tasks, {})).toContain('Passport — with your visa');
  });

  test('drops items belonging to tasks already done', () => {
    const profile = { role: 'student', housing: 'confirmed', work: false };
    const phase = cityHall(profile);
    const done = Object.fromEntries(phase.tasks.map(tk => [tk.id, true]));
    expect(bringItems(phase.tasks, done)).toEqual([]);
  });
});
