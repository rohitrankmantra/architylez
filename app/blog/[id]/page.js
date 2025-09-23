// app/blog/[id]/page.js
import React from "react";
import api from "@/utils/api";
import BlogContent from "./BlogContent"; // Client component

export async function generateStaticParams() {
  const response = await api.get("/blogs");
  const blogs = response.data;

  return blogs.map((blog) => ({
    id: blog._id.toString(),
  }));
}

export default async function BlogPage({ params }) {
  const { id } = params;

  // Fetch blog data (server-side)
  let blog = null;
  try {
    const response = await api.get(`/blogs/${id}`);
    blog = response.data;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return <div>Blog not found</div>;
  }

  return <BlogContent blog={blog} />;
}
