'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function Blog() {
  const containerRef = useRef(null);

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Sustainable Architecture',
      excerpt: 'Exploring innovative eco-friendly materials and design principles that are reshaping modern architecture.',
      author: 'Alexandra Chen',
      date: 'March 15, 2024',
      readTime: '8 min read',
      category: 'Sustainability',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      id: 2,
      title: 'Luxury Interior Trends 2024',
      excerpt: 'Discover the latest trends in luxury interior design, from maximalist aesthetics to minimalist elegance.',
      author: 'Marcus Rodriguez',
      date: 'March 12, 2024',
      readTime: '6 min read',
      category: 'Interior Design',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 3,
      title: 'Smart Home Integration in Modern Design',
      excerpt: 'How to seamlessly incorporate cutting-edge technology into contemporary architectural projects.',
      author: 'Sophie Williams',
      date: 'March 10, 2024',
      readTime: '10 min read',
      category: 'Technology',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 4,
      title: 'Material Innovations in Tile Design',
      excerpt: 'Revolutionary materials and manufacturing techniques that are transforming tile design possibilities.',
      author: 'Alexandra Chen',
      date: 'March 8, 2024',
      readTime: '7 min read',
      category: 'Materials',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 5,
      title: 'Creating Timeless Bathroom Spaces',
      excerpt: 'Design principles and material choices for bathrooms that stand the test of time.',
      author: 'Marcus Rodriguez',
      date: 'March 5, 2024',
      readTime: '9 min read',
      category: 'Design Tips',
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 6,
      title: 'The Art of Space Planning',
      excerpt: 'Master the fundamentals of effective space planning in residential and commercial projects.',
      author: 'Sophie Williams',
      date: 'March 3, 2024',
      readTime: '5 min read',
      category: 'Planning',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.from('.blog-grid', {
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
    <div ref={containerRef} className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[65vh] flex items-center justify-center px-6 bg-gradient-to-b from-primary-dark to-primary-darker">
        <div className="hero-content max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-clash text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Design</span>{' '}
              <span className="text-gradient">Insights</span>
            </h1>
            <div className="text-outline font-clash text-2xl md:text-3xl font-light">
              & Stories
            </div>
          </div>
          
          <p className="font-inter text-lg text-primary-gray max-w-2xl mx-auto leading-relaxed">
            Explore the latest trends, insights, and stories from the world of architecture 
            and interior design. Stay inspired with expert tips and innovative solutions.
          </p>

          {/* Blog Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="text-center">
              <div className="font-clash text-3xl font-bold text-primary-gold mb-1">150+</div>
              <div className="font-space text-sm text-primary-gray">Articles</div>
            </div>
            <div className="text-center">
              <div className="font-clash text-3xl font-bold text-primary-gold mb-1">50K+</div>
              <div className="font-space text-sm text-primary-gray">Readers</div>
            </div>
            <div className="text-center">
              <div className="font-clash text-3xl font-bold text-primary-gold mb-1">Weekly</div>
              <div className="font-space text-sm text-primary-gray">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-24 px-6 bg-primary-darker">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">Featured</span>{' '}
                <span className="text-white">Story</span>
              </h2>
            </motion.div>

            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Featured Image */}
                <div className="relative">
                  <div className="relative h-96 rounded-3xl overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-primary-gold text-primary-dark px-4 py-2 rounded-full font-machina font-semibold text-sm">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Featured Content */}
                <div className="space-y-6">
                  <div>
                    <div className="font-machina text-primary-gold text-sm font-medium uppercase tracking-wide mb-3">
                      {featuredPost.category}
                    </div>
                    <h3 className="font-clash text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="font-inter text-primary-gray text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-primary-gray">
                    <div className="flex items-center space-x-4">
                      <span className="font-space font-medium">{featuredPost.author}</span>
                      <span>•</span>
                      <span>{featuredPost.date}</span>
                    </div>
                    <span className="font-machina">{featuredPost.readTime}</span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-gold text-primary-dark font-machina font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-300 glow-gold"
                    >
                      <span>Read Article</span>
                      <span>→</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Latest</span>{' '}
              <span className="text-outline">Articles</span>
            </h2>
            <p className="font-inter text-primary-gray text-lg max-w-2xl mx-auto">
              Stay updated with our latest insights on architecture, design trends, 
              and industry innovations.
            </p>
          </motion.div>

          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-primary-darker rounded-2xl overflow-hidden border border-primary-gold/10 hover:border-primary-gold/30 transition-all duration-500"
              >
                {/* Post Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-gold/90 backdrop-blur-sm text-primary-dark px-3 py-1 rounded-full font-machina font-medium text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-space text-xl font-semibold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-inter text-primary-gray text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-primary-gray pt-4 border-t border-primary-gold/10">
                    <div className="flex items-center space-x-2">
                      <span className="font-space font-medium">{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="font-machina">{post.readTime}</span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-2"
                  >
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center space-x-2 text-primary-gold hover:text-white transition-colors duration-300 font-machina font-medium text-sm"
                    >
                      <span>Read More</span>
                      <span>→</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-primary-darker">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-clash text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Never Miss</span>{' '}
              <span className="text-gradient">An Update</span>
            </h2>
            <p className="font-inter text-primary-gray text-lg mb-8">
              Subscribe to our newsletter and get the latest design insights, 
              trends, and exclusive content delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-primary-dark border border-primary-gold/20 text-white rounded-full focus:border-primary-gold focus:outline-none transition-colors duration-300"
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
  );
}