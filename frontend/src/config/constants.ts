import {
  Scale,
  FileText,
  Brain,
  Zap,
  Shield,
  Clock,
  Target,
  User,
  Building2,
  Folder,
  Upload,
  FolderUp
} from "lucide-react";

const COMMON_PROTECT_ROUTE_PATH = "/";

const userTypes = ["Lawyer", "Academic", "Student"];

const CLIENT_ID = "853408079388-9ic8luh7u7t30k2pvobu9g8r0h14r4fa.apps.googleusercontent.com"

const API_URL = "https://slbq98s1h4.execute-api.ap-southeast-2.amazonaws.com/dev/api"

const features = [
  "Your Documents Only",
  "No External Research",
  "Human Judgement First",
  "Lawyer Designed",
];

const steps = [
  {
    icon: FileText,
    title: "Create Your Project",
    description:
      "Start a new legal project by uploading your documents or case files. Our AI immediately begins analyzing the content structure and legal frameworks.",
  },
  {
    icon: Brain,
    title: "Upload Documents",
    description:
      "Our AI processes thousands of legal documents, contracts, precedents, and regulatory frameworks to provide comprehensive analysis and insights.",
  },
  {
    icon: Scale,
    title: "Analyze with AI",
    description:
      "Advanced machine learning algorithms examine legal precedents, identify potential risks, and suggest strategic approaches tailored to your specific case.",
  },
  {
    icon: Zap,
    title: "Export Results",
    description:
      "Generate detailed reports, legal briefs, and actionable recommendations. Export in various formats compatible with your existing workflow and systems.",
  },
];

const methodology = [
  {
    icon: FileText,
    title: "Upload",
    description:
      "Secure document ingestion with support for all major formats",
  },
  {
    icon: Brain,
    title: "Analyse",
    description:
      "AI-powered processing with legal domain expertise",
  },
  {
    icon: Scale,
    title: "Review",
    description:
      "Interactive exploration of findings and insights",
  },
  {
    icon: Zap,
    title: "Export",
    description:
      "Court-ready documents and strategic recommendations",
  },
];

const faqs = [
  {
    question: "Does our platform work for big law firms?",
    answer:
      "Yes, Obliter AI is designed to scale with organizations of all sizes, from solo practitioners to large international law firms. Our enterprise features include advanced security, team collaboration tools, and custom integrations.",
  },
  {
    question: "How secure is our legal data?",
    answer:
      "Security is our top priority. We use enterprise-grade encryption, maintain SOC 2 Type II compliance, and follow strict data governance protocols. Your client data never leaves our secure, audited infrastructure.",
  },
  {
    question: "Can this be white-labeled?",
    answer:
      "Yes, we offer white-label solutions for larger firms and legal service providers. This allows you to integrate our AI capabilities seamlessly into your existing brand and client experience.",
  },
  {
    question: "What are your data privacy and ethics policies?",
    answer:
      "We adhere to the highest standards of data privacy and legal ethics. Our platform is GDPR compliant, follows attorney-client privilege protocols, and maintains strict confidentiality standards required in the legal profession.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing based on usage and team size, with options for solo practitioners, small firms, and enterprise organizations. Contact us for a customized quote based on your specific needs.",
  },
  {
    question: "Can there be confidentiality guarantees?",
    answer:
      "Absolutely. We provide comprehensive confidentiality agreements and maintain strict data isolation. All data processing occurs within secure, audited environments with full compliance to legal confidentiality requirements.",
  },
  {
    question: "What is the license structure we use?",
    answer:
      "We offer various licensing options including per-user subscriptions, enterprise licenses, and custom agreements for large organizations. All licenses include full access to our AI capabilities and ongoing support.",
  },
  {
    question:
      "How does Obliter AI work for law firms and consultants of any legal size?",
    answer:
      "Our platform is built to be scalable and flexible. Whether you're a solo practitioner or a 1000+ attorney firm, Obliter AI adapts to your workflow, integrates with your existing systems, and grows with your practice.",
  },
];

const featuresIcon = [
  {
    icon: Shield,
    title: "AI That Respects Legal Expertise",
    description:
      "Our AI understands that lawyers are irreplaceable. Instead of replacing legal expertise, Obliter AI amplifies it by handling routine tasks, allowing you to focus on strategy, client relationships, and complex legal reasoning.",
  },
  {
    icon: Clock,
    title: "Comprehensive Document Suite",
    description:
      "Advanced legal intelligence that covers contracts, litigation support, compliance monitoring, and regulatory analysis. Get comprehensive insights across all aspects of your legal practice.",
  },
  {
    icon: Target,
    title: "Legal Intelligence Suite",
    description:
      "Enhanced AI for legal professionals who understand that excellence in law requires both human expertise and intelligent automation working in perfect harmony.",
  },
];

