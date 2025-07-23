// src/components/About.jsx

import React from 'react';
import { Briefcase, Building2 } from 'lucide-react';

// --- Data for the Narrative Journey Timeline ---
const journeySteps = [
  {
    title: "The Start: BPO & Customer Support",
    description: "My career started on the front lines, providing customer and technical support. I learned how to listen to users, understand their pain points, and solve problems under pressure—skills that are the foundation of any good product."
  },
  {
    title: "The Shift: Digital Marketing & Analytics",
    description: "I moved into the world of MarTech, managing large-scale conversion tracking and collaborating with developers to ensure accurate data flow for high-value clients using Google's full ad suite."
  },
  {
    title: "The 'Aha!' Moment: Becoming a Builder",
    description: "I saw a recurring manual task and architected an automation tool to solve it. This sparked a passion for building. I went on to develop Pluto, a full-stack finance app, and built this entire portfolio from scratch with React and Tailwind CSS to continue honing my skills."
  },
  {
    title: "The Goal: Product Management",
    description: "Now, I'm focused on channeling that builder's mindset into Product Management. I combine my customer-facing background, analytical skills, and hands-on building experience to create products that solve real problems."
  }
];

// --- Data for the Work Experience Timeline from your Resume ---
const workExperience = [
  {
    role: "Senior Process Executive",
    company: "Cognizant Technology Solutions",
    date: "May 2023 - Current",
    description: "Managed and implemented conversion tracking solutions for major clients using Google Ads, GA4, and GTM, collaborating with developers to ensure accurate data flow."
  },
  {
    role: "Implementation Consultant",
    company: "Regalix India Pvt Ltd.",
    date: "Jan 2023 - May 2023",
    description: "Advised clients on conversion tracking, GA4, and GTM configuration to optimize campaign effectiveness and data accuracy."
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
      <div className="space-y-12 relative mb-24">
        <div className="absolute left-6 top-2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        {journeySteps.map((step, index) => (
          <div key={index} className="relative pl-16">
            <div className="absolute left-0 top-1.5 flex items-center justify-center w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-full">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-2xl mb-2">{step.title}</h3>
            <p className="text-text-light/80 dark:text-text-dark/80">{step.description}</p>
          </div>
        ))}
      </div>

      {/* --- WORK EXPERIENCE SECTION --- */}
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl">Work Experience</h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 mt-2">A timeline of my professional roles.</p>
      </div>
      <div className="space-y-12 relative">
        <div className="absolute left-6 top-2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
        {workExperience.map((job, index) => (
          <div key={index} className="relative pl-16">
            <div className="absolute left-0 top-1.5 flex items-center justify-center w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full">
              <Building2 className="w-5 h-5 text-text-light dark:text-text-dark" />
            </div>
            <p className="font-mono text-sm text-text-light/60 dark:text-text-dark/60">{job.date}</p>
            <h3 className="font-bold text-2xl">{job.role}</h3>
            <p className="text-lg font-semibold text-text-light/90 dark:text-text-dark/90">{job.company}</p>
            <p className="text-text-light/80 dark:text-text-dark/80 mt-1">{job.description}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default About;