// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Headphones, TrendingUp, Lightbulb, Target, Code2, Monitor, Rocket } from 'lucide-react';

// --- Data for the Narrative Journey Timeline ---
const journeySteps = [
  {
    chapter: "Chapter 1",
    title: "Graduation",
    subtitle: "B.Com, Acharya Institute",
    story: "Graduated with a B.Com degree. Honestly? I was clueless. No clear direction, just going with the flow. I started working because that's what you do after graduation.",
    quote: "Fun fact: I had zero plans. But hey, improvisation is a skill too.",
    icon: GraduationCap,
    accent: "text-blue-500"
  },
  {
    chapter: "Chapter 2",
    title: "The Start",
    subtitle: "BPO & Customer Support",
    story: "Landed a tech support role for OnePlus. For the first time, I felt something click. I was working with technology, and I loved it. I didn't know exactly what 'more' looked like, but I knew I had to move toward it.",
    quote: "Tech support taught me one thing: people break things creatively.",
    icon: Headphones,
    accent: "text-purple-500"
  },
  {
    chapter: "Chapter 3",
    title: "The Shift",
    subtitle: "Digital Marketing & Analytics",
    story: "Moved to Regalix. Digital marketing meets technology: Google Ads, Analytics, Tag Manager. I wasn't just learning. I was genuinely liking playing with data.",
    quote: "Turns out, I like playing with data more than I thought.",
    icon: TrendingUp,
    accent: "text-orange-500"
  },
  {
    chapter: "Chapter 4",
    title: "The 'Aha!' Moment",
    subtitle: "Automation Tool",
    story: "I automated a manual task that 100+ people were doing daily. When it finally worked, something clicked. I wasn't just solving a problem. I'd discovered what I actually wanted to do: build things.",
    quote: "Why work harder when you can code smarter?",
    icon: Lightbulb,
    accent: "text-yellow-500"
  },
  {
    chapter: "Chapter 5",
    title: "This Portfolio",
    subtitle: "From Idea to Reality",
    story: "I wanted to showcase my resume as a website. I learned React and Tailwind CSS from scratch to build this. Every animation, every transition: built by me.",
    quote: "Templates were always there. I wanted to build it from scratch.",
    icon: Monitor,
    accent: "text-cyan-500"
  },
  {
    chapter: "Chapter 6",
    title: "Building Pluto",
    subtitle: "Full-Stack Finance App",
    story: "I built Pluto, a personal finance app using Flutter & Firebase. UI design, backend logic, databases... I figured it out. That's when it hit me: I could actually build real products.",
    quote: "I Googled my way through this. No shame.",
    icon: Code2,
    accent: "text-indigo-500"
  },
  {
    chapter: "Chapter 7",
    title: "The Goal",
    subtitle: "Product Management",
    story: "I know what users need, what data tells us, and what it takes to actually ship a product. I don't just want to manage products. I want to build ones that actually matter.",
    quote: "I've done the grunt work. Now let me call the shots.",
    icon: Target,
    accent: "text-emerald-500"
  },
  {
    chapter: "To Be Continued...",
    title: "Next Chapter",
    subtitle: "The journey is far from over.",
    story: "Suit up, because the journey is far from over. I've got some serious plays lined up. All I know is it's gonna be legendary, so let's wait for it.",
    quote: "I'm like a shark. If I stop moving forward, I die.",
    icon: Rocket,
    accent: "text-rose-500"
  }
];

const About = () => {
  return (
    <section id="about" className="relative w-full pt-20 pb-24 px-4 md:px-8">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-4">
            <span className="text-text-light dark:text-text-dark">My </span>
            <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent">Journey</span>
          </h2>
        </motion.div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {journeySteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="h-full"
            >
              {/* GLASS CARD */}
              <motion.div
                className="h-full flex flex-col p-6 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                {/* Header: Icon + Number */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 ${step.accent}`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 opacity-60">
                    0{index + 1}
                  </span>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium text-primary-light dark:text-primary-dark opacity-90">
                    {step.subtitle}
                  </p>
                </div>

                {/* Story */}
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                  {step.story}
                </p>

                {/* Quote Footer */}
                <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <p className="text-xs italic text-gray-500 dark:text-gray-400">
                    "{step.quote}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default About;