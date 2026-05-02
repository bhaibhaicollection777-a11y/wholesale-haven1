import heroImg from "@/assets/hero-model.jpg";

const WA_NUMBER = "923049116786";

export const Hero = () => {
  return (
    <section id="home" className="relative gradient-hero overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24">
        <div className="order-2 md:order-1 animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-accent" />
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
              Wholesale Collection 2026
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-primary leading-[1.05] mb-6 text-balance">
            Threads of <em className="text-accent">Elegance</em>, Woven for You.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Premium ladies suits, lawn, chiffon &amp; bridal — at unbeatable wholesale rates.
            Trusted by 500+ retailers across Pakistan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#collections"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-primary-glow transition-smooth shadow-elegant"
            >
              Shop Collection
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Assalam-o-alaikum,%20main%20wholesale%20rates%20chahta/chahti%20hun`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-primary text-primary px-8 py-4 text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              Get Wholesale Rates
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <Stat n="500+" l="Retailers" />
            <Stat n="10K+" l="Orders" />
            <Stat n="100%" l="Original" />
          </div>
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="absolute -inset-4 gradient-gold opacity-20 blur-3xl rounded-full" />
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={heroImg}
              alt="Model wearing premium pink embroidered Pakistani lawn suit"
              width={1080}
              height={1440}
              className="w-full h-full object-cover shadow-elegant"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur p-5 border-l-4 border-accent shadow-soft">
              <p className="text-xs tracking-[0.25em] uppercase text-accent mb-1">Featured</p>
              <p className="font-display text-2xl text-primary leading-tight">
                Embroidered Lawn Suit
              </p>
              <p className="text-xs text-muted-foreground mt-1">Starting Rs. 2,800 / piece</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ n, l }: { n: string; l: string }) => (
  <div>
    <div className="font-display text-3xl text-primary">{n}</div>
    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{l}</div>
  </div>
);
