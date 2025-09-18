'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Loader from '@/components/ui/Loader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';


export default function Catalogue() {
  const containerRef = useRef(null);
  const [selectedCatalogue, setSelectedCatalogue] = useState(0);

  const catalogues = [
    {
      id: 1,
      title: 'GVT Collection 2024',
      subtitle: 'Premium Glazed Vitrified Tiles',
      pages: 48,
      size: '12.5 MB',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Explore our latest collection of premium glazed vitrified tiles featuring marble-inspired designs, contemporary patterns, and innovative finishes.'
    },
    {
      id: 2,
      title: 'Wall Tiles Showcase',
      subtitle: 'Designer Wall Solutions',
      pages: 36,
      size: '8.2 MB',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Discover stunning wall tile designs perfect for kitchens, bathrooms, and feature walls. From subway classics to modern geometric patterns.'
    },
    {
      id: 3,
      title: 'Wood Collection',
      subtitle: 'Natural Wood-Look Tiles',
      pages: 32,
      size: '10.1 MB',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Experience the warmth of natural wood with the durability of ceramic. Featuring oak, walnut, pine, and exotic wood textures.'
    },
    {
      id: 4,
      title: 'Subway & Metro',
      subtitle: 'Classic Subway Tiles',
      pages: 24,
      size: '6.8 MB',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Timeless subway tiles in various sizes and finishes. Perfect for creating classic, contemporary, or industrial-style interiors.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.from('.catalogue-grid', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Loader>
      <Navigation/>
        <div ref={containerRef} className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-primary-dark to-primary-darker">
        <div className="hero-content max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-clash text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-gradient">Digital</span>{' '}
              <span className="text-white">Catalogue</span>
            </h1>
            <div className="text-outline font-clash text-2xl md:text-3xl font-light">
              Interactive Showcase
            </div>
          </div>
          
          <p className="font-inter text-lg text-primary-gray max-w-2xl mx-auto leading-relaxed">
            Browse our comprehensive digital catalogues featuring the latest collections, 
            technical specifications, and design inspirations for your next project.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            <div className="text-center">
              <div className="font-clash text-3xl font-bold text-primary-gold mb-1">500+</div>
              <div className="font-space text-sm text-primary-gray">Products</div>
            </div>
            <div className="text-center">
              <div className="font-clash text-3xl font-bold text-primary-gold mb-1">12</div>
              <div className="font-space text-sm text-primary-gray">Collections</div>
            </div>
            <div className="text-center">
              <div className="font-clash text-3xl font-bold text-primary-gold mb-1">4K</div>
              <div className="font-space text-sm text-primary-gray">HD Images</div>
            </div>
            <div className="text-center">
              <div className="font-clash text-3xl font-bold text-primary-gold mb-1">24/7</div>
              <div className="font-space text-sm text-primary-gray">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogues Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Featured</span>{' '}
              <span className="text-outline">Catalogues</span>
            </h2>
            <p className="font-inter text-primary-gray text-lg max-w-2xl mx-auto">
              Download or browse our digital catalogues online. Each catalogue includes 
              detailed specifications, installation guides, and design inspiration.
            </p>
          </motion.div>

          <div className="catalogue-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {catalogues.map((catalogue, index) => (
              <motion.div
                key={catalogue.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-primary-darker rounded-3xl overflow-hidden border border-primary-gold/10 hover:border-primary-gold/30 transition-all duration-500"
              >
                {/* Catalogue Preview */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={catalogue.image}
                    alt={catalogue.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
                  
                  {/* Interactive Preview Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-4 right-4"
                  >
                    <button className="w-12 h-12 bg-primary-gold/90 backdrop-blur-sm text-primary-dark rounded-full flex items-center justify-center font-bold hover:bg-primary-gold transition-colors duration-300">
                      👁️
                    </button>
                  </motion.div>

                  {/* Stats Badge */}
                  <div className="absolute bottom-4 left-4 flex space-x-3">
                    <div className="bg-primary-dark/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-machina">
                      {catalogue.pages} pages
                    </div>
                    <div className="bg-primary-dark/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-machina">
                      {catalogue.size}
                    </div>
                  </div>
                </div>

                {/* Catalogue Info */}
                <div className="p-8 space-y-4">
                  <div>
                    <h3 className="font-space text-2xl font-semibold text-white mb-2">
                      {catalogue.title}
                    </h3>
                    <div className="font-machina text-primary-gold text-sm font-medium uppercase tracking-wide">
                      {catalogue.subtitle}
                    </div>
                  </div>

                  <p className="font-inter text-primary-gray leading-relaxed">
                    {catalogue.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 bg-primary-gold text-primary-dark font-machina font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300"
                    >
                      Download PDF
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 border-2 border-primary-gold text-primary-gold font-machina font-semibold rounded-lg hover:bg-primary-gold hover:text-primary-dark transition-all duration-300"
                    >
                      View Online
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Catalogue Viewer */}
      <section className="py-24 px-6 bg-primary-darker">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Interactive</span>{' '}
              <span className="text-white">Preview</span>
            </h2>
            <p className="font-inter text-primary-gray text-lg max-w-2xl mx-auto">
              Get a taste of our catalogue experience with this interactive preview.
            </p>
          </motion.div>

          {/* Flipbook Style Preview */}
          <div className="relative bg-primary-dark/50 rounded-3xl p-8 border border-primary-gold/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Mock Catalogue Pages */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-2xl transform hover:rotate-1 transition-transform duration-300">
                  <div className="space-y-4">
                    <div className="h-4 bg-primary-dark rounded w-3/4" />
                    <div className="h-32 bg-primary-gray/20 rounded" />
                    <div className="space-y-2">
                      <div className="h-2 bg-primary-gray/40 rounded w-full" />
                      <div className="h-2 bg-primary-gray/40 rounded w-2/3" />
                    </div>
                  </div>
                </div>
                <div className="absolute -right-2 -top-2 bg-white rounded-2xl p-6 shadow-xl transform -rotate-2">
                  <div className="space-y-4">
                    <div className="h-4 bg-primary-gold rounded w-1/2" />
                    <div className="h-32 bg-primary-gold/20 rounded" />
                    <div className="space-y-2">
                      <div className="h-2 bg-primary-gray/40 rounded w-full" />
                      <div className="h-2 bg-primary-gray/40 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center text-primary-dark font-bold">
                      ✓
                    </div>
                    <span className="font-space text-white">High-resolution product images</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center text-primary-dark font-bold">
                      ✓
                    </div>
                    <span className="font-space text-white">Detailed technical specifications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center text-primary-dark font-bold">
                      ✓
                    </div>
                    <span className="font-space text-white">Installation guidelines</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center text-primary-dark font-bold">
                      ✓
                    </div>
                    <span className="font-space text-white">Design inspiration gallery</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary-gold text-primary-dark font-machina font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-300 glow-gold"
                >
                  Access Full Catalogue
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-clash text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Stay</span>{' '}
              <span className="text-outline">Updated</span>
            </h2>
            <p className="font-inter text-primary-gray text-lg mb-8">
              Subscribe to receive the latest catalogues and product updates directly in your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-primary-darker border border-primary-gold/20 text-white rounded-full focus:border-primary-gold focus:outline-none transition-colors duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-gold text-primary-dark font-machina font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer/>
    </Loader>
  
  );
}