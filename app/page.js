'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Loader from '@/components/ui/Loader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Hero Slides
  const heroSlides = [
    {
      title: 'Architectural Excellence',
      subtitle:
        'Where visionary design meets uncompromising craftsmanship. Transform your space into a masterpiece of modern luxury.',
      image:
        'https://images.pexels.com/photos/313705/pexels-photo-313705.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      title: 'Luxury Interiors',
      subtitle: 'Spaces redefined with elegance, detail, and timeless sophistication.',
      image:
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
    {
      title: 'Modern Innovation',
      subtitle: 'Blending technology and creativity for future-ready designs.',
      image:
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.2,
      })
        .from(
          '.hero-subtitle',
          { y: 50, opacity: 0, duration: 1, ease: 'power2.out' },
          '-=0.5'
        )
        .from(
          '.hero-cta',
          { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        );

      gsap.utils.toArray('.parallax-element').forEach((element) => {
        gsap.to(element, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: { trigger: element, scrub: true },
        });
      });

      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.from(section, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Scroll to Features
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: '🏗️',
      title: 'Architectural Excellence',
      description:
        'Award-winning architectural designs that blend innovation with timeless elegance.',
    },
    {
      icon: '🎨',
      title: 'Interior Mastery',
      description:
        'Luxury interior solutions that transform spaces into extraordinary experiences.',
    },
    {
      icon: '💎',
      title: 'Premium Materials',
      description:
        'Curated selection of the finest materials and finishes from global suppliers.',
    },
    {
      icon: '⚡',
      title: 'Smart Integration',
      description:
        'Cutting-edge technology seamlessly integrated into sophisticated designs.',
    },
  ];

  const projects = [
    {
      title: 'Modern Villa Collection',
      category: 'Residential',
      image:
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Corporate Headquarters',
      category: 'Commercial',
      image:
        'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Luxury Hotel Suite',
      category: 'Hospitality',
      image:
        'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <Loader>
      <Navigation/>
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Backgrounds */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlides[currentSlide].image}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlides[currentSlide].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <h1 className="hero-title font-clash text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block text-white">
                  {heroSlides[currentSlide].title.split(' ')[0]}
                </span>
                <span className="block text-gradient">
                  {heroSlides[currentSlide].title.split(' ')[1] || ''}
                </span>
              </h1>

              <p className="hero-subtitle font-inter text-base md:text-lg lg:text-xl text-primary-gray max-w-2xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>

              <div className="hero-cta flex flex-col sm:flex-row sm:gap-6  gap-12 justify-center items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/products"
                    className="px-8 py-4 bg-primary-gold text-primary-dark font-machina font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300 glow-gold"
                  >
                    Explore Portfolio
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="px-8  py-4 border-2 border-primary-gold text-primary-gold font-machina font-semibold rounded-full hover:bg-primary-gold hover:text-primary-dark transition-all duration-300"
                  >
                    Start Your Project
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          onClick={scrollToFeatures}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <div className="w-6 h-10 border-2 border-primary-gold rounded-full flex justify-center overflow-hidden">
            <motion.div
              animate={{ y: [-10, 12], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-primary-gold rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="reveal-section py-24 px-6 bg-primary-darker">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Why Choose</span>{' '}
              <span className="text-gradient">Architylezz</span>
            </h2>
            <p className="font-inter text-primary-gray text-lg max-w-2xl mx-auto">
              We deliver exceptional architectural and interior design solutions that exceed
              expectations and create lasting impressions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-primary-dark/50 p-8 rounded-2xl border border-primary-gold/10 hover:border-primary-gold/30 transition-all duration-300 group"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-space text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="font-inter text-primary-gray leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="reveal-section py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-outline">Featured</span>{' '}
              <span className="text-white">Projects</span>
            </h2>
            <p className="font-inter text-primary-gray text-lg max-w-2xl mx-auto">
              Discover our latest architectural masterpieces that showcase innovation,
              elegance, and exceptional craftsmanship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-primary-darker"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-machina text-primary-gold text-sm font-medium mb-2">
                    {project.category}
                  </div>
                  <h3 className="font-space text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-gold/50 rounded-2xl transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 font-machina font-medium text-primary-gold hover:text-white transition-colors duration-300"
            >
              <span>View All Projects</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer/>
     </Loader>
  );
}
