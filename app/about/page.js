'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Award, Leaf, Users } from "lucide-react"; 
import Loader from '@/components/ui/Loader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.from('.split-content', {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.split-content',
          start: 'top 80%',
        },
      });

      gsap.from('.split-image', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.split-image',
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { title: ' Innovation with Purpose', description: 'We constantly evolve our collections to reflect modern design trends while staying rooted in craftsmanship and sustainability. Every product is a step toward smarter, more beautiful living spaces.', icon: Lightbulb },
    { title: 'Design Excellence', description: 'We believe great design starts with detail. Every Architylezz tile is created to inspire creativity, elevate spaces, and bring a touch of artistry to everyday life.', icon: Award },
    { title: 'Quality Without Compromise', description: 'From sourcing to finishing, we maintain the highest standards of quality. Our tiles are made to last — durable, easy to maintain, and timeless in appeal.', icon: Leaf },
    { title: 'Integrity in Every Interaction', description: 'We value honesty, transparency, and long-term relationships. Whether it’s with our clients, partners, or teams, we stand by our word and our work.', icon: Users },
  ];

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className="pt-20 bg-white text-gray-900">
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center py-12 sm:py-16 lg:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              
              {/* Text Side */}
              <motion.div className="split-content space-y-6 sm:space-y-8 text-center md:text-left px-2 sm:px-0">
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="font-clash text-3xl sm:text-5xl lg:text-5xl font-bold leading-tight">
                    <span className="text-black">About</span>{' '}
                    <span className="text-outline uppercase">Architylezz</span>
                  </h1>
                  <div className="font-clash text-lg sm:text-2xl font-light text-gray-600">
                    Design Philosophy
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6 font-inter text-gray-700 leading-relaxed text-justify tracking-normal sm:tracking-wide">
                  <p className="text-sm sm:text-base">
                    Founded on the principles of innovation, sustainability, and timeless design,
                    Architylezz has been at the forefront of architectural excellence for over a decade.
                  </p>
                  <p className="text-sm sm:text-base">
                    Our multidisciplinary team of architects, interior designers, and creative professionals
                    work collaboratively to transform spaces into extraordinary experiences.
                  </p>
                  <p className="text-sm sm:text-base">
                    From residential masterpieces to commercial landmarks, we approach each project
                    with fresh perspective and unwavering commitment to quality.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-8">
                  <div>
                    <div className="font-clash text-2xl sm:text-4xl font-bold text-[#001053] mb-1 sm:mb-2">20</div>
                    <div className="font-space text-xs sm:text-sm text-gray-600">Projects Completed</div>
                  </div>
                  <div>
                    <div className="font-clash text-2xl sm:text-4xl font-bold text-[#001053] mb-1 sm:mb-2">3</div>
                    <div className="font-space text-xs sm:text-sm text-gray-600">Countries Served</div>
                  </div>
                </div>
              </motion.div>

              {/* Image Side */}
              <motion.div className="split-image relative mt-10 md:mt-0">
                <div className="relative w-full h-60 sm:h-72 md:h-[400px] lg:h-[550px] rounded-2xl md:rounded-3xl overflow-hidden shadow-md">
                  <img
                    src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Modern Architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="font-clash text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 text-black">
                Our <span className="text-outline">Values</span>
              </h2>
              <p className="font-inter text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto">
                The core principles that guide every project and define our approach to exceptional design.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="text-center group px-2"
                >
                  <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-[#001053]/10 rounded-full flex items-center justify-center group-hover:bg-[#001053]/20 transition-all duration-300">
                    <value.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#001053] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-space text-base sm:text-xl font-semibold text-black mb-2 sm:mb-4">
                    {value.title}
                  </h3>
                  <p className="font-inter text-gray-600 text-sm sm:text-base leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </Loader>
  );
}
