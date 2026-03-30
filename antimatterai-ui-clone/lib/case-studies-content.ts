export interface CaseStudyData {
  slug: string
  number: string
  title: string
  tags: string[]
  headline: string
  challenge: string
  whatWeBuilt: string[]
  techStack: string[]
  results: string[]
  image: string
}

export const caseStudiesData: CaseStudyData[] = [
  {
    slug: "clinix-ai",
    number: "01",
    title: "Clinix AI",
    tags: ["Web Platform", "AI Agents", "Healthcare Automation"],
    headline: "Building the AI Brain for a Next-Generation Healthcare Platform",
    challenge: "Clinix AI needed to launch a fully custom healthcare management platform capable of handling patient intake, AI-driven diagnostics support, appointment automation, and real-time practitioner dashboards — all under strict compliance requirements and with sub-2-second load performance.",
    whatWeBuilt: [
      "Full-stack web platform on Next.js with server-side rendering for SEO and performance",
      "Custom AI agent pipeline for automated patient intake and symptom triage",
      "Practitioner dashboard with real-time data sync using WebSockets",
      "HIPAA-aligned data architecture with role-based access control",
      "Integration with third-party EHR systems via custom API layer"
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "OpenAI API", "AWS (EC2, RDS, S3)", "Stripe"],
    results: [
      "✦ 70% reduction in page load time vs. legacy system",
      "✦ 3x increase in patient onboarding completion rate",
      "✦ 12,000+ patient records migrated without data loss",
      "✦ Zero critical security incidents post-launch"
    ],
    image: "/case-studies/clinix-ai.svg"
  },
  {
    slug: "synergies4",
    number: "02",
    title: "Synergies4",
    tags: ["Mobile App", "Enterprise Software", "Cross-Platform"],
    headline: "A Cross-Platform Enterprise App That Unified Operations Across 5 Departments",
    challenge: "Synergies4, an enterprise consulting firm, needed a single mobile application that could connect field teams, management, clients, and reporting — replacing a fragmented stack of spreadsheets, emails, and legacy desktop software across five departments.",
    whatWeBuilt: [
      "Cross-platform mobile app (iOS + Android) built with Flutter",
      "Real-time project management module with task delegation and status tracking",
      "Custom reporting dashboard synced with backend analytics engine",
      "Offline-first architecture for field teams with unreliable connectivity",
      "Admin panel for enterprise administrators to manage users, permissions, and data"
    ],
    techStack: ["Flutter", "Dart", "Node.js", "PostgreSQL", "Firebase (Auth + Realtime DB)", "AWS S3"],
    results: [
      "✦ Replaced 4 separate legacy tools with a single unified platform",
      "✦ 60% reduction in internal reporting time",
      "✦ Adopted by 200+ enterprise users in the first 90 days",
      "✦ 4.8-star average rating in internal user testing"
    ],
    image: "/case-studies/synergies4.svg"
  },
  {
    slug: "curehire",
    number: "03",
    title: "Curehire",
    tags: ["Website", "Recruitment Workflow AI", "Automation"],
    headline: "Automating the Entire Recruitment Funnel with AI — From Job Post to Offer Letter",
    challenge: "Curehire, a healthcare recruitment platform, was spending enormous manual effort on candidate screening, interview scheduling, and follow-up communications. They needed both a high-converting marketing site and an AI-powered backend to automate 80% of their recruitment workflow.",
    whatWeBuilt: [
      "Marketing website on Next.js with conversion-optimized landing pages",
      "AI screening agent that auto-evaluates candidate resumes against job criteria",
      "Automated interview scheduling system with calendar integration",
      "Custom email/SMS workflow engine for candidate communication sequences",
      "Recruiter dashboard with candidate pipeline, scoring, and notes"
    ],
    techStack: ["Next.js", "Python (FastAPI)", "OpenAI API", "Supabase", "Twilio", "Calendly API", "Tailwind CSS"],
    results: [
      "✦ 80% reduction in manual recruiter time per hire",
      "✦ Average time-to-screen dropped from 3 days to under 4 hours",
      "✦ 45% increase in qualified candidate submissions month-over-month",
      "✦ Platform onboarded 3 enterprise healthcare clients within 60 days of launch"
    ],
    image: "/case-studies/curehire.svg"
  },
  {
    slug: "owasp-foundation",
    number: "04",
    title: "OWASP Foundation",
    tags: ["Security Platform", "Performance Engineering", "Open Source"],
    headline: "Re-Engineering OWASP's Digital Infrastructure for Global-Scale Security",
    challenge: "The OWASP Foundation — the global leader in open-source web application security — needed a performance overhaul and architectural modernization of their web presence, which serves millions of security professionals, developers, and organizations worldwide.",
    whatWeBuilt: [
      "Performance engineering audit identifying 23 critical bottlenecks",
      "Core Web Vitals optimization bringing LCP under 1.8 seconds globally",
      "Security hardening: headers, CSP policies, CORS configuration, dependency audit",
      "CDN architecture redesign for global content delivery",
      "Structured data implementation for enhanced search visibility"
    ],
    techStack: ["Jekyll", "Cloudflare CDN", "AWS", "Lighthouse CI", "Google Search Console", "Semrush"],
    results: [
      "✦ LCP improved from 4.2s → 1.7s (59% faster)",
      "✦ Security score improved from 62 → 94 on Mozilla Observatory",
      "✦ Organic search traffic increased 38% within 4 months",
      "✦ Infrastructure cost reduced by 22% through CDN architecture optimization"
    ],
    image: "/case-studies/owasp-foundation.svg"
  },
  {
    slug: "feature",
    number: "05",
    title: "Feature",
    tags: ["UI/UX", "Product Engineering", "SaaS"],
    headline: "Designing a SaaS Product That Converts Visitors into Power Users",
    challenge: "Feature, a B2B SaaS product, had strong underlying technology but a confusing user experience that was driving high churn in the first 7 days after signup. They needed a complete UX redesign and engineering implementation to fix the onboarding funnel.",
    whatWeBuilt: [
      "Full UX audit with session recording analysis and user interview synthesis",
      "New information architecture and onboarding flow redesign",
      "High-fidelity Figma design system (100+ components)",
      "Frontend implementation in React with Framer Motion animations",
      "A/B testing framework to validate improvements"
    ],
    techStack: ["Figma", "React", "Framer Motion", "Tailwind CSS", "PostHog (analytics)", "Vercel"],
    results: [
      "✦ 7-day user retention improved by 52%",
      "✦ Onboarding completion rate went from 34% → 71%",
      "✦ Support ticket volume dropped 40% (better UX = fewer questions)",
      "✦ NPS score improved from 28 → 61"
    ],
    image: "/case-studies/feature.svg"
  },
  {
    slug: "neuralops",
    number: "06",
    title: "NeuralOps",
    tags: ["AI/ML Infrastructure", "Workflow Automation", "Enterprise"],
    headline: "Building a Custom ML Pipeline That Reduced Operational Costs by 40%",
    challenge: "NeuralOps, an operations intelligence company, needed a custom machine learning infrastructure to automate anomaly detection, predictive maintenance scheduling, and resource allocation across their clients' industrial operations — all in real time.",
    whatWeBuilt: [
      "Custom ML model training pipeline (anomaly detection + predictive maintenance)",
      "Real-time data ingestion layer handling 50,000+ events per hour",
      "Automated workflow triggers based on model confidence thresholds",
      "Model monitoring dashboard with drift detection and retraining alerts",
      "API layer for client system integration"
    ],
    techStack: ["Python", "TensorFlow", "FastAPI", "Apache Kafka", "PostgreSQL", "AWS SageMaker", "Grafana"],
    results: [
      "✦ 40% reduction in client operational costs within 6 months",
      "✦ Predictive maintenance accuracy: 91.3%",
      "✦ System processes 1.2M data events per day with <200ms latency",
      "✦ Reduced unplanned downtime by 67% for pilot client"
    ],
    image: ""
  },
  {
    slug: "datagrid-one",
    number: "07",
    title: "DataGrid One",
    tags: ["SEO / GEO", "Analytics Dashboard", "Content Strategy"],
    headline: "From Page 4 to Position 1: A Technical SEO & GEO Overhaul",
    challenge: "DataGrid One, a B2B data analytics company, had strong domain authority but was being outranked by competitors with weaker content — the result of technical SEO debt, poor schema implementation, and zero generative engine optimization (GEO) strategy.",
    whatWeBuilt: [
      "Full technical SEO audit (crawlability, indexation, Core Web Vitals, internal linking)",
      "Complete schema markup implementation (Organization, FAQPage, HowTo, BreadcrumbList)",
      "GEO strategy: E-E-A-T content reformatting, entity optimization for AI answer engines",
      "60-piece topical authority content cluster across core service keywords",
      "Competitor gap analysis and keyword cannibalization resolution"
    ],
    techStack: ["Ahrefs", "Semrush", "Google Search Console", "Screaming Frog", "Perplexity AI", "Schema.org"],
    results: [
      "✦ Organic traffic increased 210% in 5 months",
      "✦ 14 target keywords moved from Page 3–4 to Page 1, Position 1–3",
      "✦ Brand cited in 3 AI-generated search summaries (Perplexity, ChatGPT Search)",
      "✦ Domain Rating improved from 34 → 52"
    ],
    image: ""
  }
]
