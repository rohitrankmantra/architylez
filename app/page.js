'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title stagger animation
      gsap.from('.hero-title span', {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.2,
      });

      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.8,
      });

      gsap.from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 1,
        stagger: 0.2,
      });

      // Section reveals
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

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {/* Hero Image with parallax */}
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-[url('https://images.pexels.com/photos/313705/pexels-photo-313705.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-darker/70 to-primary-dark/90" />
          {/* Subtle gold pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23D4AF37 fill-opacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        </div>

        {/* Floating accents */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-1/4 left-10 w-24 h-24 rounded-full border border-primary-gold/30"
        />
        <motion.div
          animate={{ x: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full border border-primary-gold/20"
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="hero-title font-clash text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block text-white">Architectural</span>
                <span className="block text-gradient">Excellence</span>
              </h1>
              <div className="hero-subtitle text-outline font-machina text-xl md:text-3xl lg:text-4xl font-light tracking-wide">
                Redefined
              </div>
            </div>

            <p className="hero-subtitle font-inter text-base md:text-lg lg:text-xl text-primary-gray max-w-2xl mx-auto leading-relaxed">
              Where visionary design meets uncompromising craftsmanship. Transform your
              space into a masterpiece of modern luxury.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center">
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
                  className="px-8 py-4 border-2 border-primary-gold text-primary-gold font-machina font-semibold rounded-full hover:bg-primary-gold hover:text-primary-dark transition-all duration-300"
                >
                  Start Your Project
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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
    </div>
  );
}
