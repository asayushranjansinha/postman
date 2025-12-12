import { CTA } from "@/components/site/Cta";
import { Features } from "@/components/site/Features";
import { Hero } from "@/components/site/HeroSection";
import { LiveDemo } from "@/components/site/live-demo";
import { Performance } from "@/components/site/Performance";
import { PricingSection } from "@/components/site/PricingSection";
import { Testimonials } from "@/components/site/Testimonial";
import { WorkflowSteps } from "@/components/site/workflow/WorkflowSteps";

function MarketingPage() {
  return (
    <div className="min-h-svh flex flex-col">
      <Hero />
      <LiveDemo />
      <Features />
      <WorkflowSteps />
      <Testimonials />
      <PricingSection />
      <CTA />
      <Performance />
    </div>
  );
}

export default MarketingPage;
