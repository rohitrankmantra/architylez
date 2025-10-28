"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { Building2, Paintbrush, Gem, Zap } from "lucide-react";

// Slick Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const featuresRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const [loadingCatalogues, setLoadingCatalogues] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1200);

  // === HERO SLIDES ===
  const heroSlides = [
    {
      title: "Architectural Excellence",
      subtitle: "Where visionary design meets uncompromising craftsmanship.",
      image: "home-bg1.jpg",
      cta1: { label: "Explore Portfolio", href: "/projects" },
      cta2: { label: "Start Your Project", href: "/contact" },
    },
    {
      title: "Luxury Interiors",
      subtitle: "Spaces redefined with elegance, detail, and sophistication.",
      image: "home-bg2.jpg",
      cta1: { label: "View Interiors", href: "/catalogue" },
      cta2: { label: "Get a Quote", href: "/contact" },
    },
    {
      title: "Modern Innovation",
      subtitle: "Blending technology and creativity for future-ready designs.",
      image: "home-bg3.jpg",
      cta1: { label: "See Innovation", href: "/projects" },
      cta2: { label: "Work With Us", href: "/contact" },
    },
  ];

  const clientLogos = [
    "/logos/client1.jpg",
    "/logos/client2.jpg",
    "/logos/client3.jpg",
    "/logos/client4.jpg",
    "/logos/client5.jpg",
    "/logos/client6.jpg",
  ];

  const clientReviews = [
    {
      name: "John Doe",
      company: "Nike",
      review:
        "Architylezz transformed our workspace into a stunning modern environment. Highly professional team!",
    },
    {
      name: "Jane Smith",
      company: "Google",
      review:
        "Exceptional design and attention to detail. They understood our vision perfectly.",
    },
    {
      name: "Robert Johnson",
      company: "Tesla",
      review:
        "Innovative, creative, and highly responsive. Our project was delivered ahead of schedule.",
    },
  ];

  const projectsPerView = windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 3;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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



  useEffect(() => {
    const fetchCatalogues = async () => {
      setLoadingCatalogues(true);
      try {
        const res = await api.get("/catalogues");
        setCatalogues(res.data);
      } catch (err) {
        console.error("❌ Error fetching catalogues:", err);
      } finally {
        setLoadingCatalogues(false);
      }
    };
    fetchCatalogues();
  }, []);



  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const res = await api.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);



  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: <Building2 className="w-10 h-10 text-black" />,
      title: "Architectural Excellence",
      description:
        "Award-winning designs blending innovation with timeless elegance.",
    },
    {
      icon: <Paintbrush className="w-10 h-10 text-black" />,
      title: "Interior Mastery",
      description:
        "Luxury interior solutions that elevate spaces into extraordinary experiences.",
    },
    {
      icon: <Gem className="w-10 h-10 text-black" />,
      title: "Premium Materials",
      description: "Only the finest curated materials sourced globally.",
    },
    {
      icon: <Zap className="w-10 h-10 text-black" />,
      title: "Smart Integration",
      description:
        "Cutting-edge technology seamlessly woven into design.",
    },
  ];

  const heroSliderSettings = {
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 1000,
    arrows: true,
    fade: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  const clientSliderSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 800,
    arrows: false,
    dots: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const reviewSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: true,
  };

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className="relative bg-white text-black">
        {/* === HERO SECTION (Unified and Responsive) === */}
        <section className="relative flex items-center justify-center overflow-hidden">
          <Slider {...heroSliderSettings} className="w-full">
            {heroSlides.map((slide, index) => (
              <div key={index} className="relative">
                <div
                  className="relative w-full min-h-[85vh] sm:min-h-screen bg-cover bg-center"
                  style={{ backgroundImage: `url('/${slide.image}')` }}
                >
                  <div className="absolute inset-0 bg-black/50 sm:bg-black/30" />
                  <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8 py-24 sm:py-0 min-h-[85vh] sm:min-h-screen">
                    <h1 className="font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6 drop-shadow-lg text-outline">
                      {slide.title}
                    </h1>
                    <p className="font-inter text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
                      {slide.subtitle}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                      <Link
                        href={slide.cta1.href}
                        className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-black rounded-full font-semibold hover:text-white hover:border hover:bg-transparent transition-all"
                      >
                        {slide.cta1.label}
                      </Link>
                      <Link
                        href={slide.cta2.href}
                        className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition-all"
                      >
                        {slide.cta2.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          <motion.div
            onClick={scrollToFeatures}
            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center overflow-hidden">
              <motion.div
                animate={{ y: [-10, 12], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </div>
          </motion.div>
        </section>

        {/* === FEATURES SECTION === */}
        <section ref={featuresRef} className="reveal-section py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-black">Why Choose</span>{" "}
              <span className="text-outline uppercase">Architylezz</span>
            </h2>
            <p className="font-inter text-gray-600 max-w-2xl mx-auto">
              We deliver exceptional design solutions that exceed expectations.
            </p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="bg-white shadow-md p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all"
                >
                  <div className="mb-4 flex justify-center items-center">{feature.icon}</div>
                  <h3 className="font-space text-xl font-semibold text-black mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === PROJECTS SECTION === */}
        <section className="reveal-section py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-outline">Featured</span>{" "}
              <span className="text-black">Projects</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest masterpieces showcasing innovation and craftsmanship.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {loadingProjects ? (
                <p className="text-gray-500 w-full text-center py-12 col-span-full">
                  Loading projects...
                </p>
              ) : projects.length === 0 ? (
                <p className="text-gray-500 w-full text-center py-12 col-span-full">
                  No projects available.
                </p>
              ) : (
                projects
                  .slice(0, projectsPerView)
                  .map((project, index) => (
                    <motion.div
                      key={project._id || index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <div className="relative h-72 overflow-hidden bg-gray-100">
                        <img
                          src={project.thumbnail?.url || project.image || "/placeholder.jpg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {project.category && (
                          <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                            {project.category}
                          </span>
                        )}
                      </div>

                      <div className="p-6 space-y-4 text-left">
                        <h3 className="font-space text-xl font-semibold text-black">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

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
                  ))
              )}
            </div>

            <Link
              href="/projects"
              className="inline-block mt-12 px-6 py-3 border-2 border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition-all"
            >
              View All Projects →
            </Link>
          </div>
        </section>

        {/* === CATALOGUES SECTION === */}
        <section className="reveal-section py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-outline">Featured</span>{" "}
              <span className="text-black">Catalogues</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our latest digital catalogues featuring design inspirations,
              product specifications, and material collections.
            </p>

            {loadingCatalogues ? (
              <p className="text-gray-500 w-full text-center py-12 col-span-full">
                Loading catalogues...
              </p>
            ) : catalogues.length === 0 ? (
              <p className="text-gray-500 w-full text-center py-12 col-span-full">
                No catalogues available.
              </p>
            ) : (
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {catalogues.slice(0, 3).map((catalogue, index) => (
                  <motion.div
                    key={catalogue._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
                      {catalogue.thumbnail?.url ? (
                        <img
                          src={catalogue.thumbnail.url}
                          alt={catalogue.title || "Catalogue thumbnail"}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-gray-400">No thumbnail</span>
                      )}
                      {/* Category Tag */}
                      {catalogue.category && (
                        <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                          {catalogue.category}
                        </span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-3">
                      <h3 className="font-space text-xl font-semibold text-black">
                        {catalogue.title}
                      </h3>
                      <p className="font-inter text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {catalogue.description}
                      </p>

                      <div className="flex space-x-3 pt-3">
                        <motion.a
                          href={catalogue.pdf?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-2.5 bg-black text-white font-machina font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-300 text-center text-sm"
                        >
                          Download
                        </motion.a>
                        <motion.a
                          href={catalogue.pdf?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-2.5 border-2 border-black text-black font-machina font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 text-center text-sm"
                        >
                          View
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <Link
              href="/catalogue"
              className="inline-block mt-12 px-6 py-3 border-2 border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition-all"
            >
              View All Catalogues →
            </Link>
          </div>
        </section>

        {/* === BLOG SECTION (Featured Blog) === */}
        <section className="reveal-section py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-outline">Featured</span>{" "}
              <span className="text-black">Blog</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-16">
              Explore insights, stories, and trends from our design experts.
            </p>

            {/* === Loading / Error States === */}
            {loadingBlogs ? (
              <p className="text-gray-500 text-center py-12">Loading blog...</p>
            ) : blogs.length === 0 ? (
              <p className="text-gray-500 text-center py-12">No blogs available.</p>
            ) : (
              (() => {
                const featuredPost = blogs[0]; // Show the first blog as featured
                return (
                  <motion.article
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 p-6 lg:p-12"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-96 rounded-3xl overflow-hidden">
                      <img
                        src={featuredPost.thumbnail?.url || "/placeholder.jpg"}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full font-machina text-sm">
                        Featured
                      </div>
                    </div>

                    {/* Blog Info */}
                    <div className="space-y-6">
                      <h3 className="font-clash text-3xl md:text-4xl font-bold text-black leading-tight">
                        {featuredPost.title}
                      </h3>
                      <p className="font-inter text-gray-600 text-lg leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="font-space font-medium">
                            {featuredPost.author}
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(featuredPost.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="font-machina">
                          {featuredPost.readTime || "5 min read"}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${featuredPost._id}`}
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-black text-white font-machina font-semibold rounded-full hover:bg-gray-900 transition-colors duration-300"
                      >
                        <span>Read Article</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </motion.article>
                );
              })()
            )}

            {/* View All Blogs Button */}
            <Link
              href="/blogs"
              className="inline-block mt-16 px-6 py-3 border-2 border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition-all"
            >
              View All Blogs →
            </Link>
          </div>
        </section>



        {/* === CLIENTS SECTION === */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto text-center px-6">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-4">
              <span className="text-black">Our Trusted</span>{" "}
              <span className="text-outline uppercase">Clients</span>
            </h2>
            <p className="font-inter text-gray-600 max-w-2xl mx-auto mb-12">
              We are proud to have collaborated with industry leaders and global brands
              to deliver exceptional design solutions.
            </p>

            <Slider {...clientSliderSettings}>
              {clientLogos.map((logo, index) => (
                <div key={index} className="flex items-center justify-center p-4">
                  <img
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="max-h-60 object-contain mx-auto"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* === CLIENT REVIEWS SECTION === */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-black">What Our</span>{" "}
              <span className="text-outline uppercase">Clients Say</span>
            </h2>

            <Slider {...reviewSliderSettings}>
              {clientReviews.map((review, index) => (
                <div key={index} className="px-6 my-3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-8 rounded-2xl shadow-lg"
                  >
                    <p className="text-gray-700 text-lg italic mb-6">
                      "{review.review}"
                    </p>
                    <h3 className="font-space text-xl font-semibold text-black">
                      {review.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{review.company}</p>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
{/* === CTA SECTION === */}
<section className="relative overflow-hidden py-28 bg-white reveal-section">
  {/* Subtle floating pattern */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_60%)]" />

  <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="font-clash text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900"
    >
      Let’s <span className="text-outline">Design</span> Something Extraordinary
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="font-inter text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
    >
      From concept to creation, our team brings your architectural dreams to life with
      innovation and precision.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
    >
      <Link
        href="/contact"
        className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-machina font-semibold rounded-full hover:bg-gray-800 transition-all duration-300"
      >
        Start Your Project →
      </Link>
      <Link
        href="/projects"
        className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black font-machina font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300"
      >
        View Our Work
      </Link>
    </motion.div>
  </div>
</section>


      <Footer />
    </Loader>
  );
}
