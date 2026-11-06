export const profile = {
  name: "Parker Morris",
  givenName: "Parker",
  location: "Provo, UT",
  school: "Brigham Young University",
  college: "Marriott School of Business",
  degree: "B.S. Information Systems",
  expected: "2028",
  year: "junior",
  email: "parkerqmorris@gmail.com",
  github: "https://github.com/ParkerMorris11",
  linkedin: "https://www.linkedin.com/in/parker-morris11/",
  statement:
    "I'm Parker, a BYU Information Systems student building software and AI tools for real business workflows.",
} as const;

export const links = {
  email: `mailto:${profile.email}`,
  github: profile.github,
  linkedin: profile.linkedin,
  aupToolkit: "https://github.com/ParkerMorris11/aup-mobilization-flow",
  aiDigest: "https://github.com/ParkerMorris11/ai-digest",
} as const;

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const roles = [
  {
    title: "AI Product Lead",
    organization: "Toasted Tanz",
    location: "Provo, UT",
    dates: "Aug 2026 — Present",
    detail:
      "Partner with the founder to turn customer and operational needs into shipped product. Current shipped work includes a digital waiver with an auditable agreement record, and SMS and email workflows with rate limits, failure alerts, and recovery paths.",
  },
  {
    title: "AI Adoption Intern",
    organization: "BrainStorm Inc.",
    location: "American Fork, UT",
    dates: "May 2026 — Aug 2026",
    detail:
      "Owned a Claude-powered policy learning application from requirements through an employee pilot and customer deployment. Worked with stakeholders on a reviewable workflow grounded in the source policy.",
  },
  {
    title: "IT Specialist",
    organization: "BYU J. Reuben Clark Law School",
    location: "Provo, UT",
    dates: "Aug 2025 — Present",
    detail:
      "Resolve PC/Mac, software, printer, and network issues, and supported PaperCut implementation troubleshooting.",
  },
] as const;

export const brainstormFlow = [
  { label: "Policy", detail: "Source AI acceptable-use policy" },
  { label: "Extract", detail: "Claude pulls grounded sections" },
  { label: "Learn", detail: "Assessments and employee PDF" },
  { label: "Review", detail: "A person edits before deploy" },
  { label: "Export", detail: "Flow Builder workbook → BSI" },
] as const;

export const toastedFlow = [
  { label: "Visit", detail: "Customer check-in at the shop" },
  { label: "Waiver", detail: "Digital agreement, audit record" },
  { label: "Message", detail: "SMS and email with rate limits" },
  { label: "Alert", detail: "Failure notices and recovery" },
] as const;

export const digestFlow = [
  { label: "Fetch", detail: "Four AI newsletters each weekday" },
  { label: "Normalize", detail: "Shared schema for every story" },
  { label: "Filter", detail: "Drop duplicates and low-signal items" },
  { label: "Rank", detail: "Claude scores relevance" },
  { label: "Send", detail: "One HTML briefing by email" },
] as const;

export const brainstormArchitecture = {
  id: "brainstorm-architecture",
  title: "Architecture",
  summary: "Policy in, reviewed learning assets out — what I walk through in interviews.",
  layers: [
    { name: "App", items: ["Next.js", "TypeScript"] },
    { name: "Model", items: ["Claude API", "Source grounding"] },
    { name: "Review", items: ["Section check", "Assessment edits"] },
    { name: "Export", items: ["Employee PDF", "Flow Builder workbook", "BSI platform"] },
  ],
  constraint:
    "Stay grounded in the source policy. Employee-facing content is edited by a person before anything is deployed.",
} as const;

export const toastedArchitecture = {
  id: "toasted-architecture",
  title: "Architecture",
  summary: "Check-in to message, with a record that can be audited.",
  layers: [
    { name: "App", items: ["React", "TypeScript"] },
    { name: "Data", items: ["Supabase", "PostgreSQL", "Waiver audit record"] },
    { name: "Messaging", items: ["Twilio SMS", "Resend email", "Rate limits"] },
    { name: "Ops", items: ["Failure alerts", "Recovery paths"] },
  ],
  constraint:
    "Messages cannot fail silently. Rate limits, alerts, and recovery are part of what is shipped today.",
} as const;

export const digestArchitecture = {
  id: "digest-architecture",
  title: "Architecture",
  summary: "Four overlapping newsletters into one briefing.",
  layers: [
    { name: "Runtime", items: ["Python", "macOS launchd"] },
    { name: "Model", items: ["Claude API", "Structured JSON"] },
    { name: "Delivery", items: ["Gmail SMTP", "HTML + plain text"] },
  ],
  constraint:
    "Stories are normalized first so ranking does not care which newsletter a story came from.",
} as const;
