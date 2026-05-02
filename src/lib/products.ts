import matter from "gray-matter";

// Bundled product images (used as fallback when CMS hasn't uploaded a custom image yet)
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";
import p7 from "@/assets/product-7.jpg";
import p8 from "@/assets/product-8.jpg";

const fallbackImages: Record<string, string> = {
  "product-1.jpg": p1,
  "product-2.jpg": p2,
  "product-3.jpg": p3,
  "product-4.jpg": p4,
  "product-5.jpg": p5,
  "product-6.jpg": p6,
  "product-7.jpg": p7,
  "product-8.jpg": p8,
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: string;
  salePrice?: string;
  moq: string;
  image: string;
  description?: string;
  outOfStock: boolean;
  order: number;
};

// Eagerly import every markdown file in src/content/products as raw text
const files = import.meta.glob("/src/content/products/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function resolveImage(image: string): string {
  if (!image) return p1;
  // If CMS uploaded image (path like /uploads/xyz.jpg), use it directly in production.
  // In dev, fall back to bundled assets when filename matches a known one.
  const filename = image.split("/").pop() ?? "";
  if (fallbackImages[filename]) return fallbackImages[filename];
  return image;
}

const contentProducts: Product[] = Object.entries(files).map(([path, raw]) => {
  const { data } = matter(raw);
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  return {
    slug,
    name: String(data.name ?? "Untitled"),
    category: String(data.category ?? "Lawn"),
    price: String(data.price ?? ""),
    salePrice: data.salePrice ? String(data.salePrice) : undefined,
    moq: String(data.moq ?? ""),
    image: resolveImage(String(data.image ?? "")),
    description: data.description ? String(data.description) : undefined,
    outOfStock: Boolean(data.outOfStock),
    order: Number(data.order ?? 0),
  } satisfies Product;
});

const lawn2PcProducts: Product[] = Array.from({ length: 20 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    slug: `lawn-2-pc-design-${number}`,
    name: `Lawn 2 PC - Design ${number}`,
    category: "Lawn 2 PC",
    price: "2500",
    salePrice: "1500",
    moq: "1",
    image: `images/${number}.jpeg`,
    outOfStock: false,
    order: 1000 + index,
  };
});

const lawn3PcProducts: Product[] = Array.from({ length: 20 }, (_, index) => {
  const number = 101 + index;
  return {
    slug: `lawn-3-pc-design-${number}`,
    name: `Lawn 3 PC - Design ${number}`,
    category: "Lawn 3 PC",
    price: "4000",
    salePrice: "2500",
    moq: "1",
    image: `images/${number}.jpeg`,
    outOfStock: false,
    order: 1020 + index,
  };
});

export const products: Product[] = [...contentProducts, ...lawn2PcProducts, ...lawn3PcProducts].sort(
  (a, b) => a.order - b.order
);
