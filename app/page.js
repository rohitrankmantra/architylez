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
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const tl = gsap.timeline();
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.2
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.5')
      .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.3');

      // Parallax backgrounds
      gsap.utils.toArray('.parallax-element').forEach(element => {
        gsap.to(element, {
          yPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            scrub: true
          }
        });
      });

      // Section reveals
      gsap.utils.toArray('.reveal-section').forEach(section => {
        gsap.from(section, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: '🏗️',
      title: 'Architectural Excellence',
      description: 'Award-winning architectural designs that blend innovation with timeless elegance.'
    },
    {
      icon: '🎨',
      title: 'Interior Mastery',
      description: 'Luxury interior solutions that transform spaces into extraordinary experiences.'
    },
    {
      icon: '💎',
      title: 'Premium Materials',
      description: 'Curated selection of the finest materials and finishes from global suppliers.'
    },
    {
      icon: '⚡',
      title: 'Smart Integration',
      description: 'Cutting-edge technology seamlessly integrated into sophisticated designs.'
    }
  ];

  const projects = [
    {
      title: 'Modern Villa Collection',
      category: 'Residential',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Corporate Headquarters',
      category: 'Commercial',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Luxury Hotel Suite',
      category: 'Hospitality',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y }}
            className="w-full h-[120%] bg-gradient-to-b from-primary-dark via-primary-darker to-primary-dark opacity-90"
          />
        <div
  className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&#39;60&#39; height=&#39;60&#39; viewBox=&#39;0 0 60 60&#39; xmlns=&#39;http://www.w3.org/2000/svg&#39;%3E%3Cg fill=&#39;none&#39; fill-rule=&#39;evenodd&#39;%3E%3Cg fill=&#39;%23D4AF37&#39; fill-opacity=&#39;0.05&#39;%3E%3Ccircle cx=&#39;30&#39; cy=&#39;30&#39; r=&#39;2&#39;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"
/>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="hero-title font-clash text-6xl md:text-8xl lg:text-9xl font-bold leading-tight">
                <span className="block text-white">Architectural</span>
                <span className="block text-gradient">Excellence</span>
              </h1>
              <div className="hero-title text-outline font-clash text-2xl md:text-4xl lg:text-5xl font-light">
                Redefined
              </div>
            </div>

            <p className="hero-subtitle font-inter text-lg md:text-xl text-primary-gray max-w-2xl mx-auto leading-relaxed">
              Where visionary design meets uncompromising craftsmanship. 
              Transform your space into a masterpiece of modern luxury.
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
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-gold rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-primary-gold rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="reveal-section py-24 px-6 bg-primary-darker">
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
              We deliver exceptional architectural and interior design solutions 
              that exceed expectations and create lasting impressions.
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
              Discover our latest architectural masterpieces that showcase 
              innovation, elegance, and exceptional craftsmanship.
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
  );
}