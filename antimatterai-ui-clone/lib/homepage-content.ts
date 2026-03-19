export const heroContent = {
  heading: "High-Performance Web, App, and AI Architecture Built to Dominate.",
  description:
    "We design and develop custom websites, intelligent software, and AI infrastructure that put you in a league of your own. Streamline your operations and scale with absolute confidence using technology that outpaces the industry.",
  ctaLabel: "Start Your Project",
  ctaHref: "/contact",
}

export const servicesSection = {
  heading: "Our Services",
  description:
    "We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.",
}

export type HomepageCaseStudy = {
  id: string
  number: string
  title: string
  tags: string[]
  previewGradient: string
  imageSrc: string | null
  imageAlt: string
  showOnHomepage: boolean
  homepageOrder: number
}

export const caseStudiesSection = {
  heading: "Architected for Dominance",
  description:
    "We don't just write code; we engineer market leaders. Explore the custom platforms, automated workflows, and digital transformations we've deployed.",
}

export const caseStudies: HomepageCaseStudy[] = [
  {
    id: "clinix-ai",
    number: "01",
    title: "Clinix AI",
    tags: ["Web Platform", "AI Agents", "Automation"],
    previewGradient: "from-primary/20 to-primary/5",
    imageSrc: "/case-studies/clinix-ai.svg",
    imageAlt: "Clinix AI case study preview",
    showOnHomepage: true,
    homepageOrder: 1,
  },
  {
    id: "synergies4",
    number: "02",
    title: "Synergies4",
    tags: ["Mobile App", "Enterprise Software"],
    previewGradient: "from-primary/15 to-primary/5",
    imageSrc: "/case-studies/synergies4.svg",
    imageAlt: "Synergies4 case study preview",
    showOnHomepage: true,
    homepageOrder: 2,
  },
  {
    id: "curehire",
    number: "03",
    title: "Curehire",
    tags: ["Website", "Recruitment Workflow AI"],
    previewGradient: "from-primary/20 to-primary/5",
    imageSrc: "/case-studies/curehire.svg",
    imageAlt: "Curehire case study preview",
    showOnHomepage: true,
    homepageOrder: 3,
  },
  {
    id: "owasp-foundation",
    number: "04",
    title: "OWASP Foundation",
    tags: ["Security Platform", "Performance Engineering"],
    previewGradient: "from-primary/15 to-primary/5",
    imageSrc: "/case-studies/owasp-foundation.svg",
    imageAlt: "OWASP Foundation case study preview",
    showOnHomepage: true,
    homepageOrder: 4,
  },
  {
    id: "feature",
    number: "05",
    title: "Feature",
    tags: ["UI/UX", "Product Engineering"],
    previewGradient: "from-primary/20 to-primary/5",
    imageSrc: "/case-studies/feature.svg",
    imageAlt: "Feature case study preview",
    showOnHomepage: true,
    homepageOrder: 5,
  },
  {
    id: "neuralops",
    number: "06",
    title: "NeuralOps",
    tags: ["AI/ML Infrastructure", "Workflow Automation"],
    previewGradient: "from-primary/20 to-primary/5",
    imageSrc: null,
    imageAlt: "NeuralOps case study preview",
    showOnHomepage: false,
    homepageOrder: 6,
  },
  {
    id: "datagrid",
    number: "07",
    title: "DataGrid One",
    tags: ["SEO/GEO", "Analytics Dashboard"],
    previewGradient: "from-primary/15 to-primary/5",
    imageSrc: null,
    imageAlt: "DataGrid One case study preview",
    showOnHomepage: false,
    homepageOrder: 7,
  },
]

export const homepageCaseStudies = caseStudies
  .filter((study) => study.showOnHomepage)
  .sort((a, b) => a.homepageOrder - b.homepageOrder)
  .slice(0, 5)

export type HomepageTrustLogo = {
  id: string
  name: string
  logoSrc: string | null
  showOnHomepage: boolean
  homepageOrder: number
}

export const trustSection = {
  kicker: "Trusted by Industry Leaders",
  heading: "Powering Innovation for Companies Worldwide",
}

export const trustLogos: HomepageTrustLogo[] = [
  { id: "toyota", name: "TOYOTA", logoSrc: null, showOnHomepage: true, homepageOrder: 1 },
  { id: "owasp", name: "OWASP.", logoSrc: null, showOnHomepage: true, homepageOrder: 2 },
  { id: "injazat", name: "injazat", logoSrc: null, showOnHomepage: true, homepageOrder: 3 },
  { id: "lowes", name: "LOWE'S", logoSrc: null, showOnHomepage: true, homepageOrder: 4 },
  { id: "cognizant", name: "Cognizant", logoSrc: null, showOnHomepage: true, homepageOrder: 5 },
  { id: "trimble", name: "Trimble", logoSrc: null, showOnHomepage: true, homepageOrder: 6 },
  { id: "e2open", name: "e2open", logoSrc: null, showOnHomepage: true, homepageOrder: 7 },
]

export const homepageTrustLogos = trustLogos
  .filter((logo) => logo.showOnHomepage)
  .sort((a, b) => a.homepageOrder - b.homepageOrder)