const projects = [
  {
    title: "Thompson v Metropolitan Shopping Centers",
    type: "Premises Liability",
    status: "Active",
    documents: 13,
    analyses: 2,
  },
  {
    title: "R v Williams",
    type: "Criminal Defence",
    status: "Active",
    documents: 24,
    analyses: 5,
  },
  {
    title: "Estate of Johnson",
    type: "Probate Matter",
    status: "Active",
    documents: 8,
    analyses: 1,
  },
];

const tools = [
  {
    title: "Witness Evidence Analyser",
    description:
      "Comprehensive witness preparation toolkit for examination-in-chief and cross-examination.",
    icon: User,
    features: [
      "Non-leading question generation",
      "Cross-examination strategies",
      "Credibility assessment",
      "Contradiction identification",
    ],
  },
  {
    title: "Court Judgement Summariser",
    description:
      "Extract key holdings, reasoning, and precedential value from court judgements.",
    icon: Building2,
    features: [
      "Key holdings extraction",
      "Ratio decidendi identification",
      "Precedential value assessment",
      "Concise case summaries",
    ],
  },
];

const dashboardCard = [
  {
    title: "Create Projects",
    description: "Create your cases",
    icon: FolderUp,
    navigationPath: "/projects/create-project",
  },
  {
    title: "View Projects",
    description: "Manage your cases",
    icon: Folder,
    navigationPath: "/projects",
  },
  {
    title: "Witness Analysis",
    description: "Prepare examinations",
    icon: User,
    navigationPath: "/analysis",
  },
  {
    title: "Judgement Summary",
    description: "Extract key holdings",
    icon: Building2,
    navigationPath: "/judgement",
  },
  {
    title: "Upload Documents",
    description: "Add to projects",
    icon: Upload,
    navigationPath: "",
  },
];

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Tools", href: "/analysis" },
    { label: "About", href: "/about" },
  ];

  const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Case Studies", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
      { label: "Compliance", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Support", isLabel: true },
      { label: "support@obliterai.com", href: "mailto:support@obliterai.com" },
      { label: "Sales", isLabel: true },
      { label: "sales@obliterai.com", href: "mailto:sales@obliterai.com" },
    ],
  },
];

const analysisSteps = [
  {
    id: 1,
    title: "Document Processing",
    description: "Extracting data and cross-referencing witnesses",
    duration: 2000
  },
  {
    id: 2,
    title: "Issue Identification",
    description: "Identifying legal issues, gaps, and inconsistencies",
    duration: 3000
  },
  {
    id: 3,
    title: "Contradiction Analysis",
    description: "Comparing testimonies for inconsistencies",
    duration: 2500
  },
  {
    id: 4,
    title: "Credibility Assessment",
    description: "Assessing witness credibility factors",
    duration: 3500
  },
  {
    id: 5,
    title: "Question Generation",
    description: "Building examination questions using logical methods",
    duration: 4000
  }
];

const witnessResults = [
  {
    id: 1,
    name: "Sarah Michelle Thompson",
    credibilityScore: 7.2,
    assessments: {
      consistency: 4,
      detailLevel: 3,
      biasIndicators: 2,
      corroboration: 4
    }
  },
  {
    id: 2,
    name: "Michelle Chen",
    credibilityScore: 8.5,
    assessments: {
      professionalObserver: 5,
      contemporaneousNotes: 4,
      neutralWitness: 4,
      trainingExperience: 5
    }
  }
];

