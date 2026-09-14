import { render, screen, fireEvent, within } from '@testing-library/react';
import App, { buildPhases, dueDateFor } from './App';

const profiles = ['student', 'researcher'].flatMap(role =>
  [false, true].map(work => ({ role, housing: 'confirmed', work, arrival: '' }))
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
      for (const dep of tk.deps || []) expect(ids).toContain(dep.taskId);
      if (tk.source) {
        expect(tk.source.url).toMatch(/^https:\/\//);
        expect(tk.source.verified).toMatch(/^\d{4}-\d{2}$/);
      }
    }
  });

  test('only students get the Student Payment Exception task', () => {
    const student = tasksFor({ role: 'student', housing: 'confirmed', work: false });
    const researcher = tasksFor({ role: 'researcher', housing: 'confirmed', work: false });
    expect(student.map(tk => tk.id)).toContain('gakutoku');
    expect(researcher.map(tk => tk.id)).not.toContain('gakutoku');
  });

  test('the work permit task appears only when the user plans to work', () => {
    const base = { role: 'student', housing: 'confirmed' };
    expect(tasksFor({ ...base, work: true }).map(tk => tk.id)).toContain('workpermit');
    expect(tasksFor({ ...base, work: false }).map(tk => tk.id)).not.toContain('workpermit');
  });
});

describe('dueDateFor', () => {
  // Users west of Japan (e.g. TZ=America/New_York) used to get a date one day early
  test('counts days from the arrival date in any time zone', () => {
    expect(dueDateFor('2026-10-01', 14)).toBe('Oct 15, 2026');
    expect(dueDateFor('2026-12-25', 14)).toBe('Jan 8, 2027');
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

  test('shows the 14-day deadline on the City Hall tasks', () => {
    generateStudentRoadmap();
    expect(screen.getAllByText('Required · within 14 days')).toHaveLength(2);
  });

  test('shows a due date from the arrival date only when housing is confirmed', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Exchange Student' }));
    fireEvent.change(screen.getByLabelText('Arrival Date'), { target: { value: '2026-10-01' } });

    // Temporary housing: the 14 days start when they move into a permanent address, not on arrival
    fireEvent.click(screen.getByRole('button', { name: /Not yet/ }));
    fireEvent.click(screen.getByRole('button', { name: /Generate/ }));
    expect(screen.queryByText(/Due by/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Edit Answers/ }));
    fireEvent.click(screen.getByRole('button', { name: /Yes — dorm/ }));
    fireEvent.click(screen.getByRole('button', { name: /Generate/ }));
    expect(screen.getAllByText(/Due by Oct 15, 2026/)).toHaveLength(2);
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
});
