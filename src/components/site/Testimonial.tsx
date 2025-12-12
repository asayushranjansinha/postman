import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuoteIcon } from "lucide-react" 
import { CUSTOMER_TESTIMONIALS } from "@/constants/marketing"

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Loved by developers worldwide
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {CUSTOMER_TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group"
            >
              {/* Quote Icon */}
              <QuoteIcon className="w-10 h-10 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />

              <blockquote className="text-foreground mb-6 leading-relaxed">{testimonial.quote}</blockquote>

              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {testimonial.author
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}