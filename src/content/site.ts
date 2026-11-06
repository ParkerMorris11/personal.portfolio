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
  { label: "Extract", detail: "Grounded sections for human review" },
  { label: "Learn", detail: "Assessments and employee materials" },
  { label: "Review", detail: "Edit before anything is deployed" },
  { label: "Export", detail: "PDF and Flow Builder workbook" },
] as const;

export const toastedFlow = [
  { label: "Visit", detail: "Customer check-in at the shop" },
  { label: "Waiver", detail: "Digital agreement with an audit record" },
  { label: "Message", detail: "SMS and email with rate limits" },
  { label: "Alert", detail: "Failure notices and recovery paths" },
] as const;
