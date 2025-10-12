// src/components/About.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Headphones, TrendingUp, Lightbulb, Target, Code2, Monitor, Rocket } from 'lucide-react';

// --- Data for the Narrative Journey Timeline ---
const journeySteps = [
  {
    chapter: "Chapter 1",
    title: "Graduation",
    subtitle: "B.Com, Acharya Institute",
    story: "Graduated with a B.Com degree from Acharya Institute of Graduate Studies. Honestly? I was clueless—no clear direction, no grand dreams, just going with the flow. I don't think anyone expected much from me, including myself. So I started working because, well, that's what you do after graduation, right?",
    quote: "Fun fact: I had zero plans. But hey, improvisation is a skill too.",
    icon: GraduationCap,
    color: "from-blue-400/80 to-cyan-400/80",
    bgLight: "bg-blue-50",
    bgDark: "bg-blue-900/20"
  },
  {
    chapter: "Chapter 2",
    title: "The Start",
    subtitle: "BPO & Customer Support",
    story: "I landed a role providing tech support for OnePlus TVs and mobiles. For the first time, I felt something click—I was working with technology, and I loved it. Something always drew me to tech, and here I was, immersed in it. I learned a lot, but soon I wanted more. I didn't know exactly what 'more' looked like, but I knew I had to move toward... something.",
    quote: "Tech support taught me one thing: people break things creatively.",
    icon: Headphones,
    color: "from-purple-400/80 to-pink-400/80",
    bgLight: "bg-purple-50",
    bgDark: "bg-purple-900/20"
  },
  {
    chapter: "Chapter 3",
    title: "The Shift",
    subtitle: "Digital Marketing & Analytics",
    story: "The 'more' I was searching for? Regalix had it. Digital marketing meets technology—Google Ads, Analytics, Tag Manager, the whole suite. I assisted clients with implementing tracking, troubleshooting issues, answering queries about conversion tracking, event tracking, Consent Mode (CoMo), and more. For the first time, I wasn't just learning—I was genuinely liking what I did.",
    quote: "Turns out, I like playing with data more than I thought. Who knew?",
    icon: TrendingUp,
    color: "from-amber-400/80 to-orange-400/80",
    bgLight: "bg-amber-50",
    bgDark: "bg-amber-900/20"
  },
  {
    chapter: "Chapter 4",
    title: "The 'Aha!' Moment",
    subtitle: "Automation Tool",
    story: "I was assigned a manual task—one person from each team had been doing it for years. After a week of repetition, I thought, 'There has to be a better way... maybe I can automate this?' I had no idea how, but I fiddled around for months. When it finally worked, something clicked. I wasn't just solving a problem—I'd discovered what I actually wanted to do: build things.",
    quote: "Why work harder when you can code smarter? Lazy genius mode: activated.",
    icon: Lightbulb,
    color: "from-rose-400/80 to-pink-400/80",
    bgLight: "bg-rose-50",
    bgDark: "bg-rose-900/20"
  },
  {
    chapter: "Chapter 5",
    title: "This Portfolio",
    subtitle: "From Idea to Reality",
    story: "I always wanted to showcase my resume as a website, but didn't know how. When I shared the idea, someone asked, 'How will you host it?' That stopped me. But not for long. I started learning coding basics, built practice websites with HTML and CSS, experimented constantly, and eventually leveled up to React and Tailwind CSS. Every animation, every transition—built by me (with help from my dear AI friends). I wanted to prove, mostly to myself, that I could create something polished. And here you are, reading it. (You are, right?!)",
    quote: "Templates were always there. I wanted to build it from scratch. Flexing? Maybe.",
    icon: Monitor,
    color: "from-cyan-400/80 to-teal-400/80",
    bgLight: "bg-cyan-50",
    bgDark: "bg-cyan-900/20"
  },
  {
    chapter: "Chapter 6",
    title: "Building Pluto",
    subtitle: "Full-Stack Finance App",
    story: "Once I got that first taste of building, I couldn't stop. I wanted to create something bigger. So I built Pluto—a personal finance app. UI design, backend logic, databases, deployment... I did it all. Did I know what I was doing at first? Not really. But I figured it out. That's when it hit me: I could actually build real products.",
    quote: "I Googled my way through this. No shame. That's how we all learn.",
    icon: Code2,
    color: "from-indigo-400/80 to-blue-400/80",
    bgLight: "bg-indigo-50",
    bgDark: "bg-indigo-900/20"
  },
  {
    chapter: "Chapter 7",
    title: "The Goal",
    subtitle: "Product Management",
    story: "So where does all this lead? Product Management. I've talked to customers, analyzed data, and built things from scratch. I know what users need, what data tells us, and what it takes to actually ship a product. I don't just want to manage products—I want to build ones that actually matter.",
    quote: "I've done the grunt work. Now let me call the shots. Fair deal?",
    icon: Target,
    color: "from-green-400/80 to-emerald-400/80",
    bgLight: "bg-green-50",
    bgDark: "bg-green-900/20"
  },
  {
    chapter: "To Be Continued...",
    title: "To Be Continued...",
    subtitle: "The journey is far from over.",
    story: "Suit up, because the journey is far from over. Trust me, I've got some serious plays lined up for the next chapter. Well... I think I do. Spoiler alert: it's gonna be legen—wait for it—dary. Legendary!",
    quote: "I'm like a shark—if I stop moving forward, I die... or something like that.",
    icon: Rocket,
    color: "from-purple-400/80 to-indigo-400/80",
    bgLight: "bg-purple-50",
    bgDark: "bg-purple-900/20"
  }
];

