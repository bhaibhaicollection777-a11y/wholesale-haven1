export const About = () => (
  <section id="about" className="py-20 md:py-28">
    <div className="container grid md:grid-cols-2 gap-14 items-center">
      <div>
        <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">Our Story</span>
        <h2 className="font-display text-4xl md:text-5xl text-primary mt-4 mb-6 leading-tight">
          Crafting trust, one thread at a time.
        </h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Sasti Collection started with a simple promise — premium quality ladies wear at honest
          wholesale prices. Today we supply hundreds of boutiques, online sellers and retail shops
          across Pakistan.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          From breezy lawn suits to richly embroidered bridals, every piece passes our
          quality check before it reaches you.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 max-w-md">
          <div className="border-l-2 border-accent pl-4">
            <div className="font-display text-3xl text-primary">5+ Years</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">In Business</div>
          </div>
          <div className="border-l-2 border-accent pl-4">
            <div className="font-display text-3xl text-primary">All Pakistan</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Delivery</div>
          </div>
        </div>
      </div>
      <div className="relative aspect-[5/6] gradient-hero overflow-hidden">
        <div className="absolute inset-8 border border-accent/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-10">
          <div>
            <p className="font-display text-7xl md:text-8xl text-primary leading-none">"</p>
            <p className="font-display text-2xl md:text-3xl text-primary leading-snug mt-4 max-w-sm mx-auto">
              Quality fabric, on-time delivery, and rates that actually work for resellers.
            </p>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mt-6">— Sara, Karachi Boutique</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
