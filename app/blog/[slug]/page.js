import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogClient from "./BlogClient";
import api from "@/utils/api";

// Required for static export
export async function generateStaticParams() {
  const blogs = await api.get("/blogs").then(res => res.data);
  return blogs.map(blog => ({ slug: blog._id }));
}

export default async function BlogPage({ params }) {
  // Await params before using
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!slug) {
    return <div className="p-12 text-center">Blog not found</div>;
  }

  // Fetch blog from backend server-side
  let blog = null;
  try {
    const res = await api.get(`/blogs/${slug}`);
    blog = res.data;
  } catch (err) {
    console.error("Failed to fetch blog:", err);
  }

  if (!blog) return <div className="p-12 text-center">Blog not found</div>;

  return (
    <>
      <Navigation />
      {/* Client component handles comments, GSAP animations, etc. */}
      <BlogClient blog={blog} />
      <Footer />
    </>
  );
}
