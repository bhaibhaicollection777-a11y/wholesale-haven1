import { FormEvent, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";

const PHONE = "+92 304 9116786";
const WA_NUMBER = "923049116786";
const EMAIL = "sheikhmoiz7889@gmail.com";
const ADDRESS = "Lahore, Punjab, Pakistan";
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwz6eujSRHJ72c_2VMeHl5muL2kD6LkShdNSjDlD735hq47y9aqsADuYFgDbWBP7TbO/exec";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  city: z.string().trim().max(50).optional(),
  address: z.string().trim().min(3, "Address is required").max(120),
  bill: z.string().trim().min(1, "Bill is required").max(50),
  items: z.string().trim().min(3, "Items are required").max(800),
});

export const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", bill: "", items: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    const payload = {
      Name: result.data.name,
      Phone: result.data.phone,
      City: result.data.city || "",
      Address: result.data.address,
      Bill: result.data.bill,
      Items: result.data.items,
    };

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry");
      }

      toast.success("Inquiry sent successfully.");
      setForm({ name: "", phone: "", city: "", address: "", bill: "", items: "" });
    } catch (error) {
      toast.error("Unable to submit inquiry. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary">
      <div className="container grid md:grid-cols-2 gap-12">
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">Get in touch</span>
          <h2 className="font-display text-4xl md:text-5xl text-primary mt-4 mb-6 leading-tight">
            Ready to start your wholesale order?
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Send us your inquiry on WhatsApp or fill the form. We respond within an hour during business hours.
          </p>

          <div className="space-y-5">
            <ContactRow icon={Phone} label="Call us" value={PHONE} href={`tel:${PHONE}`} />
            <ContactRow icon={MessageCircle} label="WhatsApp" value={PHONE} href={`https://wa.me/${WA_NUMBER}`} />
            <ContactRow icon={Mail} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            <ContactRow icon={MapPin} label="Address" value={ADDRESS} />
          </div>

          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 text-sm tracking-[0.2em] uppercase hover:bg-primary-glow transition-smooth shadow-elegant"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>

        <form onSubmit={onSubmit} className="bg-background p-8 md:p-10 shadow-card">
          <h3 className="font-display text-2xl text-primary mb-6">Send an Inquiry</h3>
          <div className="space-y-4">
            <Field label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Field label="Phone Number" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} type="tel" />
            <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
            <Field label="Bill" value={form.bill} onChange={(v) => setForm({ ...form, bill: v })} />
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Items</label>
              <textarea
                value={form.items}
                onChange={(e) => setForm({ ...form, items: e.target.value })}
                rows={5}
                maxLength={800}
                placeholder="List items, quantities, or order details"
                className="mt-1.5 w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-smooth resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-[0.25em] uppercase hover:bg-primary-glow transition-smooth disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Inquiry"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Field = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <div>
    <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={120}
      className="mt-1.5 w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-smooth"
    />
  </div>
);

const ContactRow = ({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) => {
  const content = (
    <>
      <div className="w-11 h-11 border border-accent/50 flex items-center justify-center text-accent shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
        <div className="text-foreground mt-0.5">{value}</div>
      </div>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-4 hover:text-primary transition-smooth">
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-4">{content}</div>
  );
};
