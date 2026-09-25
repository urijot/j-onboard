import { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp,
  AlertTriangle, Info, Globe, ArrowRight, Building2,
  Plane, MapPin, Shield, X, FileText, BadgeCheck, Lock, ExternalLink
} from "lucide-react";

const T = {
  en: {
    subtitle: "Setup Your Life in Japan Smoothly",
    formTitle: "Tell us about your situation",
    roleLabel: "Which best describes you?",
    roleHint: "This decides your pension steps and which student-only steps appear.",
    roleStudent: "Exchange Student",
    roleResearcher: "Visiting Researcher",
    roleOther: "Other / Not Sure",
    otherRoleNote: "This checklist is built specifically for exchange students and visiting researchers — its visa, pension, and housing steps assume one of those two categories and won't be accurate for a different status. The most reliable next step: contact whoever sponsored your Certificate of Eligibility or visa — your host institution's international office, your employer's HR/immigration desk, or your family member's sponsoring organization. They already know your exact visa category and can point you to the right procedures.",
    housingLabel: "Do you already know where you'll live in Japan?",
    housingHint: "This affects when you can register your address at City Hall — a legal requirement within 14 days of moving in.",
    housingConfirmed: "Yes — dorm, rental, or host family arranged",
    housingTemp: "Not yet — hotel/Airbnb for now, or still searching",
    workLabel: "Will you work or do any paid activity in Japan?",
    workHint: "This decides whether you need to apply for a work permit at immigration.",
    workCheck: "Yes, I plan to work part-time",
    workLabelStudent: "Might you work part-time or do any paid activity while in Japan?",
    workHintStudent: "Nothing needs to be decided yet — students can apply at the airport with just the application form, no job lined up.",
    workCheckStudent: "Yes, or maybe",
    generate: "Generate My Setup Roadmap",
    tempHousingAlert: "You cannot register your residence at a hotel or temporary address. Come back to City Hall once your permanent address is confirmed.",
    summaryLabel: "Your Profile",
    progressLabel: "Completed",
    phase1: "Before Arrival",
    phase2: "At the Airport",
    phase3: "At City Hall",
    phase4: "Living Setup",
    lockedHousing: "Complete these steps after your permanent address is confirmed.",
    location: "Location / Office",
    required: "Required Items",
    bringLabel: "Bring with you",
    counterSheetBtn: "Show these phrases at the counter 🇯🇵",
    why: "What to know",
    showCounter: "Show at Counter 🇯🇵",
    close: "Close",
    editBtn: "← Edit Answers",
    noAccount: "No account needed · Your data stays on this device only",
    appScopeNote: "For exchange students and visiting researchers staying in Japan for more than 3 months — from the day your Certificate of Eligibility arrives to settling in.",
    shortStayToggle: "Staying 3 months or less?",
    shortStayBody: "You won't receive a Residence Card, so the procedures in this app (residence registration, health insurance, pension, etc.) don't apply to you. Just arrange travel health insurance and a data SIM or eSIM before you leave.",
    reassuranceNote: "Not sure about something? Answer what you know — you can edit later.",
    housingGuideToggle: "Dorms aren't your only housing option",
    housingGuideIntro: "If you didn't get a dorm place, or your housing still isn't settled, it's worth knowing about furnished monthly and share-house services aimed at foreign residents before you start a full apartment search — Sakura House and Oakhouse are two well-known examples. They typically offer:",
    housingGuideFeatures: [
      "No guarantor or guarantor company required",
      "No key money, deposit, or agent fees",
      "Furniture, appliances, Wi-Fi, and utilities bundled into the rent — no separate contracts with electric/gas/water companies",
      "Contracts completed online before you even arrive in Japan",
      "Multilingual staff support",
    ],
    housingGuideLinks: [
      { name: "Sakura House", url: "https://www.sakura-house.com/" },
      { name: "Oakhouse", url: "https://www.oakhouse.jp/eng" },
    ],
    housingGuideMiddle: "In short, they let you skip most of the friction of a standard Japanese lease — finding a guarantor, gathering upfront costs, and setting up utilities one by one. A common approach: use one of these for your first few months while you settle in, then move to a standard rental once you're comfortable navigating things locally.",
    housingGuideCostNote: "Monthly rent tends to run higher than a standard lease, though — if you're staying a year or more and want to minimize cost, it's also worth asking your university's international office about standard rental options.",
    nextActionLabel: "Do This Next",
    nextBadge: "→ Next",
    incompleteHint: "Answer all questions above to continue.",
    reportGeneral: "If something was different for you, or a link didn't work, let us know",
    housingOk: "Housing ✓",
    housingWarn: "Housing ⚠",
    workPermitBadge: "Work Permit",
    progressSaved: "Your progress is automatically saved on this device",
    allDoneTitle: "You're all settled in!",
    allDoneBody: "You've finished every setup task in this guide. Enjoy your time in Japan!",
    oneVisitSuffix: " — Save time by doing these in one visit",
    needsAddress: "Needs permanent address",
    levelRequired: "Required",
    levelRecommended: "Recommended",
    deadlineWithin: (days) => ` · within ${days} days of moving in`,
    completeFirst: "Complete this first:",
    officialSource: "Official source",
    verifiedLabel: (v) => `· verified ${v}`,
    whatThisMeans: "What this means",
    pointScreen: "Point your screen at the staff member",
    airportHighlight: "Do this at the airport — saves a separate trip!",
    disclaimer: "Administrative procedures and requirements may change. Always confirm with your university's international office or the relevant government agency before acting.",
    footerNote: "J-Onboard · No personal data stored on servers",
  },
  ja: {
    subtitle: "日本での生活を、スムーズにスタート",
    formTitle: "あなたの状況を教えてください",
    roleLabel: "あなたに当てはまるのは？",
    roleHint: "この選択によって、年金の手続きと、学生だけに必要な手続きが変わります。",
    roleStudent: "交換留学生",
    roleResearcher: "客員研究者",
    roleOther: "その他・わからない",
    otherRoleNote: "このチェックリストは交換留学生・客員研究者を前提に作られており、ビザ・年金・住居の手続きはこの2区分を想定した内容です。別の区分の方に正確な案内をするのは難しいため、まずは在留資格認定証明書やビザを発行してもらった窓口——受け入れ機関の国際担当部署、勤務先の人事・在留手続き窓口、またはご家族の受け入れ先機関——に確認するのが一番確実です。あなたの正確なビザ区分を把握しているのはその窓口だからです。",
    housingLabel: "日本での住まいはもう決まっていますか？",
    housingHint: "住民登録（転入届、住み始めてから14日以内が義務）をいつ行えるかに関わります。",
    housingConfirmed: "はい — 寮・賃貸・ホームステイ先が決まっています",
    housingTemp: "まだです — ホテル/Airbnbなど仮住まい中、または探している最中です",
    workLabel: "日本でアルバイトなど有償の活動をする予定はありますか？",
    workHint: "資格外活動許可の申請が必要かどうかがこれで決まります。",
    workCheck: "はい、アルバイトを予定している（資格外活動許可申請）",
    workLabelStudent: "日本滞在中に、アルバイトなど有償の活動をする可能性はありますか？",
    workHintStudent: "まだ決まっていなくても大丈夫です。留学生は空港で、申請書だけで申請できます。仕事先が決まっている必要はありません。",
    workCheckStudent: "ある・かもしれない",
    generate: "自分のロードマップを見る",
    tempHousingAlert: "ホテル等の仮住まいでは住民登録（転入届）ができません。本住居確定後に役所へ行く必要があります。",
    summaryLabel: "あなたのプロフィール",
    progressLabel: "完了",
    phase1: "来日前",
    phase2: "来日当日（空港）",
    phase3: "役所の手続き",
    phase4: "生活・決済",
    lockedHousing: "住居確定後に実施してください。",
    location: "場所・窓口",
    required: "持ち物",
    bringLabel: "持っていくもの",
    counterSheetBtn: "これらの文を窓口で見せる 🇯🇵",
    why: "知っておくこと",
    showCounter: "窓口で見せる 🇯🇵",
    close: "閉じる",
    editBtn: "← 入力に戻る",
    noAccount: "アカウント不要・データはこの端末のみに保存",
    appScopeNote: "3ヶ月を超えて日本に滞在する交換留学生・客員研究者向けに、在留資格認定証明書が届いた日から来日後の生活準備までを案内します。",
    shortStayToggle: "3ヶ月以下の滞在の方へ",
    shortStayBody: "3ヶ月以下の滞在では在留カードが発行されないため、このアプリの手続き（住民登録・国民健康保険・年金など）は対象外です。出発前に海外旅行保険とデータSIM・eSIMを用意しておけば十分です。",
    reassuranceNote: "わからない質問があっても大丈夫。あとから編集できます。",
    housingGuideToggle: "住まいは大学の寮だけじゃない",
    housingGuideIntro: "寮の抽選に落ちた、あるいはまだ住まいが決まっていない——そんなときにまず検討する価値があるのが「外国人向けマンスリー・シェアハウス」です。代表的なところでSakura House、Oakhouseなどがあり、共通して次のような特徴があります。",
    housingGuideFeatures: [
      "保証人・保証会社が不要",
      "敷金・礼金・仲介手数料がかからない",
      "家具・家電・Wi-Fi・光熱費が家賃に込み（電力会社やガス会社に自分で連絡する必要がない）",
      "来日前にオンラインで契約・予約が完結する",
      "多言語対応のスタッフがいる",
    ],
    housingGuideLinks: [
      { name: "Sakura House", url: "https://www.sakura-house.com/jp/" },
      { name: "Oakhouse", url: "https://www.oakhouse.jp/" },
    ],
    housingGuideMiddle: "つまり、通常の賃貸で発生する「保証人探し」「初期費用の準備」「電気・ガス・水道の個別契約」を、まとめて省ける選択肢です。慣れない土地で一つずつ手続きするのが不安なら、最初の数ヶ月だけこうしたサービスを使い、生活に慣れてから通常の賃貸に移る、という進め方もできます。",
    housingGuideCostNote: "ただし月額はやや割高になりがちなので、1年以上の長期滞在で費用を抑えたい場合は、大学の国際担当窓口に相談しながら通常の賃貸も検討するとよいでしょう。",
    nextActionLabel: "次にやること",
    nextBadge: "→ 次にやる",
    incompleteHint: "上記の質問にすべて回答すると次に進めます。",
    reportGeneral: "窓口で言われたことが違った、リンクが開けなかったなどの場合は教えてください",
    housingOk: "住まい ✓",
    housingWarn: "住まい ⚠",
    workPermitBadge: "資格外活動許可",
    progressSaved: "進捗はこの端末に自動保存されます",
    allDoneTitle: "日本での準備が全部終わりました！",
    allDoneBody: "すべてのタスクが完了しました。日本での生活を楽しんでください。",
    oneVisitSuffix: " — 1回の来庁でまとめて済ませると手間が減ります",
    needsAddress: "本住居の確定が必要",
    levelRequired: "必須",
    levelRecommended: "推奨",
    deadlineWithin: (days) => ` · 住み始めてから${days}日以内`,
    completeFirst: "先に完了させるもの",
    officialSource: "公式の情報",
    verifiedLabel: (v) => `· ${v} 確認`,
    whatThisMeans: "この文の意味",
    pointScreen: "この画面を職員に見せてください",
    airportHighlight: "空港で済ませれば、別途出向く必要がなくなります",
    disclaimer: "行政手続きや必要な書類は変更されることがあります。行動する前に、大学の国際担当部署または担当の行政機関で必ず確認してください。",
    footerNote: "J-Onboard · 個人情報をサーバーに保存しません",
  },
};

