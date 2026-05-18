import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  
  useEffect(() => {
    // GSAP parallax or floating effect on the background could go here
    const ctx = gsap.context(() => {
      gsap.to('.hero-particle', {
        y: 'random(-100, 100)',
        x: 'random(-100, 100)',
        opacity: 'random(0.2, 0.8)',
        duration: 'random(3, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.1
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black pt-20">
      {/* Background Video/Effects */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/80 to-brand-black z-10" />
        {/* Placeholder for animated background video/smoke */}
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/20 via-brand-black to-brand-black"></div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="hero-particle absolute w-2 h-2 rounded-full bg-brand-red z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px #ff0000'
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas tracking-wider mb-4 text-shadow-glow">
            WE EDIT <span className="text-brand-red">EMOTIONS</span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-gray-300 font-montserrat mb-10 max-w-3xl mx-auto"
        >
          Cinematic Video Editing For Creators, Influencers & Brands
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a 
            href="#portfolio"
            className="px-8 py-4 bg-brand-red text-white font-bold rounded-full text-lg uppercase tracking-wider hover:bg-red-700 transition-all box-shadow-glow w-full sm:w-auto"
          >
            View Portfolio
          </a>
          <a 
            href="#contact"
            className="px-8 py-4 bg-transparent border-2 border-brand-red text-white font-bold rounded-full text-lg uppercase tracking-wider hover:bg-brand-red/10 transition-all w-full sm:w-auto"
          >
            Book Now
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm tracking-widest text-gray-400 uppercase mb-2">Scroll</span>
        <div className="w-1 h-12 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-brand-red rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
