'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Users,
  Database,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const PrivacyPolicyPage = () => {
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

  const privacySections = [
    {
      icon: Database,
      title: '1. Information We Collect',
      content:
        'We collect information you provide directly to us, such as when you create an account, make a booking, or contact us. This includes personal details like name, email, phone number, payment information, and travel preferences. We also automatically collect certain information about your device and usage of our services.',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Eye,
      title: '2. How We Use Your Information',
      content:
        'We use your information to provide, maintain, and improve our services, process transactions, send you confirmations and updates, provide customer support, and communicate about promotions or new features. We may also use aggregated data for analytics and business insights.',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Users,
      title: '3. Information Sharing',
      content:
        'We share your information with service providers (hotels, airlines, insurance companies) necessary to fulfill your bookings, payment processors, and third-party vendors who assist our operations. We do not sell your personal information to third parties for marketing purposes.',
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      icon: Lock,
      title: '4. Data Security',
      content:
        'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments. However, no method of transmission over the internet is 100% secure.',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Globe,
      title: '5. International Data Transfers',
      content:
        'As we operate globally, your information may be transferred to and processed in countries other than your residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable data protection laws.',
      gradient: 'from-indigo-500 to-blue-600',
    },
    {
      icon: CheckCircle,
      title: '6. Your Rights and Choices',
      content:
        'You have the right to access, update, or delete your personal information. You can also opt out of marketing communications and request data portability. For EU residents, you have additional rights under GDPR including the right to object to processing and lodge complaints with supervisory authorities.',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: Clock,
      title: '7. Data Retention',
      content:
        'We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Booking information is typically retained for 7 years for legal and tax purposes, while marketing preferences are kept until you opt out.',
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Shield,
      title: "8. Children's Privacy",
      content:
        'Our services are not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If we discover we have collected information from a child under 16, we will delete such information promptly.',
      gradient: 'from-red-500 to-pink-600',
    },
  ];

  const additionalSections = [
    {
      title: 'Cookies and Tracking Technologies',
      content:
        'We use cookies, web beacons, and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie preferences through your browser settings, though some features may not function properly if cookies are disabled.',
    },
    {
      title: 'Third-Party Links and Services',
      content:
        'Our platform may contain links to third-party websites or integrate with third-party services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.',
    },
    {
      title: 'Marketing Communications',
      content:
        'With your consent, we may send you promotional emails about our services, special offers, and travel tips. You can unsubscribe at any time by clicking the unsubscribe link in our emails or contacting us directly.',
    },
    {
      title: 'Data Breach Notification',
      content:
        'In the event of a data breach that may pose a risk to your rights and freedoms, we will notify you and relevant authorities within 72 hours as required by applicable law. We will provide information about the nature of the breach and steps we are taking to address it.',
    },
    {
      title: 'Updates to This Policy',
      content:
        'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and, where appropriate, by email.',
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
                <Shield className="h-10 w-10 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Lock className="h-3 w-3 text-white" />
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent font-montserrat mb-6 leading-tight">
                Privacy Policy
              </h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-700 font-montserrat max-w-4xl mx-auto leading-relaxed mb-8"
              >
                Your privacy is important to us. This Privacy Policy explains
                how Trektoo collects, uses, and protects your personal
                information when you use our travel booking services.
              </motion.p>

              {/* Last Updated Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-xl"
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Our Commitment to Your Privacy
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  <span className="font-bold text-blue-600">Trek Too LTD</span>{' '}
                  (registered in England and Wales, Company No: 15766570) is
                  committed to protecting and respecting your privacy.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This policy sets out the basis on which any personal data we
                  collect from you, or that you provide to us, will be processed
                  by us in compliance with applicable data protection laws,
                  including the General Data Protection Regulation (GDPR).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Privacy Sections */}
          <div className="space-y-8 mb-12">
            {privacySections.map((section, index) => (
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

          {/* Additional Privacy Information */}
          <motion.div variants={itemVariants} className="relative mb-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Additional Privacy Information
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="space-y-6">
                {additionalSections.map((section, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 shadow-lg border border-gray-100"
                  >
                    <h4 className="text-xl font-bold text-gray-800 mb-3 font-montserrat">
                      {section.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Your Rights Section */}
          <motion.div variants={itemVariants} className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-xl opacity-75"></div>
            <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-3xl p-12 text-white shadow-2xl border border-green-400/50">
              <div className="text-center">
                <motion.div animate={floatingAnimation}>
                  <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-100" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
                  Your Data Protection Rights
                </h2>
                <p className="text-xl text-green-100 mb-6 max-w-3xl mx-auto">
                  You have the right to access, rectify, erase, restrict
                  processing, object to processing, and data portability. To
                  exercise these rights, contact our Data Protection Officer.
                </p>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-2">For EU Residents</h3>
                    <p className="text-sm">
                      Additional GDPR rights apply, including the right to lodge
                      a complaint with your local supervisory authority.
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-2">Data Retention</h3>
                    <p className="text-sm">
                      We retain your data only as long as necessary for the
                      purposes outlined in this policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 inline-block">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-montserrat">
                Questions About Your Privacy?
              </h3>
              <p className="text-gray-700 mb-4">
                Contact our Data Protection Officer for privacy-related
                inquiries
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={() =>
                    window.open('mailto:info@trektoo.com', '_self')
                  }
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-lg"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Email Privacy Team
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

export default PrivacyPolicyPage;
