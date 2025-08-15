// src/components/Metrics.jsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Target, Award } from 'lucide-react';

const metrics = [
  {
    icon: Clock,
    value: 30,
    suffix: 'min',
    label: 'Daily Time Saved',
    description: 'Per team lead with automation tool',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Team Members',
    description: 'Benefited from automation solution',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    icon: Target,
    value: 95,
    suffix: '%',
    label: 'Accuracy Rate',
    description: 'In Consent Mode (CoMo) Enhanced conversion tracking & troubleshooting implementations',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    icon: TrendingUp,
    value: 100,
    suffix: '%',
    label: 'Tool Adoption',
    description: 'Across the entire floor',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

const CountUpAnimation = ({ targetValue, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      setCount(Math.floor(targetValue * easeOut));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration, isVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('metrics');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const Metrics = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('metrics');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  return (
    <section id="metrics" className="py-20 lg:py-32 px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl mb-4">
            Impact by the{' '}
            <span className="bg-gradient-to-r from-primary-light to-accent-green-light dark:from-primary-dark dark:to-accent-green-dark bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <p className="text-xl text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
            Real results from projects that solve actual problems and create measurable value.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden group"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${metric.bgColor} rounded-2xl mb-6`}>
                  <metric.icon size={28} className={metric.color} />
                </div>

                <div className="mb-4">
                  <div className={`text-4xl lg:text-5xl font-bold ${metric.color} mb-2`}>
                    <CountUpAnimation 
                      targetValue={metric.value} 
                      suffix={metric.suffix}
                      duration={2000 + index * 200}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-text-light/60 dark:text-text-dark/60">
                    {metric.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-text-light dark:text-text-dark">
              Building Solutions That Scale
            </h3>
            <p className="text-text-light/70 dark:text-text-dark/70 leading-relaxed">
              These metrics represent real impact from identifying pain points and shipping solutions. 
              From saving 30 minutes daily per team lead with automation to achieving 95% accuracy in 
              Consent Mode (CoMo) Enhanced conversion tracking & troubleshooting implementations, I focus on building products that deliver measurable value.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Metrics;
