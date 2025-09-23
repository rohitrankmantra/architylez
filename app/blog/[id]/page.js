// app/blog/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api"; // or fetch, whatever you like
import BlogContent from "./BlogContent";

export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to load blog", err);
      }
    };
    if (id) loadBlog();
  }, [id]);

  if (!blog) return <div>Loading…</div>;
  return <BlogContent blog={blog} />;
}
