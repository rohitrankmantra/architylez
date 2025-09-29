"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Lucide icons
import { Building2, Paintbrush, Gem, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1200);

  const heroSlides = [
    { title: "Architectural Excellence", subtitle: "Where visionary design meets uncompromising craftsmanship.", image: "bg-4.jpg" },
    { title: "Luxury Interiors", subtitle: "Spaces redefined with elegance, detail, and sophistication.", image: "bg-5.jpg" },
    { title: "Modern Innovation", subtitle: "Blending technology and creativity for future-ready designs.", image: "bg-3.jpg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Track window width for responsive slider
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine projects per view
  const projectsPerView = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 3;

  // Fetch projects from API
  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // GSAP reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.from(section, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    { icon: <Building2 className="w-10 h-10 text-black" />, title: "Architectural Excellence", description: "Award-winning designs blending innovation with timeless elegance." },
    { icon: <Paintbrush className="w-10 h-10 text-black" />, title: "Interior Mastery", description: "Luxury interior solutions that elevate spaces into extraordinary experiences." },
    { icon: <Gem className="w-10 h-10 text-black" />, title: "Premium Materials", description: "Only the finest curated materials sourced globally." },
    { icon: <Zap className="w-10 h-10 text-black" />, title: "Smart Integration", description: "Cutting-edge technology seamlessly woven into design." },
  ];

  // Slider state
  const [projectSlide, setProjectSlide] = useState(0);

  const prevSlide = () => setProjectSlide((prev) => Math.max(prev - 1, 0));
  const nextSlide = () => setProjectSlide((prev) => Math.min(prev + 1, Math.max(0, projects.length - projectsPerView)));

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className="relative bg-white text-black">

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[currentSlide].image}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gray-600/30" />
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
            <h1 className="hero-title font-clash text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
              <span className="block text-white">{heroSlides[currentSlide].title.split(" ")[0]}</span>
              <span className="block text-outline text-white">{heroSlides[currentSlide].title.split(" ")[1] || ""}</span>
            </h1>
            <p className="hero-subtitle font-inter text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products" className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition-all">
                Explore Portfolio
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-black text-black rounded-full font-semibold hover:bg-black hover:text-white transition-all">
                Start Your Project
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div onClick={scrollToFeatures} className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center overflow-hidden">
              <motion.div animate={{ y: [-10, 12], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-3 bg-white rounded-full mt-2" />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="reveal-section py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-black">Why Choose</span> <span className="text-outline">Architylezz</span>
            </h2>
            <p className="font-inter text-gray-600 max-w-2xl mx-auto">
              We deliver exceptional design solutions that exceed expectations.
            </p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} whileHover={{ y: -10 }} className="bg-white shadow-md p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all">
                  <div className="mb-4 flex justify-center items-center">{feature.icon}</div>
                  <h3 className="font-space text-xl font-semibold text-black mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section with Responsive Slider */}
        <section className="reveal-section py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-outline">Featured</span>{" "}
              <span className="text-black">Projects</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest masterpieces showcasing innovation and craftsmanship.
            </p>

            <div className="relative mt-16 flex items-center">
              <button onClick={prevSlide} className="absolute left-0 z-10 p-3 bg-white rounded-full shadow hover:bg-gray-100 transition">
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>
              <div className="overflow-hidden w-full">
                <div className="flex gap-6 transition-transform duration-500" style={{ transform: `translateX(-${(100 / projectsPerView) * projectSlide}%)` }}>
                  {loadingProjects ? (
                    <p className="text-gray-500">Loading projects...</p>
                  ) : projects.length === 0 ? (
                    <p className="text-gray-500">No projects available.</p>
                  ) : (
                    projects.map((project, index) => (
                      <motion.div key={project._id || index} className={`min-w-[calc(${100 / projectsPerView}% - 16px)] relative overflow-hidden rounded-2xl shadow-lg group`}>
                        <img src={project.thumbnail?.url || project.image || "/placeholder.jpg"} alt={project.title} className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center px-4">
                          <p className="text-sm text-gray-200">{project.category}</p>
                          <h3 className="text-xl font-clash font-bold text-white mt-1">{project.title}</h3>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
              <button onClick={nextSlide} className="absolute right-0 z-10 p-3 bg-white rounded-full shadow hover:bg-gray-100 transition">
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </div>

            <Link href="/projects" className="inline-block mt-12 px-6 py-3 border-2 border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition-all">
              View All Projects →
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </Loader>
  );
}
