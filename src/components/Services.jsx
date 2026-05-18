import React from 'react';
import { motion } from 'framer-motion';
import { FiVideo, FiFilm, FiScissors, FiMonitor, FiLayout, FiImage } from 'react-icons/fi';
import { IoGameControllerOutline } from 'react-icons/io5';

const services = [
  { icon: <FiVideo size={32} />, title: "Instagram Reel Editing", desc: "Engaging vertical content designed to go viral and boost your reach." },
  { icon: <FiMonitor size={32} />, title: "YouTube Video Editing", desc: "High-retention, cinematic edits for long-form creator content." },
  { icon: <FiScissors size={32} />, title: "Shorts Editing", desc: "Snappy, fast-paced cuts tailored for the YouTube Shorts algorithm." },
  { icon: <FiLayout size={32} />, title: "Color Grading", desc: "Professional cinematic color correction to set the perfect mood." }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-brand-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bebas text-brand-white mb-4"
          >
            OUR <span className="text-brand-red">SERVICES</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="text-gray-400 font-montserrat max-w-2xl mx-auto"
          >
            We provide top-tier creative editing solutions tailored for modern creators and brands.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism glassmorphism-hover p-6 rounded-2xl group cursor-pointer"
            >
              <div className="text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:text-shadow-glow">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-poppins mb-2 text-white">{service.title}</h3>
              <p className="text-gray-400 text-sm font-montserrat leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
