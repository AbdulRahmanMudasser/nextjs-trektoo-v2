'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Send, CheckCircle, Gift, Globe, Star } from 'lucide-react';

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Deals',
      description: 'Get access to member-only discounts and early bird offers'
    },
    {
      icon: Globe,
      title: 'Travel Inspiration',
      description: 'Discover new destinations and trending travel experiences'
    },
    {
      icon: Star,
      title: 'VIP Treatment',
      description: 'Enjoy priority booking and special travel perks'
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Mail className="w-4 h-4" />
              <span>Stay Updated</span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Never Miss a{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Travel Deal
              </span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-blue-100 mb-8 leading-relaxed"
            >
              Subscribe to our newsletter and be the first to know about exclusive offers, 
              trending destinations, and insider travel tips. Join thousands of travelers 
              who get the best deals delivered to their inbox.
            </motion.p>

            {/* Benefits */}
            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{benefit.title}</h4>
                    <p className="text-blue-100">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Newsletter Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
            >
              {!isSubscribed ? (
                <>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    Join Our Travel Community
                  </h3>
                  <p className="text-blue-100 text-center mb-6">
                    Get weekly updates on the best travel deals and destinations
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-400 disabled:to-gray-500 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Subscribe Now</span>
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-blue-200 text-center mt-4">
                    By subscribing, you agree to our privacy policy and terms of service.
                    Unsubscribe at any time.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Welcome to the Family! 🎉
                  </h3>
                  <p className="text-blue-100 mb-6">
                    You're now subscribed to our newsletter. Check your email for a 
                    welcome gift and exclusive first-time subscriber offer!
                  </p>
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-all duration-300"
                  >
                    Subscribe Another Email
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-blue-200 text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-blue-200 text-sm">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-blue-200 text-sm">Support</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
