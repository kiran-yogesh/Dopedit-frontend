import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCreditCard } from 'react-icons/fi';
import PaymentStatusModal from './PaymentStatusModal';
import API_URL from '../config/api';

const plans = [
  {
    name: "Basic Reel",
    price: "₹9",
    period: "/reel",
    desc: "Perfect for quick, engaging Instagram Reels or Shorts.",
    features: [
      "Up to 60 Seconds",
      "Basic Color Grading",
      "Dynamic Captions",
      "Background Music",
      "1 Revision"
    ]
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
    ]
  },
  {
    name: "Web & Video Combo",
    price: "₹15,000",
    period: "/combo",
    desc: "Our hot new service launch! Get a custom premium website + 2 high-conversion promotional videos.",
    features: [
      "Custom Premium Website (₹12,000 Value)",
      "2 Promotional Videos (₹3,000 Value)",
      "100% Mobile & Desktop Responsive",
      "SEO Optimized & Fast Load Setup",
      "Cinematic Visuals & Pro Sound Design",
      "Dedicated Support & Revisions"
    ]
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });
  const [status, setStatus] = useState('');
  const [selectedPackageDetails, setSelectedPackageDetails] = useState(null);
  
  // Payment states
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('success');
  const [modalDetails, setModalDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Automatically match package details if user selects a package from dropdown
    if (name === 'service') {
      const foundPlan = plans.find(p => p.name === value);
      setSelectedPackageDetails(foundPlan || null);
    }
  }

  useEffect(() => {
    const handlePackageSelection = (e) => {
      const plan = e.detail;
      setFormData(prev => ({ ...prev, service: plan.name }));
      setSelectedPackageDetails(plan);
    };
    window.addEventListener('selectPackage', handlePackageSelection);
    return () => window.removeEventListener('selectPackage', handlePackageSelection);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          selectedPackage: selectedPackageDetails
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit request to server.");
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setSelectedPackageDetails(null);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus(''), 4000);
    }
  }


  // Load Razorpay SDK script dynamically in the browser
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in your Name, Email, and Phone Number before initiating the payment.");
      return;
    }

    if (!selectedPackageDetails) {
      alert("Please select a package to pay for.");
      return;
    }

    setPaymentLoading(true);

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Failed to load Razorpay Payment Gateway SDK. Please check your internet connection.");
        setPaymentLoading(false);
        return;
      }

      // Parse the price dynamically (e.g., "₹2,999" -> 2999)
      const cleanPrice = selectedPackageDetails.price.replace(/[₹,]/g, '');
      const amountVal = parseInt(cleanPrice, 10);

      // Call backend to create Razorpay order
      const response = await fetch(`${API_URL}/api/payment/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          packageName: selectedPackageDetails.name,
          amount: amountVal
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create order on server.");
      }

      const orderData = await response.json();

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "DOPEDITS STUDIO",
        description: `${selectedPackageDetails.name} Package Purchase`,
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#FF0000" // Brand red
        },
        handler: async function (paymentResponse) {
          try {
            setPaymentLoading(true);
            
            // Verify payment signature on backend
            const verifyResponse = await fetch(`${API_URL}/api/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                orderId: orderData.orderId,
                paymentId: paymentResponse.razorpay_payment_id,
                signature: paymentResponse.razorpay_signature,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                packageName: selectedPackageDetails.name,
                amount: amountVal
              })
            });

            if (!verifyResponse.ok) {
              throw new Error("Payment signature verification failed.");
            }

            // Payment successful!
            setModalDetails({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              packageName: selectedPackageDetails.name,
              amount: amountVal.toLocaleString('en-IN'),
              orderId: orderData.orderId,
              paymentId: paymentResponse.razorpay_payment_id
            });
            setModalStatus('success');
            setIsModalOpen(true);

            // Reset form fields
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
            setSelectedPackageDetails(null);
          } catch (err) {
            console.error("Payment verification error:", err);
            setModalStatus('error');
            setModalDetails({ error: err.message || "Failed to verify transaction." });
            setIsModalOpen(true);
          } finally {
            setPaymentLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "An error occurred while loading checkout.");
      setPaymentLoading(false);
    }
  };

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
              Drop us a message or activate your project immediately by choosing a package and clicking "Pay Now". We usually reply within 24 hours.
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
              {selectedPackageDetails && formData.service === selectedPackageDetails.name && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-6 bg-brand-red/10 border border-brand-red/30 rounded-lg p-5"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white font-bold text-lg">{selectedPackageDetails.name} Package</h4>
                    <span className="text-brand-red font-bebas text-2xl">{selectedPackageDetails.price} <span className="text-sm text-gray-400 font-sans">{selectedPackageDetails.period}</span></span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-300">
                    {selectedPackageDetails.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-brand-red text-xs">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

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
                  <input type="tel" name="phone" required={!!selectedPackageDetails} value={formData.phone} onChange={handleChange} className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors" placeholder={selectedPackageDetails ? "Required for payment" : ""} />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Service Needed</label>
                  <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors appearance-none">
                    <option value="" disabled>Select a service</option>
                    <option value="Basic Reel">Basic Reel Package (₹9)</option>
                    <option value="Pro Creator">Pro Creator Package (₹2,999)</option>
                    <option value="Web & Video Combo">Web & Video Combo Package (₹15,000)</option>
                    <option value="Reel Editing">Reel/Shorts Editing (Inquiry)</option>
                    <option value="YouTube Editing">YouTube Editing (Inquiry)</option>
                    <option value="Color Grading">Color Grading (Inquiry)</option>
                    <option value="Wedding Cinematic">Wedding Cinematic (Inquiry)</option>
                    <option value="Other">Other (Inquiry)</option>
                  </select>
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea name="message" required value={formData.message} onChange={handleChange} rows="4" className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors resize-none"></textarea>
              </div>
              
              {/* Dual button grid layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-4 rounded-lg uppercase tracking-wider transition-colors box-shadow-glow flex justify-center items-center gap-2"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Request'} <FiSend size={20} />
                </button>
                <button 
                  type="button" 
                  onClick={handlePayment}
                  disabled={paymentLoading || !selectedPackageDetails}
                  className={`w-full font-bold py-4 rounded-lg uppercase tracking-wider transition-all duration-300 flex justify-center items-center gap-2 ${
                    selectedPackageDetails 
                      ? 'bg-green-600 hover:bg-green-700 text-white box-shadow-glow cursor-pointer' 
                      : 'bg-gray-800/80 text-gray-500 border border-gray-700/60 cursor-not-allowed'
                  }`}
                >
                  {paymentLoading ? 'Processing...' : 'Pay Now'} <FiCreditCard size={20} />
                </button>
              </div>

              {!selectedPackageDetails && (
                <p className="text-gray-500 text-xs mt-4 text-center">
                  💡 Select a package in the <strong>Pricing</strong> section above or choose a package in the <strong>Service Needed</strong> dropdown to enable secure checkout.
                </p>
              )}

              {status === 'success' && <p className="text-green-500 mt-4 text-center">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-500 mt-4 text-center">Failed to send. Please try again.</p>}
            </motion.form>
          </div>
        </div>
      </div>

      {/* Payment Success / Failure Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <PaymentStatusModal 
            isOpen={isModalOpen} 
            status={modalStatus} 
            details={modalDetails} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
