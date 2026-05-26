import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiAlertTriangle, FiCopy, FiExternalLink } from 'react-icons/fi';

const PaymentStatusModal = ({ isOpen, status, details, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-lg bg-gradient-to-b from-brand-dark to-black border border-gray-800 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden z-10 glassmorphism"
      >
        {/* Glow effect based on status */}
        <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-30 ${
          status === 'success' ? 'bg-green-500' : 'bg-brand-red'
        }`} />

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <FiX size={20} />
        </button>

        {/* Icon Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 relative ${
            status === 'success' 
              ? 'bg-green-500/10 text-green-500 border border-green-500/30' 
              : 'bg-brand-red/10 text-brand-red border border-brand-red/30'
          }`}>
            {status === 'success' ? (
              <>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <FiCheck size={40} />
                </motion.div>
                {/* Ripples */}
                <div className="absolute inset-0 rounded-full border border-green-500/30 animate-ping opacity-25" />
              </>
            ) : (
              <motion.div 
                initial={{ rotate: -45, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <FiAlertTriangle size={40} />
              </motion.div>
            )}
          </div>

          <h3 className="text-2xl md:text-3xl font-bebas tracking-wide text-white uppercase">
            {status === 'success' ? 'Payment Successful' : 'Payment Failed'}
          </h3>
          <p className="text-gray-400 text-sm mt-1 font-montserrat">
            {status === 'success' 
              ? 'Thank you! Your package has been activated.' 
              : details?.error || 'The payment process was interrupted or declined.'
            }
          </p>
        </div>

        {/* Receipt Details */}
        {status === 'success' && details && (
          <div className="bg-black/40 border border-gray-800 rounded-2xl p-4 sm:p-5 mb-6 space-y-4 font-poppins">
            <div className="flex justify-between items-center pb-3 border-b border-gray-800/60">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Package</span>
              <span className="text-white font-semibold text-sm">{details.packageName}</span>
            </div>
            
            <div className="flex justify-between items-center pb-3 border-b border-gray-800/60">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Amount Paid</span>
              <span className="text-green-400 font-bebas text-xl">₹{details.amount}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-800/60">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Client Name</span>
              <span className="text-white text-sm">{details.name}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-800/60">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Order ID</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-300 font-mono text-xs max-w-[140px] truncate sm:max-w-none">{details.orderId}</span>
                <button 
                  onClick={() => copyToClipboard(details.orderId)} 
                  className="text-gray-500 hover:text-white transition-colors"
                  title="Copy Order ID"
                >
                  <FiCopy size={13} />
                </button>
              </div>
            </div>

            {details.paymentId && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs uppercase tracking-wider">Transaction ID</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 font-mono text-xs max-w-[140px] truncate sm:max-w-none">{details.paymentId}</span>
                  <button 
                    onClick={() => copyToClipboard(details.paymentId)} 
                    className="text-gray-500 hover:text-white transition-colors"
                    title="Copy Transaction ID"
                  >
                    <FiCopy size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Copy Success Feedback */}
        {copied && (
          <p className="text-green-500 text-xs text-center -mt-4 mb-4">Copied reference ID to clipboard!</p>
        )}

        {/* Action Button */}
        <button 
          onClick={onClose}
          className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 flex justify-center items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)] ${
            status === 'success' 
              ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-500/10' 
              : 'bg-brand-red hover:bg-red-700 text-white hover:shadow-brand-red/10'
          }`}
        >
          {status === 'success' ? 'Get Started' : 'Try Again'}
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentStatusModal;
