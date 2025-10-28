"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api from "@/utils/api"; // ✅ axios instance
import { toast } from "react-hot-toast";

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const services = [
   "GVT Tiles",
   "Wall Tiles",
   "Subway Tiles",
    "Wooden Tiles",
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
      details: ["namaste@architylezz.com"],
      link: "mailto:namaste@architylezz.com",
    },
  ];

  // 🔥 GSAP for page entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-heading", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.from(".contact-grid", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/contact-forms", formData);
      toast.success("✅ Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("❌ Error submitting contact form:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className="bg-white text-black">
        {/* Contact Section */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <div className="contact-heading text-center mb-16">
              <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
                <span className="text-black">Contact</span>{" "}
                <span className="text-outline">Us</span>
              </h2>
              <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
                Fill out the form or reach us directly via phone, email, or by
                visiting our showroom.
              </p>
            </div>

            <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
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
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-lg focus:border-black focus:outline-none"
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
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-lg focus:border-black focus:outline-none"
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
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-lg focus:border-black focus:outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block font-space text-sm font-medium text-black mb-2">
                        Tile Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-lg focus:border-black focus:outline-none"
                      >
                        <option value="">Select a tile</option>
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
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 text-black rounded-lg focus:border-black focus:outline-none resize-none"
                      placeholder="Tell us about your project, budget, timeline..."
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-lg font-machina font-semibold transition-colors ${
                      submitting
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-black text-white hover:bg-gray-900"
                    }`}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="font-clash text-3xl md:text-4xl font-bold text-black mb-4">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
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
                                    className="hover:text-black transition-colors"
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
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </Loader>
  );
}