// 依存の強さ: REQUIRED=物理的・法的に必須 / STRONGLY_ADVISED=事業者運用依存・例外あり / TIP=アドバイス
// level: required=義務（法的に必須 or 飛ばすと先に進めない） / recommended=推奨（任意だがやらないと損）
// deadline.days: 住み始めた日からの法定期限（日数）。バッジに「within N days of moving in」と出す。起点が住み始めた日でない期限には付けない

export const buildPhases = (profile, lang) => {
  const t = T[lang];
  const isStudent = profile.role === "student";
  const wantsWork = profile.work;

  // 文言は { en, ja } を隣の行に置いて持ち、表示用にここで片方を選ぶ。
  // 期限・金額・条件を更新するとき、片方だけ直すと diff に英語と日本語が並んで出るので食い違いに気づける
  const L = (v) => (v == null || typeof v === "string" ? v : v[lang]);
  // 窓口シートは言語トグルに関わらず日本語と英語の両方を出すので、タイトルは2言語とも残す
  const title = (v) => ({ title: L(v), titleEn: v.en, titleJa: v.ja });
  // 持ち物は文字列か { text, onSite }。onSite は窓口で受け取るもので、家から持っていくものではない。
  // bringItems が " — " で区切って重複をまとめるので、日本語でも同じ区切りを使う
  const items = (arr) => arr.map(it => (it && it.onSite ? { text: L(it.text), onSite: true } : L(it)));
  const sources = (arr) => arr.map(s => ({ ...s, label: L(s.label) }));

  return [
    {
      id: "p1", label: t.phase1, color: "indigo",
      icon: <Plane size={15} />,
      tasks: [
        {
          // 届くのを待つだけの唯一のタスク。行く場所も持ち物も窓口もないのでそれらの項目は持たない
          id: "coe",
          ...title({
            en: "Receive your Certificate of Eligibility (在留資格認定証明書) from your Host Institution in Japan",
            ja: "在留資格認定証明書を受け入れ機関から受け取る",
          }),
          keyPoint: L({
            en: "It may arrive as a PDF by email or as a paper original by post, so watch both. Make sure your name, nationality, and status of residence are correct. If it hasn't arrived 2–3 months before departure, contact your host institution's international office.",
            ja: "メールでPDFが届く場合と、紙の原本が郵送される場合があるので、どちらも確認する。氏名・国籍・在留資格が正しいか確かめる。出発の2〜3ヶ月前になっても届かない場合は、受け入れ機関の国際担当部署に連絡する。",
          }),
          why: L({
            en: "The Certificate of Eligibility is issued by the Immigration Services Agency on behalf of your host institution in Japan — you don't apply for it yourself. Without it, you cannot apply for a visa.",
            ja: "在留資格認定証明書は、日本の受け入れ機関が代理で申請し、出入国在留管理庁が交付する書類で、本人が申請するものではない。これがないとビザの申請ができない。",
          }),
          level: "required",
          deps: [],
        },
        {
          // 書類・写真・手数料・所要日数は国ごとに違うので書かない。持ち物はどこでも共通の2点だけにする。
          // 申請先は自国の日本大使館で、手続きの中身は国ごとに違うため、載せる価値のある公式ソースがない
          id: "visa",
          ...title({
            en: "Apply for your Student / Researcher Visa at the Embassy",
            ja: "大使館・領事館でビザを申請する",
          }),
          location: L({
            en: "Japanese Embassy, Consulate, or Visa Application Center (e.g. VFS Global) in your country",
            ja: "自国の日本大使館・総領事館、またはビザ申請センター（VFS Globalなど）",
          }),
          required: items([
            { en: "Certificate of Eligibility — original", ja: "在留資格認定証明書 — 原本" },
            { en: "Passport", ja: "パスポート" },
          ]),
          keyPoint: L({
            en: "The embassy handling your country sets its own document list, photo size, fee and processing time — check its website before you go, and apply early enough that the visa is in your passport before you fly.",
            ja: "必要書類・写真のサイズ・手数料・所要日数は、自国を担当する大使館ごとに違う。行く前にその大使館のウェブサイトで確認し、出発までにビザがパスポートに貼られるよう早めに申請する。",
          }),
          level: "required",
          deps: [{ taskId: "coe", type: "REQUIRED" }],
        },
        {
          id: "cash",
          ...title({
            en: "Prepare Your Card & Travel eSIM",
            ja: "カードと旅行用eSIMを用意する",
          }),
          required: items([
            { en: "International debit or credit card", ja: "国際対応のデビットカードまたはクレジットカード" },
            { en: "Travel eSIM or prepaid physical SIM", ja: "旅行用eSIM、またはプリペイドの物理SIM" },
          ]),
          keyPoint: L({
            en: "Seven Bank and Japan Post Bank ATMs let you withdraw yen with a card issued outside Japan. Buy and install your eSIM before you leave home.",
            ja: "セブン銀行とゆうちょ銀行のATMでは、海外で発行されたカードで円を引き出せる。eSIMは出発前に購入してインストールしておく。",
          }),
          level: "recommended",
          deps: [],
          source: sources([
            { url: "https://www.sevenbank.co.jp/intlcard/card.html", label: { en: "Overseas-issued cards at Seven Bank ATMs", ja: "セブン銀行ATMで使える海外発行カード" }, verified: "2026-09" },
            { url: "https://www.jp-bank.japanpost.jp/en/ias/en_ias_index.html", label: { en: "Japan Post Bank ATMs: locations, brands and fees", ja: "ゆうちょ銀行ATMの設置場所・対応ブランド・手数料" }, verified: "2026-09" },
          ]),
        },
      ],
    },
    {
      id: "p2", label: t.phase2, color: "sky", oneVisit: true,
      icon: <MapPin size={15} />,
      tasks: [
        {
          id: "rezcard",
          ...title({
            en: "Receive Residence Card (在留カード)",
            ja: "在留カードを受け取る",
          }),
          location: L({
            en: "Immigration counter at your arrival airport — issued automatically during immigration inspection. No application needed.",
            ja: "到着空港の入国審査カウンター — 入国審査の中で自動的に交付される。申請は不要。",
          }),
          required: items([
            { en: "Passport — with your visa", ja: "パスポート — ビザが貼られたもの" },
            { en: "Certificate of Eligibility — original", ja: "在留資格認定証明書 — 原本" },
          ]),
          keyPoint: L({
            en: "Only 10 major airports hand the card over on the spot. Elsewhere it is mailed to your registered address after your moving-in notification.",
            ja: "その場で在留カードが交付されるのは主要10空港だけ。それ以外の空港では、転入届の提出後に住民登録した住所へ郵送される。",
          }),
          why: L({
            en: "The Residence Card is issued automatically during immigration — you don't apply for it. At 10 major airports (Narita, Haneda, Kansai, Chubu, Kobe, Chitose, Sendai, Hiroshima, Fukuoka, Naha) it is handed to you on the spot. At other airports, your passport gets a 'Residence Card to be issued later' stamp and the card is mailed to your registered address after you complete your moving-in notification. Until it arrives, your stamped passport serves as a substitute.",
            ja: "在留カードは入国審査の中で自動的に交付されるもので、本人が申請するものではない。主要10空港（成田・羽田・関西・中部・神戸・新千歳・仙台・広島・福岡・那覇）ではその場で手渡される。それ以外の空港では、パスポートに「在留カード後日交付」の記載がされ、転入届を済ませたあとに住民登録した住所へ郵送される。届くまでは、その記載のあるパスポートが在留カードの代わりになる。",
          }),
          level: "required",
          deps: [],
          source: { url: "https://www.moj.go.jp/isa/publications/faq/newimmiact_4_port-city.html", verified: "2026-09" },
        },
        ...(wantsWork && isStudent ? [{
          id: "workpermit",
          ...title({
            en: "Apply for Work Permit (資格外活動許可)",
            ja: "資格外活動許可を申請する",
          }),
          location: L({
            en: "Immigration counter at your arrival airport — same counter as your Residence Card.",
            ja: "到着空港の入国審査カウンター — 在留カードと同じ窓口。",
          }),
          required: items([
            { en: "Passport", ja: "パスポート" },
            { en: "Certificate of Eligibility", ja: "在留資格認定証明書" },
            { text: { en: "Residence Card — received at the same counter simultaneously", ja: "在留カード — 同じ窓口で同時に受け取る" }, onSite: true },
          ]),
          keyPoint: L({
            en: "The airport counter cannot accept this if your period of stay is 3 months. Once granted, you may work up to 28 hours a week — 8 hours a day during your school's long holidays.",
            ja: "在留期間が3ヶ月の場合、空港の窓口では受け付けられない。許可されると週28時間まで、学校の長期休業期間中は1日8時間まで働ける。",
          }),
          why: L({
            en: "You cannot do any paid work without this permit. The airport counter accepts the application from new arrivals granted the Student status of residence, unless your period of stay is 3 months — so apply here and the stamp goes on your Residence Card on the spot, saving a separate trip to a regional immigration bureau later (typically a half-day errand).",
            ja: "この許可がないと、有償の活動は一切できない。空港の窓口は、「留学」の在留資格で新規に入国した人からの申請を受け付けている（在留期間が3ヶ月の場合は除く）。ここで申請すればその場で在留カードに許可の記載がされ、あとで地方出入国在留管理局へ出向く手間（半日仕事になることが多い）を省ける。",
          }),
          counter: "資格外活動許可の申請をしたいです。",
          counterTranslation: "I would like to apply for a Work Permit.",
          highlight: L({ en: "Same counter as Residence Card", ja: "在留カードと同じ窓口" }),
          level: "required",
          deps: [],
          source: sources([
            { url: "https://www.moj.go.jp/isa/publications/faq/newimmiact_4_port-city.html", label: { en: "Who can apply at the airport", ja: "空港で申請できる人" }, verified: "2026-09" },
            { url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html", label: { en: "How many hours students may work", ja: "留学生が働ける時間" }, verified: "2026-09" },
          ]),
        }] : []),
      ],
    },
    {
      id: "p3", label: t.phase3, color: "emerald", oneVisit: true, counterSheet: true,
      icon: <Building2 size={15} />,
      lockedIfTemp: true,
      tasks: [
        {
          id: "juminhyo",
          ...title({
            en: "Moving-in Notification (転入届)",
            ja: "転入届を提出する",
          }),
          location: L({
            en: "City Hall — Residents Affairs Division / resident registration window",
            ja: "市区町村の役所 — 住民課・住民登録の窓口",
          }),
          required: items([
            { en: "Passport", ja: "パスポート" },
            { en: "Residence Card — if you have it", ja: "在留カード — 交付されている場合" },
          ]),
          keyPoint: L({
            en: "This is when your address is printed on the back of your Residence Card — you need that for a SIM contract and a bank account.",
            ja: "このとき在留カードの裏面に住所が印字される。SIMの契約や銀行口座の開設にはこれが必要になる。",
          }),
          why: L({
            en: "The moving-in notification is a legal obligation within 14 days of moving in. It is also when your address is printed on the back of your Residence Card, which is what later proves your address for a SIM contract and a bank account.",
            ja: "転入届は、住み始めてから14日以内に提出する法律上の義務。このとき在留カードの裏面に住所が印字され、それが後のSIMの契約や銀行口座の開設で住所の証明になる。",
          }),
          counter: "転入届を提出したいです。",
          counterTranslation: "I would like to submit my moving-in notification.",
          level: "required",
          deadline: { days: 14 },
          // 後日交付の空港から入国した人は、この届出をしてから在留カードが郵送される。
          // rezcard を先に求めると、14日の期限を持つこの届出を待たせることになるので依存は張らない
          deps: [],
          source: { url: "https://www.soumu.go.jp/main_sosiki/jichi_gyousei/c-gyousei/zairyu/move-in_move-out.html", verified: "2026-09" },
        },
        {
          id: "health",
          ...title({
            en: "National Health Insurance (国民健康保険)",
            ja: "国民健康保険に加入する",
          }),
          location: L({
            en: "Same City Hall visit — National Health Insurance window",
            ja: "同じ役所の来庁時に — 国民健康保険の窓口",
          }),
          required: items([
            { en: "Residence Card", ja: "在留カード" },
            { en: "Passport", ja: "パスポート" },
          ]),
          keyPoint: L({
            en: "Enroll within 14 days — cities count the days differently, so go on the same visit as your moving-in notification. If you had no income in Japan last year, ask for the low-income reduction: it is not applied automatically.",
            ja: "加入は14日以内。起算日は市区町村によって違うので、転入届と同じ来庁時に済ませる。前年の日本での所得がなかった場合は、低所得世帯向けの保険料軽減を申し出る。自動では適用されない。",
          }),
          why: L({
            en: "National Health Insurance covers 70% of medical costs, and everyone registered as a resident pays premiums. Being a student does not reduce them by itself — the Student Payment Exception that exists for National Pension has no equivalent here. What can reduce them is the reduction for low-income households, which students arriving with no income in Japan often qualify for. You have to claim it: cities ask you to declare last year's income, and a household that declares nothing is left out of the reduction. Each city sets its own premiums, and its own income limit if you work part-time, so ask at the window what applies to you. If you stay into another fiscal year, expect to declare again — some cities ask students to repeat it every year.",
            ja: "国民健康保険は医療費の7割をカバーし、住民登録をしている人は全員が保険料を負担する。学生であること自体では保険料は下がらない——国民年金にある学生納付特例に相当する制度は、国民健康保険にはない。保険料を下げられるのは低所得世帯向けの軽減で、日本での所得がない状態で来日した学生はこれに該当することが多い。ただし自分で申し出る必要がある。市区町村は前年の所得の申告を求めており、何も申告しない世帯は軽減の対象から外れる。保険料の額も、アルバイトをする場合の所得の上限も市区町村ごとに違うので、自分の場合どうなるかは窓口で確認する。年度をまたいで滞在する場合は、もう一度申告することになる。学生には毎年の申告を求める市区町村もある。",
          }),
          counter: "国民健康保険に加入したいです。前年の日本での所得はゼロです。保険料の軽減に必要な手続きがあれば、あわせてお願いします。",
          counterTranslation: "I would like to enroll in National Health Insurance. My income in Japan last year was zero. If anything is needed for a premium reduction, please handle that too.",
          level: "required",
          deps: [{ taskId: "juminhyo", type: "REQUIRED" }],
          source: sources([
            { url: "https://www.mhlw.go.jp/stf/newpage_21539.html", label: { en: "Who must enrol, and the 14-day deadline", ja: "加入が必要な人と14日の期限" }, verified: "2026-09" },
            { url: "https://www.mhlw.go.jp/stf/newpage_21517.html", label: { en: "How premiums are set", ja: "保険料の決まり方" }, verified: "2026-09" },
            { url: "https://www.city.shinjuku.lg.jp/kenkou/hoken01_000001_00025.html", label: { en: "Reduction for students with no income (Shinjuku example)", ja: "所得がない学生の保険料軽減（新宿区の例）" }, verified: "2026-09" },
          ]),
        },
        {
          id: "pension",
          ...title(isStudent
            ? { en: "Join National Pension (国民年金)", ja: "国民年金に加入する" }
            : { en: "Confirm Whether You Need to Join National Pension (国民年金)", ja: "国民年金への加入が必要か確認する" }),
          location: L({
            en: "City Hall — pension window",
            ja: "市区町村の役所 — 年金の窓口",
          }),
          required: items([
            { en: "Residence Card", ja: "在留カード" },
            { en: "Passport", ja: "パスポート" },
          ]),
          keyPoint: L(isStudent
            ? {
                en: "¥17,920 a month (FY2026). If you'll apply for the Student Payment Exception, don't pay yet — payments aren't refunded.",
                ja: "月額17,920円（2026年度）。学生納付特例を申請する予定なら、まだ納付しない。納めた分は返らない。",
              }
            : {
                en: "Whether you need to join depends on your employment situation — ask at the pension window.",
                ja: "加入が必要かどうかは就労の状況によって変わる。年金の窓口で確認する。",
              }),
          why: L(isStudent
            ? {
                en: "If you're 20 or older and registered as a resident, joining National Pension is mandatory regardless of nationality — handle it on the same City Hall visit as your moving-in notification. A payment slip for ¥17,920 a month (FY2026) arrives about two weeks later. If you'll apply for the Student Payment Exception once classes start, hold off on paying: months you've already paid aren't refunded, and the slip stays usable for two years if you end up needing it.",
                ja: "20歳以上で住民登録をしている人は、国籍を問わず国民年金への加入が義務。転入届と同じ役所の来庁時に済ませる。2週間ほどで月額17,920円（2026年度）の納付書が届く。授業が始まってから学生納付特例を申請する予定なら、納付は待つ。すでに納めた月分は返らず、納付書は必要になった場合でも2年間使える。",
              }
            : {
                en: "Not everyone living in Japan pays into National Pension — people covered by Employees' Pension through their job don't — and which applies to you depends on your employment situation. Ask at the pension window. If you do need to join, a payment slip for ¥17,920 a month (FY2026) arrives about two weeks after you enroll, so ask at the same time whether you can apply for a premium exemption.",
                ja: "日本に住む人全員が国民年金を納めるわけではない——勤務先を通じて厚生年金に加入している人は対象外——どちらに当たるかは就労の状況によって決まる。年金の窓口で確認する。加入が必要な場合は、手続きから2週間ほどで月額17,920円（2026年度）の納付書が届くので、保険料の免除を申請できるかどうかも同時に聞いておく。",
              }),
          counter: isStudent
            ? "国民年金の加入手続きをしたいです。留学生なので、授業が始まったら学生納付特例を申請する予定です。"
            : "国民年金に加入する必要があるか確認したいです。必要な場合は加入の手続きと、申請できるなら保険料の免除もお願いします。",
          counterTranslation: isStudent
            ? "I would like to enroll in National Pension. I'm an international student, and I plan to apply for the Student Payment Exception once my classes start."
            : "I would like to check whether I need to join National Pension. If I do, please enroll me — and if I can apply for a premium exemption, please process that too.",
          level: isStudent ? "required" : "recommended",
          source: { url: "https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-04.html", verified: "2026-09" },
          deps: [{ taskId: "juminhyo", type: "REQUIRED" }],
        },
        {
          id: "mynumber",
          ...title({
            en: "My Number Card Application (マイナンバーカード)",
            ja: "マイナンバーカードを申請する",
          }),
          location: L({
            en: "City Hall — My Number window",
            ja: "市区町村の役所 — マイナンバーの窓口",
          }),
          required: items([
            { en: "Residence Card", ja: "在留カード" },
            { en: "Passport", ja: "パスポート" },
          ]),
          keyPoint: L({
            en: "Apply within 30 days of registering your address — don't wait for the notification letter, it isn't needed for this route.",
            ja: "住民登録から30日以内に申請する。個人番号通知書が届くのを待つ必要はなく、この方法では使わない。",
          }),
          why: L({
            en: "The My Number Card is increasingly required for online tax filing, digital health insurance, and government services. Moving in from overseas qualifies you for expedited issuance: you apply at the City Hall window, staff hand you the forms there, and the card arrives at your address by registered post in about a week. You must apply within 30 days of registering your address — so don't wait for the individual number notification letter that comes 2–3 weeks later. That letter isn't needed for this route, and it can't be used as ID or as proof of your My Number.",
            ja: "マイナンバーカードは、オンラインでの確定申告、健康保険証としての利用、各種の行政サービスで必要になる場面が増えている。海外からの転入は特急発行の対象で、役所の窓口で申請すると、その場で職員が申請書を用意し、1週間ほどで簡易書留で住所に届く。申請は住民登録から30日以内に行う必要があるため、2〜3週間後に届く個人番号通知書は待たない。この通知書はこの方法では不要で、本人確認書類やマイナンバーの証明としては使えない。",
          }),
          counter: "マイナンバーカードを申請したいです。海外からの転入なので、特急発行でお願いします。",
          counterTranslation: "I would like to apply for a My Number Card. I moved in from overseas, so I would like expedited issuance.",
          level: "recommended",
          deps: [{ taskId: "juminhyo", type: "REQUIRED" }],
          source: { url: "https://www.kojinbango-card.go.jp/apprec/apply/express_apply/", verified: "2026-09" },
        },
      ],
    },
    {
      id: "p4", label: t.phase4, color: "violet",
      icon: <Shield size={15} />,
      tasks: [
        ...(wantsWork && !isStudent ? [{
          id: "workpermitoffice",
          ...title({
            en: "Apply for Work Permit (資格外活動許可)",
            ja: "資格外活動許可を申請する",
          }),
          location: L({
            en: "Regional immigration bureau covering the area where you live",
            ja: "住居地を管轄する地方出入国在留管理局",
          }),
          required: items([
            { en: "Application form — printed and filled in", ja: "申請書 — 印刷して記入したもの" },
            { en: "A document showing what work you will be doing", ja: "活動の内容を明らかにする資料" },
            { en: "Residence Card", ja: "在留カード" },
            { en: "Passport", ja: "パスポート" },
          ]),
          keyPoint: L({
            en: "Processing takes 2 weeks to 2 months, so apply well before you plan to start working. There is no fee.",
            ja: "審査には2週間〜2ヶ月かかるので、働き始める予定より十分前に申請する。手数料はかからない。",
          }),
          why: L({
            en: "You cannot do any paid work without this permit. The airport counter only accepts these applications from new arrivals granted the Student status of residence, so you apply at the regional immigration bureau for your address instead. There is no fee. Processing takes 2 weeks to 2 months, so apply well before you plan to start working.",
            ja: "この許可がないと、有償の活動は一切できない。空港の窓口は「留学」の在留資格で新規に入国した人の申請しか受け付けないため、住居地を管轄する地方出入国在留管理局で申請する。手数料はかからない。審査には2週間〜2ヶ月かかるので、働き始める予定より十分前に申請する。",
          }),
          counter: "資格外活動許可の申請に来ました。",
          counterTranslation: "I am here to apply for a Work Permit.",
          level: "required",
          deps: [{ taskId: "rezcard", type: "REQUIRED" }],
          source: sources([
            { url: "https://www.moj.go.jp/isa/content/930004124.pdf", label: { en: "Application form — English/Japanese (PDF)", ja: "申請書 — 日本語・英語併記（PDF）" }, verified: "2026-09" },
            { url: "https://www.moj.go.jp/isa/applications/procedures/16-8.html", label: { en: "Processing time and fee", ja: "標準処理期間と手数料" }, verified: "2026-09" },
          ]),
        }] : []),
        {
          id: "sim",
          ...title({
            en: "Voice/SMS SIM Contract (格安SIM)",
            ja: "音声・SMS対応のSIMを契約する",
          }),
          location: L({
            en: "Mobal, Sakura Mobile, or Rakuten Mobile — apply online",
            ja: "Mobal、Sakura Mobile、楽天モバイル — オンラインで申し込む",
          }),
          required: items([
            { en: "Residence Card — with address on back", ja: "在留カード — 裏面に住所が記載されたもの" },
            { en: "Passport", ja: "パスポート" },
            { en: "Credit or debit card", ja: "クレジットカードまたはデビットカード" },
          ]),
          keyPoint: L({
            en: "Your address has to be printed on the back of your Residence Card, which happens when you file your moving-in notification.",
            ja: "在留カードの裏面に住所が印字されている必要がある。これは転入届を出したときに記載される。",
          }),
          why: L({
            en: "Signing a SIM contract requires identity verification that includes your address, and the back of your Residence Card is what shows it — so file your moving-in notification first. All three of these providers let you apply in English. Mobal and Sakura Mobile state that they accept cards issued outside Japan and that no Japanese bank account is needed, which matters because you can't open one until you have a phone number. Rakuten Mobile is cheaper, but it doesn't state whether cards issued outside Japan are accepted.",
            ja: "SIMの契約には住所を含む本人確認が必要で、それを示すのが在留カードの裏面。先に転入届を出す。ここに挙げた3社はいずれも英語で申し込める。MobalとSakura Mobileは、海外で発行されたカードが使えること、日本の銀行口座が不要であることを明記している。銀行口座は電話番号がないと開けないので、この点が効いてくる。楽天モバイルは料金が安いが、海外発行のカードが使えるかは明記されていない。",
          }),
          counter: "SIMの新規契約をしたいです。在留カードを持参しました。",
          counterTranslation: "I would like to sign up for a new SIM contract. I have my Residence Card with me.",
          level: "recommended",
          deps: [{ taskId: "juminhyo", type: "REQUIRED" }],
          source: sources([
            { url: "https://www.mobal.com/japan-sim-card/", label: { en: "Mobal — documents and payment methods", ja: "Mobal — 必要書類と支払い方法" }, verified: "2026-09" },
            { url: "https://www.sakuramobile.jp/monthly/voice/", label: { en: "Sakura Mobile — voice SIM plans", ja: "Sakura Mobile — 音声SIMのプラン" }, verified: "2026-09" },
            { url: "https://network.mobile.rakuten.co.jp/en/guide/verify/", label: { en: "Rakuten Mobile — identity verification documents", ja: "楽天モバイル — 本人確認書類" }, verified: "2026-09" },
          ]),
        },
        {
          id: "bank",
          ...title({
            en: "Bank Account — Japan Post Bank (ゆうちょ銀行)",
            ja: "ゆうちょ銀行で口座を開設する",
          }),
          location: L({
            en: "Post Office or Japan Post Bank branch",
            ja: "郵便局、またはゆうちょ銀行の店舗",
          }),
          required: items([
            { en: "Residence Card", ja: "在留カード" },
            ...(isStudent ? [{ en: "Student ID — or a Certificate of Enrollment", ja: "学生証 — または在学証明書" }] : []),
            { en: "Japanese phone number", ja: "日本の電話番号" },
            { en: "Passport", ja: "パスポート" },
          ]),
          keyPoint: L(isStudent
            ? {
                en: "Bring your Student ID as well — Japan Post Bank asks for it from holders of the Student status of residence.",
                ja: "学生証もあわせて持っていく。ゆうちょ銀行は在留資格「留学」の人に提示を求めている。",
              }
            : {
                en: "You need a Japanese phone number, so get your SIM before opening the account.",
                ja: "日本の電話番号が必要なので、口座開設より先にSIMを契約する。",
              }),
          why: L({
            en: "Japan Post Bank is the most foreigner-friendly. You need a Japanese phone number to complete the application, so get your SIM first. If your status of residence is Student, Japan Post Bank also asks to see your Student ID; if your university hasn't issued you one, the bank has its own enrollment certificate form you can use instead.",
            ja: "ゆうちょ銀行は外国人にとって最も開設しやすい。申込みの完了には日本の電話番号が必要なので、先にSIMを契約しておく。在留資格が「留学」の場合は、あわせて学生証の提示を求められる。大学から学生証が発行されていない場合は、ゆうちょ銀行が用意している在籍・在学証明書のフォーマットを使うこともできる。",
          }),
          counter: isStudent
            ? "ゆうちょ銀行の口座を開設したいです。在留カードと学生証を持参しました。"
            : "ゆうちょ銀行の口座を開設したいです。在留カードを持参しました。",
          counterTranslation: isStudent
            ? "I would like to open a Japan Post Bank account. I have my Residence Card and Student ID with me."
            : "I would like to open a Japan Post Bank account. I have my Residence Card with me.",
          level: "recommended",
          source: { url: "https://www.jp-bank.japanpost.jp/kaisetu/kat_gaikokujin.html", verified: "2026-09" },
          deps: [
            { taskId: "juminhyo", type: "REQUIRED" },
            { taskId: "sim", type: "STRONGLY_ADVISED", note: "Japanese phone number needed for application" },
          ],
        },
        ...(isStudent ? [{
          id: "university",
          ...title({
            en: "Get a Student ID (学生証) or Certificate of Enrollment (在学証明書)",
            ja: "学生証または在学証明書を受け取る",
          }),
          location: L({
            en: "International Office at your university",
            ja: "大学の国際担当部署",
          }),
          required: items([
            { en: "Whatever your university asks you to bring", ja: "大学から持参を指示されたもの" },
          ]),
          keyPoint: L({
            en: "If your university doesn't issue a Student ID, ask for a Certificate of Enrollment instead — either is accepted.",
            ja: "学生証が発行されない場合は、在学証明書を依頼する。どちらでも受け付けられる。",
          }),
          why: L({
            en: "You'll need one of these to apply for the pension Student Payment Exception — either one is accepted. Not every university issues a Student ID to exchange students, so if yours doesn't, ask for a Certificate of Enrollment instead.",
            ja: "年金の学生納付特例を申請するときに、このどちらかが必要になる——どちらでも受け付けられる。交換留学生に学生証を発行しない大学もあるので、発行されない場合は在学証明書を依頼する。",
          }),
          counter: "学生証を発行していただきたいです。発行されない場合は、在学証明書をお願いします。",
          counterTranslation: "I would like to be issued a Student ID. If that isn't possible, please issue me a Certificate of Enrollment.",
          level: "recommended",
          deps: [],
          source: { url: "https://www.nenkin.go.jp/service/kokunen/menjo/20150514.html", verified: "2026-09" },
        }, {
          id: "gakutoku",
          ...title({
            en: "Apply for the Student Payment Exception (学生納付特例)",
            ja: "学生納付特例を申請する",
          }),
          location: L({
            en: "International Office at your university, or City Hall — pension window",
            ja: "大学の国際担当部署、または市区町村の役所 — 年金の窓口",
          }),
          required: items([
            { en: "Student ID or Certificate of Enrollment from your university", ja: "大学が発行した学生証または在学証明書" },
            { en: "My Number Card — or your Basic Pension Number notification letter", ja: "マイナンバーカード — または基礎年金番号通知書" },
          ]),
          keyPoint: L({
            en: "Apply as soon as your classes start — an accident or illness before your application date may not qualify for the disability pension.",
            ja: "授業が始まったらすぐ申請する。申請日より前に起きた事故や病気は、障害年金の対象にならないことがある。",
          }),
          why: L({
            en: "With the Student Payment Exception, you pay no National Pension premiums and those months aren't recorded as unpaid — it's open to students whose income last year was ¥1.28 million or less (higher with dependents). You can apply once your classes have started. Ask your international office first: universities approved to handle this take the application on campus, check the form with you and stamp it themselves. If yours doesn't handle it, apply at the City Hall pension window. Don't put it off — an accident or illness before your application date may not qualify for the disability pension.",
            ja: "学生納付特例を使うと、国民年金の保険料を納めなくてよく、その期間が未納として記録されない。前年の所得が128万円以下（扶養親族がいる場合はそれ以上）の学生が対象で、授業が始まってから申請できる。まずは大学の国際担当部署に聞く。許認可を受けている大学なら、大学の窓口で申請を受け付け、記載を確認したうえで受付印を押してくれる。受け付けていない場合は、役所の年金の窓口で申請する。先延ばしにしない——申請日より前に起きた事故や病気は、障害年金の対象にならないことがある。",
          }),
          counter: "国民年金の学生納付特例の申請をしたいです。学生証（または在学証明書）を持参しました。",
          counterTranslation: "I would like to apply for the Student Payment Exception. I have my Student ID (or Certificate of Enrollment) with me.",
          level: "recommended",
          // 交換留学生は特別聴講学生・研究生として在籍することがあるが、その在籍区分が
          // 学生納付特例の対象になるかは日本年金機構の公開情報では確認できていない。
          // 在籍区分を自分で判断させないよう、まず大学の国際担当部署に聞く形にしている
          deps: [
            { taskId: "pension", type: "REQUIRED" },
            { taskId: "university", type: "REQUIRED" },
          ],
          source: { url: "https://www.nenkin.go.jp/service/pamphlet/kaigai/gakuseinouhutokurei.html", verified: "2026-09" },
        }] : []),
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

function AnsweredMark({ answered }) {
  if (!answered) return null;
  return <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />;
}

function CounterModal({ text, translation, onClose, t }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={t.showCounter}
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.showCounter}</span>
          <button onClick={onClose} aria-label={t.close} className="text-slate-300 hover:text-slate-500 transition-colors"><X size={18} /></button>
        </div>
        <div className="bg-slate-50 rounded-xl p-5 text-center">
          {/* lang="ja" がないと、中国語設定の端末などで漢字が中国語の字形で表示される */}
          <p lang="ja" className="text-xl leading-relaxed text-slate-800 font-medium">{text}</p>
        </div>
        {translation && (
          <div className="border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t.whatThisMeans}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{translation}</p>
          </div>
        )}
        <p className="text-xs text-center text-slate-400">{t.pointScreen}</p>
      </div>
    </div>
  );
}

// 「なぜ必要か」は開いたカードの高さの6割を占めるので、本文から出してモーダルに入れる
function WhyModal({ task, onClose, t }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={t.why}
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full max-h-[85vh] overflow-y-auto p-6 space-y-3.5" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.why}</span>
          <button onClick={onClose} aria-label={t.close} className="flex-shrink-0 text-slate-300 hover:text-slate-500 transition-colors"><X size={18} /></button>
        </div>
        <p className="text-sm font-semibold text-slate-800 leading-snug">{task.title}</p>
        <p className="text-sm text-slate-600 leading-relaxed">{task.why}</p>
      </div>
    </div>
  );
}

// タイトルの括弧内にある日本語の正式名称。窓口シートで手続き名として使う
export const japaneseName = (title) => {
  const inner = title.match(/\(([^)]+)\)/)?.[1];
  return inner && /[\u3040-\u30ff\u4e00-\u9faf]/.test(inner) ? inner : null;
};

// 1回の訪問で職員に見せるシート。既存の窓口フレーズを並べ替えるだけで、新しい記述は持たない
// 職員に見せるだけの画面なので、完了のチェックはここではつけない（ロードマップ側でつける）
function CounterSheet({ phase, checked, profile, onClose, t }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const todo = phase.tasks.filter(tk => !checked[tk.id]);
  const done = phase.tasks.filter(tk => checked[tk.id]);
  const isResearcher = profile.role === "researcher";
  const introJa = isResearcher
    ? "客員研究者です。日本語があまり話せません。"
    : "交換留学生です。日本語があまり話せません。";
  const introEn = isResearcher
    ? "I am a visiting researcher, and I don't speak much Japanese."
    : "I am an exchange student, and I don't speak much Japanese.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={t.counterSheetBtn}
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="sticky top-0 flex justify-end bg-white/95 backdrop-blur px-4 pt-3 pb-1">
        <button onClick={onClose} aria-label={t.close} className="text-slate-300 hover:text-slate-500 transition-colors"><X size={20} /></button>
      </div>

      {/* lang="ja" がないと、中国語設定の端末などで漢字が中国語の字形で表示される */}
      <div lang="ja" className="px-5 pb-6 space-y-5">
        <p className="text-xl font-medium text-slate-800 leading-relaxed">{introJa}</p>

        {todo.length > 0 && (
          <div>
            <p className="text-sm font-bold text-slate-500 mb-2">本日お願いしたい手続き</p>
            <ul className="space-y-3.5 list-disc pl-5 marker:text-slate-300">
              {todo.map(task => (
                <li key={task.id} className="text-lg text-slate-800 leading-relaxed">{task.counter}</li>
              ))}
            </ul>
          </div>
        )}

        {done.length > 0 && (
          <div>
            <p className="text-sm font-bold text-slate-500 mb-2">すでに済んだ手続き</p>
            <ul className="space-y-2">
              {done.map(task => (
                <li key={task.id} className="text-lg text-slate-500 leading-relaxed"><span aria-hidden="true">✓ </span><span>{japaneseName(task.titleEn) || task.titleJa}</span></li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-slate-400 pt-1">本人が記録したチェックリストです。</p>
      </div>

      <div className="border-t border-slate-200 px-5 py-5 space-y-4 bg-slate-50 rounded-b-2xl">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">What the staff are reading</p>
        <p className="text-sm text-slate-600 leading-relaxed">{introEn}</p>
        {todo.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-500 mb-1.5">Asking for today</p>
            <ul className="space-y-1.5">
              {todo.map(task => (
                <li key={task.id} className="text-sm text-slate-600 leading-relaxed">· {task.counterTranslation}</li>
              ))}
            </ul>
          </div>
        )}
        {done.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-500 mb-1.5">Already done</p>
            <ul className="space-y-1.5">
              {done.map(task => (
                <li key={task.id} className="text-sm text-slate-500 leading-relaxed">✓ {task.titleEn}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

// 問題報告の Google フォーム。窓口での食い違い・リンク切れ・古い情報など、公式ページだけでは気づけないズレを利用者から受け取る唯一の経路
const FEEDBACK_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSccozx6wCgHnanNR7a3RdLgjR7i3Uc7W1OhOS8fgxER5GcnhQ/viewform";

// source は1件のオブジェクトでも、複数の配列でもよい
const taskSources = (task) =>
  !task.source ? [] : Array.isArray(task.source) ? task.source : [task.source];

// required の項目は文字列か { text, onSite }。onSite は窓口で受け取るもので、家から持っていくものではない
const itemText = (item) => (typeof item === "string" ? item : item.text);
const isOnSite = (item) => typeof item !== "string" && !!item.onSite;

// 1回の訪問で持っていくものを、未完了のタスクから重複を除いて集める
export const bringItems = (tasks, checkedIds) => {
  const groups = new Map();
  for (const task of tasks) {
    if (checkedIds[task.id]) continue;
    for (const item of task.required || []) {
      if (isOnSite(item)) continue;
      const text = itemText(item);
      // 「Passport」と「Passport — with your visa」は同じ持ち物なので、注記の長い方に寄せる
      const head = text.split(" — ")[0];
      const prev = groups.get(head);
      if (!prev || text.length > prev.length) groups.set(head, text);
    }
  }
  return [...groups.values()];
};

function BringList({ items, t }) {
  if (!items.length) return null;
  return (
    <div className="border border-slate-200 bg-slate-50 rounded-xl p-4 mb-3">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">{t.bringLabel}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// level のバッジ設定
const levelBadge = (task, t) => {
  const map = {
    required:    { cls: "text-red-700 bg-red-50 border-red-200",    label: t.levelRequired },
    recommended: { cls: "text-sky-700 bg-sky-50 border-sky-200",    label: t.levelRecommended },
  };
  const cfg = map[task.level];
  if (!cfg) return null;
  const days = task.deadline?.days ? t.deadlineWithin(task.deadline.days) : "";
  return <span className={`inline-flex items-center text-xs font-semibold border rounded-full px-2 py-0.5 ${cfg.cls}`}>{cfg.label}{days}</span>;
};

function TaskCard({ task, checked, onToggle, t, isLocked, checkedIds, allTasks, isNext }) {
  const [open, setOpen] = useState(isNext);
  const [modal, setModal] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const closeModal = useCallback(() => setModal(false), []);
  const closeWhy = useCallback(() => setWhyOpen(false), []);

  // 完了したら閉じる
  useEffect(() => { if (checked) setOpen(false); }, [checked]);
  // 次のアクションになったら自動的に開く。次が別のタスクに移っても、手で開いたカードは閉じない
  useEffect(() => { if (isNext && !checked) setOpen(true); }, [isNext, checked]);

  // REQUIRED依存が未完了のものを探す
  const unmetDeps = (task.deps || [])
    .filter(d => d.type === "REQUIRED" && !checkedIds[d.taskId])
    .map(d => allTasks.find(tk => tk.id === d.taskId)?.title)
    .filter(Boolean);

  return (
    <>
      {modal && <CounterModal text={task.counter} translation={task.counterTranslation} onClose={closeModal} t={t} />}
      {whyOpen && <WhyModal task={task} onClose={closeWhy} t={t} />}
      <div id={task.id} className={`rounded-xl border scroll-mt-20 transition-all duration-200 ${
        isNext ? "border-indigo-300 ring-2 ring-indigo-100 bg-indigo-50/30"
          : task.highlight ? "border-amber-300 bg-amber-50/40" : "border-slate-200 bg-white"
      } ${checked ? "opacity-60" : ""}`}>
        <div onClick={() => setOpen(o => !o)} className={`flex items-start gap-3 cursor-pointer ${checked ? "px-4 py-2.5" : "p-4"}`}>
          <button onClick={e => { e.stopPropagation(); if (!isLocked) onToggle(task.id); }}
            role="checkbox" aria-checked={checked} aria-disabled={isLocked} aria-label={task.title}
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
              <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                {/* 背景説明を持たないタスクでは情報アイコンを出さない（押しても空のダイアログが開くだけになる） */}
                {task.why && (
                  <button onClick={e => { e.stopPropagation(); setWhyOpen(true); }} aria-label={t.why}
                    className="w-6 h-6 rounded-full text-slate-400 hover:text-indigo-600 transition-colors flex items-center justify-center">
                    <Info size={16} />
                  </button>
                )}
                <button aria-expanded={open} aria-label={task.title} className="text-slate-300 hover:text-slate-500 transition-colors">
                  {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>
            {/* 完了したタスクはバッジを畳んで1行に近づける */}
            {!checked && (
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {isNext && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 rounded-full px-2 py-0.5">
                    {t.nextBadge}
                  </span>
                )}
                {levelBadge(task, t)}
                {task.highlight && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 border border-amber-300 rounded-full px-2 py-0.5">
                    ★ {typeof task.highlight === "string" ? task.highlight : t.airportHighlight}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          {/* 閉じている間は中のボタン・リンクにキーボードや読み上げで入れないようにする */}
          <div className="overflow-hidden" inert={!open}>
          <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-4">
            {/* 未完了の依存タスク警告 */}
            {unmetDeps.length > 0 && (
              <div className="flex gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5">
                <AlertTriangle size={15} className="flex-shrink-0 mt-0.5 text-red-500" />
                <div>
                  <p className="text-xs font-bold text-red-700 mb-1">{t.completeFirst}</p>
                  <ul className="space-y-0.5">
                    {unmetDeps.map((title, i) => (
                      <li key={i} className="text-xs text-red-700">→ {title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* 届くのを待つだけのタスクには行く場所も持ち物もない */}
            {task.location && (
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t.location}</p>
                <p className="text-sm text-slate-600">{task.location}</p>
              </div>
            )}
            {task.required?.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t.required}</p>
                <ul className="space-y-1.5">
                  {task.required.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                      {itemText(item)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* 期限・金額・順番は「?」の奥に隠さず、開けば必ず目に入る位置に置く */}
            {task.keyPoint && (
              <div className="flex gap-2.5 bg-slate-50 border border-slate-200 rounded-xl p-3">
                <Info size={15} className="flex-shrink-0 mt-0.5 text-slate-400" />
                <p className="text-sm text-slate-700 leading-relaxed">{task.keyPoint}</p>
              </div>
            )}
            <div className="space-y-2.5">
              {task.counter && (
                <button onClick={() => setModal(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg px-3 py-2 transition-colors">
                  <FileText size={13} /> {t.showCounter}
                </button>
              )}
              <div className="flex flex-col items-start gap-1">
                {taskSources(task).map((src, i) => (
                  <a key={i} href={src.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors">
                    {src.label || t.officialSource} ↗
                    {src.verified && (
                      <span className="text-slate-300 ml-1">{t.verifiedLabel(src.verified)}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
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
  const [profile, setProfile] = useState({ role: null, housing: null, work: false });
  const [checked, setChecked] = useState({});
  const [langOpen, setLangOpen] = useState(false);
  const [sheetPhase, setSheetPhase] = useState(null);
  const [housingGuideOpen, setHousingGuideOpen] = useState(false);
  const [shortStayOpen, setShortStayOpen] = useState(false);
  const t = T[lang];

  useEffect(() => {
    try {
      const s = localStorage.getItem("jonboard_checked"); if (s) setChecked(JSON.parse(s));
      const p = localStorage.getItem("jonboard_profile"); if (p) setProfile(JSON.parse(p));
      const st = localStorage.getItem("jonboard_step"); if (st === "roadmap") setStep("roadmap");
    } catch {}
  }, []);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const handleToggle = (id) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem("jonboard_checked", JSON.stringify(next)); } catch {}
    // 最後のタスクを完了したら、上部の完了メッセージが見えるように戻る（カードが閉じるのを見せてから）
    if (next[id] && allIds.every(tid => next[tid])) {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 500);
    }
  };

  const handleGenerate = () => {
    try {
      localStorage.setItem("jonboard_profile", JSON.stringify(profile));
      localStorage.setItem("jonboard_step", "roadmap");
    } catch {}
    setStep("roadmap");
    window.scrollTo(0, 0);
  };

  const closeSheet = useCallback(() => setSheetPhase(null), []);

  const goToForm = () => {
    try { localStorage.setItem("jonboard_step", "form"); } catch {}
    setStep("form");
  };

  const phases = buildPhases(profile, lang);
  const openSheet = phases.find(ph => ph.id === sheetPhase);
  const allIds = phases.flatMap(p => p.tasks.map(tk => tk.id));
  const doneCount = allIds.filter(id => checked[id]).length;
  const pct = allIds.length ? Math.round((doneCount / allIds.length) * 100) : 0;
  const isTemp = profile.housing === "temp";
  const isFormComplete = !!profile.housing;

  // 未完了・ロック解除済み・依存タスク完了済みの中で最初のタスク＝次にやるべきアクション
  const nextTask = phases
    .filter(p => !(p.lockedIfTemp && isTemp))
    .flatMap(p => p.tasks)
    .find(tk => {
      if (checked[tk.id]) return false;
      const unmetDeps = (tk.deps || []).filter(d => d.type === "REQUIRED" && !checked[d.taskId]);
      return unmetDeps.length === 0;
    });

  const badges = [
    profile.role === "student" ? t.roleStudent : t.roleResearcher,
    profile.housing === "confirmed" ? t.housingOk : t.housingWarn,
  ];

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {openSheet && (
        <CounterSheet phase={openSheet} checked={checked}
          profile={profile} onClose={closeSheet} t={t} />
      )}

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
              <p className="text-sm text-slate-500 mt-1">{t.reassuranceNote}</p>
              <div className="flex gap-2.5 bg-indigo-50 border border-indigo-200 rounded-xl p-3.5 mt-3 text-sm text-indigo-800">
                <Info size={15} className="flex-shrink-0 mt-0.5 text-indigo-400" />
                <div className="space-y-1.5">
                  <p>{t.appScopeNote}</p>
                  <button onClick={() => setShortStayOpen(o => !o)}
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                    {t.shortStayToggle}
                    {shortStayOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                  {shortStayOpen && <p className="text-xs text-indigo-700/80">{t.shortStayBody}</p>}
                </div>
              </div>

              <button onClick={() => setHousingGuideOpen(o => !o)}
                className="w-full flex items-center justify-between gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl px-4 py-3 mt-2.5 hover:border-indigo-300 transition-colors">
                <span className="flex items-center gap-2">
                  <Building2 size={15} className="text-indigo-400 flex-shrink-0" />
                  {t.housingGuideToggle}
                </span>
                {housingGuideOpen ? <ChevronUp size={16} className="flex-shrink-0" /> : <ChevronDown size={16} className="flex-shrink-0" />}
              </button>
              {housingGuideOpen && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 mt-2 text-sm text-slate-700 space-y-3 leading-relaxed">
                  <p>{t.housingGuideIntro}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.housingGuideLinks.map(l => (
                      <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 hover:bg-indigo-100 transition-colors">
                        {l.name} <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {t.housingGuideFeatures.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <p>{t.housingGuideMiddle}</p>
                  <p className="text-slate-500 text-xs">{t.housingGuideCostNote}</p>
                </div>
              )}
            </div>

            {isTemp && profile.role !== "other" && (
              <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <AlertTriangle size={15} className="flex-shrink-0 mt-0.5 text-amber-500" />
                <span>{t.tempHousingAlert}</span>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              {/* Role */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1">
                  {t.roleLabel} <AnsweredMark answered={!!profile.role} />
                </label>
                <p className="text-xs text-slate-400 mb-2.5">{t.roleHint}</p>
                <div className="flex gap-2.5 flex-wrap">
                  {[["student", t.roleStudent], ["researcher", t.roleResearcher], ["other", t.roleOther]].map(([v, label]) => (
                    <button key={v} onClick={() => setProfile(p => ({ ...p, role: v, work: false }))}
                      aria-pressed={profile.role === v}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${profile.role === v ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {profile.role === "other" && (
                <div className="flex gap-2.5 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-700">
                  <Info size={15} className="flex-shrink-0 mt-0.5 text-slate-400" />
                  <span>{t.otherRoleNote}</span>
                </div>
              )}

              {(profile.role === "student" || profile.role === "researcher") && (
              <>
              {/* Housing */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1">
                  {t.housingLabel} <AnsweredMark answered={!!profile.housing} />
                </label>
                <p className="text-xs text-slate-400 mb-2.5">{t.housingHint}</p>
                <div className="flex gap-2.5 flex-wrap">
                  {[["confirmed", t.housingConfirmed], ["temp", t.housingTemp]].map(([v, label]) => (
                    <button key={v} onClick={() => setProfile(p => ({ ...p, housing: v }))}
                      aria-pressed={profile.housing === v}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${profile.housing === v ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{profile.role === "student" ? t.workLabelStudent : t.workLabel}</label>
                <p className="text-xs text-slate-400 mb-2.5">{profile.role === "student" ? t.workHintStudent : t.workHint}</p>
                <button type="button" role="checkbox" aria-checked={profile.work}
                  onClick={() => setProfile(p => ({ ...p, work: !p.work }))}
                  className="flex items-start gap-3 cursor-pointer group text-left">
                  <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${profile.work ? "bg-indigo-600 border-indigo-600" : "border-slate-300 group-hover:border-indigo-400"}`}>
                    {profile.work && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <span className="text-sm text-slate-700 leading-snug">{profile.role === "student" ? t.workCheckStudent : t.workCheck}</span>
                </button>
              </div>

              <button onClick={handleGenerate} disabled={!isFormComplete}
                className={`w-full flex items-center justify-center gap-2 font-semibold text-sm rounded-xl px-6 py-3.5 transition-colors shadow-sm ${
                  isFormComplete ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer" : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                }`}>
                {t.generate} <ArrowRight size={16} />
              </button>
              <p className="text-xs text-center text-slate-400">
                {isFormComplete ? t.noAccount : t.incompleteHint}
              </p>
              </>
              )}
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
                    {profile.work && <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2.5 py-0.5">{t.workPermitBadge}</span>}
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
                    <p className="text-sm font-bold text-emerald-800">{t.allDoneTitle}</p>
                    <p className="text-xs text-emerald-600 mt-0.5">{t.allDoneBody}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" /> {t.progressSaved}
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

              return (
                <div key={phase.id}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-2.5 py-1 ${c.badge}`}>
                      {phase.icon} {phase.label}{phase.counterSheet && !locked && t.oneVisitSuffix}
                    </span>
                    {locked && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                        <Lock size={10} /> {t.needsAddress}
                      </span>
                    )}
                  </div>

                  {locked && (
                    <div className="flex gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-sm text-amber-700 mb-3">
                      <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                      <span>{t.lockedHousing}</span>
                    </div>
                  )}

                  {phase.oneVisit && !locked && (
                    <BringList items={bringItems(phase.tasks, checked)} t={t} />
                  )}

                  {/* 窓口シートは、複数の窓口を回る市役所だけに出す */}
                  {phase.counterSheet && !locked && (
                    <button onClick={() => setSheetPhase(phase.id)}
                      className="w-full flex items-center gap-2.5 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl px-4 py-3 mb-3 transition-colors">
                      <FileText size={15} className="flex-shrink-0" />
                      <span className="flex-1 text-left">{t.counterSheetBtn}</span>
                      <ArrowRight size={15} className="flex-shrink-0" />
                    </button>
                  )}

                  <div className="space-y-2.5">
                    {phase.tasks.map(task => (
                      <TaskCard key={task.id} task={task} checked={!!checked[task.id]}
                        onToggle={handleToggle} t={t} isLocked={locked}
                        checkedIds={checked} allTasks={phases.flatMap(p => p.tasks)}
                        isNext={task.id === nextTask?.id} />
                    ))}
                  </div>

                  {pi < phases.length - 1 && (
                    <div className="flex items-center gap-3 mt-5 mb-1">
                      <div className="flex-1 h-px bg-slate-200" />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.disclaimer}
              </p>
              <a href={FEEDBACK_FORM_URL} target="_blank" rel="noopener noreferrer"
                className="inline-block mt-2 text-xs text-slate-500 underline underline-offset-2 hover:text-indigo-600 transition-colors">
                {t.reportGeneral} ↗
              </a>
            </div>

            <p className="text-center text-xs text-slate-400 pb-4">
              {t.footerNote}
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
