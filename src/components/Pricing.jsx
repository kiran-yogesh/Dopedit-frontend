import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const plans = [
  {
    name: "Basic Reel",
    price: "₹999",
    period: "/reel",
    desc: "Perfect for quick, engaging Instagram Reels or Shorts.",
    features: [
      "Up to 60 Seconds",
      "Basic Color Grading",
      "Dynamic Captions",
      "Background Music",
      "1 Revision"
    ],
    highlight: false
  },
  {
    name: "Pro Creator",
    price: "₹2,999",
    period: "/video",
    desc: "High-retention YouTube editing for dedicated creators.",
    features: [
      "Flat 4 Videos",
      "Advanced Color Grading",
      "Cinematic D.O.P",
      "Sound Design & SFX",
      "3 Revisions"
    ],
    highlight: true
  },

];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-brand-black relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bebas text-brand-white mb-4"
          >
            EDITING <span className="text-brand-red">PACKAGES</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="text-gray-400 font-montserrat max-w-2xl mx-auto"
          >
            Transparent pricing for premium results. Choose the tier that fits your content.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`rounded-2xl p-8 relative overflow-hidden transition-transform duration-300 hover:-translate-y-2 ${
                plan.highlight 
                ? 'bg-gradient-to-b from-brand-red/20 to-brand-black border border-brand-red shadow-[0_0_30px_rgba(255,0,0,0.15)]' 
                : 'glassmorphism'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-brand-red text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2 font-poppins">{plan.name}</h3>
              <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{plan.desc}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bebas text-brand-white">{plan.price}</span>
                <span className="text-gray-500 font-medium ml-1">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiCheck size={18} className="text-brand-red mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('selectPackage', { detail: plan.name }));
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 ${
                plan.highlight 
                ? 'bg-brand-red text-white hover:bg-red-700 box-shadow-glow' 
                : 'bg-transparent border border-gray-600 text-white hover:border-brand-red hover:text-brand-red'
              }`}>
                Select Package
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
