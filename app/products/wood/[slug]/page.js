import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api from "@/utils/api";

export async function generateMetadata({ params }) {
  try {
    // ✅ Await params before using
    const { slug } = await params;

    const res = await api.get(`/products/${slug}`);
    const product = res.data;

    if (!product) {
      return { title: "Product Not Found", description: "" };
    }

    return {
      title: product.title,
      description: product.description?.slice(0, 160) || "",
      openGraph: {
        title: product.title,
        description: product.description?.slice(0, 160) || "",
        images: product.thumbnail?.url
          ? [{ url: product.thumbnail.url }]
          : [],
      },
    };
  } catch {
    return { title: "Product Not Found", description: "" };
  }
}

export default async function ProductDetailPage({ params }) {
  let product = null;

  try {
    // ✅ Await params here too
    const { slug } = await params;

    const res = await api.get(`/products/${slug}`);
    product = res.data;
  } catch (err) {
    console.error(err);
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white text-black">
        <div className="relative w-full h-[60vh] md:h-[85vh]">
          <img
            src={product.thumbnail?.url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="px-6 md:px-20 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <ProductGallery
            images={product.images}
            title={product.title}
            category={product.category}
          />
          <ProductInfo product={product} />
        </div>
      </div>
      <Footer />
    </>
  );
}
