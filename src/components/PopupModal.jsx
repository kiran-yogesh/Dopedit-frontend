import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PopupModal = ({ isOpen, onClose }) => {
  // Lock scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-brand-black/85 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative max-w-[90%] md:max-w-[550px] w-full bg-brand-dark/95 border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(255,0,0,0.4)] overflow-hidden cursor-default group"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow border overlay line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent"></div>

        {/* Premium Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 flex items-center justify-center w-9 h-9 rounded-full bg-brand-black/60 border border-white/10 text-brand-white/80 hover:text-brand-white hover:border-brand-red hover:bg-brand-red hover:shadow-[0_0_15px_#ff0000] hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          aria-label="Close popup"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content - Image Container */}
        <div className="relative aspect-square w-full select-none overflow-hidden">
          <img
            src="/popup.jpg"
            alt="New Service Now Live - Dop Editz Studio"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            draggable="false"
            loading="eager"
          />
          {/* Bottom subtle shadow/gradient overlay */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-brand-black/60 to-transparent pointer-events-none"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopupModal;
