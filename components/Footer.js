'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: FaInstagram },
    { name: 'Facebook', href: '#', icon: FaFacebookF },
    { name: 'LinkedIn', href: '#', icon: FaLinkedinIn },
    { name: 'Pinterest', href: '#', icon: FaPinterestP },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Catalogue', href: '/catalogue' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-white text-black">
      {/* Scrolling Marquee */}
      <div className="overflow-hidden bg-black/5 py-4">
        <motion.div
          animate={{ x: [-1000, 1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="whitespace-nowrap font-clash text-6xl font-light text-black/10"
        >
          ARCHITECTURE • INTERIOR DESIGN • LUXURY LIVING • PREMIUM SOLUTIONS • 
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="Architylezz Logo"
                  className="h-18 md:h-32 w-auto md:ml-[-30px]"
                />
              </Link>

              <p className="font-inter text-black/60 max-w-md leading-relaxed">
                Crafting exceptional architectural experiences and luxury interior designs 
                that transform spaces into timeless masterpieces.
              </p>

              {/* Social Links */}
              <div className="flex space-x-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-12 h-12 bg-black/5 border border-black/10 rounded-full flex items-center justify-center text-black/60 hover:text-black hover:bg-black/10 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-space text-lg font-semibold mb-6">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="font-inter text-black/60 hover:text-black transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-space text-lg font-semibold mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4 font-inter text-black/60">
                <p>📍 No3, 1st Cross Cabridge Layout Someshwarapura Halsuru Bangalore KA-560008 IND</p>
                <p>📞 +91 8341311147</p>
                <p>✉️ amar@architylezz.com</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-black/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="font-inter text-black/60 text-sm">
            © {currentYear} Architylezz. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-black/60 hover:text-black transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-black/60 hover:text-black transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
