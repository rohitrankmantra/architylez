'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Award, Leaf, Users } from "lucide-react"; 
import Loader from '@/components/ui/Loader';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.split-content', {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.split-content',
          start: 'top 80%'
        }
      });

      gsap.from('.split-image', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.split-image',
          start: 'top 80%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const values = [
    { title: 'Innovation', description: 'Pushing boundaries with cutting-edge design solutions and emerging technologies.', icon: Lightbulb },
    { title: 'Excellence', description: 'Uncompromising quality in every detail, from concept to completion.', icon: Award },
    { title: 'Sustainability', description: 'Creating eco-conscious designs that respect our environment and future generations.', icon: Leaf },
    { title: 'Collaboration', description: 'Working closely with clients to bring their unique vision to life.', icon: Users },
  ];

  const team = [
    { name: 'Alexandra Chen', role: 'Principal Architect', image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400', expertise: 'Sustainable Architecture' },
    { name: 'Marcus Rodriguez', role: 'Interior Design Director', image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400', expertise: 'Luxury Hospitality' },
    { name: 'Sophie Williams', role: 'Creative Director', image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400', expertise: 'Contemporary Residential' }
  ];

  return (
    <Loader>
      <div ref={containerRef} className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-primary-dark to-primary-darker">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              
              {/* Text Side */}
              <motion.div className="split-content space-y-6 sm:space-y-8 text-center lg:text-left">
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="font-clash text-3xl sm:text-5xl md:text-7xl font-bold leading-tight">
                    <span className="text-white">About</span>{' '}
                    <span className="text-gradient">Architylezz</span>
                  </h1>
                  <div className="text-outline font-clash text-lg sm:text-2xl md:text-3xl font-light">
                    Design Philosophy
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6 font-inter text-primary-gray leading-relaxed">
                  <p className="text-sm sm:text-base md:text-lg">
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
                    <div className="font-clash text-2xl sm:text-4xl font-bold text-primary-gold mb-1 sm:mb-2">150+</div>
                    <div className="font-space text-xs sm:text-sm text-primary-gray">Projects Completed</div>
                  </div>
                  <div>
                    <div className="font-clash text-2xl sm:text-4xl font-bold text-primary-gold mb-1 sm:mb-2">25+</div>
                    <div className="font-space text-xs sm:text-sm text-primary-gray">Awards Won</div>
                  </div>
                </div>
              </motion.div>

              {/* Image Side */}
              <motion.div className="split-image relative">
                <div className="relative w-full h-64 sm:h-80 md:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Modern Architecture"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-gold/20 to-transparent" />
                </div>
                {/* Decorative Circles */}
                <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-12 h-12 sm:w-20 sm:h-20 lg:w-32 lg:h-32 bg-primary-gold/10 rounded-full border border-primary-gold/20" />
                <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-10 h-10 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-primary-gold/5 rounded-full border border-primary-gold/10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-primary-darker">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="font-clash text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6">
                <span className="text-outline">Our</span>{' '}
                <span className="text-white">Values</span>
              </h2>
              <p className="font-inter text-primary-gray text-sm sm:text-lg max-w-2xl mx-auto">
                The core principles that guide every project and define our approach to exceptional design.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="text-center group"
                >
                  <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-primary-gold/10 border border-primary-gold/20 rounded-full flex items-center justify-center group-hover:bg-primary-gold/20 transition-all duration-300">
                    <value.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-gold group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-space text-base sm:text-xl font-semibold text-white mb-2 sm:mb-4">
                    {value.title}
                  </h3>
                  <p className="font-inter text-primary-gray text-sm sm:text-base leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="font-clash text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6">
                <span className="text-white">Meet Our</span>{' '}
                <span className="text-gradient">Team</span>
              </h2>
              <p className="font-inter text-primary-gray text-sm sm:text-lg max-w-2xl mx-auto">
                Talented professionals passionate about creating exceptional spaces and experiences.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="text-center group"
                >
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-full max-w-[280px] sm:max-w-xs mx-auto aspect-square rounded-2xl overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-gold/50 rounded-2xl transition-all duration-300" />
                  </div>
                  
                  <h3 className="font-space text-base sm:text-xl font-semibold text-white mb-1 sm:mb-2">
                    {member.name}
                  </h3>
                  <div className="font-machina text-primary-gold text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    {member.role}
                  </div>
                  <p className="font-inter text-primary-gray text-xs sm:text-sm">
                    {member.expertise}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Loader>
  );
}
