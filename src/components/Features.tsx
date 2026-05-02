import { Truck, Tag, ShieldCheck, Package } from "lucide-react";

const features = [
  { icon: Tag, title: "Factory Rates", desc: "Direct from manufacturer — no middleman markup." },
  { icon: Package, title: "Bulk Discounts", desc: "Bigger your order, better the price. Tiered pricing." },
  { icon: Truck, title: "Pakistan-wide Delivery", desc: "Fast, tracked shipping to all major cities." },
  { icon: ShieldCheck, title: "100% Original", desc: "Quality-checked stitching & fabric, every order." },
];

export const Features = () => (
  <section id="wholesale" className="py-20 bg-secondary">
    <div className="container">
      <div className="text-center mb-14">
        <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">Why Choose Us</span>
        <h2 className="font-display text-4xl md:text-5xl text-primary mt-4">
          Built for Wholesale Buyers
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="bg-background p-8 shadow-card hover:shadow-elegant transition-smooth">
            <div className="w-12 h-12 gradient-gold flex items-center justify-center mb-5">
              <f.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl text-primary mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
