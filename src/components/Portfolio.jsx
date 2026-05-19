import React from 'react';
import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';

const portfolioItems = [
  { id: 1, type: 'Reel', title: 'Cinematic Reels', bg: 'bg-gradient-to-br from-gray-800 to-gray-900' ,video:"cinematic.mp4"},
  { id: 2, type: 'Classic Videos', title: 'Classic Edit', bg: 'bg-gradient-to-br from-red-900 to-black' ,video:"classic.mp4"},
  { id: 3, type: 'Shorts', title: 'Short Highlights', bg: 'bg-gradient-to-br from-gray-900 to-black' ,video:"/general shoot.mp4"},
  { id: 6, type: 'Motion', title: 'Brand Promo Video', bg: 'bg-gradient-to-br from-black to-red-900' ,video:"/promotional video.mp4"},
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-brand-black relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bebas text-brand-white mb-4"
            >
              FEATURED <span className="text-brand-red">WORK</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: 0.1 }}
              className="text-gray-400 font-montserrat max-w-xl"
            >
              A glimpse into our visual storytelling.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#"
            className="text-brand-red hover:text-white mt-4 md:mt-0 flex items-center gap-2 font-medium uppercase tracking-wider text-sm transition-colors"
          >
            View All Projects
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative aspect-[9/16] lg:aspect-video rounded-2xl overflow-hidden group ${item.bg}`}
            >
              {/* Overlay for Hover Effect */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500 z-10 flex flex-col justify-center items-center">
                <div className="w-16 h-16 rounded-full bg-brand-red/90 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_#ff0000]">
                  <FiPlay fill="currentColor" size={24} className="ml-1" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm mb-2 inline-block border border-brand-red/30">
                  {item.type}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 font-poppins">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
