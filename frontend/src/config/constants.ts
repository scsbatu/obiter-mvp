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
    navigationPath: "/projects",
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
  methodology
};
