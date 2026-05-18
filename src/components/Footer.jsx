import React from 'react';
import { FiInstagram, FiYoutube, FiTwitter, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="DOPEDITS STUDIO Logo" className="h-14 w-14 rounded-full object-cover border-2 border-brand-red shadow-[0_0_15px_#ff0000]" />
              <div className="text-3xl font-bebas text-brand-white tracking-wider">
                <span className="text-brand-red text-shadow-glow">DOPEDITS</span> STUDIO
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
              A premium video editing and creative agency dedicated to crafting cinematic, high-retention content for creators, influencers, and brands. We edit emotions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors">
                <FiYoutube size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#home" className="hover:text-brand-red transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-brand-red transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-brand-red transition-colors">Portfolio</a></li>
              <li><a href="#team" className="hover:text-brand-red transition-colors">Founders</a></li>
              <li><a href="#pricing" className="hover:text-brand-red transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Sai Navadeep Addanki: +91 9100961733</li>
              <li>Kiran Yogesh: +91 8374300795</li>
              <li>Venkata Naresh: +91 8008239305</li>
              <li className="mt-4"><a href="mailto:hello@dopedits.com" className="text-brand-red hover:underline">hello@dopedits.com</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} DOPEDITS STUDIO. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            Made with <FiHeart size={12} className="text-brand-red fill-brand-red" /> by DopEditsStudio Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
