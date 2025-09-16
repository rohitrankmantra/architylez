'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from '@/components/ui/Loader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Products() {
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'gvt', label: 'GVT Tiles' },
    { id: 'wall', label: 'Wall Tiles' },
    { id: 'wood', label: 'Wood Collection' },
    { id: 'subway', label: 'Subway Tiles' }
  ];

  const products = [
    {
      id: 1,
      title: 'Carrara Marble GVT',
      category: 'gvt',
      price: '$89/sq ft',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['600x1200mm', 'Polished Finish', 'Rectified Edges']
    },
    {
      id: 2,
      title: 'Travertine Wall Series',
      category: 'wall',
      price: '$65/sq ft',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['300x600mm', 'Matt Finish', 'Digital Print']
    },
    {
      id: 3,
      title: 'Oak Wood Plank',
      category: 'wood',
      price: '$120/sq ft',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['200x1200mm', 'Natural Texture', 'Anti-Slip']
    },
    {
      id: 4,
      title: 'Metro Subway Classic',
      category: 'subway',
      price: '$45/sq ft',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['75x150mm', 'Gloss Finish', 'Beveled Edges']
    },
    {
      id: 5,
      title: 'Calacatta Gold GVT',
      category: 'gvt',
      price: '$95/sq ft',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['800x1600mm', 'High Gloss', 'Book Match']
    },
    {
      id: 6,
      title: 'Walnut Wood Effect',
      category: 'wood',
      price: '$110/sq ft',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['200x1000mm', 'Matt Finish', 'R10 Rating']
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.from('.category-filter', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Loader>
       <div ref={containerRef} className="pt-20">
      {/* Hero Section */}
    {/* Hero Section */}
<section className="relative h-[60vh] flex items-center justify-center px-6 overflow-hidden">
  {/* Animated Background Layer */}
  <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-darker to-black" />

  {/* Floating Gradient Orbs */}
  <motion.div
    className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-tr from-primary-gold/40 to-transparent rounded-full blur-3xl"
    animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
  />
  <motion.div
    className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-primary-gold/30 to-transparent rounded-full blur-3xl"
    animate={{ y: [0, -40, 0], scale: [1, 1.05, 1] }}
    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
  />

  {/* Overlay Pattern (subtle grid / texture) */}
  <div className="absolute inset-0 opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble.png')] mix-blend-overlay" />

  {/* Hero Content */}
  <div className="hero-content relative z-10 max-w-4xl mx-auto text-center space-y-8">
    <div className="space-y-4">
      <h1 className="font-clash text-5xl md:text-7xl font-bold leading-tight">
        <span className="text-white">Premium</span>{" "}
        <span className="text-gradient">Products</span>
      </h1>
      <div className="text-outline font-clash text-2xl md:text-3xl font-light">
        Luxury Collection
      </div>
    </div>

    <p className="font-inter text-lg text-primary-gray max-w-2xl mx-auto leading-relaxed">
      Discover our curated collection of premium tiles, surfaces, and materials.
      Each piece is carefully selected for its exceptional quality, design, and craftsmanship.
    </p>
  </div>
</section>


 {/* Category Filter */}
<section className="py-12 px-6 bg-primary-darker border-b border-primary-gold/10 sticky top-16 z-20">
  <div className="max-w-7xl mx-auto">
    <div className="category-filter flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-6 py-3 rounded-full font-machina font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? "bg-primary-gold text-primary-dark"
              : "bg-primary-dark/50 text-primary-gray hover:text-white border border-primary-gold/20 hover:border-primary-gold/50"
          }`}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  </div>
</section>


      {/* Products Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-primary-darker rounded-2xl overflow-hidden border border-primary-gold/10 hover:border-primary-gold/30 transition-all duration-500"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-primary-gold/90 backdrop-blur-sm text-primary-dark px-3 py-1 rounded-full font-machina font-semibold text-sm">
                      {product.price}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-space text-xl font-semibold text-white mb-2">
                        {product.title}
                      </h3>
                      <div className="font-machina text-primary-gold text-sm font-medium uppercase tracking-wide">
                        {categories.find(cat => cat.id === product.category)?.label}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-primary-gray text-sm">
                          <div className="w-1.5 h-1.5 bg-primary-gold rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-primary-gold/10 border border-primary-gold/30 text-primary-gold font-machina font-medium rounded-lg hover:bg-primary-gold/20 transition-all duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="font-space text-xl text-primary-gray">
                No products found in this category.
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-primary-darker">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-clash text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Need</span>{' '}
              <span className="text-gradient">Custom Solutions</span>
              <span className="text-outline">?</span>
            </h2>
            <p className="font-inter text-primary-gray text-lg mb-8">
              Our design experts are ready to help you create the perfect space 
              with personalized product recommendations and design consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-gold text-primary-dark font-machina font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300 glow-gold"
              >
                Request Consultation
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary-gold text-primary-gold font-machina font-semibold rounded-full hover:bg-primary-gold hover:text-primary-dark transition-all duration-300"
              >
                Download Catalogue
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>

    </Loader>
   
  );
}