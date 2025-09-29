"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import toast from "react-hot-toast";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin();
}

export default function ProjectsPage() {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Fetch projects from API
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-item").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className="text-black">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center px-6 bg-gray-100">
          <div className="text-center max-w-4xl mx-auto space-y-6 hero-content">
            <h1 className="font-clash text-5xl md:text-7xl font-bold">
              <span className="text-black">Our</span>{" "}
              <span className="text-outline">Projects</span>
            </h1>
            <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
              Browse our portfolio of architectural and interior projects.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-outline">Featured</span>{" "}
              <span className="text-black">Projects</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-16">
              Discover our latest masterpieces showcasing innovation and craftsmanship.
            </p>

            {loading ? (
              <p className="text-gray-500">Loading projects...</p>
            ) : projects.length === 0 ? (
              <p className="text-gray-500">No projects available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id || index}
                    className="project-item group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setPhotoIndex(index);
                      setLightboxOpen(true);
                    }}
                  >
                    {/* Project Image */}
                    <img
                      src={project.thumbnail?.url || project.image || "/placeholder.jpg"}
                      alt={project.title}
                      className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4">
                      <p className="text-sm text-gray-200">{project.category}</p>
                      <h3 className="text-xl font-clash font-bold text-white mt-1">
                        {project.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Lightbox */}
            {lightboxOpen && projects.length > 0 && (
              <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={projects.map((p) => ({
                  src: p.thumbnail?.url || p.image || "/placeholder.jpg",
                  title: p.title,
                }))}
                index={photoIndex}
                controller={{ closeOnBackdropClick: true }}
              />
            )}
          </div>
        </section>
      </div>
      <Footer />
    </Loader>
  );
}
