// src/pages/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, GanttChartSquare, MonitorPlay, ChevronRight, Users, TrendingUp, Clock, Award, Eye, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';
import Button from '../components/Button';

const Projects = () => {
  // Track page view
  React.useEffect(() => {
    trackPageView('Projects Page', 'projects');
  }, []);

  const projects = [
    {
      id: 'automation',
      title: 'Team-Wide Automation',
      icon: GanttChartSquare,
      description: 'A Google Apps Script solution that eliminated 45 mins of manual data entry per day for 120+ people.',
      problem: 'Team leads were wasting 30+ mins daily manually copying data between sheets.',
      build: 'Architected a fully automated sync system using Google Apps Script & Sheets API that runs while they sleep.',
      outcome: 'Adopted by 10+ teams. 100% adoption rate. Zero manual intervention required.',
      metrics: [
        { icon: Users, value: '10+', label: 'Teams' },
        { icon: Clock, value: '45m', label: 'Saved/Day' },
        { icon: Award, value: '100%', label: 'Adoption' }
      ],
      techStack: ['Apps Script', 'JavaScript', 'Sheets API'],
      accent: 'text-blue-500',
      glow: 'shadow-blue-500/20'
    },
    {
      id: 'pluto',
      title: 'Pluto Finance',
      icon: Rocket,
      description: 'A privacy-first, offline-capable finance tracker built with Flutter & Firebase.',
      problem: 'Existing apps were either too expensive, privacy-invasive, or required constant internet.',
      build: 'Engineered a local-first architecture with background sync. Works perfectly in airplane mode.',
      outcome: 'My daily driver for finances. Fast, private, and zero subscription costs.',
      metrics: [
        { icon: Users, value: 'Daily', label: 'Usage' },
        { icon: TrendingUp, value: '100%', label: 'Offline' },
        { icon: Clock, value: '<1s', label: 'Load' }
      ],
      techStack: ['Flutter', 'Firebase', 'Dart'],
      links: [
        { type: 'internal', label: 'View Project', url: '/pluto', icon: ChevronRight }
      ],
      accent: 'text-purple-500',
      glow: 'shadow-purple-500/20'
    },
    {
      id: 'portfolio',
      title: 'This Portfolio',
      icon: MonitorPlay,
      description: 'A high-performance React application showcasing modern UI/UX principles.',
      problem: 'Needed a home on the web that wasn\'t just another generic template.',
      build: 'Built from scratch with React, Tailwind, and Framer Motion. Focused on micro-interactions.',
      outcome: 'You are looking at it! A 100% responsive, dark-mode enabled 3D experience.',
      metrics: [
        { icon: TrendingUp, value: '99', label: 'Perform.' },
        { icon: Eye, value: '100%', label: 'Resp.' },
        { icon: Clock, value: '0.5s', label: 'Load' }
      ],
      techStack: ['React', 'Tailwind', 'Framer'],
      accent: 'text-emerald-500',
      glow: 'shadow-emerald-500/20'
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 md:px-8 relative z-10">
      <section className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="font-heading text-4xl md:text-6xl mb-4 text-gray-900 dark:text-white">
            My <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Solutions engineered to address real-world inefficiencies and deliver measurable impact.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* GLASS CARD CONTAINER */}
                <div className="rounded-3xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl overflow-hidden group hover:border-white/60 dark:hover:border-white/20 transition-colors duration-500">
                  <div className="grid lg:grid-cols-12 gap-0">
                    
                    {/* Left Column: Visuals & Metrics */}
                    <div className="lg:col-span-5 p-8 border-b lg:border-b-0 lg:border-r border-white/20 dark:border-white/5 flex flex-col justify-between bg-white/20 dark:bg-white/5">
                      <div>
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white dark:bg-gray-800 shadow-lg ${project.accent}`}>
                          <Icon size={28} />
                        </div>
                        
                        {/* Metrics Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {project.metrics.map((m, i) => (
                            <div key={i} className="text-center p-3 rounded-xl bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/5">
                              <m.icon size={16} className={`mx-auto mb-2 ${project.accent} opacity-80`} />
                              <div className="font-bold text-gray-900 dark:text-white">{m.value}</div>
                              <div className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-white/60 dark:bg-white/10 border border-white/20 text-gray-700 dark:text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-center">
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-6 mb-8">
                        <div className="flex gap-4">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${project.accent.replace('text', 'bg')}`} />
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">Problem</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{project.problem}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${project.accent.replace('text', 'bg')}`} />
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">Solution</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{project.build}</p>
                          </div>
                        </div>
                      </div>

                      {project.links && (
                        <div className="flex gap-4">
                          {project.links.map((link, i) => (
                            <Link 
                              key={i}
                              to={link.url}
                              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:gap-3 transition-all ${project.glow}`}
                            >
                              {link.label} <link.icon size={18} />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-24 text-center"
        >
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700">
            <Button
              asLink
              href="mailto:mahanadhip@gmail.com"
              variant="secondary"
              className="rounded-full px-8 bg-white dark:bg-gray-900 border-none"
            >
              Let's build something new together
            </Button>
          </div>
        </motion.div>

      </section>
    </div>
  );
};

export default Projects;