// src/pages/Pluto.jsx

import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft, Smartphone, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { trackEvent, trackPageView } from '../utils/analytics';
import OptimizedImage from '../components/OptimizedImage';

// Lazy load the lightbox - only needed when user clicks a screenshot
const FsLightbox = lazy(() => import('fslightbox-react'));

// Use public directory paths instead of static imports (saves ~large bundle cost)
const screenshotFiles = [
  'intro.png', 'intro1.png', 'intro2.png', 'intro3.png', 'intro4.png', 'intro5.png',
  'homepage.png', 'money_flow.png', 'money_flow2.png',
  'debt_management.png', 'debt_management1.png', 'debt_management2.png',
  'debt_management3.png', 'debt_management4.png',
  'settings.png', 'settings1.png'
];

const screenshots = screenshotFiles.map(file => `/screenshots/${file}`);

const PlutoPage = () => {
  const [lightbox, setLightbox] = useState({
    toggler: false,
    slide: 1,
  });

  // Track page view
  React.useEffect(() => {
    document.title = 'Pluto App | Project Details'; // <--- Dynamic Title
    trackPageView('Pluto Project Details', 'pluto');
  }, []);

  const openLightboxOnSlide = (slideIndex) => {
    trackEvent('screenshot_view', 'Engagement', `Pluto screenshot ${slideIndex} viewed`);
    setLightbox({
      toggler: !lightbox.toggler,
      slide: slideIndex,
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-6xl md:text-8xl mb-4 text-gray-900 dark:text-white tracking-tight">
              Pluto
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Personal Finance. Private. Offline.
            </p>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-800 dark:text-gray-200">
              Because Your Wallet Deserves{' '}
              <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent font-medium">
                Better
              </span>
            </p>
            
            {/* HUD Metrics */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {[
                { label: 'Screenshots', value: '16' },
                { label: 'Cost', value: '0₹' },
                { label: 'Privacy', value: '100%' },
                { label: 'App Built', value: '1st' }
              ].map((metric, i) => (
                <div key={i} className="px-6 py-3 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg">
                  <div className="text-2xl font-bold text-primary-light dark:text-primary-dark">{metric.value}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
            
            {/* Quick Download Button */}
            <div className="mt-8">
              <motion.a 
                href="https://drive.google.com/drive/folders/1xpOz7nBaKJ3IBFPERQ8IAU_lBi5PXdL9?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackEvent('download_click_top', 'Engagement', 'Pluto APK download clicked - top button')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                Download APK
              </motion.a>
            </div>
          </div>
        </motion.header>

        {/* --- PROBLEM vs SOLUTION (Glass Cards) --- */}
        <div className="max-w-5xl mx-auto mb-24 grid md:grid-cols-2 gap-8">
          {/* Problem */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-red-500/10 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] pointer-events-none" />
            <h2 className="font-heading text-2xl mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-red-500">✕</span> The Problem
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              I wanted to track my finances without giving apps access to my SMS, email, or bank accounts. 
              Most apps demand subscriptions, invade privacy, or still don't deliver what you need.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 italic">
                "Fine. I'll build it myself."
              </p>
            </div>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-green-500/20 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] pointer-events-none" />
            <h2 className="font-heading text-2xl mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-green-500">✓</span> The Solution
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              A privacy-first finance app that works entirely offline. No permissions needed, 
              no subscriptions required, no data harvesting. Just clean, simple money management.
            </p>
          </motion.div>
        </div>

        {/* CORE FEATURES GRID */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2 className="font-heading text-3xl mb-10 text-center text-gray-900 dark:text-white">What It Actually Does</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Complete Tracking", desc: "Income, expenses, debts, and investments in one place." },
              { title: "Smart Budgets", desc: "Set savings targets and debt payoff plans." },
              { title: "Cross-Device Sync", desc: "Works seamlessly across all your devices." },
              { title: "2 AM Friendly", desc: "Light and dark modes for late-night budgeting." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-green-500/20 text-green-600 dark:text-green-400">
                    <Check size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Privacy & Learning (Side by Side Glass) */}
        <div className="max-w-5xl mx-auto mb-24 grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-blue-500/5 backdrop-blur-xl border border-blue-500/20">
            <h3 className="font-bold text-xl mb-4 text-blue-600 dark:text-blue-400">Privacy Promise</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              No SMS reading. No bank scraping. No subscriptions. No data collection. 
              Your financial data stays yours, period.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-purple-500/5 backdrop-blur-xl border border-purple-500/20">
            <h3 className="font-bold text-xl mb-4 text-purple-600 dark:text-purple-400">Learning Journey</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              My first mobile app taught me full-stack development from scratch. 
              Every bug was a lesson, every feature a breakthrough.
            </p>
          </div>
        </div>

        {/* SCREENSHOTS SLIDER */}
        <div className="mb-24">
          <h2 className="font-heading text-3xl mb-8 text-center text-gray-900 dark:text-white flex items-center justify-center gap-3">
            <Smartphone size={28} className="text-primary-light dark:text-primary-dark" />
            App Walkthrough
          </h2>
          <div className="px-4">
            <Slider {...sliderSettings}>
              {screenshots.map((shot, index) => (
                <div key={index} className="px-3 pb-8" onClick={() => openLightboxOnSlide(index + 1)}>
                  <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 dark:border-gray-700 cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                    <OptimizedImage
                      src={shot}
                      alt={`Pluto Screenshot ${index + 1}`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block p-12 rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl">
            <h3 className="font-heading text-3xl mb-4 text-gray-900 dark:text-white">Ready to Try It?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Download the APK and start managing your finances without compromising your privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a 
                href="https://drive.google.com/drive/folders/1xpOz7nBaKJ3IBFPERQ8IAU_lBi5PXdL9?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackEvent('download_click', 'Engagement', 'Pluto APK download clicked')}
                className="px-8 py-4 bg-primary-light dark:bg-primary-dark text-white font-bold rounded-xl shadow-lg hover:shadow-primary-light/40 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download APK
              </motion.a>
              <Link 
                to="/" 
                onClick={() => trackEvent('back_to_home', 'Navigation', 'Back to home from Pluto page')}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium px-6 py-4"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>

        <Suspense fallback={null}>
          <FsLightbox
            toggler={lightbox.toggler}
            sources={screenshots}
            slide={lightbox.slide}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default PlutoPage;