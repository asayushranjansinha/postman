import {
  ComparisonData,
  HeroContent,
  PerformanceMetric,
  PricingPlan,
  ProductFeature,
  Testimonial,
  WorkflowStat,
  WorkflowStep,
} from "@/types/marketing";
import {
  BarChart3Icon,
  ClockIcon,
  Code2Icon,
  GitBranchIcon,
  GlobeIcon,
  RocketIcon,
  ShieldIcon,
  TestTube2Icon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: 1,
    title: "Build Your APIs",
    subtitle: "For Developers",
    description:
      "Write and document your APIs with our intuitive editor. Support for REST, GraphQL, and WebSocket protocols with auto-generated documentation.",
    icon: Code2Icon,
    features: [
      "OpenAPI Specification",
      "Auto Documentation",
      "Version Control",
    ],
    color: "primary",
    codeSnippet: `// Define your endpoint
app.post('/api/users', async (req) => {
  const user = await createUser(req.body)
  return { success: true, data: user }
})`,
  },
  {
    number: 2,
    title: "Test with PulseAPI",
    subtitle: "For QA Teams",
    description:
      "Run comprehensive tests with our powerful testing suite. Automated testing, load testing, and real-time monitoring all in one place.",
    icon: TestTube2Icon,
    features: ["Automated Testing", "Load Testing", "Real-time Monitoring"],
    color: "accent",
    codeSnippet: `// Run test suite
pulse.test('User Creation', async () => {
  const res = await pulse.post('/api/users')
  expect(res.status).toBe(201)
  expect(res.time).toBeLessThan(200)
})`,
  },
  {
    number: 3,
    title: "Deploy & Go Live",
    subtitle: "Ship to Production",
    description:
      "Deploy with confidence. One-click deployment to any cloud provider with automatic scaling, SSL, and monitoring built-in.",
    icon: RocketIcon,
    features: ["One-Click Deploy", "Auto Scaling", "SSL & Security"],
    color: "chart-4",
    codeSnippet: `// Deploy to production
$ pulse deploy --env production

✓ Building API bundle...
✓ Running health checks...
✓ Deploying to 3 regions...
✓ Live at api.yourapp.com`,
  },
];

export const WORKFLOW_STATS: WorkflowStat[] = [
  {
    icon: ClockIcon,
    value: "Days",
    label: "Not Months",
    description: "Ship 10x faster",
  },
  {
    icon: UsersIcon,
    value: "50K+",
    label: "Developers",
    description: "Trust PulseAPI",
  },
  {
    icon: ZapIcon,
    value: "99.9%",
    label: "Uptime",
    description: "Enterprise ready",
  },
];

export const PRODUCT_FEATURES: ProductFeature[] = [
  {
    icon: ZapIcon,
    title: "Blazing Fast Execution",
    description:
      "Run thousands of API tests in parallel with sub-millisecond overhead. Our Rust-powered engine delivers unprecedented performance.",
    highlight: "10x faster",
  },
  {
    icon: Code2Icon,
    title: "Code-First Workflows",
    description:
      "Write tests in TypeScript, JavaScript, or Python. Full IDE support with autocomplete, type checking, and inline documentation.",
    highlight: "Any language",
  },
  {
    icon: GitBranchIcon,
    title: "Git-Native Testing",
    description:
      "Version control your API tests alongside your code. Automatic CI/CD integration with GitHub, GitLab, and Bitbucket.",
    highlight: "CI/CD ready",
  },
  {
    icon: BarChart3Icon,
    title: "Real-Time Analytics",
    description:
      "Monitor API performance with live dashboards. Track latency, error rates, and throughput across all your endpoints.",
    highlight: "Live metrics",
  },
  {
    icon: ShieldIcon,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. End-to-end encryption, SSO support, and granular role-based access control.",
    highlight: "SOC 2 certified",
  },
  {
    icon: GlobeIcon,
    title: "Global Edge Testing",
    description:
      "Test your APIs from 50+ locations worldwide. Identify regional performance issues before your users do.",
    highlight: "50+ regions",
  },
];