const sampleDocuments = [
  {
    title: "01 Overview of Brief.pdf",
    fileSize: "3.2 MB",
    uploadDate: "23 Aug 2023",
    pages: 8,
    tags: [
      { label: "Brief", variant: "settlement" as const },
      { label: "Overview", variant: "default" as const },
    ],
  },
  {
    title: "02 Statement of Claim.pdf",
    fileSize: "1.8 MB",
    uploadDate: "23 Aug 2023",
    pages: 6,
    tags: [
      { label: "Pleading", variant: "plaintiff" as const },
      { label: "Claim", variant: "default" as const },
    ],
  },
  {
    title: "03 Defence and Counterclaim.pdf",
    fileSize: "2.1 MB",
    uploadDate: "23 Aug 2023",
    pages: 7,
    tags: [
      { label: "Defence", variant: "defendant" as const },
      { label: "Counterclaim", variant: "defendant" as const },
    ],
  },
  {
    title: "04 Plaintiff Affidavit.pdf",
    fileSize: "1.5 MB",
    uploadDate: "5 August 2024",
    pages: 4,
    tags: [
      { label: "Affidavit", variant: "plaintiff" as const },
      { label: "Sworn", variant: "default" as const },
    ],
  },
  {
    title: "05 Report of Michelle Chen.pdf",
    fileSize: "2.8 MB",
    uploadDate: "5 March 2024",
    pages: 12,
    tags: [
      { label: "Expert", variant: "expert" as const },
      { label: "Medical", variant: "medical" as const },
      { label: "Independent Report", variant: "default" as const },
    ],
  },
  {
    title: "06 Security Footage Analysis Report.pdf",
    fileSize: "4.2 MB",
    uploadDate: "12 February 2024",
    pages: 15,
    tags: [
      { label: "Expert", variant: "expert" as const },
      { label: "View Analysis", variant: "default" as const },
      { label: "CCTV", variant: "default" as const },
    ],
  },
  {
    title: "07 Café Employee Statement.pdf",
    fileSize: "0.8 MB",
    uploadDate: "12 August 2024",
    pages: 3,
    tags: [
      { label: "Witness", variant: "defendant" as const },
      { label: "Employee", variant: "default" as const },
    ],
  },
  {
    title: "08 Systematic Statement.pdf",
    fileSize: "1.2 MB",
    uploadDate: "8 August 2024",
    pages: 5,
    tags: [{ label: "Statement", variant: "default" as const }],
  },
  {
    title: "10 Expert Orthopaedic Report.pdf",
    fileSize: "3.1 MB",
    uploadDate: "12 September 2024",
    pages: 18,
    tags: [
      { label: "Expert", variant: "expert" as const },
      { label: "Medical", variant: "medical" as const },
      { label: "Orthopaedic", variant: "default" as const },
    ],
  },
  {
    title: "11 Economic Loss Report.pdf",
    fileSize: "2.4 MB",
    uploadDate: "30 December 2024",
    pages: 22,
    tags: [
      { label: "Expert", variant: "expert" as const },
      { label: "Economic", variant: "settlement" as const },
      { label: "Damages", variant: "default" as const },
    ],
  },
  {
    title: "12 Expert Injury Evidence.pdf",
    fileSize: "1.9 MB",
    uploadDate: "15 October 2024",
    pages: 8,
    tags: [
      { label: "Expert", variant: "expert" as const },
      { label: "Injury", variant: "medical" as const },
      { label: "Evidence", variant: "default" as const },
    ],
  },
  {
    title: "13 Settlement Conference Statement.pdf",
    fileSize: "1.1 MB",
    uploadDate: "20 November 2024",
    pages: 6,
    tags: [
      { label: "Settlement", variant: "settlement" as const },
      { label: "Conference", variant: "default" as const },
    ],
  },
];

const layWitnesses = [
  {
    id: 1,
    name: "Sarah Michelle Thompson",
    role: "35 year old primary school teacher",
    description: "Document: Statement of Claim, Personal Analysis",
    additional: ["Personal statement", "Statement brief"],
  },
  {
    id: 2,
    name: "Michelle Chen",
    role: "Security Officer - First Responder",
    description: "Document: Security incident report dated 15 March 2024",
    additional: ["Witness statement", "First responder", "Expert report"],
  },
  {
    id: 3,
    name: "James Michael Wilson",
    role: "Coffee Corner Cafe Staff Member",
    description: "Document: Witness Statement dated 16 August 2024",
    additional: ["Witness statement", "Statement provided", "Used for trial"],
  },
  {
    id: 4,
    name: "Margaret Rose Davis",
    role: "Good Samaritan - Assisted Plaintiff",
    description: "Document: Witness Statement dated 16 August 2024",
    additional: [
      "Witness statement",
      "Statement provided",
      "Critical evidence",
    ],
  },
];

const expertWitnesses = [
  {
    id: 5,
    name: "Dr Michael Roberts",
    role: "Treating GP and Medical Expert",
    description:
      "Document: Expert Engineering Safety Report dated 24 July 2024",
    additional: ["Report provided", "Expert report"],
  },
  {
    id: 6,
    name: "Dr Jennifer Walsh",
    role: "Forensic Accountant",
    description: "Document: Medical Report dated 06 Sept 2024",
    additional: ["Report provided", "Treatment provided", "Report of"],
  },
  {
    id: 7,
    name: "Susan Mitchell CPA",
    role: "Forensic Accountant",
    description: "Document: Economic Loss Report dated 20 Sept 2024",
    additional: ["Economic loss", "Report provided", "SARCOS loss"],
  },
  {
    id: 8,
    name: "Dr Andrew Mitchell",
    role: "Forensic Safety Analysis Expert",
    description:
      "Document: Security Footage Analysis Report dated 25 Sept 2024",
    additional: ["Risk analysis", "Report provided", "Document examination"],
  },
];


export {
  COMMON_PROTECT_ROUTE_PATH,
  userTypes,
  features,
  steps,
  faqs,
  featuresIcon,
  projects,
  tools,
  dashboardCard,
  methodology,
  navItems,
  footerLinks,
  analysisSteps,
  witnessResults,
  sampleDocuments,
  layWitnesses,
  expertWitnesses,
  CLIENT_ID,
  API_URL
};
