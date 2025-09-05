'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Globe,
  Scale,
  Clock,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const TermsConditionsPage = () => {
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

  const termsSection = [
    {
      icon: FileText,
      title: '1. Acceptance of Terms',
      content:
        "By accessing and using Trektoo's services, you accept and agree to be bound by the terms and provision of this agreement. These Terms and Conditions constitute the entire agreement between you and Trek Too LTD.",
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Users,
      title: '2. Use of Services',
      content:
        'Our platform provides travel booking services including flights, hotels, and travel insurance. You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for ensuring the accuracy of all information provided during booking.',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Shield,
      title: '3. User Accounts',
      content:
        'To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.',
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      icon: Globe,
      title: '4. Booking and Payment',
      content:
        'All bookings are subject to availability and confirmation. Prices may change without notice until booking is confirmed. Payment must be made in full at the time of booking. We accept various payment methods as displayed on our platform.',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: AlertTriangle,
      title: '5. Cancellation and Refunds',
      content:
        'Cancellation policies vary by service provider and booking type. Refund eligibility depends on the specific terms of your booking. Processing fees may apply to cancellations. Please review individual booking terms before confirming your reservation.',
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Scale,
      title: '6. Limitation of Liability',
      content:
        'Trek Too LTD acts as an intermediary between you and service providers. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services or any travel-related issues beyond our control.',
      gradient: 'from-red-500 to-pink-600',
    },
    {
      icon: Clock,
      title: '7. Force Majeure',
      content:
        'We are not responsible for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, strikes, or other unforeseeable events.',
      gradient: 'from-indigo-500 to-blue-600',
    },
    {
      icon: CheckCircle,
      title: '8. Privacy and Data Protection',
      content:
        'We collect and process personal data in accordance with our Privacy Policy and applicable data protection laws. Your personal information is used solely for providing our services and improving your travel experience.',
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  const additionalTerms = [
    {
      title: 'Intellectual Property',
      content:
        'All content on our platform, including logos, text, images, and software, is owned by Trek Too LTD and protected by intellectual property laws. Unauthorized use is prohibited.',
    },
    {
      title: 'Third-Party Services',
      content:
        'Our platform may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these third parties.',
    },
    {
      title: 'Modifications to Terms',
      content:
        'We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.',
    },
    {
      title: 'Governing Law',
      content:
        'These Terms and Conditions are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
    },
    {
      title: 'Contact Information',
      content:
        'If you have any questions about these Terms and Conditions, please contact us at info@trektoo.com or call our customer service at +44 7308 656687.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 bg-[url('/pattern.png')] bg-cover bg-fixed relative overflow-hidden">
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
                <Scale className="h-10 w-10 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent font-montserrat mb-6 leading-tight">
                Terms & Conditions
              </h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-700 font-montserrat max-w-4xl mx-auto leading-relaxed mb-8"
              >
                Please read these Terms and Conditions carefully before using
                Trektoo's services. Your use of our platform constitutes
                acceptance of these terms.
              </motion.p>

              {/* Last Updated Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-xl"
              >
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-semibold">
                  Last Updated: January 2025
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Information */}
          <motion.div variants={itemVariants} className="relative mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-gray-700 to-gray-900 p-4 rounded-2xl shadow-lg mr-6">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Agreement Overview
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  This agreement is between you and{' '}
                  <span className="font-bold text-blue-600">Trek Too LTD</span>,
                  a company registered in England and Wales (Company No:
                  15766570).
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  By using our travel booking platform and services, you agree
                  to comply with and be bound by the following terms and
                  conditions of use.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Terms Sections */}
          <div className="space-y-8 mb-12">
            {termsSection.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-5 rounded-3xl blur-xl group-hover:opacity-10 transition-all duration-500`}
                ></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
                  <div className="flex items-start mb-6">
                    <div
                      className={`bg-gradient-to-br ${section.gradient} p-4 rounded-2xl shadow-lg mr-6 flex-shrink-0`}
                    >
                      <section.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-montserrat mb-4">
                        {section.title}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Terms Section */}
          <motion.div variants={itemVariants} className="relative mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Additional Terms
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="space-y-6">
                {additionalTerms.map((term, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-lg border border-gray-100"
                  >
                    <h4 className="text-xl font-bold text-gray-800 mb-3 font-montserrat">
                      {term.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {term.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div variants={itemVariants} className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl blur-xl opacity-75"></div>
            <div className="relative bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 rounded-3xl p-12 text-white shadow-2xl border border-yellow-400/50">
              <div className="text-center">
                <motion.div animate={floatingAnimation}>
                  <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-yellow-100" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
                  Important Notice
                </h2>
                <p className="text-xl text-yellow-100 mb-6 max-w-3xl mx-auto">
                  These terms are legally binding. If you do not agree with any
                  part of these terms, please do not use our services. For
                  questions or clarifications, contact our legal team.
                </p>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto">
                  <p className="text-lg font-semibold">
                    Effective Date: January 1, 2025
                  </p>
                  <p className="text-sm opacity-90 mt-2">
                    These terms supersede all previous agreements and
                    understandings.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact and Back Button */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 inline-block">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-montserrat">
                Questions About These Terms?
              </h3>
              <p className="text-gray-700 mb-4">
                Contact our legal team for clarification or assistance
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={() =>
                    window.open('mailto:info@trektoo.com', '_self')
                  }
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-lg"
                >
                  Email Legal Team
                </Button>
                <Button
                  onClick={() => router.push('/contact')}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-lg"
                >
                  Contact Us
                </Button>
              </div>
            </div>

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
    </div>
  );
};

export default TermsConditionsPage;
