import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api from "@/utils/api";

export async function generateMetadata({ params }) {
  try {
      const awaitedParams = await params; // <-- new
  const { slug } = awaitedParams;


    const res = await api.get(`/products/${slug}`);
    const product = res.data;

    if (!product) {
      return { title: "Product Not Found", description: "" };
    }

    const metaTitle = product.metaTitle?.trim() || product.title || "Product";
    const metaDescription =
      product.metaDescription?.trim() || product.description?.slice(0, 160) || "";

    const getFullImageUrl = (path) => {
      if (!path) return "/placeholder.png";
      if (path.startsWith("http")) return path;
      return path; // backend should return full URL
    };

    return {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: product.thumbnail?.url
          ? [{ url: getFullImageUrl(product.thumbnail.url) }]
          : [],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return { title: "Product Not Found", description: "" };
  }
}

export default async function ProductDetailPage({ params }) {
  let product = null;

  try {
    const { slug } = params;
    const res = await api.get(`/products/${slug}`);
    product = res.data;
  } catch (err) {
    console.error(err);
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const getImageUrl = (img) => {
    if (!img) return "/placeholder.png";
    return img.url || img || "/placeholder.png"; // backend provides full URL
  };

  const thumbnailUrl = getImageUrl(product.thumbnail);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white text-black">
        <div className="relative w-full h-[60vh] md:h-[85vh]">
          <img
            src={thumbnailUrl}
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
