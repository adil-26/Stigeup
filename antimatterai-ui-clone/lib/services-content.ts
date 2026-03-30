import {
  Brain,
  Code2,
  Globe,
  MessageSquare,
  Palette,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

export interface ServiceProduct {
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  timeline: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ToolPhase {
  phase: string;
  tools: string[];
}

export interface TimelineBar {
  label: string;
  weeks: string;
  left: string;
  width: string;
  accent?: boolean;
}


export interface ServicePageContent {
  slug: string;
  number: string;
  title: string;
  icon: LucideIcon;
  seoTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCTA: string;
  products: ServiceProduct[];
  techStack: string[];
  relatedCaseStudySlug: string;
  faq: { question: string; answer: string }[];
  processSteps?: ProcessStep[];
  toolPhases?: ToolPhase[];
  timelineBars?: TimelineBar[];
}

export const servicesData: ServicePageContent[] = [
  {
    slug: "ui-ux-design",
    number: "01",
    title: "UI / UX Design",
    icon: Palette,
    seoTitle: "UI/UX Design Services | STIGEUP — Product Design That Converts",
    metaDescription: "Expert UI/UX design services: user research, Figma wireframes, high-fidelity prototypes, and design systems that convert. Built for startups and enterprise products.",
    heroHeadline: "Interfaces That Don't Just Look Good — They Perform.",
    heroSubheadline: "We design digital products with surgical precision. From user psychology to pixel-perfect implementation, every design decision we make is backed by research, tested against real users, and engineered to convert.",
    heroCTA: "Start Your Design Project",
    techStack: ["Figma", "Adobe XD", "Spline (3D)", "Framer", "Maze", "Useberry", "Lottie", "FigJam", "Zeroheight"],
    relatedCaseStudySlug: "feature",
    faq: [
      { question: "Do you design for both web and mobile?", answer: "Yes. All our designs are built with responsive breakpoints for desktop, tablet, and mobile. For native apps, we follow iOS Human Interface Guidelines and Android Material Design standards." },
      { question: "Can you redesign an existing product?", answer: "Absolutely. We handle redesigns regularly — we audit the existing UX, identify friction points, and redesign strategically rather than just cosmetically." },
      { question: "What if I need just a landing page?", answer: "We do landing page design as standalone engagements. A high-converting landing page typically takes 1–2 weeks from brief to final Figma file." },
      { question: "Do you provide the Figma source files?", answer: "Yes. You receive full ownership of all Figma source files at the end of the engagement." }
    ],
    products: [
      {
        number: "PRODUCT 01",
        title: "UX Research & Strategy",
        shortDescription: "We start with understanding — not assumptions.",
        fullDescription: "Our UX research process includes stakeholder interviews, user persona mapping, competitive benchmarking, and Jobs-to-be-Done analysis. The result: a design brief that removes all guesswork from what your users actually need.",
        deliverables: ["User personas", "Journey maps", "Competitive analysis report", "Opportunity brief"],
        timeline: "1–2 weeks"
      },
      {
        number: "PRODUCT 02",
        title: "Information Architecture & Wireframing",
        shortDescription: "Before aesthetics, comes structure.",
        fullDescription: "We design the logical backbone of your product — the navigation, information hierarchy, and user flows — through low and mid-fidelity wireframes. This is where product thinking happens: every screen is mapped against user intent and business goals.",
        deliverables: ["Sitemap", "User flow diagrams", "Low-fi wireframes (all screens)", "Clickable mid-fi prototype"],
        timeline: "1–3 weeks"
      },
      {
        number: "PRODUCT 03",
        title: "High-Fidelity UI Design",
        shortDescription: "This is where the product comes alive.",
        fullDescription: "Our designers build fully detailed, pixel-perfect visual designs in Figma — complete with responsive breakpoints, interaction states (hover, active, disabled, error), dark/light modes, and accessibility compliance (WCAG 2.1 AA). The result looks and feels exactly like a live product.",
        deliverables: ["Full Figma design file", "Component library", "Responsive screens", "Style guide"],
        timeline: "2–5 weeks"
      },
      {
        number: "PRODUCT 04",
        title: "Prototyping & User Testing",
        shortDescription: "Simulate the full product experience without writing code.",
        fullDescription: "We build interactive prototypes that simulate the full product experience — without writing a single line of code. These are tested with real users to validate flows, catch friction points, and confirm conversion paths before engineering begins. This eliminates expensive rework downstream.",
        deliverables: ["Figma interactive prototype", "Maze/Useberry test results", "UX recommendations report"],
        timeline: "1–2 weeks"
      },
      {
        number: "PRODUCT 05",
        title: "Design System & Dev Handoff",
        shortDescription: "Production-ready design systems with tokenized variables.",
        fullDescription: "A design is only valuable if engineers can build it exactly. We deliver production-ready design systems with tokenized variables, documented component specifications, spacing grids, and annotated handoff files in Figma. Our dev handoff process means zero ambiguity for the engineering team.",
        deliverables: ["Design system (tokens, components, patterns)", "Figma Dev Mode handoff", "Asset export pack"],
        timeline: "1–2 weeks"
      },
      {
        number: "PRODUCT 06",
        title: "3D & Motion Design (Spline / Framer)",
        shortDescription: "Interactive 3D elements and motion-rich experiences.",
        fullDescription: "For products that need to stand out visually, we design interactive 3D elements and motion-rich experiences using Spline and Framer. Scroll-triggered animations, interactive product showcases, and hero experiences that make your brand impossible to forget.",
        deliverables: ["Spline 3D scenes", "Framer interactive components", "Animation spec documentation"],
        timeline: "2–4 weeks"
      }
    ],
    processSteps: [
      {
        number: "01",
        title: "Discovery & UX Research",
        description: "We interview stakeholders, map user personas, audit competitors, and define the Jobs-to-be-Done. No assumptions — every design decision starts here.",
        deliverables: ["User personas", "Journey maps", "Competitive analysis", "Opportunity brief"],
      },
      {
        number: "02",
        title: "Information Architecture & Wireframes",
        description: "Before any visual design, we map the full product structure — every screen, navigation path, and user flow. Low-fidelity wireframes lock in the logic before we invest in aesthetics.",
        deliverables: ["Sitemap", "User flow diagrams", "Low-fi wireframes", "Clickable mid-fi prototype"],
      },
      {
        number: "03",
        title: "High-Fidelity UI Design",
        description: "Pixel-perfect visual design in Figma — responsive breakpoints, all interaction states, dark/light modes, and WCAG 2.1 AA accessibility compliance.",
        deliverables: ["Full Figma file", "Component library", "Responsive screens", "Style guide"],
      },
      {
        number: "04",
        title: "Prototype & User Testing",
        description: "Interactive prototypes tested with real users before engineering begins. We catch friction points, validate conversion paths, and confirm the flow works.",
        deliverables: ["Figma prototype", "Maze test results", "UX recommendations report"],
      },
      {
        number: "05",
        title: "Design System & Dev Handoff",
        description: "Production-ready design systems with tokenized variables, documented component specs, and annotated Figma Dev Mode handoff files. Zero ambiguity for engineers.",
        deliverables: ["Design tokens", "Component docs", "Figma Dev Mode", "Asset export pack"],
      },
    ],
    toolPhases: [
      { phase: "Discovery", tools: ["FigJam", "Maze", "Useberry"] },
      { phase: "Wireframes & IA", tools: ["Figma", "FigJam"] },
      { phase: "UI Design", tools: ["Figma", "Adobe XD", "Spline 3D"] },
      { phase: "Motion & 3D", tools: ["Framer", "Lottie", "Spline"] },
      { phase: "Dev Handoff", tools: ["Figma Dev Mode", "Zeroheight"] },
    ],
    timelineBars: [
      { label: "Discovery & Research", weeks: "1–2 wks", left: "0%", width: "14%" },
      { label: "IA & Wireframes", weeks: "1–3 wks", left: "14%", width: "22%" },
      { label: "High-Fidelity Design", weeks: "2–5 wks", left: "36%", width: "36%" },
      { label: "Prototype & Testing", weeks: "1–2 wks", left: "72%", width: "14%" },
      { label: "Dev Handoff", weeks: "1–2 wks", left: "86%", width: "14%", accent: true },
    ]
  },
  {
    slug: "website-development",
    number: "02",
    title: "Website Development",
    icon: Globe,
    seoTitle: "Website Development Services | STIGEUP — Next.js, React & Shopify",
    metaDescription: "Custom high-performance website development using Next.js, React, Shopify, and Webflow. Sub-2-second load times, SEO-optimized architecture, and scalable infrastructure.",
    heroHeadline: "Websites Engineered to Dominate Search, Convert Visitors, and Scale Without Breaking.",
    heroSubheadline: "We don't build \"websites.\" We build revenue-generating digital infrastructure — architected for Core Web Vitals, engineered for conversion, and built to handle whatever growth throws at it.",
    heroCTA: "Get a Free Architecture Review",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Sanity", "Contentful", "Shopify", "Webflow", "Vercel", "AWS", "Cloudflare"],
    relatedCaseStudySlug: "curehire",
    faq: [
      { question: "How long does a website take to build?", answer: "A typical marketing site takes 3-6 weeks. A custom web application or complex headless build takes 6-12 weeks." },
      { question: "Do you do SEO?", answer: "Yes. Every site we build comes with technical SEO, semantic HTML, and fast loading speeds built-in. We also offer standalone SEO and GEO services." }
    ],
    products: [
      {
        number: "PRODUCT 01",
        title: "Custom Web Platform Development",
        shortDescription: "Bespoke web applications built on Next.js and React.",
        fullDescription: "For businesses that need more than a template — a fully bespoke web application built on Next.js and React, designed for your exact workflow, user journey, and business model. Server-side rendering, edge deployment, and dynamic content management included.",
        deliverables: ["Custom Next.js web app", "CMS integration", "Admin panel", "Deployment pipeline", "Documentation"],
        timeline: "4–10 weeks"
      },
      {
        number: "PRODUCT 02",
        title: "High-Performance Marketing Website",
        shortDescription: "A marketing site that loads in under 2 seconds.",
        fullDescription: "A marketing site that loads in under 2 seconds, scores 95+ on Lighthouse, and is architected for maximum organic discoverability. We build with structured data, semantic HTML, and performance-first philosophy baked in from day one — not added as an afterthought.",
        deliverables: ["Marketing site (all pages)", "CMS", "SEO foundation", "Core Web Vitals optimization", "Analytics setup"],
        timeline: "3–6 weeks"
      },
      {
        number: "PRODUCT 03",
        title: "Shopify Development & Optimization",
        shortDescription: "Custom Shopify storefronts engineered for conversion.",
        fullDescription: "Custom Shopify storefronts engineered for conversion — built on Shopify 2.0 with custom Liquid templates, section schema design, and performance optimization. For headless Shopify, we build on Next.js with the Storefront API for maximum speed and flexibility.",
        deliverables: ["Custom Shopify theme or headless storefront", "Product/collection templates", "Checkout optimization", "Speed audit"],
        timeline: "3–8 weeks"
      },
      {
        number: "PRODUCT 04",
        title: "Headless CMS Architecture",
        shortDescription: "Separate your content from your frontend.",
        fullDescription: "Separate your content from your frontend for maximum flexibility, performance, and scalability. We architect and build headless setups using Sanity, Contentful, or Strapi — connected to your Next.js frontend via API — giving your team full content control without touching code.",
        deliverables: ["Headless CMS setup", "Content schema design", "API integration", "Editorial UI", "Migration plan"],
        timeline: "3–6 weeks"
      },
      {
        number: "PRODUCT 05",
        title: "Web Application (SaaS, Portals, Dashboards)",
        shortDescription: "Complex web applications with strict business logic.",
        fullDescription: "Complex web applications with authentication, real-time data, role-based access, and custom business logic. We build full-stack Next.js applications backed by PostgreSQL or Supabase — from SaaS products to internal enterprise portals.",
        deliverables: ["Full-stack web app", "Authentication system", "Database schema", "API layer", "Admin dashboard", "Deployment"],
        timeline: "6–16 weeks"
      },
      {
        number: "PRODUCT 06",
        title: "Performance & Technical Audit",
        shortDescription: "Technical health check for existing websites.",
        fullDescription: "A comprehensive technical health check for existing websites: Core Web Vitals analysis, crawlability audit, security review, and performance profiling. We deliver a prioritized remediation roadmap with estimated impact per fix.",
        deliverables: ["Lighthouse audit report", "Screaming Frog crawl analysis", "Security headers review", "Prioritized fix list"],
        timeline: "1–2 weeks"
      }
    ]
  },
  {
    slug: "software-development",
    number: "03",
    title: "Software Development",
    icon: Code2,
    seoTitle: "Custom Software Development | STIGEUP — CRM, ERP & SaaS",
    metaDescription: "Bespoke enterprise software development: custom CRMs, ERPs, SaaS platforms, and API integrations built with Node.js, Python, and PostgreSQL.",
    heroHeadline: "Custom Software That Gives Your Business an Unfair Operational Advantage.",
    heroSubheadline: "Off-the-shelf software was built for the average business. If you're serious about outperforming your industry, you need infrastructure built specifically for how you operate, how you grow, and how you win.",
    heroCTA: "Discuss Your Software Project",
    techStack: ["Node.js", "Python (FastAPI/Django)", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes", "TypeScript", "Prisma", "Stripe", "Twilio"],
    relatedCaseStudySlug: "neuralops",
    faq: [
      { question: "How much does custom software typically cost?", answer: "It depends heavily on complexity. Smaller automation scripts might be $5K, while a full enterprise ERP can range from $50K to $150K+. We scope out exact costs during discovery." },
      { question: "Do I own the source code?", answer: "Yes. Upon project completion and final payment, you own 100% of the intellectual property and source code." }
    ],
    products: [
      {
        number: "PRODUCT 01",
        title: "Custom CRM Development",
        shortDescription: "A CRM built exactly for your sales process.",
        fullDescription: "A CRM built exactly for your sales process — not the other way around. We design and build customer relationship management systems with your deal stages, automation triggers, reporting views, and integration requirements at the center. No per-seat fees. No feature caps.",
        deliverables: ["Custom CRM web app", "Lead/deal pipeline", "Automation rules", "Email integration", "Reporting", "Admin panel"],
        timeline: "8–16 weeks"
      },
      {
        number: "PRODUCT 02",
        title: "ERP System Development",
        shortDescription: "Enterprise Resource Planning systems that unify operations.",
        fullDescription: "Enterprise Resource Planning systems that unify your operations: procurement, inventory, finance, HR, and reporting — all in one custom-built platform. We replace fragmented tool stacks with a single source of operational truth.",
        deliverables: ["Modular ERP platform", "Process automation", "Role-based access", "Real-time reporting", "Data migration"],
        timeline: "12–24 weeks"
      },
      {
        number: "PRODUCT 03",
        title: "SaaS Platform Architecture",
        shortDescription: "From idea to fully launched SaaS product.",
        fullDescription: "From idea to fully launched SaaS product. We architect multi-tenant SaaS platforms with authentication, billing (Stripe), usage metering, admin dashboards, and API access — ready for your first 1,000 customers and scalable to 100,000.",
        deliverables: ["SaaS platform (all modules)", "Stripe billing", "Multi-tenant database", "API documentation", "Onboarding flow"],
        timeline: "10–20 weeks"
      },
      {
        number: "PRODUCT 04",
        title: "API Development & Integration",
        shortDescription: "RESTful and GraphQL APIs from scratch.",
        fullDescription: "We design RESTful and GraphQL APIs from scratch, or connect your existing systems via custom integration layers. Third-party API integration, webhook architectures, and internal microservice communication — handled with security and performance rigor.",
        deliverables: ["API (REST or GraphQL)", "Authentication layer", "Documentation (Swagger/OpenAPI)", "Rate limiting", "Monitoring"],
        timeline: "3–8 weeks"
      },
      {
        number: "PRODUCT 05",
        title: "Automation & Internal Tooling",
        shortDescription: "Tools that give your team back their time.",
        fullDescription: "Repetitive manual processes are costing your team hours every week. We identify automation opportunities and build internal tools — scheduling systems, approval workflows, data pipelines, report generators — that give your team back their time.",
        deliverables: ["Automation scripts/tools", "Workflow engine", "Internal dashboard", "Documentation"],
        timeline: "2–8 weeks"
      },
      {
        number: "PRODUCT 06",
        title: "Cloud Infrastructure & DevOps",
        shortDescription: "Production-grade cloud infrastructure on AWS.",
        fullDescription: "We set up and manage production-grade cloud infrastructure on AWS — VPCs, load balancers, auto-scaling, RDS clusters, S3, CloudFront — with CI/CD pipelines, environment management, and monitoring dashboards included.",
        deliverables: ["AWS infrastructure setup", "CI/CD pipeline", "Environment configuration", "Monitoring (Grafana/CloudWatch)", "Runbook"],
        timeline: "2–4 weeks"
      }
    ]
  },
  {
    slug: "application-development",
    number: "04",
    title: "Application Development",
    icon: Smartphone,
    seoTitle: "Mobile App Development Services | STIGEUP — Flutter & React Native",
    metaDescription: "Cross-platform mobile app development for iOS and Android using Flutter and React Native. Native performance, seamless UX, and scalable architecture.",
    heroHeadline: "Mobile Apps That Users Open Every Day — And Can't Imagine Life Without.",
    heroSubheadline: "We engineer iOS and Android applications that combine native-level performance with flawless cross-platform consistency. From MVP to enterprise-scale — built to monopolize your users' attention.",
    heroCTA: "Start Your App Project",
    techStack: ["Flutter", "Dart", "React Native", "Swift", "Kotlin", "Jetpack Compose", "Firebase", "Supabase", "OneSignal", "RevenueCat", "Fastlane"],
    relatedCaseStudySlug: "synergies4",
    faq: [
      { question: "Do you build for iOS or Android?", answer: "Both. We typically use cross-platform frameworks like Flutter or React Native to deliver iOS and Android apps simultaneously from one codebase." },
      { question: "Do you handle App Store submission?", answer: "Yes, we handle the entire App Store and Google Play publishing process, including compliance checks and initial metadata setup." }
    ],
    products: [
      {
        number: "PRODUCT 01",
        title: "Cross-Platform App (Flutter)",
        shortDescription: "One codebase. Two world-class native apps.",
        fullDescription: "One codebase. Two world-class native apps. Flutter lets us deliver true native performance on both iOS and Android from a single, maintainable codebase — saving time and budget without compromising on experience. This is our recommended approach for 90% of new app projects.",
        deliverables: ["iOS + Android app (App Store + Play Store ready)", "Source code", "Deployment pipeline", "Documentation"],
        timeline: "8–18 weeks"
      },
      {
        number: "PRODUCT 02",
        title: "React Native Application",
        shortDescription: "Native capabilities with JavaScript.",
        fullDescription: "For teams with existing React/JavaScript expertise, React Native offers a familiar development model with strong native capabilities. Ideal for apps that need tight integration with web codebases or JavaScript-native ecosystems.",
        deliverables: ["iOS + Android app", "Integration with existing web backend", "App Store submission", "Documentation"],
        timeline: "8–16 weeks"
      },
      {
        number: "PRODUCT 03",
        title: "iOS Native App (Swift)",
        shortDescription: "Pure Apple-native engineering.",
        fullDescription: "When your app demands the absolute best iOS experience — deep system integrations, ARKit, HealthKit, Core ML — we build it natively in Swift. No compromises. No cross-platform translation layer. Pure Apple-native engineering.",
        deliverables: ["iOS native app (Swift)", "App Store submission", "TestFlight build", "Documentation"],
        timeline: "10–20 weeks"
      },
      {
        number: "PRODUCT 04",
        title: "Android Native App (Kotlin)",
        shortDescription: "Purpose-built for Android's ecosystem.",
        fullDescription: "Purpose-built for Android's ecosystem — Jetpack Compose, Material You, Google Pay, and deep Android system APIs. When your primary market is Android users, native Kotlin development delivers the sharpest possible user experience.",
        deliverables: ["Android native app (Kotlin/Jetpack Compose)", "Play Store submission", "Documentation"],
        timeline: "10–20 weeks"
      },
      {
        number: "PRODUCT 05",
        title: "App Backend & API Architecture",
        shortDescription: "Powerful backends for mobile consumption.",
        fullDescription: "Every great app needs a powerful backend. We build scalable REST APIs, real-time WebSocket connections, push notification systems, and authentication flows specifically designed for mobile consumption patterns — including offline-first data sync.",
        deliverables: ["Mobile-optimized API", "Authentication (JWT/OAuth)", "Push notifications", "Offline sync layer", "Deployment"],
        timeline: "4–10 weeks"
      },
      {
        number: "PRODUCT 06",
        title: "App Scaling & Maintenance Retainer",
        shortDescription: "Ongoing support for your live app.",
        fullDescription: "Post-launch, we offer ongoing retainer-based support for crash monitoring, performance profiling, OS update compatibility, new feature development, and App Store guideline compliance. Your app stays fast and current without you managing it.",
        deliverables: ["Monthly performance report", "Bug fixes", "OS compatibility updates", "Feature development hours"],
        timeline: "Ongoing monthly retainer"
      }
    ]
  },
  {
    slug: "voicebot-chatbot",
    number: "05",
    title: "Voicebot / Chatbot",
    icon: MessageSquare,
    seoTitle: "AI Voicebot & Chatbot Development | STIGEUP — Powered by OpenAI & Vapi",
    metaDescription: "Custom AI voice agents and chatbots that qualify leads, automate support, and run 24/7. Built with OpenAI, Vapi, ElevenLabs, and Dialogflow.",
    heroHeadline: "AI Agents That Work 24/7, Never Burn Out, and Convert Like Your Best Rep.",
    heroSubheadline: "We deploy intelligent voice and chat agents that handle real conversations — qualifying leads, answering complex questions, booking appointments, and escalating when needed. Powered by the latest LLMs. Trained on your business.",
    heroCTA: "Deploy Your First AI Agent",
    techStack: ["OpenAI GPT-4o", "Vapi", "ElevenLabs", "Dialogflow", "Twilio", "LangChain", "Pinecone", "Weaviate", "WhatsApp Business API", "Supabase"],
    relatedCaseStudySlug: "clinix-ai",
    faq: [
      { question: "How natural do the voice agents sound?", answer: "Remarkably natural. We use state-of-the-art models like ElevenLabs combined with GPT-4, meaning the voice has natural inflection, pauses, and the ability to handle interruptions contextually." },
      { question: "Can the chatbot integrate with my CRM?", answer: "Yes, our bots connect directly to your CRM (HubSpot, Salesforce, etc.) and calendar systems like Calendly." }
    ],
    products: [
      {
        number: "PRODUCT 01",
        title: "AI Voice Calling Agent",
        shortDescription: "Autonomous AI agent that makes and receives phone calls.",
        fullDescription: "An autonomous AI agent that makes and receives phone calls — in a natural, human-like voice — to qualify inbound leads, follow up on prospects, confirm appointments, or conduct surveys. Built on Vapi with ElevenLabs voice synthesis and GPT-4 reasoning. Handles interruptions, objections, and multi-turn conversations without breaking.",
        deliverables: ["Deployed voice agent", "Conversation scripts", "Fallback logic", "CRM integration", "Call recording setup", "Analytics dashboard"],
        timeline: "3–6 weeks"
      },
      {
        number: "PRODUCT 02",
        title: "Customer Support Chatbot",
        shortDescription: "AI trained on your product docs and history.",
        fullDescription: "An AI chatbot trained on your product documentation, FAQs, and support history — capable of resolving 70–80% of support queries without human intervention. Escalates complex issues to human agents with full context. Deployed on your website, WhatsApp, or internal tools.",
        deliverables: ["Trained chatbot", "Knowledge base integration", "Escalation logic", "Web/WhatsApp deployment", "Analytics"],
        timeline: "3–5 weeks"
      },
      {
        number: "PRODUCT 03",
        title: "Lead Qualification & Booking Bot",
        shortDescription: "Qualify visitors and book meetings 24/7.",
        fullDescription: "An intelligent conversational agent embedded in your website or landing page that qualifies every visitor in real time — asking the right questions, scoring intent, and booking demos or calls directly in your calendar. Integrated with HubSpot, Salesforce, or your CRM of choice.",
        deliverables: ["Qualification flow design", "Chatbot deployment", "Calendar integration", "CRM sync", "Lead scoring logic"],
        timeline: "2–4 weeks"
      },
      {
        number: "PRODUCT 04",
        title: "Internal Operations Assistant",
        shortDescription: "AI assistant trained on internal documentation.",
        fullDescription: "An AI assistant trained on your internal documentation, SOPs, and knowledge base — deployed via Slack or Teams — that helps employees find information, fill forms, submit requests, and get instant answers without digging through wikis or waiting for HR/IT.",
        deliverables: ["Internal assistant deployment", "Knowledge base ingestion", "Slack/Teams integration", "Access control setup"],
        timeline: "2–4 weeks"
      },
      {
        number: "PRODUCT 05",
        title: "Omnichannel Chatbot Deployment",
        shortDescription: "One AI brain, every channel.",
        fullDescription: "One AI brain, every channel. We deploy and synchronize your chatbot across your website, WhatsApp Business API, Telegram, Facebook Messenger, and email — with consistent context, brand voice, and conversation history across all platforms.",
        deliverables: ["Omnichannel bot deployment", "Unified conversation history", "Channel-specific customization", "Reporting"],
        timeline: "4–8 weeks"
      },
      {
        number: "PRODUCT 06",
        title: "Custom LLM Fine-Tuning & RAG Pipeline",
        shortDescription: "RAG pipelines grounded in your proprietary data.",
        fullDescription: "For businesses that need domain-specific AI — not general-purpose GPT — we build Retrieval-Augmented Generation (RAG) pipelines that ground your AI's responses in your proprietary data. Fine-tuning available for specialized industry applications.",
        deliverables: ["RAG architecture", "Vector database setup (Pinecone/Weaviate)", "Document ingestion pipeline", "API endpoint"],
        timeline: "4–8 weeks"
      }
    ]
  },
  {
    slug: "ai-ml",
    number: "06",
    title: "AI / ML (Artificial Intelligence)",
    icon: Brain,
    seoTitle: "AI & Machine Learning Development | STIGEUP — Custom ML Models",
    metaDescription: "Custom AI and machine learning solutions: predictive models, intelligent automation, data pipelines, and LLM integrations. Built with TensorFlow and PyTorch.",
    heroHeadline: "Machine Intelligence That Makes Your Business Untouchable.",
    heroSubheadline: "We build and deploy custom AI systems that don't just process data — they learn from it, act on it, and give your business capabilities that simply can't be replicated with standard software.",
    heroCTA: "Explore What AI Can Do For You",
    techStack: ["Python", "TensorFlow", "PyTorch", "Hugging Face", "Scikit-learn", "OpenAI API", "LangChain", "Apache Kafka", "AWS SageMaker", "Pinecone", "MLflow", "Grafana"],
    relatedCaseStudySlug: "neuralops",
    faq: [
      { question: "Do you train models from scratch?", answer: "We do. Depending on the use case, we either fine-tune open-source models (like Llama 3) for speed and cost-efficiency, or build custom neural networks from scratch using PyTorch/TensorFlow." },
      { question: "How do you handle data privacy?", answer: "We deploy open-source models inside your secure cloud VPC. Your data never leaves your environment and is not used to train public models." }
    ],
    products: [
      {
        number: "PRODUCT 01",
        title: "Custom Machine Learning Models",
        shortDescription: "Predictive intelligence natively built for you.",
        fullDescription: "We design, train, and deploy custom ML models tailored to your specific business problem — classification, regression, clustering, anomaly detection, forecasting, or recommendation engines. Every model is trained on your data, evaluated with rigorous metrics, and deployed into your production environment.",
        deliverables: ["Trained ML model", "Evaluation report (accuracy, precision, recall, F1)", "Inference API", "Model documentation"],
        timeline: "6–16 weeks"
      },
      {
        number: "PRODUCT 02",
        title: "Natural Language Processing (NLP)",
        shortDescription: "Text and language intelligence pipelines.",
        fullDescription: "Text and language intelligence: document classification, sentiment analysis, named entity recognition, contract analysis, automated summarization, and multilingual understanding. We build NLP pipelines using both transformer-based fine-tuning and RAG architectures.",
        deliverables: ["NLP pipeline", "Fine-tuned model or RAG system", "REST API", "Evaluation benchmarks", "Documentation"],
        timeline: "4–12 weeks"
      },
      {
        number: "PRODUCT 03",
        title: "Computer Vision",
        shortDescription: "Visual AI that sees and understands images and video.",
        fullDescription: "Visual AI that sees and understands images and video: object detection, image classification, OCR, defect detection, face recognition, and real-time video analysis. Built with PyTorch and deployed on GPU-optimized cloud infrastructure.",
        deliverables: ["Trained vision model", "Inference API", "Labeling pipeline setup", "Benchmark report", "Deployment"],
        timeline: "6–16 weeks"
      },
      {
        number: "PRODUCT 04",
        title: "Intelligent Workflow Automation",
        shortDescription: "Automated approvals, intelligent routing, exception handling.",
        fullDescription: "We connect your business systems to AI decision logic — creating workflows that don't just move data, but act on it intelligently. Automated approvals, intelligent routing, exception handling, and AI-powered quality control embedded into your existing operations.",
        deliverables: ["Automated workflow system", "Integration with existing tools", "Decision logic documentation", "Monitoring dashboard"],
        timeline: "4–10 weeks"
      },
      {
        number: "PRODUCT 05",
        title: "AI Data Labeling & Processing Pipeline",
        shortDescription: "End-to-end data processing pipelines.",
        fullDescription: "Quality AI requires quality data. We build end-to-end data processing pipelines: ingestion, cleaning, transformation, labeling (human-in-the-loop or automated), and versioning. Scalable, auditable, and ready for model training.",
        deliverables: ["Data pipeline architecture", "Labeling workflow", "Labeled dataset", "Data quality report", "Pipeline documentation"],
        timeline: "3–8 weeks"
      },
      {
        number: "PRODUCT 06",
        title: "Predictive Analytics & Business Intelligence",
        shortDescription: "Transform raw business data into predictive intelligence.",
        fullDescription: "Transform raw business data into predictive intelligence. We build forecasting models for demand planning, churn prediction, lead scoring, and revenue forecasting — integrated with your BI tools or as custom dashboards.",
        deliverables: ["Predictive model", "Feature engineering pipeline", "BI dashboard (or API)", "Business impact analysis"],
        timeline: "4–10 weeks"
      }
    ]
  },
  {
    slug: "seo-geo-optimization",
    number: "07",
    title: "SEO / GEO Optimization",
    icon: Search,
    seoTitle: "SEO & GEO Optimization Services | STIGEUP — Rank on Google & AI Search",
    metaDescription: "Comprehensive SEO and Generative Engine Optimization (GEO) services. Technical SEO architecture, schema markup, content strategy, and AI search visibility.",
    heroHeadline: "Rank #1 on Google. Get Cited by AI. Own Your Category.",
    heroSubheadline: "Search is no longer just Google. Your buyers are getting answers from ChatGPT, Perplexity, and Gemini. We engineer your digital presence to dominate traditional search AND appear authoritatively in every AI-generated answer about your industry.",
    heroCTA: "Get a Free SEO Audit",
    techStack: ["Ahrefs", "Semrush", "Google Search Console", "Screaming Frog", "GA4", "Perplexity AI", "ChatGPT Search", "Schema.org", "Surfer SEO", "Clearscope"],
    relatedCaseStudySlug: "datagrid-one",
    faq: [
      { question: "What is GEO?", answer: "Generative Engine Optimization (GEO) is the process of optimizing content and markup so your brand is cited by AI answer engines like ChatGPT, Perplexity, and Google AI Overviews." },
      { question: "How long until we see SEO results?", answer: "Technical fixes often yield results in 2-4 weeks. Content and authority building generally takes 3-6 months to compound and drive significant organic traffic." }
    ],
    products: [
      {
        number: "PRODUCT 01",
        title: "Technical SEO Architecture",
        shortDescription: "The foundation of every organic strategy.",
        fullDescription: "The foundation of every organic strategy. We conduct a full technical audit — crawlability, indexation, site architecture, Core Web Vitals, mobile performance, internal linking, canonical tags, redirect chains, and JavaScript rendering. We then implement every fix, not just recommend it.",
        deliverables: ["Technical audit report", "Fix implementation", "Core Web Vitals optimization", "XML sitemap", "robots.txt optimization", "Monitoring setup"],
        timeline: "2–4 weeks (audit) + 4–8 weeks (implementation)"
      },
      {
        number: "PRODUCT 02",
        title: "Generative Engine Optimization (GEO)",
        shortDescription: "Optimize content so LLMs cite your brand.",
        fullDescription: "The cutting edge of search. We optimize your content, schema, and entity graph so that LLMs (ChatGPT, Perplexity, Gemini, Claude) cite your brand when answering questions in your category. This includes E-E-A-T signal amplification, structured data for AI parsing, and answer-intent content reformatting.",
        deliverables: ["GEO audit", "Entity optimization plan", "Schema implementation", "Answer-optimized content", "Citation tracking setup"],
        timeline: "4–8 weeks"
      },
      {
        number: "PRODUCT 03",
        title: "Content Strategy & Topical Authority",
        shortDescription: "Establish your brand as the definitive authority.",
        fullDescription: "We build comprehensive content clusters that establish your brand as the definitive authority in your niche. Keyword research, search intent mapping, content briefs, pillar/cluster architecture, and editorial calendar — all designed to compound in value over time.",
        deliverables: ["Keyword research report", "Topical map", "Content briefs (10–60+ pieces)", "Pillar page strategy", "Editorial calendar"],
        timeline: "2–4 weeks (strategy) + ongoing"
      },
      {
        number: "PRODUCT 04",
        title: "Schema Markup & Knowledge Graph",
        shortDescription: "Structured data implementation.",
        fullDescription: "Structured data is the language search engines and AI systems use to understand your content. We implement comprehensive schema markup — Organization, Product, Service, FAQ, HowTo, BreadcrumbList, Article — and work to establish your brand as a verified entity in Google's Knowledge Graph.",
        deliverables: ["Full schema implementation", "Knowledge Panel optimization", "Rich result validation", "Structured data monitoring"],
        timeline: "2–4 weeks"
      },
      {
        number: "PRODUCT 05",
        title: "Link Building & Digital PR",
        shortDescription: "Acquire high-quality, contextually relevant backlinks.",
        fullDescription: "Authority comes from who references you. We build high-quality, contextually relevant backlinks through digital PR, expert contributions, resource page acquisition, and broken link building — using only white-hat methods that survive algorithm updates.",
        deliverables: ["Monthly link building report", "Prospect pipeline", "Published placements", "Anchor text strategy"],
        timeline: "Ongoing monthly retainer"
      },
      {
        number: "PRODUCT 06",
        title: "SEO Analytics & Reporting Infrastructure",
        shortDescription: "Complete SEO measurement infrastructure.",
        fullDescription: "You can't improve what you don't measure. We set up complete SEO measurement infrastructure: GA4, Google Search Console, Ahrefs rank tracking, Core Web Vitals monitoring, and custom dashboards — so you always know exactly what's working and what to prioritize.",
        deliverables: ["GA4 setup", "Search Console configuration", "Rank tracking dashboard", "Monthly performance reports", "Anomaly alerts"],
        timeline: "1–2 weeks"
      }
    ]
  }
]
