import { PRODUCT_FEATURES } from "@/constants/marketing";

export function Features() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Replaced max-w-7xl mx-auto with container and retained px-4 for spacing */}
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            Everything you need to ship reliable APIs
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            A complete toolkit for API development. From rapid prototyping to
            production monitoring, PulseAPI has you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-xl border border-border bg-card hover:bg-secondary/30 transition-all duration-300 hover:border-primary/50"
            >
              {/* Glow effect on hover: Replaced bg-gradient-to-r with bg-linear-to-r */}
              <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
