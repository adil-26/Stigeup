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

export type ServiceItem = {
  number: string
  title: string
  icon: LucideIcon
  description: string
  services: string[]
  tools: string
}

export const services: ServiceItem[] = [
  {
    number: "01",
    title: "UI / UX Design",
    icon: Palette,
    description:
      "End-to-end product design that dictates market standards. We craft flawless, high-converting interfaces, from deep user research to developer-ready UI systems that captivate and convert.",
    services: [
      "User Research & Strategy",
      "UX Flows & Wireframes",
      "High-Fidelity Prototypes",
      "Design Ops & Dev Handoff",
    ],
    tools: "Figma, Adobe XD, Spline (3D), Framer",
  },
  {
    number: "02",
    title: "Website Development",
    icon: Globe,
    description:
      "High-performance web architectures engineered for absolute digital dominance. We build lightning-fast, scalable platforms, custom e-commerce experiences, and specialized web applications that leave competitors behind.",
    services: [
      "Custom Web Platforms & Apps",
      "High-Converting Shopify Stores",
      "Headless CMS Architecture",
      "Performance & Security Audits",
    ],
    tools: "React, Next.js, Webflow, Shopify",
  },
  {
    number: "03",
    title: "Software Development",
    icon: Code2,
    description:
      "Bespoke enterprise ecosystems built to automate and overpower your industry. We architect custom CRMs, ERPs, and internal software that give your business an unfair operational advantage.",
    services: [
      "Custom CRM & ERP Systems",
      "SaaS Platform Architecture",
      "API Development & Integration",
      "Cloud Infrastructure Setup",
    ],
    tools: "Node.js, Python, PostgreSQL, AWS",
  },
  {
    number: "04",
    title: "Application Development",
    icon: Smartphone,
    description:
      "Elite mobile experiences designed to monopolize user attention. We engineer robust, cross-platform applications that scale effortlessly and deliver flawless performance across all devices.",
    services: [
      "iOS Native Engineering",
      "Android Native Engineering",
      "Cross-Platform Development",
      "App Scaling & Maintenance",
    ],
    tools: "Flutter, React Native, Swift, Kotlin",
  },
  {
    number: "05",
    title: "Voicebot / Chatbot",
    icon: MessageSquare,
    description:
      "Autonomous conversational agents that never sleep. We deploy intelligent, human-like AI calling and chat systems that qualify leads and automate customer interactions relentlessly.",
    services: [
      "AI Voice Calling Agents",
      "NLP Chatbot Integration",
      "Automated Lead Qualification",
      "Conversational UI/UX",
    ],
    tools: "OpenAI, Vapi, ElevenLabs, Dialogflow",
  },
  {
    number: "06",
    title: "AI / ML (Artificial Intelligence)",
    icon: Brain,
    description:
      "Cognitive logic and machine learning models that make your business untouchable. We integrate deep tech, automation, and precise data processing to transform complex bottlenecks into instant results.",
    services: [
      "Machine Learning Models",
      "AI Data Labeling & Processing",
      "Intelligent Workflow Automation",
      "Predictive Analytics",
    ],
    tools: "TensorFlow, PyTorch, Python, Hugging Face",
  },
  {
    number: "07",
    title: "SEO / GEO Optimization",
    icon: Search,
    description:
      "Total visibility across both traditional search and next-gen AI engines. We engineer your digital presence to dominate Google rankings and position your brand as the ultimate authority in AI-synthesized answers.",
    services: [
      "Generative Engine Optimization (GEO)",
      "Technical SEO Architecture",
      "Schema & Knowledge Graphing",
      "High-Authority Content Strategy",
    ],
    tools: "Ahrefs, Semrush, Perplexity AI, Google Search Console",
  },
]

