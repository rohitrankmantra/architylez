"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api, { BASE_URL } from "@/utils/api";
import toast from "react-hot-toast";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsPage() {
  const containerRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Projects Once
  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data || []);
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

  // ✅ Run GSAP Animations after projects are loaded
  useEffect(() => {
    if (!projects.length) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-card").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects.length]);

  // ✅ Loader shown only while fetching
  if (loading) return <Loader />;

  return (
    <>
      <Navigation />
      <div ref={containerRef} className="text-black bg-white">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex items-center justify-center px-6 bg-gray-100">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="font-clash text-5xl md:text-7xl font-bold">
              <span className="text-black">Our</span>{" "}
              <span className="text-outline">Projects</span>
            </h1>
            <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
              Browse our portfolio of architectural and interior design excellence.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-outline">Featured</span>{" "}
              <span className="text-black">Projects</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest masterpieces showcasing innovation and craftsmanship.
            </p>

            {/* Projects Grid */}
            {projects.length === 0 ? (
              <p className="text-gray-500 mt-12">No projects available.</p>
            ) : (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="project-card bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-72 overflow-hidden bg-gray-100">
                      <img
                        src={`${BASE_URL}${project.thumbnail?.url}`}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      {project.category && (
                        <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                          {project.category}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6 space-y-4 text-left">
                      <h3 className="font-space text-xl font-semibold text-black">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Button */}
                      <motion.a
                        href={`/projects/${project._id}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-block w-full py-3 border-2 hover:border-black text-white bg-black font-machina font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-center text-sm"
                      >
                        Read More →
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
