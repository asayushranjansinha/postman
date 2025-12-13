import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Assuming Shadcn Accordion components are correctly aliased

// Import the constant
import { FAQ_ITEMS } from "@/constants/marketing";
import Link from "next/link";

export function FaqSection() {
  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            Support
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Quick answers to the most common queries we receive.
          </p>
        </div>

        {/* Accordion List */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              value={item.value}
              key={item.value}
              className="border border-border rounded-xl bg-card transition-all duration-300 hover:border hover:border-primary/50"
            >
              <AccordionTrigger className="group flex justify-between items-center w-full text-left p-6 font-semibold text-base sm:text-lg text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="p-6 text-base text-muted-foreground leading-relaxed animate-in fade-in duration-300">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA below the FAQs */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Can't find the answer you're looking for?
          </p>
          <Link href="#contact" passHref>
            <button className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold px-8 py-3 text-base glow-blue hover:bg-accent/90 transition-colors">
              Contact our Support Team
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
