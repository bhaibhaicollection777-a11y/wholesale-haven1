import { Instagram, Facebook, MessageCircle } from "lucide-react";

const PHONE = "+92 304 9116786";
const WA_NUMBER = "923049116786";

export const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-16 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <div className="font-display text-3xl tracking-[0.2em]">SASTI</div>
        <div className="text-xs tracking-[0.4em] opacity-70 mt-1">COLLECTION</div>
        <p className="mt-6 text-sm opacity-80 max-w-sm leading-relaxed">
          Pakistan's trusted wholesale destination for ladies suits, lawn, embroidered &amp; bridal
          collections. Factory rates. Premium quality.
        </p>
        <div className="flex gap-3 mt-6">
          {[
            { i: Instagram, h: "https://instagram.com" },
            { i: Facebook, h: "https://facebook.com" },
            { i: MessageCircle, h: `https://wa.me/${WA_NUMBER}` },
          ].map((s, idx) => (
            <a key={idx} href={s.h} target="_blank" rel="noreferrer" className="w-10 h-10 border border-primary-foreground/30 flex items-center justify-center hover:bg-accent hover:border-accent transition-smooth">
              <s.i className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-xl mb-5">Explore</h4>
        <ul className="space-y-3 text-sm opacity-80">
          <li><a href="#collections" className="hover:opacity-100 hover:text-accent transition-smooth">Home</a></li>
          <li><a href="#collections" className="hover:opacity-100 hover:text-accent transition-smooth">Collections</a></li>
          <li><a href="#about" className="hover:opacity-100 hover:text-accent transition-smooth">About Us</a></li>
          <li><a href="#wholesale" className="hover:opacity-100 hover:text-accent transition-smooth">Wholesale</a></li>
          <li><a href="#contact" className="hover:opacity-100 hover:text-accent transition-smooth">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-xl mb-5">Contact</h4>
        <ul className="space-y-3 text-sm opacity-80">
          <li><a href={`tel:${PHONE}`} className="hover:text-accent transition-smooth">{PHONE}</a></li>
          <li><a href={`https://wa.me/${WA_NUMBER}`} className="hover:text-accent transition-smooth">WhatsApp Order</a></li>
          <li>sheikhmoiz7889@gmail.com</li>
          <li>Lahore, Pakistan</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/15">
      <div className="container py-5 text-xs opacity-60 text-center md:text-left flex flex-col md:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} Sasti Collection. All rights reserved.</span>
        <span>Made with love for resellers across Pakistan.</span>
      </div>
    </div>
  </footer>
);
