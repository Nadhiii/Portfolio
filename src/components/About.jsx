// src/components/About.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2 } from 'lucide-react';

// --- Data for the Narrative Journey Timeline ---
const journeySteps = [
  {
    title: "The Start: BPO & Customer Support",
    description: "My career started on the front lines, providing customer and technical support. I learned how to listen to users, understand their pain points, and solve problems under pressure—skills that are the foundation of any good product."
  },
  {
    title: "The Shift: Digital Marketing & Analytics",
    description: "I moved into the world of MarTech, managing large-scale Consent Mode (CoMo) Enhanced conversion tracking & troubleshooting, and collaborating with developers to ensure accurate data flow for high-value clients using Google's full ad suite."
  },
  {
    title: "The 'Aha!' Moment: Becoming a Builder",
    description: "I saw a recurring manual task eating up everyone's time and thought, 'There has to be a better way.' So I built an automation tool to solve it. That first taste of creating something that actually worked got me hooked. I went on to develop Pluto, a full-stack finance app, and built this entire portfolio from scratch with React and Tailwind CSS because, well, why stop at one project?"
  },
  {
    title: "The Goal: Product Management",
    description: "Now, I'm channeling that builder's mindset into Product Management. I've got the customer-facing experience, the analytical chops, and the hands-on building know-how to create products that actually solve real problems—not just look good in a deck."
  }
];

// --- Data for the Work Experience Timeline from your Resume ---
const workExperience = [
  {
    role: "Senior Process Executive",
    company: "Cognizant Technology Solutions",
    date: "May 2023 - Current",
    description: "Working on Google project as part of Measurement - Center of Excellence. Managed and implemented Consent Mode (CoMo) Enhanced conversion tracking & troubleshooting solutions for major clients using Google Ads, GA4, and GTM, collaborating with developers to ensure accurate data flow."
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

const About = () => {
  return (
    <section id="about" className="max-w-4xl mx-auto py-20 lg:py-32 px-8">
      
      {/* --- NARRATIVE JOURNEY SECTION --- */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl">My Journey</h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 mt-2">From Support to Shipping Products</p>
      </div>
      <div className="space-y-16 relative mb-40">
        {journeySteps.map((step, index) => (
          <motion.div 
            key={index} 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Timeline dot on alternating sides */}
            <motion.div 
              className={`absolute top-1 flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 border-2 border-primary-light dark:border-primary-dark rounded-full shadow-lg z-10 ${
                index % 2 === 0 ? 'left-0' : 'right-0'
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Briefcase className="w-5 h-5 text-primary-light dark:text-primary-dark" />
            </motion.div>
            
            {/* Content */}
            <motion.div 
              className={`bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 ${
                index % 2 === 0 ? 'mr-auto ml-16 mt-8' : 'ml-auto mr-16 mt-8'
              } max-w-lg`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-bold text-xl mb-4 text-primary-light dark:text-primary-dark">{step.title}</h3>
              <p className="text-text-light/80 dark:text-text-dark/80 leading-relaxed">{step.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

            {/* --- WORK EXPERIENCE SECTION --- */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl">Work Experience</h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 mt-2">A timeline of my professional roles.</p>
      </div>
      <div className="space-y-16 relative">
        {workExperience.map((job, index) => (
          <motion.div 
            key={index} 
            className="relative"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Timeline dot on alternating sides */}
            <motion.div 
              className={`absolute top-1 flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-full shadow-md z-10 ${
                index % 2 === 0 ? 'left-0' : 'right-0'
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Building2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </motion.div>
            
            {/* Date badge */}
            <div className={`absolute top-0 ${
              index % 2 === 0 ? 'right-2' : 'left-2'
            } z-10`}>
              <span className="inline-block px-3 py-1 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark text-xs font-mono rounded-full border border-primary-light/20 dark:border-primary-dark/20">
                {job.date}
              </span>
            </div>
            
            {/* Content Card */}
            <motion.div 
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${
                index % 2 === 0 ? 'mr-auto ml-16 mt-8' : 'ml-auto mr-16 mt-8'
              } max-w-lg`}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-bold text-xl mb-2 text-text-light dark:text-text-dark">{job.role}</h3>
              <p className="text-lg font-medium text-primary-light dark:text-primary-dark mb-3">{job.company}</p>
              <p className="text-text-light/80 dark:text-text-dark/80 leading-relaxed text-sm">{job.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default About;