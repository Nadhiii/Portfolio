// src/components/Projects.jsx
import React from 'react';
import FadeUp from "../components/FadeUp";

const projects = [
  {
    id: 'automation',
    index: '01',
    title: 'Team-Wide Automation',
    tag: 'Internal Tool',
    description:
      'A Google Apps Script system that eliminated 45+ minutes of manual data entry per day across 10+ teams built before I knew what "engineering" meant.',
    problem:
      'Team leads were manually copying data between sheets every morning. 30+ minutes of copy-paste, every single day, across every team.',
    solution:
      'Wrote a scheduled Apps Script that pulls, syncs, and formats the data automatically. Runs overnight. Nobody touches it.',
    metrics: [
      { value: '10+', label: 'Teams adopted' },
      { value: '45 min', label: 'Saved daily' },
      { value: '100%', label: 'Adoption rate' },
    ],
    stack: ['Apps Script', 'JavaScript', 'Sheets API'],
    accentVar: '--color-brand-text', // white-ish
    numberColor: 'text-brand-text',
  },
  {
    id: 'nexus',
    index: '02',
    title: 'Nexus',
    tag: 'Flutter · Firebase',
    description:
      'A personal finance app built in Flutter and Firebase because every app I tried either cost money, sold my data, or looked terrible.',
    problem:
      'Existing finance apps were too generic, too expensive, or too invasive. I needed something that tracked how I actually spend on fuel, EMIs, Groceries.',
    solution:
      'Built from scratch using Flutter with Provider state management and go_router. Firebase backend for auth and data sync. Custom UI with spring-physics animations, an EMI dot calendar, and a fuel log that tracks every fill-up on my motorcycle.',
    metrics: [
      { value: 'Daily', label: 'Personal use' },
      { value: 'Flutter', label: 'Framework' },
      { value: '0₹', label: 'Subscription cost' },
    ],
    stack: ['Flutter', 'Firebase', 'Dart', 'Provider', 'go_router'],
    accentVar: '--color-brand-orange',
    numberColor: 'text-brand-orange',
    link: { label: 'View Nexus', href: './nexus' },
  },
  {
    id: 'portfolio',
    index: '03',
    title: 'This Portfolio',
    tag: 'Vite · React · Framer Motion',
    description:
      'Built because every template I tried felt like someone else\'s portfolio. This one is mine.',
    problem:
      'Generic portfolio sites all look the same, same bento grid, same hero, same "I\'m a developer" headline. None of them say anything.',
    solution:
      'Rebuilt from scratch with Vite, React 19, Tailwind CSS, and Framer Motion. Brand token system, custom intro animation cycling through five languages, Matter.js physics pills in the skills card.',
    metrics: [
      { value: '5', label: 'Languages in intro' },
      { value: 'Matter.js', label: 'Physics sim' },
      { value: '0', label: 'Templates used' },
    ],
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Matter.js'],
    accentVar: '--color-brand-gold',
    numberColor: 'text-brand-gold',
  },
];

const ProjectCard = ({ project, index }) => (
  <FadeUp delay={index * 0.1}>
    <div className="group grid lg:grid-cols-12 gap-0 rounded-2xl bg-brand-surface border border-brand-border overflow-hidden hover:border-brand-orange/40 transition-colors duration-500">

      {/* Left: index, tag, metrics, stack */}
      <div className="lg:col-span-4 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-brand-border">
        <div>
          {/* Index + tag row */}
          <div className="flex items-center justify-between mb-8">
            <span className={'font-mono text-4xl font-bold leading-none ' + project.numberColor}>
              {project.index}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-muted font-body border border-brand-border rounded-full px-3 py-1">
              {project.tag}
            </span>
          </div>

          {/* Metrics */}
          <div className="space-y-4 mb-8">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between border-b border-brand-border pb-3">
                <span className="text-xs tracking-widest uppercase text-brand-muted">{m.label}</span>
                <span className={'font-mono text-sm font-bold ' + project.numberColor}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium rounded-lg bg-brand-bg border border-brand-border text-brand-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right: content */}
      <div className="lg:col-span-8 p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mb-4 group-hover:text-brand-orange transition-colors duration-300">
            {project.title}
          </h2>
          <p className="text-brand-muted text-base leading-relaxed mb-8 max-w-xl">
            {project.description}
          </p>

          {/* Problem / Solution */}
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="mt-2 w-px h-full min-h-[2rem] bg-brand-border flex-shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-1">Problem</p>
                <p className="text-sm text-brand-muted leading-relaxed">{project.problem}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className={'mt-2 w-px h-full min-h-[2rem] flex-shrink-0 ' + project.numberColor.replace('text', 'bg')} />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-1">What I built</p>
                <p className="text-sm text-brand-muted leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional link */}
        {project.link && (
          <div className="mt-8">
            <a
              href={project.link.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-border text-brand-muted text-sm font-medium hover:border-brand-orange hover:text-brand-orange transition-all duration-200 group/link"
            >
              {project.link.label}
              <span className="translate-x-0 group-hover/link:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
        )}
      </div>

    </div>
  </FadeUp>
);

const Projects = () => (
  <section id="projects" className="relative py-24 px-4 md:px-8">
    <div className="max-w-6xl mx-auto">

      {/* Section header */}
      <FadeUp>
        <div className="flex items-end justify-between mb-16 pb-6 border-b border-brand-border">
          <div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text leading-tight">
              Things I've Built
            </h2>
          </div>
          <span className="font-mono text-xs text-brand-muted hidden md:block">
            {String(projects.length).padStart(2, '0')} projects
          </span>
        </div>
      </FadeUp>

      {/* Project cards */}
      <div className="space-y-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Footer CTA */}
      <FadeUp delay={0.3}>
        <div className="mt-16 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-brand-muted text-sm leading-relaxed max-w-none sm:max-w-3xl lg:whitespace-nowrap">
            These are personal and internal builds. Client work lives under NDA, but I am happy to walk through my personal projects on a call.
          </p>
          <a
            href="mailto:mahanadhip@gmail.com"
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-brand-orange text-brand-bg font-semibold text-sm hover:brightness-110 active:scale-95 transition-all duration-200"
          >
            Let's Talk
          </a>
        </div>
      </FadeUp>

    </div>
  </section>
);

export default Projects;