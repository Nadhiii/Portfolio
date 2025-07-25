// src/pages/PlutoPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowLeft, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import FsLightbox from 'fslightbox-react';
import { trackEvent, trackPageView } from '../utils/analytics';
import OptimizedImage from '../components/OptimizedImage';

// --- Importing all your screenshots ---
import PlutoShot1 from '../assets/intro.png';
import PlutoShot2 from '../assets/intro1.png';
import PlutoShot3 from '../assets/intro2.png';
import PlutoShot4 from '../assets/intro3.png';
import PlutoShot5 from '../assets/intro4.png';
import PlutoShot6 from '../assets/intro5.png';
import PlutoShot7 from '../assets/homepage.png';
import PlutoShot8 from '../assets/money_flow.png';
import PlutoShot9 from '../assets/money_flow2.png';
import PlutoShot10 from '../assets/debt_management.png';
import PlutoShot11 from '../assets/debt_management1.png';
import PlutoShot12 from '../assets/debt_management2.png';
import PlutoShot13 from '../assets/debt_management3.png';
import PlutoShot14 from '../assets/debt_management4.png';
import PlutoShot15 from '../assets/settings.png';
import PlutoShot16 from '../assets/settings1.png';

const screenshots = [
  PlutoShot1, PlutoShot2, PlutoShot3, PlutoShot4, PlutoShot5, PlutoShot6,
  PlutoShot7, PlutoShot8, PlutoShot9, PlutoShot10, PlutoShot11, PlutoShot12,
  PlutoShot13, PlutoShot14, PlutoShot15, PlutoShot16
];

const PlutoPage = () => {
  const [lightbox, setLightbox] = useState({
    toggler: false,
    slide: 1,
  });

  // Track page view
  React.useEffect(() => {
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

  // Animation variants matching HomePage for consistency
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0, 1],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto py-12 md:py-24 px-8"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <motion.header className="text-center mb-16" variants={childVariants}>
        <h1 className="font-heading text-5xl md:text-7xl">Pluto</h1>
        <p className="text-lg text-text-light/70 dark:text-text-dark/70 mt-2">
          (Previously known as Finance Manager)
        </p>
        <p className="text-2xl font-bold mt-4">
          Because Your Wallet Deserves Better
        </p>
      </motion.header>

      {/* --- THIS IS THE RESTORED TEXT CONTENT --- */}
      <motion.div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert space-y-16 mb-24" variants={childVariants}>
        <motion.div variants={childVariants}>
          <h2 className="font-heading text-3xl mb-4">Why I Built This</h2>
          <p>
            I just wanted to track my income, expenses, and debts without giving an app access to my SMS or email. Most apps either demand a subscription, want to read all your messages, or still don't do what you need after you pay.
          </p>
          <p className="font-bold">So I said: "Fine. I'll build it myself."</p>
        </motion.div>

        <motion.div variants={childVariants}>
          <h2 className="font-heading text-3xl mb-4">What It Does</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Check className="text-accent-green-light dark:text-accent-green-dark mt-1 flex-shrink-0" />
              <span>Track <span className="font-bold text-primary-light dark:text-primary-dark">Income, Expenses, Debts, & Investments</span></span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="text-accent-green-light dark:text-accent-green-dark mt-1 flex-shrink-0" />
              <span>Set <span className="font-bold text-primary-light dark:text-primary-dark">Budgets & Goals</span> for savings or debt payoffs</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="text-accent-green-light dark:text-accent-green-dark mt-1 flex-shrink-0" />
              <span>Works across devices with a single Google account</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="text-accent-green-light dark:text-accent-green-dark mt-1 flex-shrink-0" />
              <span>Light and dark modes, for tracking finances at 2 AM</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div variants={childVariants}>
          <h2 className="font-heading text-3xl mb-4">No Nonsense Privacy</h2>
          <p>This app is privacy-first. That means: No SMS reading, no bank scraping, and no subscriptions. Just you and your data.</p>
        </motion.div>

        <motion.div variants={childVariants}>
           <h2 className="font-heading text-3xl mb-4">My First App</h2>
            <p>
              This was my first-ever mobile application. It taught me an immense amount about full-stack development. If you spot bugs or have feature ideas, feel free to reach out!
            </p>
        </motion.div>
      </motion.div>

      <motion.div className="mb-24" variants={childVariants}>
        <h2 className="font-heading text-3xl mb-6 flex items-center gap-3">
          <Smartphone size={30} className="text-primary-light dark:text-primary-dark" />
          Screenshots
        </h2>
        <div className="px-4">
          <Slider {...sliderSettings}>
            {screenshots.map((shot, index) => (
              <div key={index} className="px-2" onClick={() => openLightboxOnSlide(index + 1)}>
                <div className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md aspect-[9/16] cursor-pointer">
                  <OptimizedImage
                    src={shot}
                    alt={`Pluto Screenshot ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>

      <motion.div className="text-center" variants={childVariants}>
        <motion.a 
          href="https://drive.google.com/drive/folders/1xpOz7nBaKJ3IBFPERQ8IAU_lBi5PXdL9?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => trackEvent('download_click', 'Engagement', 'Pluto APK download clicked')}
          className="bg-primary-light text-white font-bold py-4 px-8 rounded-lg hover:bg-opacity-90 transition-all text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download APK
        </motion.a>
        <Link 
          to="/" 
          onClick={() => trackEvent('back_to_home', 'Navigation', 'Back to home from Pluto page')}
          className="flex items-center justify-center gap-2 mt-8 text-text-light/80 dark:text-text-dark/80 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.div>

      <FsLightbox
        toggler={lightbox.toggler}
        sources={screenshots}
        slide={lightbox.slide}
      />
    </motion.div>
  );
};

export default PlutoPage;