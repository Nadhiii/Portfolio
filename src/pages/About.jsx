// src/components/About.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

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

const About = () => {
  return (
    <section id="about" className="max-w-4xl mx-auto pt-24 pb-20 lg:pt-32 lg:pb-24 px-8">
      
      {/* --- NARRATIVE JOURNEY SECTION --- */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl">
          <span className="text-text-light dark:text-text-dark">My </span>
          <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent">Journey</span>
        </h2>
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
              <p className="text-text-light dark:text-text-dark leading-relaxed">{step.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default About;