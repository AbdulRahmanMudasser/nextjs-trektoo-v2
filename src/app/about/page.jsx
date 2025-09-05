'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Users,
  Heart,
  Shield,
  Zap,
  Clock,
  Award,
  Globe,
  Star,
  CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const AboutUsPage = () => {
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
        <div className="max-w-6xl mx-auto">
          {/* Premium Hero Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 relative"
          >
            <motion.div
              animate={floatingAnimation}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl mb-8 relative"
            >
              <Globe className="h-10 w-10 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="h-3 w-3 text-white" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent font-montserrat mb-6 leading-tight">
              About Trektoo
              <span className="block text-4xl md:text-5xl mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Travel Simplified
              </span>
            </h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-700 font-montserrat max-w-4xl mx-auto leading-relaxed"
            >
              Welcome to{' '}
              <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Trektoo
              </span>
              . We make travel dreams achievable. Founded in 2024 by a team that
              overcame financial barriers to explore the world, we're here to
              ensure you never face the same struggles.
            </motion.p>

            {/* Premium Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-8 mt-12"
            >
              {[
                { icon: Users, value: '10K+', label: 'Happy Travelers' },
                { icon: Globe, value: '50+', label: 'Destinations' },
                { icon: Award, value: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 min-w-[140px]"
                >
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Premium Story Section */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 md:p-12">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Our Story: Born from Resilience
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Trektoo emerged from personal hardship. When travel seemed
                impossible due to limited resources, we refused to give up. We
                built this platform to democratize travel — making it{' '}
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  accessible, transparent, and effortless
                </span>{' '}
                for everyone.
              </p>
            </div>
          </motion.div>

          {/* Premium Mission & Vision */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {[
              {
                icon: MapPin,
                title: 'Our Mission',
                content:
                  'Simplify travel planning with budget-friendly options and total pricing transparency.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Globe,
                title: 'Our Vision',
                content:
                  'To be the first choice for seamless travel experiences across the Arab world.',
                gradient: 'from-indigo-500 to-purple-500',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, y: -5 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 rounded-3xl blur-xl group-hover:opacity-20 transition-all duration-500`}
                ></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10 h-full">
                  <div
                    className={`bg-gradient-to-br ${item.gradient} p-4 rounded-2xl shadow-lg mb-6 w-fit`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 font-montserrat mb-4">
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Premium Core Values */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 md:p-12">
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Core Values
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Perseverance',
                    desc: 'We conquer obstacles to serve you better.',
                    color: 'from-blue-500 to-blue-600',
                  },
                  {
                    title: 'Transparency',
                    desc: 'No hidden fees. No surprises.',
                    color: 'from-emerald-500 to-emerald-600',
                  },
                  {
                    title: 'Human-Centered',
                    desc: "You're our priority, not a transaction.",
                    color: 'from-purple-500 to-purple-600',
                  },
                  {
                    title: 'Integrity',
                    desc: 'Honest recommendations, accountable service.',
                    color: 'from-orange-500 to-orange-600',
                  },
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 group/item"
                  >
                    <div
                      className={`w-3 h-3 bg-gradient-to-br ${value.color} rounded-full mt-3 flex-shrink-0 shadow-md group-hover/item:scale-125 transition-transform`}
                    ></div>
                    <div>
                      <h4 className="font-bold text-xl text-gray-800 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Premium Why Trektoo */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 md:p-12">
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Why Trektoo? One-Click Simplicity
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Zap,
                    title: 'Book in One Click',
                    desc: 'Our platform lets you secure flights, hotels, and insurance instantly. No complexity.',
                    color: 'from-yellow-500 to-yellow-600',
                  },
                  {
                    icon: Heart,
                    title: 'All Budgets Covered',
                    desc: 'Curated options from budget to luxury.',
                    color: 'from-pink-500 to-pink-600',
                  },
                  {
                    icon: Clock,
                    title: '24/7 Human Support',
                    desc: 'Real help before, during, and after your trip.',
                    color: 'from-indigo-500 to-indigo-600',
                  },
                  {
                    icon: CheckCircle,
                    title: 'Verified Reviews',
                    desc: 'Authentic traveler insights.',
                    color: 'from-green-500 to-green-600',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 group/feature"
                  >
                    <div
                      className={`bg-gradient-to-br ${feature.color} p-3 rounded-xl shadow-md mb-4 w-fit group-hover/feature:scale-110 transition-transform`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-xl text-gray-800 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Premium Team Section */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative mb-12 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10 md:p-12">
              <div className="flex items-center mb-10">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg mr-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat">
                    Our Team
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                </div>
              </div>

              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-64 w-full rounded-3xl overflow-hidden mb-8 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200 flex items-center justify-center shadow-2xl"
                >
                  <div className="text-purple-600 text-center">
                    <motion.div animate={floatingAnimation}>
                      <Users className="h-20 w-20 mx-auto mb-6" />
                    </motion.div>
                    <p className="text-2xl font-bold">Team Photo Placeholder</p>
                    <p className="text-lg opacity-80 mt-2">Coming Soon</p>
                  </div>
                </motion.div>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  We're{' '}
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Mahmoud, Karim and Basma
                  </span>{' '}
                  - travelers, tech innovators, and advocates for stress-free
                  journeys.
                </p>
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
                  <Globe className="h-16 w-16 mx-auto mb-6 text-blue-100" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6">
                  Start Your Journey - One Click Away
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Ready to explore the world? Join thousands of satisfied
                  travelers who chose Trektoo for their adventures.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => router.push('/destinations')}
                      className="bg-white text-blue-600 hover:bg-blue-50 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
                    >
                      <Globe className="h-6 w-6 mr-3" />
                      Explore Destinations
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => router.push('/deals')}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <Star className="h-6 w-6 mr-3" />
                      View Today's Deals
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

export default AboutUsPage;
