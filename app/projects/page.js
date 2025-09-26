"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin();
}

// Dummy projects data
const projects = [
  {
    title: "Modern Villa",
    category: "Residential",
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Corporate Headquarters",
    category: "Commercial",
    image:
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Luxury Hotel Suite",
    category: "Hospitality",
    image:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Urban Apartment",
    category: "Residential",
    image:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Retail Space Design",
    category: "Commercial",
    image:
      "https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function ProjectsPage() {
  const containerRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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
  }, []);

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className=" text-black">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="project-item group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setPhotoIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <p className="text-sm text-gray-200">{project.category}</p>
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
              <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={projects.map((p) => ({ src: p.image, title: p.title }))}
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
