// src/components/Skills.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Code, Wrench, TrendingUp, Zap, BookOpen, Target } from 'lucide-react';

const mindsetSkills = [
  { name: 'AI-Assisted Development', level: 'Advanced', description: 'Leveraging AI tools to build efficiently & learn faster than ever' },
  { name: 'Problem-First Thinking', level: 'Strong', description: 'Finding the real issue before building the wrong solution' },
  { name: 'Learning Velocity', level: 'High', description: 'Quick to pick up new tech (and even quicker to Google error messages)' },
  { name: 'Outcome Focus', level: 'Strong', description: 'Shipping working solutions over perfect code' }
];

const technicalSkills = [
  { name: 'React & JavaScript', level: 'Learning', description: 'Building functional apps with heavy AI assistance (and proud of it)' },
  { name: 'Flutter & Firebase', level: 'Learning', description: 'Mobile development for projects that actually work' },
  { name: 'HTML/CSS', level: 'Comfortable', description: 'Making things look good and work on mobile' },
  { name: 'Google Apps Script', level: 'Comfortable', description: 'The unsung hero of workplace automation' },
  { name: 'Git/GitHub', level: 'Learning', description: 'Version control without breaking everything' },
  { name: 'API Integration', level: 'Learning', description: 'Making different services talk to each other nicely' }
];

const aiTools = [
  { name: 'GitHub Copilot', level: 'Primary Tool' },
  { name: 'ChatGPT/Claude', level: 'Primary Tool' },
  { name: 'Gemini', level: 'Primary Tool' },
  { name: 'Cursor/VS Code', level: 'Primary Tool' },
  { name: 'AI Debugging', level: 'Frequent Use' },
  { name: 'Code Review AI', level: 'Frequent Use' },
  { name: 'Documentation AI', level: 'Frequent Use' }
];

const analyticsTools = [
  { name: 'Google Analytics', level: 'Advanced', description: 'Setup, analysis, and optimization' },
  { name: 'Google Tag Manager', level: 'Advanced', description: 'Event tracking and measurement' },
  { name: 'Google Ads Conversion Tracking', level: 'Advanced', description: 'Campaign attribution and optimization' },
  { name: 'Data Studio', level: 'Intermediate', description: 'Dashboard creation and reporting' },
  { name: 'SA360', level: 'Learning Soon', description: 'Search Ads 360 platform exploration' },
  { name: 'CM360', level: 'Learning Soon', description: 'Campaign Manager 360 upcoming training' }
];

const SkillCard = ({ skill, index, isVisible }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isVisible ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
  >
    <div className="flex justify-between items-start mb-2">
      <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
        skill.level === 'Advanced' || skill.level === 'Primary Tool' 
          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : skill.level === 'Strong' || skill.level === 'Comfortable' || skill.level === 'Intermediate' || skill.level === 'Frequent Use'
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
          : skill.level === 'Learning Soon'
          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
          : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
      }`}>
        {skill.level}
      </span>
    </div>
    {skill.description && (
      <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
    )}
  </motion.div>
);

const SkillPill = ({ skill, index, isVisible }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 cursor-default"
  >
    {skill}
  </motion.span>
);

const Skills = () => {
  const [activeTab, setActiveTab] = useState('mindset');
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'mindset', label: 'Mindset & Approach', icon: BrainCircuit },
    { id: 'technical', label: 'Technical Skills', icon: Code },
    { id: 'ai', label: 'AI Tools', icon: Zap },
    { id: 'analytics', label: 'Analytics & Growth', icon: Target }
  ];

  const renderSkillsContent = () => {
    switch (activeTab) {
      case 'mindset':
        return (
          <div className="grid gap-4">
            {mindsetSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} isVisible={isVisible} />
            ))}
          </div>
        );
      case 'technical':
        return (
          <div className="grid gap-4">
            {technicalSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} isVisible={isVisible} />
            ))}
          </div>
        );
      case 'ai':
        return (
          <div className="grid gap-4">
            {aiTools.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} isVisible={isVisible} />
            ))}
          </div>
        );
      case 'analytics':
        return (
          <div className="grid gap-4">
            {analyticsTools.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} isVisible={isVisible} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="skills" className="max-w-6xl mx-auto py-20 lg:py-32 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-heading text-4xl lg:text-5xl mb-4">
          Skills & 
          <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent"> Approach</span>
        </h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 max-w-3xl mx-auto">
          I'm a learner who builds with passion. What started as a way to pass time has grown into something I truly love. I embrace AI tools, learn whatever's needed, and never step back from a challenge. My projects prove that leveraging modern tools effectively matters more than claiming expertise in every technology.
        </p>
      </motion.div>

      {/* Interactive Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm ${
              activeTab === id
                ? 'bg-primary-light dark:bg-primary-dark text-white shadow-lg transform scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Icon size={18} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </motion.div>

      {/* Skills Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || TrendingUp, {
              size: 24,
              className: "text-primary-light dark:text-primary-dark"
            })}
            <h3 className="text-xl font-bold">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h3>
          </div>
          
          {renderSkillsContent()}
          
          {activeTab === 'mindset' && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Phil's-Osophy:</strong> Just build it. Use what you know, learn what you don't, leverage AI, hire help—whatever it takes. It doesn't have to make sense until it actually does. The how matters less than the doing, and if you're enjoying the process, you're already winning.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Additional Context */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 text-center"
      >
        <h3 className="text-xl font-bold mb-6 text-text-light/80 dark:text-text-dark/80">
          Also Familiar With
        </h3>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {['Notion', 'Slack', 'Jira', 'Trello', 'A/B Testing', 'User Research'].map((skill, index) => (
            <SkillPill key={skill} skill={skill} index={index} isVisible={isVisible} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;