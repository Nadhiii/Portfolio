// src/pages/Skills.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Target } from 'lucide-react';
import { trackPageView } from '../utils/analytics';

const engineeringSkills = [
  { name: 'AI-Assisted Dev', level: 'Advanced', description: 'Leveraging AI to build faster than humanly possible.', accent: 'bg-blue-500' },
  { name: 'React & JS', level: 'Learning', description: 'Building functional apps with heavy AI assistance.', accent: 'bg-cyan-500' },
  { name: 'Flutter', level: 'Learning', description: 'Cross-platform mobile development for real apps.', accent: 'bg-blue-500' },
  { name: 'Apps Script', level: 'Pro', description: 'Automating enterprise workflows at scale.', accent: 'bg-yellow-500' },
  { name: 'Firebase', level: 'Comfortable', description: 'Backend-as-a-Service for quick deployments.', accent: 'bg-orange-500' },
  { name: 'Cursor / VS Code / Antigravity', level: 'Daily Driver', description: 'AI-powered IDE for rapid development.', accent: 'bg-blue-500' },
];

const measurementSkills = [
  { name: 'Google Analytics', level: 'Expert', description: 'Setup, analysis, and custom reporting.', accent: 'bg-orange-500' },
  { name: 'Amplitude', level: 'Beginner', description: 'Setup, analysis, and custom reporting.', accent: 'bg-red-500' },
  { name: 'GTM', level: 'Expert', description: 'Complex event tracking and data layers.', accent: 'bg-blue-500' },
  { name: 'Google Ads', level: 'Expert', description: 'Conversion tracking & attribution modeling.', accent: 'bg-green-500' },
  { name: 'Looker Studio', level: 'Proficient', description: 'Visualizing data for stakeholders.', accent: 'bg-indigo-500' },
];

const SkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="group relative p-5 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg hover:bg-white/40 dark:hover:bg-white/5 transition-all duration-300"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
        {skill.name}
      </h3>
      
      {/* Glowing Status Dot */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">
          {skill.level}
        </span>
        <div className="relative flex h-2.5 w-2.5">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${skill.accent}`}></span>
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${skill.accent}`}></span>
        </div>
      </div>
    </div>
    
    {skill.description && (
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed opacity-90">
        {skill.description}
      </p>
    )}
  </motion.div>
);

const tabIds = ['measurement', 'engineering'];

const Skills = () => {
  const [activeTab, setActiveTab] = useState('measurement');
  const directionRef = useRef(1);

  React.useEffect(() => {
    trackPageView('Skills Page', 'skills');
  }, []);

  const handleTabChange = (tabId) => {
    const prevIndex = tabIds.indexOf(activeTab);
    const nextIndex = tabIds.indexOf(tabId);
    directionRef.current = nextIndex > prevIndex ? 1 : -1;
    setActiveTab(tabId);
  };

  const tabs = [
    { id: 'measurement', label: 'Measurement', icon: Target },
    { id: 'engineering', label: 'Engineering', icon: Code },
  ];

  const slideVariants = {
    enter: (dir) => ({ x: dir * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir * -80, opacity: 0 }),
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 md:px-8 relative z-10">
      <section className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-6xl mb-4 text-gray-900 dark:text-white">
            Skills & <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent">Tools</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I don't just memorize syntax. I leverage modern tools to solve problems efficiently.
          </p>
        </motion.div>

        {/* Floating Glass Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-2xl bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-white dark:bg-gray-800 text-primary-light dark:text-primary-dark shadow-md scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Content */}
        <div className="relative mb-12 overflow-hidden">
          <AnimatePresence mode="wait" custom={directionRef.current}>
            <motion.div
              key={activeTab}
              custom={directionRef.current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid md:grid-cols-2 gap-4"
            >
              {activeTab === 'engineering' && engineeringSkills.map((s, i) => <SkillCard key={s.name} skill={s} index={i} />)}
              {activeTab === 'measurement' && measurementSkills.map((s, i) => <SkillCard key={s.name} skill={s} index={i} />)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Philosophy Footer */}
        <motion.div
          key={activeTab + '-footer'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-blue-500/20 text-center"
        >
          {activeTab === 'engineering' && (
            <p className="text-gray-700 dark:text-gray-300 italic">
              "It doesn't have to make sense until it actually does. Ship it, learn from it, improve it."
            </p>
          )}
          {activeTab === 'measurement' && (
            <p className="text-gray-700 dark:text-gray-300 italic">
              "Numbers don't lie, but they love to mislead. The real skill is asking the right questions."
            </p>
          )}
        </motion.div>

      </section>
    </div>
  );
};

export default Skills;