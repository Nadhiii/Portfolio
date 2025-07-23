// src/components/Projects.jsx
import React from 'react';
import { Rocket, GanttChartSquare, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  return (
    <section id="projects" className="max-w-7xl mx-auto py-20 lg-py-32 px-8">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl">Things I've Built</h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 mt-2">
          I learn by doing. Here are some things I've built to solve real problems.
        </p>
      </div>

      <div className="space-y-24">

        {/* --- Project 1: Pluto (Personal Finance App) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full h-auto rounded-lg flex items-center justify-center p-4">
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
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
          <div>
            <h3 className="flex items-center gap-3 text-3xl font-bold mb-4">
              <Rocket size={32} className="text-primary-light dark:text-primary-dark" />
              Pluto - Personal Finance Tracker
            </h3>
            <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
              A full-stack mobile finance app built with Flutter and Firebase, featuring offline data sync.
            </p>
            <div className="space-y-4">
              <div><h4 className="font-bold text-xl mb-1">The Problem</h4><p>I needed a fast and reliable mobile-native solution to track finances that would work seamlessly whether I was online or offline.</p></div>
              <div><h4 className="font-bold text-xl mb-1">The Build</h4><p>I developed a full-stack application using Flutter for the cross-platform front-end and Firebase for the backend, designing the UX flow and engineering seamless offline data synchronization.</p></div>
            </div>
            <Link to="/pluto" className="inline-block mt-6 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark font-bold py-2 px-4 rounded-lg hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors">
              Learn More &rarr;
            </Link>
          </div>
        </div>

        {/* --- Project 2: Automation Tool --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="flex items-center gap-3 text-3xl font-bold mb-4">
              <GanttChartSquare size={32} className="text-primary-light dark:text-primary-dark" />
              Team-Wide Data Sync Tool
            </h3>
            <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
              A Google Apps Script automation to distribute daily data, eliminating manual work.
            </p>
            <div className="space-y-4">
              <div><h4 className="font-bold text-xl mb-1">The Problem</h4><p>Team leaders spent over 30 minutes daily on a tedious and error-prone manual data-copying task.</p></div>
              <div><h4 className="font-bold text-xl mb-1">The Build</h4><p>I architected the core logic and implemented a Google Apps Script that automated the entire workflow, running daily without intervention.</p></div>
              <div><h4 className="font-bold text-xl mb-1">The Outcome</h4><p>The tool saved over 30 minutes per team lead every day and was adopted across the entire floor, demonstrating my ability to identify a pain point and ship a scalable solution.</p></div>
            </div>
          </div>
          <div className="w-full h-auto p-4 border border-gray-900/10 dark:border-white/10 rounded-lg">
            <svg width="100%" height="auto" viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
              <style>
                  {`
                    /* --- THIS IS THE CORRECTED FONT STYLE SECTION --- */
                    .font-heavy { font-family: 'Rammetto One', sans-serif; font-size: 14px; }
                    .font-body { font-family: 'Inter', sans-serif; }
                    .font-small { font-size: 12px; }

                    .g-sheets-green { fill: #188038; } .dark .g-sheets-green { fill: #34a853; }
                    .g-sheets-blue { fill: #1a73e8; } .dark .g-sheets-blue { fill: #8ab4f8; }
                    .g-sheets-yellow { fill: #fbbc04; } .dark .g-sheets-yellow { fill: #fcd34d; }
                    .g-sheets-bg { fill: #f8f9fa; } .dark .g-sheets-bg { fill: #374151; }
                    .g-sheets-border { stroke: #e1e5e9; } .dark .g-sheets-border { stroke: #6b7280; }
                    .g-sheets-text { fill: #374151; } .dark .g-sheets-text { fill: #e5e7eb; }
                    .data-row { fill: #e8f0fe; stroke: #1a73e8; stroke-width: 0.5; } .dark .data-row { fill: #1e3a8a; stroke: #60a5fa; }
                    .arrow-path { stroke: #666; stroke-width: 2; fill: none; marker-end: url(#arrowhead); } .dark .arrow-path { stroke: #9ca3af; }
                  `}
              </style>
              <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#666" /></marker>
                  <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              
              <rect width="100%" height="100%" fill="#fafafa" className="dark:fill-gray-900"/>
              
              <g id="masterSheet" transform="translate(50, 80)">
                  <path d="M 5 5 H 120 V 140 H 5 Z" fill="#00000010"/>
                  <path d="M 0 0 H 115 V 135 H 0 Z" className="g-sheets-bg g-sheets-border" strokeWidth="2" stroke="#188038"/>
                  <path d="M 115 0 L 95 0 L 95 20 L 115 20 Z" fill="#fff" stroke="#188038" strokeWidth="1" className="dark:fill-gray-700"/>
                  <path d="M 95 0 L 115 20" stroke="#188038" strokeWidth="1" fill="none"/>
                  <rect x="0" y="0" width="115" height="25" className="g-sheets-green"/>
                  <text x="57" y="17" textAnchor="middle" fill="white" className="font-heavy">Master Data</text>
                  <rect x="10" y="35" width="95" height="12" className="data-row" opacity="0"><animate attributeName="opacity" values="0;1;1;0.3" dur="6s" repeatCount="indefinite"/></rect>
                  <rect x="10" y="50" width="95" height="12" className="data-row" opacity="0"><animate attributeName="opacity" values="0;1;1;0.3" dur="6s" begin="0.5s" repeatCount="indefinite"/></rect>
                  <text x="57" y="155" textAnchor="middle" className="g-sheets-text font-body font-small">Raw Data Source</text>
              </g>
              
              <path d="M 180 147 Q 220 147 250 147" className="arrow-path"/>
              <text x="215" y="140" textAnchor="middle" fill="#666" className="dark:fill-gray-400 font-body font-small">Fetch Data</text>
              
              <g id="dataPackets1">
                  <circle cx="180" cy="147" r="3" fill="#4285f4"><animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite"/><animateMotion path="M 0 0 Q 40 0 70 0" dur="3s" repeatCount="indefinite"/></circle>
                  <circle cx="180" cy="147" r="3" fill="#34a853"><animate attributeName="opacity" values="0;1;1;0" dur="3s" begin="1s" repeatCount="indefinite"/><animateMotion path="M 0 0 Q 40 0 70 0" dur="3s" begin="1s" repeatCount="indefinite"/></circle>
              </g>
              
              <g id="processor" transform="translate(250, 120)">
                  <circle cx="25" cy="27" r="25" className="g-sheets-yellow" filter="url(#glow)"><animate attributeName="r" values="25;28;25" dur="2s" repeatCount="indefinite"/></circle>
                  <text x="25" y="31" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Script</text>
                  <text x="25" y="75" textAnchor="middle" className="g-sheets-text font-body font-heavy">Apps Script</text>
                  <text x="25" y="88" textAnchor="middle" className="g-sheets-text font-body font-small">Sorting & Processing</text>
              </g>
              
              <path d="M 325 147 Q 365 147 395 147" className="arrow-path"/>
              <text x="360" y="140" textAnchor="middle" fill="#666" className="dark:fill-gray-400 font-body font-small">Sorted Data</text>
              
              <g id="dataPackets2">
                  <circle cx="325" cy="147" r="3" fill="#34a853" opacity="0"><animate attributeName="opacity" values="0;1;1;0" dur="3s" begin="3s" repeatCount="indefinite"/><animateMotion path="M 0 0 Q 40 0 70 0" dur="3s" begin="3s" repeatCount="indefinite"/></circle>
              </g>
              
              <g id="teamSheets" transform="translate(395, 80)">
                  <path d="M 4 4 H 119 V 139 H 4 Z" fill="#00000015"/>
                  <path d="M 0 0 H 115 V 135 H 0 Z" className="g-sheets-bg g-sheets-border" strokeWidth="2" stroke="#1a73e8"/>
                  <path d="M 115 0 L 95 0 L 95 20 L 115 20 Z" fill="#fff" stroke="#1a73e8" strokeWidth="1" className="dark:fill-gray-700"/>
                  <path d="M 95 0 L 115 20" stroke="#1a73e8" strokeWidth="1" fill="none"/>
                  <rect x="0" y="0" width="115" height="25" className="g-sheets-blue"/>
                  <text x="57" y="17" textAnchor="middle" fill="white" className="font-heavy">Team Sheets</text>
                  <text x="57" y="155" textAnchor="middle" fontSize="12" className="g-sheets-text font-body font-small">Organized Data</text>
              </g>
              
              <g id="statusIndicators" transform="translate(50, 30)">
                  <text x="0" y="0" fontSize="16" className="g-sheets-text font-heavy">Data Processing Pipeline</text>
              </g>
            </svg>
          </div>
        </div>
        
        {/* --- Project 3: This Portfolio Website --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full h-auto rounded-lg flex items-center justify-center p-4">
             <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <style>
                    {`.text-primary-light { fill: #4C6EF5; } .dark .text-primary-dark { fill: #A5B4FC; }`}
                </style>
                <path d="M80 100 H 320 V 280 H 80 Z" stroke="#1F2937" className="dark:stroke-gray-400" strokeWidth="8" fill="none" strokeDasharray="800" strokeDashoffset="800">
                    <animate attributeName="stroke-dashoffset" from="800" to="0" dur="1.5s" begin="0.5s" fill="freeze" />
                </path>
                <circle cx="105" cy="120" r="8" fill="#F87171" opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2s" fill="freeze" /></circle>
                <circle cx="135" cy="120" r="8" fill="#FBBF24" opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.2s" fill="freeze" /></circle>
                <circle cx="165" cy="120" r="8" fill="#34D399" opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.4s" fill="freeze" /></circle>
                <text x="200" y="220" textAnchor="middle" fontFamily="Rammetto One, sans-serif" fontSize="60" className="text-primary-light dark:text-primary-dark" opacity="0">
                    MP
                    <animate attributeName="opacity" from="0" to="1" dur="1s" begin="2.5s" fill="freeze" />
                </text>
            </svg>
          </div>
          <div>
            <h3 className="flex items-center gap-3 text-3xl font-bold mb-4">
              <MonitorPlay size={32} className="text-primary-light dark:text-primary-dark" />
              Personal Portfolio Website
            </h3>
            <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
              A responsive personal portfolio built from scratch to showcase my skills as a product-minded builder.
            </p>
            <div className="space-y-4">
              <div><h4 className="font-bold text-xl mb-1">The Goal</h4><p>To create a professional, modern website that reflects my transition into product and highlights my real-world projects.</p></div>
              <div><h4 className="font-bold text-xl mb-1">The Tech Stack</h4><p>I built this site using React, Tailwind CSS for styling, and Framer Motion for animations. It features a dark mode, a multi-page layout using React Router, and a functional contact form.</p></div>
              <div><h4 className="font-bold text-xl mb-1">The Outcome</h4><p>A polished, performant website that not only serves as my portfolio but also demonstrates my hands-on ability with modern front-end technologies.</p></div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Projects;