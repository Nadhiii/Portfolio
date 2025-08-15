// src/components/Projects.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, GanttChartSquare, MonitorPlay, ExternalLink, Github, TrendingUp, Users, Clock, Award, ChevronRight, Code, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 'pluto',
      title: 'Pluto - Personal Finance Tracker',
      icon: Rocket,
      description: 'A full-stack mobile finance app built with Flutter and Firebase, featuring offline data sync.',
      problem: 'I needed a fast and reliable mobile-native solution to track finances that would work seamlessly whether I was online or offline. (Because who has time for "connection error" messages when you\'re trying to log expenses?)',
      build: 'I developed a full-stack application using Flutter for the cross-platform front-end and Firebase for the backend, designing the UX flow and engineering seamless offline data synchronization.',
      outcome: 'Successfully deployed a fully functional finance tracking app with real-time sync, offline capabilities, and intuitive UX design.',
      metrics: [
        { icon: Users, label: 'Personal Use', value: 'Daily', color: 'text-blue-600' },
        { icon: TrendingUp, label: 'Offline Sync', value: '100%', color: 'text-green-600' },
        { icon: Clock, label: 'Load Time', value: '<2s', color: 'text-purple-600' }
      ],
      techStack: ['Flutter', 'Firebase', 'Dart', 'Cloud Firestore'],
      links: [
        { type: 'demo', label: 'Case Study', url: '/pluto', icon: Eye },
        { type: 'code', label: 'View Details', url: '/pluto', icon: ChevronRight }
      ],
      lessons: ['Offline-first architecture design', 'Cross-platform mobile development', 'Real-time data synchronization'],
      testimonial: '"Solved my personal finance tracking needs perfectly" - Personal Use'
    },
    {
      id: 'automation',
      title: 'Team-Wide Data Sync Tool',
      icon: GanttChartSquare,
      description: 'A Google Apps Script automation to distribute daily data, eliminating manual work.',
      problem: 'Team leaders spent over 30 minutes daily on a tedious and error-prone manual data-copying task. (Yes, copy-paste was literally part of the daily workflow—we had to fix that.)',
      build: 'I architected the core logic and implemented a Google Apps Script that automated the entire workflow, running daily without intervention. (Set it and forget it—the best kind of solution.)',
      outcome: 'Adopted by 10+ teams totaling 120+ team members, saving 30-45 mins/day project-wide.',
      metrics: [
        { icon: Users, label: 'Teams Using', value: '10+', color: 'text-blue-600' },
        { icon: TrendingUp, label: 'Members Impacted', value: '120+', color: 'text-green-600' },
        { icon: Clock, label: 'Time Saved', value: '30-45min/day', color: 'text-purple-600' },
        { icon: Award, label: 'Adoption Rate', value: '100%', color: 'text-orange-600' }
      ],
      techStack: ['Google Apps Script', 'JavaScript', 'Google Sheets API', 'Automation'],
      links: [
        { type: 'demo', label: 'Live in Production', url: '#', icon: ExternalLink, disabled: true },
        { type: 'code', label: 'Technical Details', url: '#', icon: Code, disabled: true }
      ],
      lessons: ['Enterprise-scale automation', 'Cross-team collaboration', 'Production deployment processes'],
      testimonial: '"This tool transformed our daily workflow completely" - Team Lead (and now they have 30+ extra minutes for coffee)'
    },
    {
      id: 'portfolio',
      title: 'Personal Portfolio Website',
      icon: MonitorPlay,
      description: 'A responsive personal portfolio built from scratch to showcase my skills as a product-minded builder.',
      problem: 'To create a professional, modern website that reflects my transition into product and highlights my real-world projects.',
      build: 'I built this site using React, Tailwind CSS for styling, and Framer Motion for animations. It features a dark mode, a multi-page layout using React Router, and a functional contact form.',
      outcome: 'A polished, performant website that not only serves as my portfolio but also demonstrates my hands-on ability with modern front-end technologies.',
      metrics: [
        { icon: TrendingUp, label: 'Performance', value: '95+', color: 'text-green-600' },
        { icon: Eye, label: 'Responsive', value: '100%', color: 'text-blue-600' },
        { icon: Clock, label: 'Load Time', value: '<1s', color: 'text-purple-600' }
      ],
      techStack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'React Router'],
      links: [
        { type: 'demo', label: 'You\'re Here!', url: '/', icon: Eye },
        { type: 'code', label: 'View Source', url: 'https://github.com/Nadhiii/Portfolio', icon: Github }
      ],
      lessons: ['Modern React development', 'Component-based architecture', 'Performance optimization'],
      testimonial: '"Clean, professional design with smooth interactions" - You decide!'
    }
  ];

  return (
    <section id="projects" className="max-w-7xl mx-auto py-20 lg:py-32 px-8">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="font-heading text-4xl mb-4">Things I've Built</h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
          I learn by doing. Here are some things I've built to solve real problems and drive measurable impact.
        </p>
      </motion.div>

      <div className="space-y-24">
        {projects.map((project, index) => {
          const IconComponent = project.icon;
          const isReversed = index % 2 === 1;
          
          return (
            <motion.div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.3) }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Project Visual */}
              <div className={`w-full ${isReversed ? 'lg:col-start-2' : ''}`}>
                <motion.div 
                  className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project Icon */}
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center shadow-lg">
                      <IconComponent size={24} className="text-white" />
                    </div>
                  </div>

                  {/* Pluto SVG Animation */}
                  {project.id === 'pluto' && (
                    <div className="mt-8 mb-6 flex justify-center">
                      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64">
                        <rect x="50" y="50" width="300" height="300" rx="60" ry="60" fill="#121212">
                          <animate attributeName="opacity" from="0" to="1" dur="1s" begin="0s" fill="freeze" />
                        </rect>
                        <path d="M 150,200 A 50,50 0 0,1 250,200" stroke="white" strokeWidth="15" fill="none" strokeLinecap="round" strokeDasharray="157" strokeDashoffset="157">
                          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1s" fill="freeze" />
                          <animate attributeName="stroke-dashoffset" from="157" to="0" dur="1.2s" begin="1s" fill="freeze" />
                          <animate attributeName="stroke-width" values="15;18;15" dur="2s" begin="2.2s" repeatCount="indefinite" />
                        </path>
                        <text x="200" y="270" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="normal" fill="white" opacity="0">
                          PLUTO
                          <animate attributeName="opacity" from="0" to="1" dur="1s" begin="2.2s" fill="freeze" />
                        </text>
                      </svg>
                    </div>
                  )}

                  {/* Metrics Grid */}
                  <div className="mt-8 grid grid-cols-2 gap-4 mb-6">
                    {project.metrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <metric.icon size={20} className={`mx-auto mb-2 ${metric.color}`} />
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Project Content */}
              <div className={isReversed ? 'lg:col-start-1' : ''}>
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 15 : -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <h3 className="flex items-center gap-3 text-3xl font-bold mb-4">
                    <IconComponent size={32} className="text-primary-light dark:text-primary-dark" />
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
                    {project.description}
                  </p>

                  <div className="space-y-6">
                    {/* Problem */}
                    <motion.div
                      className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-gray-300 dark:border-gray-600"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-300">The Problem</h4>
                      <p className="text-gray-600 dark:text-gray-400">{project.problem}</p>
                    </motion.div>

                    {/* Build */}
                    <motion.div
                      className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-gray-300 dark:border-gray-600"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-300">The Build</h4>
                      <p className="text-gray-600 dark:text-gray-400">{project.build}</p>
                    </motion.div>

                    {/* Outcome */}
                    <motion.div
                      className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-primary-light dark:border-primary-dark"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-bold text-lg mb-2 text-primary-light dark:text-primary-dark">The Outcome</h4>
                      <p className="text-gray-600 dark:text-gray-400">{project.outcome}</p>
                    </motion.div>

                    {/* What I Learned */}
                    <motion.div
                      className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border-l-4 border-gray-300 dark:border-gray-600"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-bold text-lg mb-2 text-gray-700 dark:text-gray-300">What I Learned</h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                        {project.lessons.map((lesson, idx) => (
                          <li key={idx}>{lesson}</li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Testimonial */}
                    <motion.div
                      className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="italic text-gray-600 dark:text-gray-400">"{project.testimonial.split(' - ')[0]}"</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">- {project.testimonial.split(' - ')[1]}</p>
                    </motion.div>
                  </div>


                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-20 bg-gradient-to-r from-primary-light/10 to-accent-green-light/10 dark:from-primary-dark/10 dark:to-accent-green-dark/10 rounded-2xl p-8"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <h3 className="text-2xl font-bold mb-4">Want to see more?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          I'm always working on something, thinking about the next challenge, and eager to learn whatever comes my way. 
          These projects represent my approach to identifying problems and building solutions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href="mailto:mahanadhip@gmail.com"
            className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-bold hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark dark:hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's discuss your next project
            <ChevronRight size={20} />
          </motion.a>
          
          <span className="text-gray-400 hidden sm:block">or</span>
          
          <motion.a
            href="mailto:mahanadhip@gmail.com"
            className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg font-bold hover:bg-accent-green-light hover:text-white dark:hover:bg-accent-green-dark dark:hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Want to build something together?
            <ChevronRight size={20} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;