export const CUSTOMER_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "PulseAPI cut our API testing time from 45 minutes to under 2 minutes. The speed difference is genuinely shocking.",
    author: "Sarah Chen",
    role: "Staff Engineer at Vercel",
    avatar: "/professional-woman-engineer-headshot.png",
  },
  {
    quote:
      "Finally, an API tool that feels as fast as my IDE. The TypeScript integration is flawless and the real-time feedback is addictive.",
    author: "Marcus Rivera",
    role: "API Lead at Stripe",
    avatar: "/professional-developer-headshot.png",
  },
  {
    quote:
      "We migrated 2,000+ Postman collections in a weekend. The import tool is incredible and our team productivity doubled.",
    author: "Emily Nakamura",
    role: "Head of Engineering at Linear",
    avatar: "/professional-woman-tech-lead-headshot.jpg",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "For individual developers",
    features: [
      "1,000 API tests/month",
      "3 team members",
      "Basic analytics",
      "Community support",
      "7-day history",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "For growing teams",
    features: [
      "Unlimited API tests",
      "25 team members",
      "Advanced analytics",
      "Priority support",
      "90-day history",
      "CI/CD integrations",
      "Custom environments",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Unlimited everything",
      "Unlimited team members",
      "Custom analytics",
      "24/7 dedicated support",
      "Unlimited history",
      "SSO & SAML",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export const HERO_CONTENT: HeroContent = {
  codeSnippet: `// Test your API in milliseconds
const response = await pulse.test({
  method: "POST",
  endpoint: "/api/users",
  headers: {
    "Authorization": "Bearer \${token}",
    "Content-Type": "application/json"
  },
  body: {
    name: "Alex Chen",
    email: "alex@company.com"
  }
});

// Response time: 23ms ✓
console.log(response.status); // 201`,
  trustedCompanies: ["Vercel", "Stripe", "Linear", "Notion", "Figma"],
};

export const PERFORMANCE_METRICS: PerformanceMetric[] = [
  { label: "Avg Response Time", value: 23, unit: "ms", target: 23 },
  { label: "Tests/Second", value: 50000, unit: "", target: 50000 },
  { label: "Uptime", value: 99.99, unit: "%", target: 99.99 },
  { label: "Edge Locations", value: 50, unit: "+", target: 50 },
];

export const PERFORMANCE_COMPARISON: ComparisonData[] = [
  { name: "PulseAPI", time: 23, color: "bg-primary" },
  { name: "Postman", time: 156, color: "bg-muted" },
  { name: "Insomnia", time: 189, color: "bg-muted" },
  { name: "Thunder Client", time: 203, color: "bg-muted" },
];

export const FAQ_ITEMS = [
  {
    value: "item-1",
    question: "What is the core difference between PulseAPI and Postman?",
    answer:
      "PulseAPI is built specifically for speed and automation at scale, integrating testing, debugging, and monitoring into a single, cohesive workflow. Unlike legacy tools, our engine is designed for parallel execution and instant feedback, minimizing context switching and providing deep integration with CI/CD pipelines from day one. We focus on 'speed of thought' interactions.",
  },
  {
    value: "item-2",
    question: "Do I need a credit card to start the free tier?",
    answer:
      "Absolutely not. Our 'Free Forever' tier requires no credit card. You can start building, testing, and debugging immediately. You only need to enter payment details if you decide to upgrade to a Pro or Enterprise plan.",
  },
  {
    value: "item-3",
    question: "How is the data secured on the platform?",
    answer:
      "Security is paramount. We use end-to-end encryption for all data transmission and storage, adhere to strict GDPR and SOC 2 compliance standards, and offer features like dedicated environments and IP whitelisting for Enterprise users. All credentials and secrets are encrypted using AES-256.",
  },
  {
    value: "item-4",
    question: "What languages and environments do you support?",
    answer:
      "PulseAPI is language-agnostic. We support HTTP/1.1, HTTP/2, WebSockets, and gRPC protocols. Our CLI, SDKs, and runners are available for integration into almost any environment, including Node.js, Python, Go, and Java.",
  },
];
