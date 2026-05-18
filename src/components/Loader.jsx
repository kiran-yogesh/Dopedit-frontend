import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/10 via-brand-black to-brand-black pointer-events-none"></div>
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <img 
          src="/logo.png" 
          alt="DOPEDITS STUDIO Logo" 
          className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-2 border-brand-red mb-6 animate-glow shadow-[0_0_30px_#ff0000]" 
        />
        <div className="text-4xl md:text-5xl font-bebas text-brand-white tracking-widest overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <span className="text-brand-red text-shadow-glow">WE EDIT</span> EMOTIONS
          </motion.div>
        </div>
      </motion.div>
      
      {/* Loading Progress Bar */}
      <div className="absolute bottom-16 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-full bg-brand-red shadow-[0_0_10px_#ff0000]"
        />
      </div>
    </motion.div>
  );
};

export default Loader;
