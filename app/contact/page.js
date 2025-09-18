'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Loader from '@/components/ui/Loader';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';


export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const services = [
    'Architectural Design',
    'Interior Design',
    'Consultation',
    'Project Management',
    'Custom Solutions'
  ];

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Our Showroom',
      details: ['No3, 1st Cross Cabridge Layout Someshwarapura Halsuru Bangalore KA-560008 IND'],
      link: 'https://maps.google.com'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+91 8341311147'],
      link: 'tel:8341311147'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: ['amar@architylezz.com'],
      link: 'mailto:amar@architylezz.com'
    },
 
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.from('.contact-form', {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from('.contact-info', {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <Loader>
      <Navigation/>
      <div ref={containerRef} className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[65vh] flex items-center justify-center px-6 bg-gradient-to-b from-primary-dark to-primary-darker">
        <div className="hero-content max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-clash text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Get In</span>{' '}
              <span className="text-gradient">Touch</span>
            </h1>
            <div className="text-outline font-clash text-2xl md:text-3xl font-light">
              Start Your Project
            </div>
          </div>
          
          <p className="font-inter text-lg text-primary-gray max-w-2xl mx-auto leading-relaxed">
            Ready to transform your space? Let's discuss your project and bring 
            your architectural vision to life with our expert team.
          </p>

          {/* Quick Contact Options */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <motion.a
              href="tel:+15551234567"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-6 py-3 bg-primary-gold/10 border border-primary-gold/30 rounded-full text-primary-gold hover:bg-primary-gold hover:text-primary-dark transition-all duration-300"
            >
              <span>📞</span>
              <span className="font-machina font-medium">Call Now</span>
            </motion.a>
            
            <motion.a
              href="mailto:hello@architylezz.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 px-6 py-3 bg-primary-gold/10 border border-primary-gold/30 rounded-full text-primary-gold hover:bg-primary-gold hover:text-primary-dark transition-all duration-300"
            >
              <span>✉️</span>
              <span className="font-machina font-medium">Email Us</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="contact-form">
              <div className="space-y-8">
                <div>
                  <h2 className="font-clash text-3xl md:text-4xl font-bold text-white mb-4">
                    Send Us a Message
                  </h2>
                  <p className="font-inter text-primary-gray">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space text-sm font-medium text-white mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-primary-darker border border-primary-gold/20 text-white rounded-lg focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block font-space text-sm font-medium text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-primary-darker border border-primary-gold/20 text-white rounded-lg focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Service */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space text-sm font-medium text-white mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-primary-darker border border-primary-gold/20 text-white rounded-lg focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block font-space text-sm font-medium text-white mb-2">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-primary-darker border border-primary-gold/20 text-white rounded-lg focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-space text-sm font-medium text-white mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-primary-darker border border-primary-gold/20 text-white rounded-lg focus:border-primary-gold focus:outline-none focus:ring-1 focus:ring-primary-gold transition-all duration-300 resize-none"
                      placeholder="Tell us about your project, budget, timeline, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-primary-gold text-primary-dark font-machina font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300 glow-gold"
                  >
                    Send Message
                  </motion.button>

                  <p className="text-primary-gray text-sm font-inter">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info space-y-8">
              <div>
                <h2 className="font-clash text-3xl md:text-4xl font-bold text-white mb-4">
                  Contact Information
                </h2>
                <p className="font-inter text-primary-gray">
                  Get in touch with us through any of the following methods. 
                  We're here to help bring your vision to life.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-start space-x-4 p-6 bg-primary-darker/50 border border-primary-gold/10 rounded-2xl hover:border-primary-gold/30 transition-all duration-300">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-space text-lg font-semibold text-white mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="font-inter text-primary-gray">
                              {info.link && idx === 0 ? (
                                <a
                                  href={info.link}
                                  className="hover:text-primary-gold transition-colors duration-300"
                                >
                                  {detail}
                                </a>
                              ) : (
                                detail
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-64 bg-primary-darker rounded-2xl border border-primary-gold/10 overflow-hidden relative group hover:border-primary-gold/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/10 to-primary-gold/5 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      🗺️
                    </div>
                    <div className="font-space text-white font-medium">
                      Interactive Map
                    </div>
                    <div className="font-inter text-primary-gray text-sm">
                      Click to view our location
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4AF37\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM30 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"/>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-primary-darker">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Frequently Asked</span>{' '}
              <span className="text-outline">Questions</span>
            </h2>
            <p className="font-inter text-primary-gray text-lg">
              Common questions about our services and process.
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What is your typical project timeline?",
                answer: "Project timelines vary based on scope and complexity. Residential projects typically take 8-12 weeks, while commercial projects may take 12-20 weeks from concept to completion."
              },
              {
                question: "Do you provide 3D visualizations?",
                answer: "Yes, we provide photorealistic 3D renderings and virtual walkthroughs for all our projects to help you visualize the final result before construction begins."
              },
              {
                question: "What is included in your consultation?",
                answer: "Our initial consultation includes site analysis, design brief discussion, preliminary concepts, timeline overview, and budget estimation. This service is complimentary for qualified projects."
              },
              {
                question: "Do you handle permits and approvals?",
                answer: "Yes, we manage all necessary permits, approvals, and regulatory compliance as part of our comprehensive project management service."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-primary-dark/50 border border-primary-gold/10 rounded-2xl p-6 hover:border-primary-gold/30 transition-all duration-300"
              >
                <h3 className="font-space text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="font-inter text-primary-gray leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    <Footer/>
      
    </Loader>
    
  );
}