"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const services = [
    "Architectural Design",
    "Interior Design",
    "Consultation",
    "Project Management",
    "Custom Solutions",
  ];

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Our Showroom",
      details: [
        "No3, 1st Cross Cabridge Layout Someshwarapura Halsuru Bangalore KA-560008 IND",
      ],
      link: "https://maps.google.com",
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+91 8341311147"],
      link: "tel:8341311147",
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["amar@architylezz.com"],
      link: "mailto:amar@architylezz.com",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".contact-grid", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className="bg-white text-black">
        {/* Hero Section */}
        <section className="min-h-[65vh] flex items-center justify-center px-6 bg-gray-50">
          <div className="hero-content max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-clash text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-black">Get In</span>{" "}
              <span className="text-outline">Touch</span>
            </h1>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your space? Let’s discuss your project and
              bring your architectural vision to life with our expert team.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
                <span className="text-black">Contact</span>{" "}
                <span className="text-outline">Us</span>
              </h2>
              <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
                Fill out the form or reach us directly via phone, email, or by
                visiting our showroom.
              </p>
            </motion.div>

            <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space text-sm font-medium text-black mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black rounded-lg focus:border-black focus:outline-none transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block font-space text-sm font-medium text-black mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black rounded-lg focus:border-black focus:outline-none transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone & Service */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space text-sm font-medium text-black mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black rounded-lg focus:border-black focus:outline-none transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block font-space text-sm font-medium text-black mb-2">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black rounded-lg focus:border-black focus:outline-none transition-all duration-300"
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
                    <label className="block font-space text-sm font-medium text-black mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-black rounded-lg focus:border-black focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Tell us about your project, budget, timeline..."
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-black text-white font-machina font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-300"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <h2 className="font-clash text-3xl md:text-4xl font-bold text-black mb-4">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-start space-x-4 p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-300">
                        <div className="text-3xl">{info.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-space text-lg font-semibold text-black mb-2">
                            {info.title}
                          </h3>
                          <div className="space-y-1">
                            {info.details.map((detail, idx) => (
                              <p
                                key={idx}
                                className="font-inter text-gray-600"
                              >
                                {info.link && idx === 0 ? (
                                  <a
                                    href={info.link}
                                    className="hover:text-black transition-colors duration-300"
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
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </Loader>
  );
}
