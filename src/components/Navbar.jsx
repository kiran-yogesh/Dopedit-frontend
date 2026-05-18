import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Team', href: '#team' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center gap-3">
            <a href="#home" className="flex items-center gap-3">
              <img src="/logo.png" alt="DOPEDITS STUDIO Logo" className="h-12 w-12 rounded-full object-cover border-2 border-brand-red shadow-[0_0_10px_#ff0000]" />
              <div className="hidden sm:block text-2xl font-bebas text-brand-white tracking-wider">
                <span className="text-brand-red text-shadow-glow">DOPEDITS</span> STUDIO
              </div>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-gray-300 hover:text-brand-red transition-colors font-medium text-sm tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              className="bg-brand-red hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 box-shadow-glow"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brand-red focus:outline-none"
            >
              {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-black/95 backdrop-blur-lg border-b border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-brand-red hover:bg-white/5 uppercase"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium bg-brand-red text-white hover:bg-red-700 box-shadow-glow"
            >
              Book Now
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
