import { useState, useEffect } from "react";
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp,
  AlertTriangle, Info, Globe, ArrowRight, Clock, Building2,
  Plane, MapPin, Shield, X, FileText, BadgeCheck, Lock
} from "lucide-react";

const T = {
  en: {
    subtitle: "Setup Your Life in Japan Smoothly",
    formTitle: "Tell us about your situation",
    roleLabel: "Your Role",
    roleStudent: "Exchange Student",
    roleResearcher: "Visiting Researcher",
    roleHint: "Built for exchange students and visiting researchers. In a different situation (e.g. family dependent, degree-seeking student)? Most steps still apply — just skip the visa-specific guidance.",
    durationLabel: "Stay Duration",
    dur1: "Under 90 Days",
    dur2: "90 Days – Under 1 Year",
    dur3: "1 Year or More",
    housingLabel: "Housing Status",
    housingConfirmed: "Confirmed (Dorm / Rental / Host Family)",
    housingTemp: "Not Yet Confirmed (Hotel / Airbnb / Still Searching)",
    visaLabel: "Visa Type (Visiting Researchers only)",
    visaProfessor: "教授 (Professor) — research/teaching at university",
    visaResearcher: "研究 (Researcher) — research at a Japanese public or private organization",
    visaCultural: "文化活動 (Cultural Activities) — non-paid academic activity",
    visaUnknown: "Not sure — I'll check my visa",
    workLabel: "Work / Part-time Plan",
    workCheck: "I plan to work part-time or as a TA (資格外活動許可)",
    workResearcherNote: "Your visa type (教授/研究) already permits work within your contracted activities. If you plan activities outside your contract (e.g. translation, external lectures), individual permission may be required — check with your university or immigration office.",
    workCulturalNote: "文化活動 visa does not permit paid work. Any paid activity requires individual 資格外活動許可 — consult your university's international office before taking on any paid work.",
    generate: "Generate My Setup Roadmap",
    shortStayAlert: "Short stays (under 90 days) don't require municipal registration. Please prepare travel insurance and an eSIM before departure.",
    tempHousingAlert: "You cannot register your residence at a hotel or temporary address. Come back to City Hall once your permanent address is confirmed.",
    summaryLabel: "Your Profile",
    progressLabel: "Completed",
    phase1: "Before Arrival",
    phase2: "At the Airport",
    phase3: "Within 14 Days — City Hall & Legal",
    phase4: "Living Setup & University",
    lockedHousing: "Complete these steps after your permanent address is confirmed.",
    location: "Location / Office",
    required: "Required Items",
    why: "Why this matters",
    showCounter: "Show at Counter 🇯🇵",
    close: "Close",
    editBtn: "← Edit Answers",
    noAccount: "No account needed · Your data stays on this device only",
    appScopeNote: "This app guides you through procedures from just before arrival through your first month in Japan. If you just received your acceptance letter, bookmark this page and come back closer to your departure date.",
    arrivalLabel: "Arrival Date",
    arrivalHint: "Optional — enter once your flight is confirmed. Due dates for each task will be calculated automatically.",
    nextActionLabel: "Do This Next",
    nextBadge: "→ Next",
  },
  ja: {
    subtitle: "日本での生活を、スムーズにスタート",
    formTitle: "あなたの状況を教えてください",
    roleLabel: "役割",
    roleStudent: "交換留学生",
    roleResearcher: "客員研究者",
    roleHint: "本アプリは交換留学生・客員研究者を想定しています。それ以外の方（家族滞在者・正規留学生など）でも大半の手続きは参考になります。ビザ関連の案内のみ読み飛ばしてください。",
    durationLabel: "滞在期間",
    dur1: "90日未満",
    dur2: "90日〜1年未満",
    dur3: "1年以上",
    housingLabel: "住居状況",
    housingConfirmed: "確定済（寮・賃貸・ホームステイ）",
    housingTemp: "住居未確定（ホテル・Airbnb滞在中、または探し中）",
    visaLabel: "ビザ種別（客員研究者のみ）",
    visaProfessor: "教授 — 大学での研究・教育活動",
    visaResearcher: "研究 — 国内の公的機関・民間企業等での研究活動",
    visaCultural: "文化活動 — 収入を伴わない学術上の活動",
    visaUnknown: "わからない — ビザを確認します",
    workLabel: "アルバイト・TA予定",
    workCheck: "アルバイトまたはTAを予定している（資格外活動許可申請）",
    workResearcherNote: "教授・研究ビザは契約範囲内の活動が就労可です。契約外の活動（翻訳・学外講演等）は個別許可が必要な場合があります。大学または入管にご確認ください。",
    workCulturalNote: "文化活動ビザは有償活動が原則不可です。有償活動を行う場合は個別に資格外活動許可が必要です。大学の国際センターにご相談ください。",
    generate: "ロードマップを生成",
    shortStayAlert: "90日未満の短期滞在では住民登録などの行政手続きは不要です。海外旅行保険やeSIMの準備をご確認ください。",
    tempHousingAlert: "ホテル等の仮住まいでは住民登録（転入届）ができません。本住居確定後に役所へ行く必要があります。",
    summaryLabel: "あなたのプロフィール",
    progressLabel: "完了",
    phase1: "来日前",
    phase2: "来日当日（空港）",
    phase3: "14日以内 — 役所・法的手続き",
    phase4: "生活・決済・大学手続き",
    lockedHousing: "住居確定後に実施してください。",
    location: "場所・窓口",
    required: "持ち物",
    why: "なぜ必要か / メリット",
    showCounter: "窓口で見せる 🇯🇵",
    close: "閉じる",
    editBtn: "← 入力に戻る",
    noAccount: "アカウント不要・データはこの端末のみに保存",
    appScopeNote: "このアプリは来日直前から来日後1ヶ月間の手続きをサポートします。合格通知を受け取ったばかりの方は、このページをブックマークして渡航日が近づいてからご利用ください。",
    arrivalLabel: "来日日",
    arrivalHint: "任意入力 — フライトが確定したら入力してください。各タスクの期限が自動計算されます。",
    nextActionLabel: "次にやること",
    nextBadge: "→ 次にやる",
  },
};

