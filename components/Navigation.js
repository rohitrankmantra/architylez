'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/about', label: 'About', id: 'about' },
    { 
      href: '/products', 
      label: 'Products', 
      id: 'products',
      submenu: [
        { href: '/products/gvt', label: 'GVT' },
        { href: '/products/subway', label: 'Subway' },
        { href: '/products/wall', label: 'Wall' },
        { href: '/products/wood', label: 'Wood' },

      ]
    },
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
        <div className="max-w-7xl mx-auto px-6 py-1">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="z-50">
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="Architylezz Logo"
                  className="h-32 w-full"
                />
              </Link>
            </motion.div>

            {/* Hamburger Button */}
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className="z-50 flex flex-col justify-center items-center w-10 h-10 space-y-1 md:w-12 md:h-12"
              whileTap={{ scale: 0.9 }}
            >
              <span className="block h-0.5 w-6 rounded-full bg-white" />
              <span className="block h-0.5 w-6 rounded-full bg-white" />
              <span className="block h-0.5 w-6 rounded-full bg-white" />
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
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white text-4xl hover:text-primary-gold transition-colors"
            >
              ✕
            </button>

            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                href={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {/* Parent Link with Chevron if submenu exists */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      item.submenu
                        ? setOpenSubmenu(openSubmenu === item.id ? null : item.id)
                        : setIsMenuOpen(false)
                    }
                    className={`text-3xl md:text-5xl font-space tracking-wider transition-all duration-300 ${
                      pathname === item.href
                        ? 'text-primary-gold'
                        : 'text-white hover:text-primary-gold'
                    }`}
                  >
                    {item.label}
                  </button>
                  {item.submenu && (
                    <button
                      onClick={() =>
                        setOpenSubmenu(openSubmenu === item.id ? null : item.id)
                      }
                      className="text-white hover:text-primary-gold transition-colors"
                    >
                      {openSubmenu === item.id ? (
                        <ChevronUp size={28} />
                      ) : (
                        <ChevronDown size={28} />
                      )}
                    </button>
                  )}
                </div>

                {/* Submenu (toggle) */}
                <AnimatePresence>
                  {item.submenu && openSubmenu === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 flex flex-col space-y-3"
                    >
                      {item.submenu.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-xl md:text-2xl text-gray-300 hover:text-primary-gold transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
