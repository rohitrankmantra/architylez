'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/products', label: 'Products', id: 'products' },
    { href: '/catalogue', label: 'Catalogue', id: 'catalogue' },
    { href: '/blog', label: 'Blog', id: 'blog' },
    { href: '/contact', label: 'Contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-primary-dark/95 backdrop-blur-md border-b border-primary-gold/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="z-10"
          >
            <Link href="/" className="font-clash text-2xl font-bold text-gradient">
              Architylezz
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className={`font-space text-sm font-medium tracking-wide transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-primary-gold'
                      : 'text-white hover:text-primary-gold'
                  }`}
                >
                  {item.label}
                </Link>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary-gold"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Link
              href="/contact"
              className="px-6 py-2 bg-primary-gold text-primary-dark font-machina font-medium rounded-full hover:bg-yellow-400 transition-all duration-300 glow-gold"
            >
              Get Quote
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;