// 依存の強さ: REQUIRED=物理的・法的に必須 / STRONGLY_ADVISED=事業者運用依存・例外あり / TIP=アドバイス
// deadline.type: legal=法的義務 / financial=遅れると金銭的不利益 / advisory=推奨・遡及可 / null=期限なし

const buildPhases = (profile, lang) => {
  const t = T[lang];
  const isStudent = profile.role === "student";
  const wantsWork = profile.work;

  return [
    {
      id: "p1", label: t.phase1, color: "indigo",
      icon: <Plane size={15} />,
      tasks: [
        {
          id: "cash", title: "Prepare Cash, Credit Cards / Debit Cards & Travel eSIM",
          location: "Online / Your Home Country",
          required: [
            "International debit or credit card (Visa / Mastercard) — e.g. Wise, Revolut, or your home bank's debit card",
            "JPY cash ~¥50,000 for first days",
            "Travel eSIM (recommended) or prepaid physical SIM as backup",
          ],
          why: "Many Japanese ATMs reject foreign cards. Wise or Revolut cards work reliably at Japanese ATMs and convenience stores — set one up before departure. For eSIM: buy and install before leaving home, it activates the moment you land with no queuing. If your phone is not eSIM-compatible, prepaid physical SIM cards are available at airport counters (Narita/Haneda) but expect queues after long-haul flights.",
          counter: "両替と海外クレジットカードを持参しました。現金とSIMカードの準備についてお聞きしたいです。",
          counterTranslation: "I have brought foreign currency and an international card. I'd like to ask about cash exchange and SIM card options.",
          deadline: null,
          deps: [],
          source: null,
        },
        {
          id: "coe", title: "Receive your Certificate of Eligibility (CoE) from your Host University in Japan",
          location: "Sent by your host university in Japan — delivered by international mail or email",
          required: [
            "Confirmation email from your university's international office",
            "Check that your name, nationality, and visa type are correct",
          ],
          why: "The Certificate of Eligibility (CoE) is issued by Japanese Immigration on behalf of your host university in Japan — you don't apply for it yourself. Without it, you cannot apply for a visa. Contact your host university's international office if it hasn't arrived 2–3 months before departure.",
          counter: "在留資格認定証明書の発行状況を確認したいです。いつ頃届きますか？",
          counterTranslation: "I would like to check the status of my Certificate of Eligibility (CoE). When can I expect to receive it?",
          deadline: null,
          deps: [],
          source: { url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html", verified: "2026-08" },
        },
        {
          id: "visa", title: "Apply for your Student / Researcher Visa at the Embassy",
          location: "Japanese Embassy, Consulate, or Visa Application Center (e.g. VFS Global) in your country",
          required: [
            "Certificate of Eligibility (CoE) — original",
            "Passport (valid 6+ months beyond intended stay)",
            "Visa application form (download from embassy website)",
            "Passport-size photo",
            "Application fee (varies by country)",
          ],
          why: "You cannot board a flight to Japan without a visa. Processing typically takes 5–10 business days. Check your country's Japanese embassy website for exact requirements as they vary by country.",
          counter: "学生ビザの申請をしたいです。在留資格認定証明書を持参しました。",
          counterTranslation: "I would like to apply for a student visa. I have my Certificate of Eligibility (CoE) with me.",
          deadline: null,
          deps: [{ taskId: "coe", type: "REQUIRED" }],
          source: { url: "https://www.mofa.go.jp/j_info/visit/visa/index.html", verified: "2026-08" },
        },
      ],
    },
    {
      id: "p2", label: t.phase2, color: "sky",
      icon: <MapPin size={15} />,
      tasks: [
        {
          id: "rezcard", title: "Receive Residence Card (在留カード)",
          location: "Immigration counter at your arrival airport — issued automatically during immigration inspection. No application needed.",
          required: ["Passport with valid visa", "Certificate of Eligibility (CoE) — original"],
          why: "The Residence Card is issued automatically during immigration — you don't apply for it. At 10 major airports (Narita, Haneda, Kansai, Chubu, Chitose, Sendai, Niigata, Hiroshima, Fukuoka, Naha) it is handed to you on the spot. At other airports, your passport gets a 'Residence Card to be issued later' stamp and the card is mailed to your registered address after you complete resident registration (allow ~2 weeks). Until it arrives, your stamped passport serves as a substitute.",
          counter: "在留カードを受け取りに来ました。どちらの窓口ですか？",
          counterTranslation: "I am here to receive my Residence Card. Which counter should I go to?",
          deadline: null,
          deps: [],
          source: { url: "https://www.moj.go.jp/isa/publications/faq/newimmiact_4_port-city.html", verified: "2026-08" },
        },
        ...(wantsWork ? [{
          id: "workpermit",
          title: "Apply for Work Permit (資格外活動許可)",
          location: "Immigration counter at your arrival airport — same counter as your Residence Card. Application form is available at the counter, fill in and submit on the spot.",
          required: ["Passport", "Certificate of Eligibility (CoE)", "Residence Card — received at the same counter simultaneously"],
          why: "Applying here gets the stamp on your Residence Card immediately — saving a separate trip to the Immigration office later (typically a half-day errand). You receive your Residence Card and Work Permit stamp at the same counter in one go.",
          counter: "資格外活動許可の申請をしたいのですが、ここで手続きできますか？在留カードも同時に受け取りたいです。",
          counterTranslation: "I would like to apply for a Work Permit (資格外活動許可). Can I do it here? I also need to receive my Residence Card at the same time.",
          highlight: "Apply simultaneously with your Residence Card — same counter",
          deadline: null,
          deps: [],
          source: { url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html", verified: "2026-08" },
        }] : []),
      ],
    },
    {
      id: "p3", label: t.phase3, color: "emerald",
      icon: <Building2 size={15} />,
      lockedIfTemp: true,
      tasks: [
        {
          id: "juminhyo", title: "Moving-in Notification — 転入届 (Resident Registration)",
          location: "City Hall (市区町村役場) — 市民課 / 住民登録窓口",
          required: ["Passport", "Residence Card (在留カード)", "Lease contract or dorm registration letter"],
          why: "Legal obligation within 14 days of moving in. Get 1–2 certified copies of your 住民票 at the same visit — you'll need them for SIM contracts and bank accounts.",
          counter: "転入届を提出したいです。住民票の写しも2部お願いします。",
          counterTranslation: "I would like to submit my moving-in notification (転入届). Could I also get 2 copies of my residence record (住民票)?",
          deadline: { type: "legal", days: 14, note: "Legal obligation within 14 days" },
          deps: [{ taskId: "rezcard", type: "REQUIRED" }],
          source: { url: "https://www.soumu.go.jp/main_sosiki/jichi_gyousei/daityo/jjn.html", verified: "2026-08" },
        },
        {
          id: "health", title: "National Health Insurance — 国民健康保険 (NHI)",
          location: "Same City Hall visit — 国民健康保険窓口",
          required: ["Residence Card", "住民票 (just obtained)", "Passport"],
          why: "NHI covers 70% of medical costs. If your Japan income last year was zero, you can apply for a premium reduction (保険料軽減) at the same window.",
          counter: "国民健康保険に加入したいです。前年の日本での所得はゼロです。保険料の軽減申請もお願いできますか？",
          counterTranslation: "I would like to enroll in National Health Insurance. My income in Japan last year was zero. Could I also apply for a premium reduction?",
          deadline: { type: "financial", days: null, note: "Enroll same day as 転入届 — delays mean retroactive premiums" },
          deps: [{ taskId: "juminhyo", type: "REQUIRED" }],
          source: { url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/newpage_16819.html", verified: "2026-08" },
        },
        {
          id: "pension",
          title: `National Pension + ${isStudent ? "Student Exemption (学生納付特例)" : "Income Exemption (所得免除申請)"}`,
          location: "City Hall — 年金窓口",
          required: [
            "Residence Card", "住民票",
            ...(isStudent ? ["Student ID (学生証) or 在学証明書 — either accepted"] : ["Income declaration or proof"]),
          ],
          why: isStudent
            ? "学生納付特例制度で在学中の保険料の支払いを猶予できます（将来の年金受給権は保全）。保険料を払わなくていいのに加入資格だけ得られるため、デメリットはほぼありません。学生証がまだ発行されていない場合は在学証明書で代替可能。また申請は来日から2年以内なら遡及適用されるため、14日以内の義務はありません。"
            : "所得免除制度で保険料負担を大幅に軽減できます。申請しないと未納扱いになるため、必ず申請してください。申請は2年以内なら遡及適用されます。",
          counter: isStudent
            ? "国民年金の学生納付特例の申請をしたいです。学生証を持参しました。"
            : "国民年金の所得免除申請をしたいです。前年の日本所得はゼロです。",
          counterTranslation: isStudent
            ? "I would like to apply for the Student Pension Payment Exemption (学生納付特例). I have my student ID with me."
            : "I would like to apply for a National Pension income exemption. My income in Japan last year was zero.",
          deadline: { type: "advisory", days: null, note: "Retroactive up to 2 years — no 14-day rule" },
          source: { url: "https://www.nenkin.go.jp/service/kokunen/menjo/20150514.html", verified: "2026-08" },
          deps: [
            { taskId: "juminhyo", type: "REQUIRED" },
            ...(isStudent ? [{ taskId: "university", type: "STRONGLY_ADVISED", note: "学生証 or 在学証明書 needed" }] : []),
          ],
        },
        {
          id: "mynumber", title: "My Number Card Application (マイナンバーカード)",
          location: "City Hall — マイナンバー窓口 or online via マイナポータル",
          required: ["個人番号通知書 (mailed ~1–2 weeks after registration) — not usable as ID", "Passport", "Photo via certificate photo app (e.g. ピクチャン)"],
          why: "Increasingly required for online tax filing, digital health insurance, and government services. Note: the 個人番号通知書 that arrives by mail cannot be used as ID — the card itself is needed. Takes ~1 month to receive after applying.",
          counter: "マイナンバーカードを申請したいです。個人番号通知書を持参しました。写真はスマートフォンで用意しています。",
          counterTranslation: "I would like to apply for a My Number Card. I have my individual number notification letter with me. I have a photo ready on my smartphone.",
          deadline: null,
          deps: [{ taskId: "juminhyo", type: "REQUIRED" }],
          source: { url: "https://www.digital.go.jp/policies/mynumber_faq_02", verified: "2026-08" },
        },
      ],
    },
    {
      id: "p4", label: t.phase4, color: "violet",
      icon: <Shield size={15} />,
      tasks: [
        {
          id: "sim", title: "Voice/SMS SIM Contract (格安SIM)",
          location: "IIJmio, Mineo, or Rakuten Mobile — store or online",
          required: ["Residence Card (with address on back)", "住民票 ⚠️ required", "Passport", "Credit card or international debit card (Wise / Revolut / overseas Visa・Mastercard) — mineo requires credit card"],
          why: "A registered address is legally required to sign any SIM contract in Japan. Obtain your 住民票 first. Most carriers (Rakuten, ahamo, LINEMO) accept international debit cards — no Japanese bank account needed.",
          counter: "格安SIMの新規契約をしたいです。住民票と在留カードを持参しました。",
          counterTranslation: "I would like to sign up for a new SIM contract. I have my residence record (住民票) and Residence Card with me.",
          warning: "Requires 住民票 (Registered Address) first",
          deadline: null,
          deps: [{ taskId: "juminhyo", type: "REQUIRED" }],
          source: null,
        },
        {
          id: "bank", title: "Bank Account — Japan Post Bank / ゆうちょ銀行 (recommended)",
          location: "Post Office (郵便局) or Japan Post Bank branch",
          required: ["Residence Card", "住民票 ⚠️ required", "Japanese phone number ⚠️ required", "Passport"],
          why: "Japan Post Bank is the most foreigner-friendly. Important: you need a Japanese phone number to complete the application — get your SIM before opening a bank account.",
          counter: "ゆうちょ銀行の口座を開設したいです。在留カードと住民票を持参しました。",
          counterTranslation: "I would like to open a Japan Post Bank account. I have my Residence Card and residence record (住民票) with me.",
          warning: "Requires 住民票 + Japanese Phone — get SIM first!",
          deadline: null,
          source: null,
          deps: [
            { taskId: "juminhyo", type: "REQUIRED" },
            { taskId: "sim", type: "STRONGLY_ADVISED", note: "Japanese phone number needed for application" },
          ],
        },
        {
          id: "university", title: "University Onboarding & Student ID",
          location: "International Office / 国際センター at your university",
          required: ["Passport", "Residence Card", "Admission letter / research agreement", "ID photo"],
          why: "Student ID is required for campus facilities, library access, and the National Pension student exemption. Timing depends on your university's orientation schedule — complete as early as possible. If your student ID isn't ready yet, ask for a 在学証明書 (enrollment certificate) instead, which is accepted as a substitute for the pension exemption application.",
          counter: "国際センターで学生証の発行手続きをしたいのですが、必要な書類を教えてください。",
          counterTranslation: "I would like to get my student ID issued at the International Office. Could you tell me what documents I need?",
          deadline: { type: "advisory", days: null, note: "Timing depends on university orientation schedule" },
          deps: [{ taskId: "rezcard", type: "REQUIRED" }],
          source: null,
        },
      ],
    },
  ];
};

const phaseColors = {
  indigo: { badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", ring: "ring-indigo-200" },
  sky:    { badge: "bg-sky-100 text-sky-700",       dot: "bg-sky-500",    ring: "ring-sky-200" },
  emerald:{ badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", ring: "ring-emerald-200" },
  violet: { badge: "bg-violet-100 text-violet-700", dot: "bg-violet-500", ring: "ring-violet-200" },
};

function CounterModal({ text, translation, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Show at Counter 🇯🇵</span>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition-colors"><X size={18} /></button>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 text-center">
          <p className="text-xl leading-relaxed text-slate-800 font-medium">{text}</p>
        </div>
        {translation && (
          <div className="border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">What this means</p>
            <p className="text-sm text-slate-600 leading-relaxed">{translation}</p>
          </div>
        )}
        <p className="text-xs text-center text-slate-400">Point your screen at the staff member</p>
      </div>
    </div>
  );
}

// deadline と deps のバッジ設定
const deadlineBadge = (deadline) => {
  if (!deadline) return null;
  const map = {
    legal:    { cls: "text-red-700 bg-red-50 border-red-200",     icon: "⚖️", label: `Legal obligation${deadline.days ? ` — within ${deadline.days} days` : ""}` },
    financial:{ cls: "text-orange-700 bg-orange-50 border-orange-200", icon: "💸", label: "Enroll same day as 転入届 — delays mean retroactive premiums" },
    advisory: { cls: "text-slate-600 bg-slate-50 border-slate-200",  icon: "📅", label: deadline.note || "No strict deadline" },
  };
  const cfg = map[deadline.type];
  if (!cfg) return null;
  return <span className={`inline-flex items-center gap-1 text-xs font-medium border rounded-full px-2 py-0.5 ${cfg.cls}`}>{cfg.icon} {cfg.label}</span>;
};

const depBadge = (deps) => {
  if (!deps || deps.length === 0) return null;
  const hasStrongly = deps.some(d => d.type === "STRONGLY_ADVISED");
  if (hasStrongly) {
    const d = deps.find(d => d.type === "STRONGLY_ADVISED");
    return <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
      <AlertTriangle size={10} /> Strongly advised: complete prior step first{d.note ? ` (${d.note})` : ""}
    </span>;
  }
  return null;
};

function TaskCard({ task, checked, onToggle, t, isLocked, dueDate, checkedIds, allTasks, isNext }) {
  const [open, setOpen] = useState(isNext);
  const [modal, setModal] = useState(false);

  // 完了したら閉じる。次のアクションになったら自動的に開き、外れたら自動的に閉じる
  useEffect(() => { if (checked) setOpen(false); }, [checked]);
  useEffect(() => { setOpen(isNext && !checked); }, [isNext]);

  // REQUIRED依存が未完了のものを探す
  const unmetDeps = (task.deps || [])
    .filter(d => d.type === "REQUIRED" && !checkedIds[d.taskId])
    .map(d => allTasks.find(tk => tk.id === d.taskId)?.title)
    .filter(Boolean);

  return (
    <>
      {modal && <CounterModal text={task.counter} translation={task.counterTranslation} onClose={() => setModal(false)} />}
      <div id={task.id} className={`rounded-xl border scroll-mt-20 transition-all duration-200 ${
        isNext ? "border-indigo-300 ring-2 ring-indigo-100 bg-indigo-50/30"
          : task.highlight ? "border-amber-300 bg-amber-50/40" : "border-slate-200 bg-white"
      } ${checked ? "opacity-60" : ""}`}>
        <div className="flex items-start gap-3 p-4">
          <button onClick={() => !isLocked && onToggle(task.id)}
            className={`mt-0.5 flex-shrink-0 transition-colors ${isLocked ? "opacity-25 cursor-not-allowed" : "cursor-pointer"}`}>
            {checked
              ? <CheckCircle2 size={20} className="text-emerald-500" />
              : <Circle size={20} className="text-slate-300 hover:text-slate-400" />}
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className={`text-sm font-semibold leading-snug ${checked ? "line-through text-slate-400" : "text-slate-800"}`}>
                {task.title}
              </p>
              <button onClick={() => setOpen(o => !o)} className="flex-shrink-0 text-slate-300 hover:text-slate-500 transition-colors ml-1">
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {isNext && !checked && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 rounded-full px-2 py-0.5">
                  {t.nextBadge}
                </span>
              )}
              {task.deadline && deadlineBadge(task.deadline)}
              {dueDate && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-full px-2 py-0.5">
                  <Clock size={10} /> Due by {dueDate}
                </span>
              )}
              {task.deps && depBadge(task.deps)}
              {task.warning && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                  <AlertTriangle size={10} /> {task.warning}
                </span>
              )}
              {task.highlight && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-300 rounded-full px-2 py-0.5">
                  ★ {typeof task.highlight === "string" ? task.highlight : "Do this at the airport — saves a separate trip!"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-4">
            {/* 未完了の依存タスク警告 */}
            {unmetDeps.length > 0 && (
              <div className="flex gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5">
                <AlertTriangle size={15} className="flex-shrink-0 mt-0.5 text-red-500" />
                <div>
                  <p className="text-xs font-bold text-red-700 mb-1">Complete this first:</p>
                  <ul className="space-y-0.5">
                    {unmetDeps.map((title, i) => (
                      <li key={i} className="text-xs text-red-700">→ {title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t.location}</p>
              <p className="text-sm text-slate-600">{task.location}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t.required}</p>
              <ul className="space-y-1.5">
                {task.required.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t.why}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{task.why}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg px-3 py-2 transition-colors">
                <FileText size={13} /> {t.showCounter}
              </button>
              {task.source?.url && (
                <a href={task.source.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                  Official source ↗
                  {task.source.verified && (
                    <span className="text-slate-300 ml-1">· verified {task.source.verified}</span>
                  )}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function JOnboard() {
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState("form");
  const [profile, setProfile] = useState({ role: "student", visaType: "professor", duration: "mid", housing: "confirmed", work: false, arrival: "" });
  const [checked, setChecked] = useState({});
  const [langOpen, setLangOpen] = useState(false);
  const t = T[lang];

  useEffect(() => {
    try {
      const s = localStorage.getItem("jonboard_checked"); if (s) setChecked(JSON.parse(s));
      const p = localStorage.getItem("jonboard_profile"); if (p) setProfile(JSON.parse(p));
      const st = localStorage.getItem("jonboard_step"); if (st === "roadmap") setStep("roadmap");
    } catch {}
  }, []);

  const handleToggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem("jonboard_checked", JSON.stringify(next)); } catch {}
  };

  const handleGenerate = () => {
    try {
      localStorage.setItem("jonboard_profile", JSON.stringify(profile));
      localStorage.setItem("jonboard_step", "roadmap");
    } catch {}
    setStep("roadmap");
  };

  const goToForm = () => {
    try { localStorage.setItem("jonboard_step", "form"); } catch {}
    setStep("form");
  };

  const phases = buildPhases(profile, lang);
  const allIds = phases.flatMap(p => p.tasks.map(tk => tk.id));
  const doneCount = allIds.filter(id => checked[id]).length;
  const pct = allIds.length ? Math.round((doneCount / allIds.length) * 100) : 0;
  const isShort = profile.duration === "short";
  const isTemp = profile.housing === "temp";

  // 未完了・ロック解除済み・依存タスク完了済みの中で最初のタスク＝次にやるべきアクション
  const nextTask = phases
    .filter(p => !(p.lockedIfTemp && isTemp))
    .flatMap(p => p.tasks)
    .find(tk => {
      if (checked[tk.id]) return false;
      const unmetDeps = (tk.deps || []).filter(d => d.type === "REQUIRED" && !checked[d.taskId]);
      return unmetDeps.length === 0;
    });

  const visaLabels = { professor: "教授ビザ", researcher: "研究ビザ", cultural: "文化活動ビザ", unknown: "ビザ種別未確認" };

  const badges = [
    profile.role === "student" ? t.roleStudent : t.roleResearcher,
    ...(profile.role === "researcher" ? [visaLabels[profile.visaType] || ""] : []),
    profile.duration === "short" ? t.dur1 : profile.duration === "mid" ? t.dur2 : t.dur3,
    profile.housing === "confirmed" ? "Housing ✓" : "Housing ⚠",
  ];

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={goToForm} className="flex items-center gap-2.5 hover:opacity-70 transition-opacity cursor-pointer group">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
                <BadgeCheck size={16} className="text-white" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">J-Onboard</div>
                <div className="text-xs text-slate-400 leading-tight hidden sm:block">{t.subtitle}</div>
              </div>
            </button>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setLangOpen(o => !o)}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-colors">
                <Globe size={12} /> {lang === "en" ? "EN" : "JA"} <ChevronDown size={10} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 min-w-[130px]">
                  {[["en", "🇬🇧 English"], ["ja", "🇯🇵 日本語"]].map(([l, label]) => (
                    <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`block w-full text-left text-sm px-4 py-2.5 hover:bg-slate-50 transition-colors ${lang === l ? "text-indigo-600 font-semibold bg-indigo-50/50" : "text-slate-700"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        {step === "form" ? (
          <>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{t.formTitle}</h1>
              <p className="text-sm text-slate-400 mt-1">{t.noAccount}</p>
              <div className="flex gap-2.5 bg-indigo-50 border border-indigo-200 rounded-xl p-3.5 mt-3 text-sm text-indigo-800">
                <Info size={15} className="flex-shrink-0 mt-0.5 text-indigo-400" />
                <span>{t.appScopeNote}</span>
              </div>
            </div>

            {isShort && (
              <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <Info size={15} className="flex-shrink-0 mt-0.5 text-blue-500" />
                <span>{t.shortStayAlert}</span>
              </div>
            )}
            {isTemp && (
              <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <AlertTriangle size={15} className="flex-shrink-0 mt-0.5 text-amber-500" />
                <span>{t.tempHousingAlert}</span>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              {/* Role */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{t.roleLabel}</label>
                <div className="flex gap-2.5 flex-wrap">
                  {[["student", t.roleStudent], ["researcher", t.roleResearcher]].map(([v, label]) => (
                    <button key={v} onClick={() => setProfile(p => ({ ...p, role: v, work: false }))}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${profile.role === v ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                      {label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t.roleHint}</p>
              </div>

              {/* Visa Type — researcher only */}
              {profile.role === "researcher" && (
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{t.visaLabel}</label>
                  <div className="flex flex-col gap-2">
                    {[
                      ["professor", t.visaProfessor],
                      ["researcher", t.visaResearcher],
                      ["cultural", t.visaCultural],
                      ["unknown", t.visaUnknown],
                    ].map(([v, label]) => (
                      <button key={v} onClick={() => setProfile(p => ({ ...p, visaType: v }))}
                        className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${profile.visaType === v ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Duration */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{t.durationLabel}</label>
                <div className="flex gap-2.5 flex-wrap">
                  {[["short", t.dur1], ["mid", t.dur2], ["long", t.dur3]].map(([v, label]) => (
                    <button key={v} onClick={() => setProfile(p => ({ ...p, duration: v }))}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${profile.duration === v ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Housing */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{t.housingLabel}</label>
                <div className="flex gap-2.5 flex-wrap">
                  {[["confirmed", t.housingConfirmed], ["temp", t.housingTemp]].map(([v, label]) => (
                    <button key={v} onClick={() => setProfile(p => ({ ...p, housing: v }))}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${profile.housing === v ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{t.workLabel}</label>
                {profile.role === "student" ? (
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div onClick={() => setProfile(p => ({ ...p, work: !p.work }))}
                      className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${profile.work ? "bg-indigo-600 border-indigo-600" : "border-slate-300 group-hover:border-indigo-400"}`}>
                      {profile.work && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className="text-sm text-slate-700 leading-snug">{t.workCheck}</span>
                  </label>
                ) : profile.visaType === "cultural" ? (
                  <div className="flex gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-sm text-amber-800">
                    <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                    <span>{t.workCulturalNote}</span>
                  </div>
                ) : profile.visaType === "unknown" ? (
                  <div className="flex gap-2.5 bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-sm text-blue-800">
                    <Info size={15} className="flex-shrink-0 mt-0.5" />
                    <span>Please check your visa type to understand your work eligibility. Your university's international office can help.</span>
                  </div>
                ) : (
                  <div className="flex gap-2.5 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-700">
                    <Info size={15} className="flex-shrink-0 mt-0.5 text-slate-400" />
                    <span>{t.workResearcherNote}</span>
                  </div>
                )}
              </div>

              {/* Arrival */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2.5">{t.arrivalLabel}</label>
                <input type="date" value={profile.arrival}
                  onChange={e => setProfile(p => ({ ...p, arrival: e.target.value }))}
                  className="border-2 border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-0 focus:border-indigo-400 transition-all hover:border-slate-300" />
                <p className="text-xs text-slate-400 mt-1.5">{t.arrivalHint}</p>
              </div>

              <button onClick={handleGenerate}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl px-6 py-3.5 transition-colors shadow-sm">
                {t.generate} <ArrowRight size={16} />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Summary + progress */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4 gap-2">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t.summaryLabel}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {badges.map((b, i) => (
                      <span key={i} className="text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full px-2.5 py-0.5">{b}</span>
                    ))}
                    {profile.work && <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5">Work Permit</span>}
                    {profile.arrival && (
                      <span className="text-xs font-medium bg-slate-100 text-slate-500 rounded-full px-2.5 py-0.5 flex items-center gap-1">
                        <Clock size={10} /> {profile.arrival}
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={goToForm} className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold whitespace-nowrap flex-shrink-0">
                  {t.editBtn}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                  {doneCount} / {allIds.length} {t.progressLabel}
                </span>
              </div>
              {pct === 100 ? (
                <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="text-sm font-bold text-emerald-800">You're all set in Japan!</p>
                    <p className="text-xs text-emerald-600 mt-0.5">All tasks completed. Welcome to Japan — enjoy your stay!</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" /> Your progress is automatically saved on this device
                </p>
              )}
            </div>

            {isTemp && (
              <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" /> <span>{t.tempHousingAlert}</span>
              </div>
            )}

            {/* 次にやるべきアクション */}
            {nextTask && (
              <a href={`#${nextTask.id}`} className="flex items-start gap-3 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-2xl p-5 shadow-sm text-white">
                <div className="flex-shrink-0 w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
                  <ArrowRight size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">{t.nextActionLabel}</p>
                  <p className="text-base font-semibold leading-snug">{nextTask.title}</p>
                </div>
              </a>
            )}

            {/* Phases */}
            {phases.map((phase, pi) => {
              const c = phaseColors[phase.color];
              const locked = phase.lockedIfTemp && isTemp;

              // 期日計算: 入国日 + deadline.days
              const calcDeadline = (task) => {
                if (!profile.arrival || !task.deadline?.days) return null;
                const arrival = new Date(profile.arrival);
                const due = new Date(arrival);
                due.setDate(due.getDate() + task.deadline.days);
                return due.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              };

              return (
                <div key={phase.id}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-2.5 py-1 ${c.badge}`}>
                      {phase.icon} {phase.label}
                    </span>
                    {locked && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                        <Lock size={10} /> Needs permanent address
                      </span>
                    )}
                  </div>

                  {locked && (
                    <div className="flex gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-sm text-amber-700 mb-3">
                      <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                      <span>{t.lockedHousing}</span>
                    </div>
                  )}

                  {/* Phase 3: 役所まとめバナー */}
                  {phase.id === "p3" && !locked && (
                    <div className="flex gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Building2 size={15} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-800 mb-0.5">💡 Save time — do these in one City Hall visit</p>
                        <p className="text-xs text-emerald-700 leading-relaxed">転入届・国民健康保険・国民年金 can all be handled at the same City Hall on the same day. Tell the first counter you need all three — they'll direct you.</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {phase.tasks.map(task => {
                      const dueDate = calcDeadline(task);
                      return (
                        <TaskCard key={task.id} task={task} checked={!!checked[task.id]}
                          onToggle={handleToggle} t={t} isLocked={locked} dueDate={dueDate}
                          checkedIds={checked} allTasks={phases.flatMap(p => p.tasks)}
                          isNext={task.id === nextTask?.id} />
                      );
                    })}
                  </div>

                  {pi < phases.length - 1 && (
                    <div className="flex items-center gap-3 mt-5 mb-1">
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Info size={13} className="text-slate-400 flex-shrink-0" />
                <p className="text-xs font-semibold text-slate-500">Information last verified: August 2026</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Administrative procedures and requirements may change. Always confirm with your university's international office or the relevant government agency before acting.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: "出入国在留管理庁", url: "https://www.moj.go.jp/isa/index.html" },
                  { label: "マイナポータル", url: "https://myna.go.jp" },
                  { label: "日本年金機構", url: "https://www.nenkin.go.jp" },
                ].map(({ label, url }) => (
                  <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-indigo-500 hover:text-indigo-700 underline underline-offset-2">
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 pb-4">
              J-Onboard · No personal data stored on servers · For reference only
            </p>
          </>
        )}
      </main>

      <style>{`
        @media print {
          header button, .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
