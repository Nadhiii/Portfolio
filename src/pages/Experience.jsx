// src/pages/ExperiencePage.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowLeft }          <p className="text-text-light dark:text-text-dark text-lg mb-8">
            Interested in working together?
          </p>
          <Link 
            to="/contact"
            className="inline-block px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Get in Touch
          </Link>cide-react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';
import { pageVariants, childVariants } from '../config/animations';

// --- Data for the Work Experience Timeline (excluding current SME card to avoid duplication) ---
const workExperience = [
  {
    role: "Senior Process Executive",
    company: "Cognizant Technology Solutions",
    date: "May 2023 - Sep 2025",
    description: "Worked on Google project as part of Measurement - Center of Excellence. Managed and implemented Consent Mode (CoMo) Enhanced conversion tracking & troubleshooting solutions for major clients using Google Ads, GA4, and GTM, collaborating with developers to ensure accurate data flow."
  },
  {
    role: "Implementation Consultant",
    company: "Regalix India Pvt Ltd.",
    date: "Jan 2023 - May 2023",
    description: "Advised clients on Consent Mode (CoMo) Enhanced conversion tracking & troubleshooting, GA4, and GTM configuration to optimize campaign effectiveness and data accuracy."
  },
  {
    role: "Associate - CEC Operations",
    company: "Tesco Bengaluru",
    date: "Jun 2022 - Jan 2023",
    description: "Provided remote technical support to store employees, resolving issues with product listings and point-of-sale systems to ensure smooth store operations."
  },
  {
    role: "Operations Representative",
    company: "Concentrix India Pvt Ltd.",
    date: "Jan 2021 - Jun 2022",
    description: "Delivered phone-based technical support for OnePlus TV products, assisting customers with troubleshooting and coordinating repairs."
  }
];

const ExperiencePage = () => {
  useEffect(() => {
    trackPageView('Experience Page', 'experience');
  }, []);

  return (
    <motion.div 
      className="min-h-screen pt-44 pb-20 lg:pt-52 lg:pb-24"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="max-w-4xl mx-auto px-8">
        {/* Page Header */}
        <motion.div className="text-center mb-16" variants={childVariants}>
          <h1 className="font-heading text-4xl lg:text-5xl mb-4">
            <span className="text-text-light dark:text-text-dark">Work </span>
            <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent">Experience</span>
          </h1>
          <p className="text-lg text-text-light dark:text-text-dark">
            A timeline of my professional roles and contributions
          </p>
        </motion.div>

        {/* Current Role Card */}
        <motion.div className="relative mb-20" variants={childVariants}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark">Subject Matter Expert (SME)</h2>
                <p className="text-primary-light dark:text-primary-dark font-medium mt-1">Cognizant Technology Solutions</p>
              </div>
              <span className="inline-block self-start md:self-auto px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark text-xs font-mono rounded-full border border-primary-light/20 dark:border-primary-dark/20">
                Oct 2025 – Present
              </span>
            </div>

            <p className="text-text-light dark:text-text-dark leading-relaxed mb-6">
              This role is new (Oct 2025) and is a formal recognition of the work I’ve already been doing: implementing and troubleshooting measurement across Google’s stack (Google Ads, GA4, GTM, SA360, CM360). Day to day I continue to make conversion tracking work reliably—Consent Mode, Enhanced Conversions, Offline Conversions, Customer Match, Measurement Protocol, and standard tagging (gTag/GTM).
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-2 text-text-light dark:text-text-dark">What I do</h3>
                <ul className="list-disc list-inside text-sm text-text-light dark:text-text-dark space-y-1">
                  <li>Implement and troubleshoot conversion tracking end‑to‑end (gTag/GTM + reporting)</li>
                  <li>Consent Mode web implementation and guidance</li>
                  <li>Enhanced Conversions (GAds/SA360/GA4/GTM)</li>
                  <li>Offline Conversion Tracking and Measurement Protocol</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-2 text-text-light dark:text-text-dark">Mentorship & collaboration</h3>
                <ul className="list-disc list-inside text-sm text-text-light dark:text-text-dark space-y-1">
                  <li>Mentoring 3 mentees (6–8 months) and providing floor support for 4 new hires—guiding them through on-the-job learning</li>
                  <li>Collaborate closely with Google teams on implementations</li>
                </ul>
              </div>
            </div>

                        <p className="mt-6 text-sm text-text-light dark:text-text-dark italic">
              New title, same responsibilities for now—scaling impact through mentoring and smoother processes. I'm excited to deepen the craft and learn what comes next.
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div className="space-y-16 relative" variants={childVariants}>
          {workExperience.map((job, index) => (
            <motion.div 
              key={index} 
              className="relative"
              variants={childVariants}
            >
              {/* Timeline dot on alternating sides */}
              <div 
                className={`absolute top-1 flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-full shadow-md z-10 ${
                  index % 2 === 0 ? 'left-0' : 'right-0'
                }`}
              >
                <Building2 className="w-4 h-4 text-text-light dark:text-text-dark" />
              </div>
              
              {/* Date badge */}
              <div className={`absolute top-0 ${
                index % 2 === 0 ? 'right-2' : 'left-2'
              } z-10`}>
                <span className="inline-block px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark text-xs font-mono rounded-full border border-primary-light/20 dark:border-primary-dark/20">
                  {job.date}
                </span>
              </div>
              
              {/* Content Card */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${
                  index % 2 === 0 ? 'mr-auto ml-16 mt-8' : 'ml-auto mr-16 mt-8'
                } max-w-lg`}
              >
                <h3 className="font-bold text-xl mb-2 text-text-light dark:text-text-dark">{job.role}</h3>
                <p className="text-lg font-medium text-primary-light dark:text-primary-dark mb-3">{job.company}</p>
                <p className="text-text-light dark:text-text-dark leading-relaxed text-sm">{job.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div className="mt-20 text-center" variants={childVariants}>
          <p className="text-lg text-text-light dark:text-text-dark mb-6">
            Interested in working together?
          </p>
          <Link 
            to="/contact"
            className="inline-block px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default ExperiencePage;