const About = () => {
  // Rotation angles for tilted card effect
  const rotations = [-2, 1.5, -1.5, 2]; // Top row rotations
  const hoverRotations = [-4, 3, -3, 4]; // Enhanced on hover
  const rotationsBottom = [2, -1, 1.5, -2]; // Bottom row rotations
  const hoverRotationsBottom = [4, -2, 3, -4]; // Enhanced on hover

  return (
    <section id="about" className="w-full pt-24 pb-20 lg:pt-32 lg:pb-24 px-8">
      
      {/* Section Header */}
      <div className="text-center mb-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl lg:text-5xl mb-4">
            <span className="text-text-light dark:text-text-dark">My </span>
            <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent">Journey</span>
          </h2>
        </motion.div>
      </div>

      {/* Journey Cards Container with SVG Path */}
      <div className="max-w-7xl mx-auto relative">
        {/* SVG Journey Line */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Starting dot */}
          <motion.circle 
            cx="125" 
            cy="300" 
            r="10" 
            fill="#4C6EF5"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          {/* Curved journey path */}
          <motion.path 
            d="M 125 300 L 875 300 C 875 425, 125 425, 125 550 L 875 550"
            stroke="#4C6EF5"
            strokeWidth="4"
            fill="none"
            strokeDasharray="15 8"
            strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut",
              delay: 0.5
            }}
            viewport={{ once: true }}
          />
        </svg>

        {/* Top Row - Cards 1-4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24 relative" style={{ zIndex: 1 }}>
          {journeySteps.slice(0, 4).map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-5 pb-16 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 relative"
                  style={{ rotate: rotations[index] }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: hoverRotations[index],
                    zIndex: 20,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Header with gradient and icon */}
                  <div className={`bg-gradient-to-br ${step.color} p-8 mb-4 rounded-xl relative overflow-hidden`}>
                    {/* Icon in glassmorphic circle */}
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg border border-white/40">
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    
                    {/* Title and subtitle */}
                    <div className="w-full flex flex-col items-center justify-center">
                        <h3 className="font-heading text-xl text-white text-center mb-2 drop-shadow-lg">{step.title}</h3>
                        <p className="text-sm text-white/90 text-center font-body font-medium">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Story and quote */}
                  <div className="space-y-4 px-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-body">{step.story}</p>
                      <p className="text-sm italic text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-600 pt-3 font-body">"{step.quote}"</p>
                  </div>

                  {/* Chapter badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-xs font-bold text-gray-800 dark:text-gray-200 shadow-lg border border-gray-300/50 dark:border-gray-700/50 font-body">
                    {index + 1}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Row - Cards 5-8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative" style={{ zIndex: 1 }}>
          {journeySteps.slice(4, 8).map((step, index) => {
            const Icon = step.icon;
            const actualIndex = index + 4;
            return (
              <motion.div
                key={actualIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-5 pb-16 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 relative"
                  style={{ rotate: rotationsBottom[index] }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: hoverRotationsBottom[index],
                    zIndex: 20,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Header with gradient and icon */}
                  <div className={`bg-gradient-to-br ${step.color} p-10 mb-4 rounded-xl relative overflow-hidden`}>
                    {/* Icon in glassmorphic circle */}
                    <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg border border-white/40">
                      <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    
                    {/* Title and subtitle */}
                    <div className="w-full flex flex-col items-center justify-center">
                        <h3 className="font-heading text-xl text-white text-center mb-2 drop-shadow-lg">{step.title}</h3>
                        <p className="text-sm text-white/90 text-center font-body font-medium">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Story and quote */}
                  <div className="space-y-3 px-2">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-body">{step.story}</p>
                      <p className="text-sm italic text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-600 pt-3 font-body">"{step.quote}"</p>
                  </div>

                  {/* Chapter badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center text-xs font-bold text-gray-800 dark:text-gray-200 shadow-lg border border-gray-300/50 dark:border-gray-700/50 font-body">
                    {actualIndex + 1}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default About;