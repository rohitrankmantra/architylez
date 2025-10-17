"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id]);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  if (loading) return <Loader />;

  if (!project)
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center text-gray-600 bg-white">
        Project not found.
      </div>
    );

  return (
    <>
      <Navigation />
      <div className="bg-white text-black min-h-screen">
        {/* Project Hero */}
        <section className="min-h-[50vh] flex flex-col pt-32 sm:pt-40 pb-24 sm:pb-32 justify-center items-center text-center px-4 sm:px-6 bg-gray-50">
          <h1 className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {project.title}
          </h1>
          {project.category && (
            <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
              {project.category}
              {project.location && ` • ${project.location}`}
            </p>
          )}
          {project.description && (
            <p className="font-inter text-gray-600 text-sm sm:text-base md:text-lg max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
              {decodeHtml(project.description)}
            </p>
          )}
        </section>

        {/* Project Content */}
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
          {/* Main Image */}
          {project.thumbnail?.url && (
            <img
              src={project.thumbnail.url}
              alt={project.title}
              className="w-full rounded-2xl object-cover shadow-md"
            />
          )}

          {/* Detailed Info */}
          {project.details && (
            <div
              className="prose max-w-full text-gray-800 leading-relaxed text-sm sm:text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: decodeHtml(project.details) }}
            />
          )}

          {/* Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {project.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url || img}
                  alt={`${project.title} image ${idx + 1}`}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-2xl shadow-sm"
                />
              ))}
            </div>
          )}

          {/* Optional Info */}
          <div className="border-t pt-6 space-y-2">
            {project.client && (
              <p className="text-sm text-gray-500">
                <strong>Client:</strong> {project.client}
              </p>
            )}
            {project.year && (
              <p className="text-sm text-gray-500">
                <strong>Year:</strong> {project.year}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
