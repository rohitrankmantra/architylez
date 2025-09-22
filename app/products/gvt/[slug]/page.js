// ✅ Server Component
import Link from "next/link";
import ProductDetailClient from "./ProductDetailClient";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
const products = [
  {
    id: "elegant-marble-finish",
    title: "Elegant Marble Finish",
    description: "Premium marble look GVT tile for modern interiors.",
    thumbnail: "https://picsum.photos/1200/800?random=10",
    images: [
      "https://picsum.photos/1200/800?random=11",
      "https://picsum.photos/1200/800?random=12",
      "https://picsum.photos/1200/800?random=13",
      "https://picsum.photos/1200/800?random=14",
    ],
    size: "600x600 mm",
    category: "GVT",
    finish: "Glossy",
    series: "Luxury",
  },
  {
    id: "textured-stone-look",
    title: "Textured Stone Look",
    description: "Durable stone-like finish ideal for flooring.",
    thumbnail: "https://picsum.photos/1200/800?random=20",
    images: [
      "https://picsum.photos/1200/800?random=21",
      "https://picsum.photos/1200/800?random=22",
    ],
    size: "800x800 mm",
    category: "GVT",
    finish: "Rustic Matt",
  },
  {
    id: "glossy-white-tile",
    title: "Glossy White Tile",
    description: "Bright glossy surface for elegant spaces.",
    thumbnail: "https://picsum.photos/1200/800?random=30",
    images: [
      "https://picsum.photos/1200/800?random=31",
      "https://picsum.photos/1200/800?random=32",
    ],
    size: "600x1200 mm",
    category: "GVT",
    finish: "High Gloss",
  },
];

// ✅ Required for `output: export`
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.id }));
}

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.id === params.slug);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">Product not found</div>
    );
  }

  return (
    <>
    <Navigation/>
      <ProductDetailClient product={product} products={products} />
      <Footer/>
    </>
  );
}
