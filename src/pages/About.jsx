// src/pages/About.jsx
// CHANGES:
// - Removed Barney Stinson references (Suit up, legen-dary, shark quote)
// - Reduced from 8 cards to 6: removed "This Portfolio" card (self-referential)
//   and merged "Next Chapter" into a sign-off line
// - Updated colors to brand tokens
// - Wrapped cards in FadeUp with stagger
// - Kept the journey story structure; it works well
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Headphones, TrendingUp, Lightbulb, Code2, Target } from 'lucide-react';
import FadeUp from '../components/FadeUp';
import RevealText from '../components/RevealText';
import SectionMarker from '../components/SectionMarker';
const journeySteps = [
  {
    chapter: '01',
    title: 'Graduation',
    subtitle: 'B.Com, Acharya Institute',
    story: 'Graduated with a B.Com. Honestly, I had no clear direction and started working because that is what you do.',
    quote: 'Had zero plans. Improvisation is a skill too.',
    icon: GraduationCap,
    accent: '#4C6EF5',
  },
  {
    chapter: '02',
    title: 'The Start',
    subtitle: 'Tech Support, OnePlus',

    story: 'First real job: tech support. People break things, I helped fix them. I did not love it, but working with technology felt natural in a way I had not expected.',
    quote: 'Tech support taught me that people break things creatively.',
    icon: Headphones,
    accent: '#8B5CF6',
  },
  {
    chapter: '03',
    title: 'The Shift',
    subtitle: 'Digital Marketing & Analytics, Regalix',
    story: 'Joined Regalix supporting Google Ads clients. Small businesses, real problems. For the first time I was inside the marketing world: measurement, data, and why a number moves. I had no idea this world existed, and I genuinely liked it.',
    quote: 'I did not know what marketing data was. Then I could not stop thinking about it.',
    icon: TrendingUp,
    accent: '#E8732A',
  },
  {
    chapter: '04',
    title: "The 'Aha!' Moment",
    subtitle: 'Automation, Cognizant',
    story: 'Every morning: open the sheet, filter by date and team, copy, paste, sort, color. Manual. Repetitive. I automated it with Apps Script. It was the first thing I ever built from scratch, and something clicked. I could solve problems by building things.',
    quote: 'Why do it manually when you can build something that does it for you?',
    icon: Lightbulb,
    accent: '#C9A84C',
  },
  {
    chapter: '05',
    title: 'Building Nexus',
    subtitle: 'Flutter Finance App',
    story: 'Built Nexus, a personal finance app in Flutter. Income tracking, budgets, goals, and even a garage section for my motorcycle. Figured out UI, Firebase, and databases. Still building it. It confirmed what I suspected: I like making things.',
    quote: 'I Googled my way through this. No shame.',
    icon: Code2,
    accent: '#1A6B3A',
  },
  {
    chapter: '06',
    title: 'The Work, Now',
    subtitle: 'MarTech SME, Cognizant LCS',
    story: 'Enterprise Google Ads clients. Titanium and Platinum tier. GTM, GA4, Enhanced Conversions, Consent Mode. Page views to full ecommerce tracking. Audits, troubleshooting, and implementations. The learning curve never flattened, and that is why I am still here.',
    quote: 'If the tracking is not right, the ROI is not real.',
    icon: Target,
    accent: '#E8732A',
  },
];
const About = () => (
  <section id="about" className="relative w-full pt-8 pb-24 px-4 md:px-8">
    <SectionMarker label="A B O U T" />
    <FadeUp>
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text mb-4">
          The Journey
        </h2>
        <RevealText
          text="Not a straight line. More like a river, finding its way around every obstacle."

          className="text-brand-muted text-lg"
        />
      </div>
    </FadeUp>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {journeySteps.map((step, index) => {
        const Icon = step.icon;
        return (
          <FadeUp key={index} delay={index * 0.08}>
            <div className="h-full flex flex-col p-6 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-orange/30 transition-colors duration-300 group">
              <div className="flex justify-between items-start mb-5">
                <div className="p-2.5 rounded-xl bg-brand-bg border border-brand-border"
                  style={{ color: step.accent }}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-mono text-brand-muted">{step.chapter}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-brand-text mb-1">{step.title}</h3>

              <p className="text-xs text-brand-orange mb-4 font-medium">{step.subtitle}</p>
              <p className="text-sm text-brand-muted leading-relaxed flex-1">{step.story}</p>
              <div className="pt-4 mt-4 border-t border-brand-border">
                <p className="text-xs italic text-brand-muted opacity-70">"{step.quote}"</p>
              </div>
            </div>
          </FadeUp>
        );
      })}
    </div>
  </section>
);
export default About;