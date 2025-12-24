// src/pages/ExperiencePage.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

// --- Data ---
const workExperience = [
  {
    role: "Senior Process Executive",
    company: "Cognizant Technology Solutions",
    date: "May 2023 - Sep 2025",
    description: "Managed and implemented Consent Mode (CoMo) Enhanced conversion tracking & troubleshooting solutions for major clients using Google Ads, GA4, and GTM."
  },
  {
    role: "Implementation Consultant",
    company: "Regalix India Pvt Ltd.",
    date: "Jan 2023 - May 2023",
    description: "Advised clients on Consent Mode (CoMo) Enhanced conversion tracking, GA4, and GTM configuration to optimize campaign effectiveness."
  },
  {
    role: "Associate - CEC Operations",
    company: "Tesco Bengaluru",
    date: "Jun 2022 - Jan 2023",
    description: "Provided remote technical support to store employees, resolving issues with product listings and point-of-sale systems."
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
    document.title = 'Experience | Mahanadhi Parisara'; // <--- Dynamic Title
    trackPageView('Experience Page', 'experience');
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 md:px-8 relative z-10">
      <section className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-6xl mb-4 text-gray-900 dark:text-white">
            Work <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent">Experience</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            My professional path in the tech landscape.
          </p>
        </motion.div>

        {/* 1. CURRENT ROLE - HERO CARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-20 p-8 rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl"
        >
          {/* Glowing Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/20 dark:bg-primary-dark/20 blur-[60px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Subject Matter Expert (SME)</h2>
                <div className="flex items-center gap-2 mt-2 text-primary-light dark:text-primary-dark font-medium">
                  <Building2 size={18} />
                  <span>Cognizant Technology Solutions</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20 text-sm font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Oct 2025 – Present
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-lg">
              Implementing and troubleshooting measurement across Google’s stack (Google Ads, GA4, GTM). Making conversion tracking work reliably—Consent Mode, Enhanced Conversions, and Offline Conversions.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10">
                <h3 className="font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                  <Briefcase size={18} className="text-primary-light dark:text-primary-dark"/>
                  What I Do
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-primary-light dark:text-primary-dark">•</span> 
                    End-to-end conversion tracking (gTag/GTM)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary-light dark:text-primary-dark">•</span> 
                    Consent Mode & Privacy Sandbox
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary-light dark:text-primary-dark">•</span> 
                    Enhanced & Offline Conversions
                  </li>
                </ul>
              </div>
              
              <div className="p-5 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10">
                <h3 className="font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                  <Briefcase size={18} className="text-purple-500"/>
                  Leadership
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex gap-2">
                    <span className="text-purple-500">•</span> 
                    Mentoring 3 mentees (6–8 months)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">•</span> 
                    Floor support for new hires
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-500">•</span> 
                    Direct collaboration with Google teams
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. TIMELINE */}
        <div className="relative space-y-12 pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-light/50 via-gray-300 dark:via-gray-700 to-transparent transform -translate-x-1/2 md:translate-x-0" />

          {workExperience.map((job, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-[3px] border-primary-light dark:border-primary-dark transform -translate-x-[calc(50%-1px)] md:-translate-x-1/2 mt-6 z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

              {/* Spacer for 50/50 split */}
              <div className="flex-1 hidden md:block" />

              {/* Content Card */}
              <div className="flex-1">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/40 dark:border-white/10 shadow-lg group"
                >
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-mono font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {job.date}
                  </span>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                    {job.role}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Building2 size={14} />
                    {job.company}
                  </div>
                  
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {job.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-24 text-center"
        >
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Work With Me <ArrowRight size={20} />
          </Link>
        </motion.div>

      </section>
    </div>
  );
};

export default ExperiencePage;