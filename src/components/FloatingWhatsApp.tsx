import { MessageCircle } from "lucide-react";

const WA_NUMBER = "923049116786";

export const FloatingWhatsApp = () => (
  <a
    href={`https://wa.me/${WA_NUMBER}?text=Assalam-o-alaikum,%20wholesale%20inquiry`}
    target="_blank"
    rel="noreferrer"
    aria-label="Order on WhatsApp"
    className="fixed bottom-6 right-6 z-40 bg-[hsl(142_70%_40%)] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-elegant hover:scale-110 transition-smooth"
  >
    <MessageCircle className="w-6 h-6" />
    <span className="absolute inset-0 rounded-full bg-[hsl(142_70%_40%)] animate-ping opacity-30" />
  </a>
);
