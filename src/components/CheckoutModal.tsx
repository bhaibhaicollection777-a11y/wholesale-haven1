import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Costumer Name is required").max(80),
  phone: z.string().trim().min(10, "Valid Whatsapp Num is required").max(20),
  city: z.string().trim().max(50).optional(),
  address: z.string().trim().min(5, "Address is required").max(200),
});

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    slug?: string;
    name: string;
    price: string;
    salePrice?: string;
  };
}

export const CheckoutModal = ({ isOpen, onClose, product }: CheckoutModalProps) => {
  const { cart, getTotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [orderSent, setOrderSent] = useState(false);

  const DELIVERY_CHARGE = 280;

  const orderDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const productName = useMemo(() => {
    if (product) return product.name;
    return cart.map((item) => item.name).join(", ") || "";
  }, [cart, product]);

  const designCode = useMemo(() => {
    if (product) return product.slug || "";
    return cart.map((item) => item.slug).join(", ") || "";
  }, [cart, product]);

  const priceValue = useMemo(() => {
    if (product) {
      return product.salePrice && product.salePrice.trim() !== ""
        ? parseFloat(product.salePrice)
        : parseFloat(product.price);
    }
    return cart.reduce((sum, item) => {
      const price = item.salePrice && item.salePrice.trim() !== ""
        ? parseFloat(item.salePrice)
        : parseFloat(item.price);
      return sum + price * item.quantity;
    }, 0);
  }, [cart, product]);

  const totalPayment = useMemo(() => priceValue + DELIVERY_CHARGE, [priceValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        "Order Date": orderDate,
        "Costumer Name": result.data.name,
        "Whatsapp Num": result.data.phone,
        City: result.data.city || "",
        Address: result.data.address,
        "Product Name": productName,
        "Design Code": designCode,
        Price: String(totalPayment),
        Status: "Pending",
      };

      const response = await fetch("https://sheetdb.io/api/v1/2xiyf90ls1ys1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [orderPayload] }),
      });

      if (!response.ok) {
        throw new Error("SheetDB request failed");
      }

      toast.success("Order received. Hamari team jald raabta karegi.");
      setForm({ name: "", phone: "", city: "", address: "" });
      setOrderSent(true);
      if (!product) {
        clearCart();
      }
    } catch (error) {
      toast.error("Failed to send order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background p-6 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl text-primary">Complete Your Order</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {product && (
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-primary mb-2">Product Details</h4>
            <p className="text-sm text-muted-foreground">{product.name}</p>
            <p className="text-sm font-medium text-primary mt-1">
              Rs. {product.salePrice && product.salePrice.trim() !== "" ? product.salePrice : product.price}
            </p>
            <div className="mt-4 rounded-md border border-border bg-background/80 p-3 text-sm text-muted-foreground">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Product Price:</span>
                <span>Rs. {parseFloat(product.salePrice && product.salePrice.trim() !== "" ? product.salePrice : product.price)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>Delivery Charge:</span>
                <span>Rs. {DELIVERY_CHARGE}</span>
              </div>
              <div className="flex justify-between font-semibold text-primary mt-3">
                <span>Total Payment:</span>
                <span>Rs. {totalPayment}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                For any details WhatsApp number 03049116786
              </p>
            </div>
          </div>
        )}

        {!product && cart.length > 0 && (
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Cart Summary ({cart.length} items)
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {cart.map((item) => {
                const price = item.salePrice && item.salePrice.trim() !== ""
                  ? parseFloat(item.salePrice)
                  : parseFloat(item.price);
                return (
                  <div key={item.slug} className="flex justify-between text-sm">
                    <span className="truncate">{item.name} (x{item.quantity})</span>
                    <span>Rs. {price * item.quantity}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-2 mt-2 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal:</span>
                <span>Rs. {getTotal()}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery Charge:</span>
                <span>Rs. {DELIVERY_CHARGE}</span>
              </div>
              <div className="flex justify-between font-semibold text-primary">
                <span>Total Payment:</span>
                <span>Rs. {getTotal() + DELIVERY_CHARGE}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                For any details WhatsApp number 03049116786
              </p>
            </div>
          </div>
        )}

        {orderSent ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-muted/60 p-6 text-center">
              <p className="text-base font-medium text-primary">
                Shukriya! Aapka order mil gaya hai. Hamari team aap se confirmation ke liye jald raabta karegi.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-[0.25em] uppercase hover:bg-primary-glow transition-smooth"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Order Date</label>
              <input
                type="text"
                readOnly
                value={orderDate}
                className="mt-1.5 w-full bg-muted/20 border border-border px-4 py-3 text-sm text-muted-foreground"
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Costumer Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={80}
                className="mt-1.5 w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-smooth"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Whatsapp Num</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                maxLength={20}
                className="mt-1.5 w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-smooth"
                placeholder="03XX XXXXXXX"
                required
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                maxLength={50}
                className="mt-1.5 w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-smooth"
                placeholder="Enter your city"
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                maxLength={200}
                rows={3}
                className="mt-1.5 w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-smooth resize-none"
                placeholder="Enter complete delivery address"
                required
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Product Name</label>
              <input
                type="text"
                readOnly
                value={productName}
                className="mt-1.5 w-full bg-muted/20 border border-border px-4 py-3 text-sm text-muted-foreground"
              />
            </div>

            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Price</label>
              <input
                type="text"
                readOnly
                value={`Rs. ${totalPayment}`}
                className="mt-1.5 w-full bg-muted/20 border border-border px-4 py-3 text-sm text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground mt-2">
                For any details WhatsApp number 03049116786
              </p>
            </div>

            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Status</label>
              <input
                type="text"
                readOnly
                value="Pending"
                className="mt-1.5 w-full bg-muted/20 border border-border px-4 py-3 text-sm text-muted-foreground"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-[0.25em] uppercase hover:bg-primary-glow transition-smooth disabled:opacity-50"
            >
              {loading ? "Sending..." : "Confirm Order"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};