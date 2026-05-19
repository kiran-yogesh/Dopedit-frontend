import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    const handlePackageSelection = (e) => {
      setFormData(prev => ({ ...prev, service: e.detail }));
    };
    window.addEventListener('selectPackage', handlePackageSelection);
    return () => window.removeEventListener('selectPackage', handlePackageSelection);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const phoneNumber = "919100961733";
    const text = `Hello, I'm interested in your services!
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service:* ${formData.service}
*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    setStatus('success');
    setFormData({name: '', email: '', phone: '', service: '', message: ''});
    
    setTimeout(() => setStatus(''), 3000);
  }

  return (
    <section id="contact" className="py-24 bg-brand-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bebas text-brand-white mb-6"
            >
              READY TO <span className="text-brand-red">LEVEL UP?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: 0.1 }}
              className="text-gray-400 font-montserrat mb-8"
            >
              Drop us a message. We usually reply within 24 hours to discuss how we can elevate your content.
            </motion.p>
            
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <span className="font-bebas text-xl">W</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">WhatsApp Us</p>
                  <p className="text-lg font-medium text-white">+91 9100961733</p>
                  <p className="text-lg font-medium text-white">+91 8374300795</p>
                  <p className="text-lg font-medium text-white">+91 8008239305</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit} 
              className="glassmorphism p-8 rounded-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Service Needed</label>
                  <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors appearance-none">
                    <option value="" disabled>Select a service</option>
                    <option value="Basic Reel">Basic Reel Package</option>
                    <option value="Pro Creator">Pro Creator Package</option>
                    <option value="Reel Editing">Reel/Shorts Editing</option>
                    <option value="YouTube Editing">YouTube Editing</option>
                    <option value="Color Grading">Color Grading</option>
                    <option value="Wedding Cinematic">Wedding Cinematic</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} rows="4" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors resize-none"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-lg uppercase tracking-wider transition-colors box-shadow-glow flex justify-center items-center gap-2"
              >
                {status === 'sending' ? 'Sending...' : 'Send Request'} <FiSend size={20} />
              </button>
              {status === 'success' && <p className="text-green-500 mt-4 text-center">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-500 mt-4 text-center">Failed to send. Please try again.</p>}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
