import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiMail, FiPhone } from 'react-icons/fi';

const founders = [
  {
    name: "Sai Navadeep Addanki",
    role: "Co-Founder & Lead Editor",
    phone: "+91 9100961733",
    instagram: "Navadeepthunderbolt",
    image: "/sai-navadeep.jpg"
  },
  {
    name: "Kiran Yogesh Nuthalapati",
    role: "Co-Founder & Creative Director",
    phone: "+91 8374300795",
    instagram: "kiran_yogesh_1",
    image: "/kiran-yogesh.jpg"
  },
  {
    name: "Venkata Naresh Dudeela",
    role: "Co-Founder & Post-Production Head",
    phone: "+91 8008239305",
    instagram: "ganesh_00709",
    image: "/venkata-naresh.jpg"
  }
];

const Team = () => {
  return (
    <section id="team" className="py-24 bg-brand-dark relative z-10 overflow-hidden">
      {/* Decorative red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bebas text-brand-white mb-4"
          >
            THE <span className="text-brand-red">FOUNDERS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="text-gray-400 font-montserrat max-w-2xl mx-auto"
          >
            The visionaries behind DOPEDITS STUDIO.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glassmorphism p-8 rounded-2xl text-center relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="w-32 h-32 mx-auto rounded-full bg-brand-black border-2 border-brand-red/30 mb-6 flex items-center justify-center group-hover:border-brand-red transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.2)] group-hover:shadow-[0_0_25px_rgba(255,0,0,0.5)] overflow-hidden relative z-10">
                {founder.image ? (
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <span className="text-3xl font-bebas text-gray-500 group-hover:text-white">{founder.name.charAt(0)}</span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold font-poppins text-white mb-1 group-hover:text-brand-red transition-colors relative z-10">{founder.name}</h3>
              <p className="text-brand-red/80 text-sm font-medium tracking-wider uppercase mb-6 relative z-10">{founder.role}</p>
              
              <div className="flex justify-center gap-4 text-gray-400 relative z-20">
                <a href={`tel:${founder.phone.replace(/ /g, '')}`} className="p-2 hover:text-brand-red hover:bg-brand-red/10 rounded-full transition-all">
                  <FiPhone size={20} />
                </a>
                <a href={`https://instagram.com/${founder.instagram}`} target="_blank" rel="noreferrer" className="p-2 hover:text-brand-red hover:bg-brand-red/10 rounded-full transition-all">
                  <FiInstagram size={20} />
                </a>
                <a href={`mailto:contact@dopedits.com`} className="p-2 hover:text-brand-red hover:bg-brand-red/10 rounded-full transition-all">
                  <FiMail size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
