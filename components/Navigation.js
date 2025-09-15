'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-primary-dark/95 backdrop-blur-md border-b border-primary-gold/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="z-50">
              <Link href="/" className="font-clash text-2xl font-bold text-gradient">
                Architylezz
              </Link>
            </motion.div>

            {/* Hamburger Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="z-50 flex flex-col justify-center items-center w-10 h-10 space-y-1 md:w-12 md:h-12"
              whileTap={{ scale: 0.9 }}
            >
              <span
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2 bg-primary-gold' : 'bg-white'
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'bg-white'
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2 bg-primary-gold' : 'bg-white'
                }`}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-primary-dark flex flex-col items-center justify-center space-y-8 z-[9999]"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-3xl md:text-5xl font-space tracking-wider transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-primary-gold'
                      : 'text-white hover:text-primary-gold'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
