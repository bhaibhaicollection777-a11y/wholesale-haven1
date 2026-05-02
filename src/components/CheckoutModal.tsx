import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { X, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const WA_NUMBER = "923049116786";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().min(7, "Valid phone required").max(20),
  city: z.string().trim().max(50).optional(),
  address: z.string().trim().min(5, "Address is required").max(200),
});

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    name: string;
    price: string;
    salePrice?: string;
  };
}

export const CheckoutModal = ({ isOpen, onClose, product }: CheckoutModalProps) => {
  const { cart, getTotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      let orderDetails = "";
      let totalAmount = 0;

      if (product) {
        // Single product checkout
        const price = product.salePrice && product.salePrice.trim() !== ""
          ? parseFloat(product.salePrice)
          : parseFloat(product.price);
        orderDetails = `*${product.name}*\nQuantity: 1\nPrice: Rs. ${price}`;
        totalAmount = price;
      } else {
        // Cart checkout
        orderDetails = cart.map(item => {
          const price = item.salePrice && item.salePrice.trim() !== ""
            ? parseFloat(item.salePrice)
            : parseFloat(item.price);
          const itemTotal = price * item.quantity;
          totalAmount += itemTotal;
          return `*${item.name}*\nQuantity: ${item.quantity}\nPrice: Rs. ${price} each\nSubtotal: Rs. ${itemTotal}`;
        }).join('\n\n');
      }

      const message = `*New Order - Wholesale Haven*%0A%0A*Customer Details:*%0AName: ${encodeURIComponent(result.data.name)}%0APhone: ${encodeURIComponent(result.data.phone)}%0ACity: ${encodeURIComponent(result.data.city || "-")}%0AAddress: ${encodeURIComponent(result.data.address)}%0A%0A*Order Details:*%0A${encodeURIComponent(orderDetails)}%0A%0A*Total Bill: Rs. ${totalAmount}*%0A%0A*Payment Method:* Cash on Delivery`;

      window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, "_blank");

      toast.success("Order sent to WhatsApp!");
      setForm({ name: "", phone: "", city: "", address: "" });
      if (!product) {
        clearCart();
      }
      onClose();
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
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium text-primary">
                <span>Total:</span>
                <span>Rs. {getTotal()}</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={80}
              className="mt-1.5 w-full bg-muted/50 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-smooth"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Phone Number</label>
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
            <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Delivery Address</label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-4 text-sm tracking-[0.25em] uppercase hover:bg-primary-glow transition-smooth disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Order to WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
};