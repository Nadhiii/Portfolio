// src/components/Skills.jsx
import React from 'react';
import { BrainCircuit, Code, Wrench } from 'lucide-react';

const productSkills = [ 'Product Thinking', 'UX Principles', 'KPI Ownership', 'Automation' ];
const technicalSkills = [ 'JavaScript', 'React', 'HTML', 'CSS', 'Node.js', 'Flutter', 'Firebase', 'Google Cloud', 'Git/GitHub' ];
const tools = [ 'Google Tag Manager', 'Google Analytics', 'Google Ads', 'Google Apps Script' ];

const Skills = () => {
  return (
    <section id="skills" className="max-w-7xl mx-auto py-20 lg:py-32 px-8">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl">Skills & Toolkit</h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 mt-2">
          The tools and technologies I use to build and improve products.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg">
          <h3 className="flex items-center gap-3 text-2xl font-bold mb-6">
            <BrainCircuit size={28} className="text-primary-light dark:text-primary-dark" />
            Product & Growth
          </h3>
          <div className="flex flex-wrap gap-2">
            {productSkills.map((skill) => (
              <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg">
          <h3 className="flex items-center gap-3 text-2xl font-bold mb-6">
            <Code size={28} className="text-primary-light dark:text-primary-dark" />
            Technical
          </h3>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.map((skill) => (
              <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg">
          <h3 className="flex items-center gap-3 text-2xl font-bold mb-6">
            <Wrench size={28} className="text-primary-light dark:text-primary-dark" />
            MarTech & Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((skill) => (
              <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;