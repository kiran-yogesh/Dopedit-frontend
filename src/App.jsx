import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import FloatingWidgets from './components/FloatingWidgets';
import PopupModal from './components/PopupModal';

function App() {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 600); // Elegant 600ms delay after loader completes
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <Router>
      <div className="bg-brand-black min-h-screen text-brand-white font-poppins selection:bg-brand-red selection:text-white">
        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <div key="content">
              <Navbar />
              <FloatingWidgets />
              <main>
                <Hero />
                <Services />
                <Portfolio />
                <Team />
                <Pricing />
                <Contact />
              </main>
              <Footer />
              <AnimatePresence>
                {showPopup && (
                  <PopupModal isOpen={showPopup} onClose={() => setShowPopup(false)} />
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
