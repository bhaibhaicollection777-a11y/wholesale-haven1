import { useState } from "react";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CheckoutModal } from "@/components/CheckoutModal";

const links = [
  { label: "Home", href: "#collections" },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Wholesale", href: "#wholesale" },
  { label: "Contact", href: "#contact" },
];

const PHONE = "+92 304 9116786";
const WA_NUMBER = "923049116786";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      {/* Top strip */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container flex items-center justify-between py-2">
          <span className="hidden sm:block tracking-wider">FREE DELIVERY ON ORDERS ABOVE RS. 25,000</span>
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-accent transition-smooth">
            <Phone className="w-3.5 h-3.5" />
            <span className="tracking-wide">{PHONE}</span>
          </a>
        </div>
      </div>

      <div className="container flex items-center justify-between py-5">
        <button
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <a href="#collections" className="flex flex-col items-center md:items-start mx-auto md:mx-0">
          <span className="font-display text-3xl md:text-4xl text-primary tracking-[0.2em] leading-none">SASTI</span>
          <span className="text-[10px] md:text-xs tracking-[0.4em] text-muted-foreground mt-1">COLLECTION</span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm tracking-wider uppercase text-foreground/80 hover:text-primary transition-smooth"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setCheckoutOpen(true)}
          className="hidden md:inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground px-5 py-2.5 hover:bg-primary-glow transition-smooth"
        >
          <ShoppingBag className="w-4 h-4" />
          Order Now
          {cartCount > 0 && (
            <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        <ShoppingBag className="md:hidden w-5 h-5 text-primary" />
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-up">
          <nav className="container flex flex-col py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-wider uppercase border-b border-border last:border-0"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => setCheckoutOpen(true)}
              className="mt-4 text-center bg-primary text-primary-foreground py-3 text-sm tracking-wider uppercase"
            >
              Order Now {cartCount > 0 && `(${cartCount})`}
            </button>
          </nav>
        </div>
      )}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </header>
  );
};
