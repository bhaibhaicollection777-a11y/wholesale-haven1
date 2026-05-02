import { useMemo, useState } from "react";
import { products } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { CheckoutModal } from "@/components/CheckoutModal";
import { ShoppingCart } from "lucide-react";

const WA_NUMBER = "923049116786";

export const Collection = () => {
  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(products.map((p) => p.category))).filter((category) => category !== "Lawn"),
    ],
    []
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { addToCart } = useCart();
  const visibleProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section id="collections" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
            Wholesale Catalogue
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-primary mt-4 mb-4">
            New Season Collection
          </h2>
          <p className="text-muted-foreground">
            Hand-picked designs at factory-direct wholesale prices. Minimum order quantities apply.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 text-xs tracking-[0.2em] uppercase transition duration-200 ${
                selectedCategory === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-slate-200 bg-background text-muted-foreground hover:border-primary hover:text-primary"
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {visibleProducts.map((p) => {
            const hasSale = p.salePrice && p.salePrice.trim() !== "";
            return (
              <article key={p.slug} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
                  <img
                    src={p.image}
                    alt={`${p.name} — wholesale ${p.category.toLowerCase()} suit`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className={`w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700 ${
                      p.outOfStock ? "opacity-60 grayscale" : ""
                    }`}
                  />
                  <span className="absolute top-3 left-3 bg-background/95 text-primary text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">
                    {p.category}
                  </span>
                  {hasSale && !p.outOfStock && (
                    <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Sale
                    </span>
                  )}
                  {p.outOfStock && (
                    <span className="absolute top-3 right-3 bg-foreground text-background text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Out of stock
                    </span>
                  )}
                  {!p.outOfStock && (
                    <div className="absolute inset-x-3 bottom-3 flex gap-2">
                      <button
                        onClick={() => addToCart(p)}
                        className="flex-1 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase py-2 text-center opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-smooth"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setCheckoutOpen(true);
                        }}
                        className="flex-1 bg-accent text-accent-foreground text-xs tracking-[0.2em] uppercase py-2 text-center opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-smooth flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        Order Now
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl text-foreground leading-tight">
                    {p.name}
                  </h3>
                  {p.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  )}
                  <div className="flex items-baseline justify-between mt-1.5">
                    <div className="flex items-baseline gap-2">
                      {hasSale ? (
                        <>
                          <span className="text-primary font-medium">Rs. {p.salePrice}</span>
                          <span className="text-xs text-muted-foreground line-through">
                            Rs. {p.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-primary font-medium">Rs. {p.price}</span>
                      )}
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {p.moq}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Pura%20catalogue%20bhej%20dein%20wholesale%20rates%20ke%20saath`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center border border-primary text-primary px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            Request Full Catalogue
          </a>
        </div>
      </div>
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />
    </section>
  );
};