import { WorkflowStat, WorkflowStep } from "@/types/marketing";
import {
  ClockIcon,
  Code2Icon,
  RocketIcon,
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
