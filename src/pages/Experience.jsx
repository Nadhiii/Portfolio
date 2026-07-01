// src/components/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ChevronRight } from 'lucide-react';

const experience = [
  {
    company: "Cognizant Technology Solutions",
    role: "Subject Matter Expert (SME)",
    sub: "Measurement SME - Google LCS - Measurement Center of Excellence (MCoE)",
    date: "Oct 2025, Present",
    current: true,
    points: [
      "Promoted to SME from Senior Process Executive in October 2025",
      "Embedded as the measurement SME for enterprise clients, among them Nike, L'Oreal, Bajaj, Lodha and Cult.fit",
      "Work across measurement infrastructure end-to-end: GA4, GTM, Enhanced Conversions, Consent Mode v2, and Offline Conversion Tracking",
      "Mentored six mentees to date, supported new hires on the floor, and collaborate directly with Google teams"
    ]
  },
  {
    company: "Cognizant Technology Solutions",
    role: "Senior Process Executive",
    sub: "Google Technical Solutions Team",
    date: "May 2023, Oct 2025",
    current: false,
    points: [
      "Project transferred from Regalix to Cognizant in May 2023; continued managing and implementing Consent Mode and Enhanced Conversion tracking and troubleshooting across Google Ads, GA4 and GTM",
      "Moved into Google's LCS program in April 2024, taking on measurement work for larger enterprise clients"
    ]
  },
  {
    company: "Regalix India Pvt Ltd",
    role: "Implementation Consultant",
    date: "Jan 2023, May 2023",
    current: false,
    points: [
      "Advised clients on Consent Mode, Enhanced Conversion tracking, GA4 and GTM configuration to optimize campaign effectiveness"
    ]
  },
  {
    company: "Tesco Bengaluru",
    role: "Associate, CEC Operations",
    sub: "Remote Technical Support",
    date: "Jun 2022, Jan 2023",
    current: false,
    points: [
      "Provided remote technical support to store employees, resolving issues with product listings and point of sale systems"
    ]
  },
  {
    company: "Concentrix India Pvt Ltd",
    role: "Operations Representative",
    sub: "OnePlus TV Support",
    date: "Jan 2021, Jun 2022",
    current: false,
    points: [
      "Delivered phone based technical support for OnePlus TV products, troubleshooting issues and coordinating repairs"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 px-4 md:px-8 bg-brand-bg">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-brand-gold tracking-widest uppercase">
            Career
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text leading-tight">
            Work Experience
          </h2>
          <p className="font-body text-brand-text/60 mt-4 max-w-xl">
            Five years, four roles, and one steady climb toward measurement work.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-brand-border pl-8 space-y-10">
          {experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div
                className={
                  "absolute -left-[2.30rem] top-1 w-3 h-3 rounded-full border-2 " +
                  (job.current
                    ? "bg-brand-orange border-brand-orange"
                    : "bg-brand-surface border-brand-border")
                }
              />

              <div
                className={
                  "rounded-2xl p-6 border transition-colors " +
                  (job.current
                    ? "bg-brand-orange/5 border-brand-orange/30"
                    : "bg-white/[0.02] border-brand-border")
                }
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs text-brand-text/50">
                    {job.date}
                  </span>
                  {job.current && (
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange border border-brand-orange/30">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl md:text-2xl text-brand-text">
                  {job.role}
                </h3>

                <div className="flex items-center gap-2 mt-1 mb-1 text-brand-gold font-body text-sm font-medium">
                  <Building2 size={14} />
                  {job.company}
                </div>

                <p className="font-mono text-xs text-brand-text/40 mb-4">
                  {job.sub}
                </p>

                <ul className="space-y-2">
                  {job.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-2 font-body text-sm text-brand-text/70 leading-relaxed"
                    >
                      <ChevronRight size={14} className="text-brand-orange shrink-0 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;