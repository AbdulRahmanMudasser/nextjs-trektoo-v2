'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Music,
  MapPin,
  Clock,
  Users,
  Globe,
  Star,
  Zap,
  Shield,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const ContactUsPage = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
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
        damping: 15,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Center',
      value: '01063425677',
      description: 'General inquiries and bookings',
      gradient: 'from-green-500 to-emerald-600',
      hoverGradient: 'from-green-600 to-emerald-700',
    },
    {
      icon: Users,
      title: 'Sales Department',
      value: '01092606758',
      description: 'Travel packages and special offers',
      gradient: 'from-blue-500 to-cyan-600',
      hoverGradient: 'from-blue-600 to-cyan-700',
    },
    {
      icon: MessageCircle,
      title: 'Support',
      value: '0155 829 8719',
      description: 'Technical support and assistance',
      gradient: 'from-purple-500 to-violet-600',
      hoverGradient: 'from-purple-600 to-violet-700',
    },
    {
      icon: Globe,
      title: 'UK Office',
      value: '+44 7308 656687',
      description: 'International support',
      gradient: 'from-red-500 to-rose-600',
      hoverGradient: 'from-red-600 to-rose-700',
    },
  ];

  const emailContacts = [
    {
      icon: Mail,
      title: 'General Inquiries',
      value: 'trektoo2000@gmail.com',
      description: 'For general questions and information',
      gradient: 'from-indigo-500 to-blue-600',
    },
    {
      icon: Zap,
      title: 'Sales',
      value: 'sales@trektoo.com',
      description: 'For booking and sales inquiries',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Shield,
      title: 'Support',
      value: 'support@trek-too.com',
      description: 'For technical support and help',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Star,
      title: 'Information',
      value: 'Info@trektoo.com',
      description: 'For company information',
      gradient: 'from-yellow-500 to-orange-600',
    },
  ];

  const socialMedia = [
    {
      icon: Facebook,
      title: 'Facebook',
      url: 'https://www.facebook.com/trektoo2000',
      description: 'Follow us for updates and travel tips',
      gradient: 'from-blue-600 to-blue-700',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      url: 'https://www.instagram.com/trek_too?igsh=MTJ5NmY2YmI2OXdtOQ==',
      description: 'Travel inspiration and behind-the-scenes',
      gradient: 'from-pink-500 to-purple-600',
    },
    {
      icon: Music,
      title: 'TikTok',
      url: 'https://www.tiktok.com/@trektoo?_t=ZS-8yK2lqloH4r&_r=1',
      description: 'Quick travel tips and fun content',
      gradient: 'from-gray-800 to-black',
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-500/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/25 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-[85vw] mx-auto">
          {/* Premium Hero Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8 mb-8"
          >
            <div className="text-center">
              <motion.div
                animate={floatingAnimation}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl mb-8 relative"
              >
                <MessageCircle className="h-10 w-10 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent font-montserrat mb-6 leading-tight">
                Contact Trektoo
              </h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-700 font-montserrat max-w-4xl mx-auto leading-relaxed mb-8"
              >
                We're here to help make your travel dreams come true. Reach out
                to us through any of the channels below and our team will assist
                you promptly.
              </motion.p>

              {/* Premium Availability Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-xl"
              >
                <div className="w-3 h-3 bg-green-300 rounded-full mr-3 animate-pulse"></div>
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-semibold">24/7 Support Available</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Premium Phone Contacts */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="relative mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Phone Support
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {contactMethods.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="relative group/card overflow-hidden"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover/card:opacity-100 rounded-2xl transition-all duration-500`}
                      ></div>
                      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-50 group-hover/card:shadow-2xl transition-all duration-300">
                        <div className="flex items-center mb-4">
                          <div
                            className={`bg-gradient-to-br ${contact.gradient} p-3 rounded-xl shadow-md mr-4 group-hover/card:scale-110 transition-transform`}
                          >
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 font-montserrat group-hover/card:text-white transition-colors">
                            {contact.title}
                          </h3>
                        </div>
                        <a
                          href={`tel:${contact.value}`}
                          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors block mb-3 group-hover/card:text-white"
                        >
                          {contact.value}
                        </a>
                        <p className="text-gray-600 group-hover/card:text-blue-100 transition-colors">
                          {contact.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Premium Email Contacts */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="relative mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Email Support
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {emailContacts.map((email, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group/card overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${email.gradient} opacity-0 group-hover/card:opacity-100 rounded-2xl transition-all duration-500`}
                    ></div>
                    <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-50 group-hover/card:shadow-2xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div
                          className={`bg-gradient-to-br ${email.gradient} p-3 rounded-xl shadow-md mr-4 group-hover/card:scale-110 transition-transform`}
                        >
                          <email.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 font-montserrat group-hover/card:text-white transition-colors">
                          {email.title}
                        </h3>
                      </div>
                      <a
                        href={`mailto:${email.value}`}
                        className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors block mb-3 break-all group-hover/card:text-white"
                      >
                        {email.value}
                      </a>
                      <p className="text-gray-600 group-hover/card:text-blue-100 transition-colors">
                        {email.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Premium Social Media */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="relative mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Follow Us on Social Media
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {socialMedia.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative block"
                    >
                      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-blue-50 text-center">
                        <div
                          className={`bg-gradient-to-br ${social.gradient} p-4 rounded-2xl shadow-lg mb-4 w-fit mx-auto`}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 font-montserrat mb-2">
                          {social.title}
                        </h3>

                        <p className="text-gray-600 text-sm">
                          {social.description}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Premium Company Information */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-4 rounded-2xl shadow-lg mr-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Company Information
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="text-center">
                  <motion.div animate={floatingAnimation}>
                    <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-xl md:text-2xl text-gray-700 mb-4">
                    <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      "Trek Too"
                    </span>{' '}
                    is a brand of{' '}
                    <span className="font-bold text-gray-900">
                      "TREK TOO LTD"
                    </span>
                  </p>
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 mt-4">
                    <p className="text-gray-700 font-medium">
                      Registered in England and Wales No:{' '}
                      <span className="font-bold text-blue-600">
                        "15766570"
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium CTA Section */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-75"></div>
            <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-12 text-white shadow-2xl border border-blue-400/50">
              <div className="text-center">
                <motion.div animate={floatingAnimation}>
                  <MessageCircle className="h-16 w-16 mx-auto mb-6 text-blue-100" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Contact us today and let our travel experts help you plan the
                  perfect trip! We're available 24/7 to assist you.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => window.open('tel:01063425677', '_self')}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <Phone className="h-6 w-6 mr-3" />
                      Call Now
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() =>
                        window.open('mailto:trektoo2000@gmail.com', '_self')
                      }
                      className="bg-white text-blue-600 hover:bg-blue-50 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
                    >
                      <Mail className="h-6 w-6 mr-3" />
                      Send Email
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Back Button */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black rounded-2xl px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <ArrowLeft className="h-6 w-6 mr-3" />
                Back to Home
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
};

export default ContactUsPage;
