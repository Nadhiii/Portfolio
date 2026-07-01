// src/pages/projects/NexusCaseStudy.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Wallet,
  Sparkles,
  FileText,
  Bike,
  Layers,
  Flame,
  Shield,
  Gauge,
  CheckCircle2
} from 'lucide-react';

const stack = ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Provider', 'go_router'];

const features = [
  {
    icon: Wallet,
    title: 'NBox',
    description: 'A Tinder style swipe interface for transactions detected by scanning SMS and Emails. Swipe right to approve, left to reject, no friction.'
  },
  {
    icon: Sparkles,
    title: 'Wallet',
    description: 'Track your Accounts, transactions made across all your accounts.'
  },
  {
    icon: Layers,
    title: 'Wealth',
    description: 'Track your Investments, Liabilities, Subscriptions. Set budgets & financial goals and track progress. '
  },
  {
    icon: Bike,
    title: 'Fuel Tracker',
    description: 'Fuel logs and mileage, log KMs ridden, amount spent for fuel for the bike tracked inside the same app as everything else.'
  }
];

const architecture = [
  {
    title: 'Flutter over React Native',
    description: 'Chosen deliberately, not by default. Dart compiles to native, and Skia and Impeller rendering handle the custom swipe UI and spring physics better than a bridge based framework would.'
  },
  {
    title: 'Firebase and Firestore',
    description: 'Auth, storage and the data layer. Data models were planned out as a full schema before writing screens, not improvised along the way.'
  },
  {
    title: 'Provider for state',
    description: 'Kept deliberately simple. context.select over context.watch to avoid unnecessary rebuilds across the app.'
  },
  {
    title: 'go_router for navigation',
    description: 'Declarative routing, set up early so the app structure did not have to be reworked later.'
  }
];

const challenges = [
  {
    title: 'UI jitter on swipe',
    fix: 'Root level setState was firing on every drag frame. Fixed by extracting the swipe logic into its own SwipeCardStack widget so the rest of the tree stops re-rendering.'
  },
  {
    title: 'Nex crashing on launch',
    fix: 'Traced to a missing provider initialization, plus a FlutterSecureStorage native crash on certain Android devices. Both fixed at the source rather than papered over.'
  },
  {
    title: 'Auth library migration',
    fix: 'Migrated google_sign_in to v7 and local_auth to v3 without breaking the existing login flow.'
  },
  {
    title: 'False negative storage errors',
    fix: 'Firebase Storage was returning 404s for files that existed. Diagnosed as a false negative and fixed rather than worked around.'
  },
  {
    title: 'Performance pass',
    fix: 'Cached visibleWidgets, switched to context.select where possible, and moved to the Impeller renderer for smoother animation.'
  }
];

const NexusCaseStudy = () => {
  return (
    <div className="min-h-screen bg-brand-bg">

      {/* Back nav */}
      <div className="px-4 md:px-8 pt-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-brand-text/50 hover:text-brand-orange transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <section className="px-4 md:px-8 pt-12 pb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-sm text-brand-gold tracking-widest uppercase">
            Personal Project
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text leading-tight">
            Nexus
          </h1>
          <p className="font-body text-lg text-brand-text/70 mt-6 max-w-2xl leading-relaxed">
            A finance app built because spreadsheets stopped working. It is not a portfolio piece
            dressed up as a product; it is a real tool used to manage real money, built the way
            an actual product should be.
          </p>

          <div className="flex flex-wrap gap-2 mt-8">
            {stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full font-mono text-xs text-brand-text/60 border border-brand-border bg-white/[0.02]"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Origin */}
      <section className="px-4 md:px-8 pb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 bg-white/[0.02] border border-brand-border"
        >
          <h2 className="font-heading text-2xl text-brand-text mb-4">Why it exists</h2>
          <p className="font-body text-brand-text/70 leading-relaxed">
            Personal finance management was an active, ongoing concern, not a hypothetical
            problem picked to fill a portfolio slot. Nexus started as a way to solve
            that, which is why it covers the unglamorous parts most finance apps skip: manual
            transaction review, and even tracking fuel and mileage for
            the motorcycle, all inside the same place.
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-8 pb-16 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-2xl text-brand-text mb-6"
        >
          What it does
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl p-6 bg-white/[0.02] border border-brand-border hover:border-brand-orange/30 transition-colors"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand-orange/10 text-brand-orange mb-4">
                <feature.icon size={20} />
              </div>
              <h3 className="font-heading text-lg text-brand-text mb-2">{feature.title}</h3>
              <p className="font-body text-sm text-brand-text/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="px-4 md:px-8 pb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Layers size={20} className="text-brand-orange" />
            <h2 className="font-heading text-2xl text-brand-text">How it is built</h2>
          </div>
          <div className="space-y-4">
            {architecture.map((item) => (
              <div key={item.title} className="flex gap-4 pb-4 border-b border-brand-border last:border-0">
                <div className="font-mono text-xs text-brand-text/30 pt-1 w-24 shrink-0">
                  {item.title.split(' ')[0]}
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-brand-text mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-brand-text/60 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Challenges, numbered since this is a real build sequence */}
      <section className="px-4 md:px-8 pb-16 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Gauge size={20} className="text-brand-orange" />
            <h2 className="font-heading text-2xl text-brand-text">Built the hard way</h2>
          </div>
          <p className="font-body text-sm text-brand-text/50 mb-8 max-w-xl">
            Real problems hit during development, in the order they were solved, not a highlight reel.
          </p>

          <div className="space-y-3">
            {challenges.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex gap-4 rounded-2xl p-5 bg-white/[0.02] border border-brand-border"
              >
                <span className="font-mono text-sm text-brand-orange shrink-0 pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-body text-sm font-semibold text-brand-text mb-1 flex items-center gap-2">
                    {item.title}
                    <CheckCircle2 size={14} className="text-brand-green" />
                  </h3>
                  <p className="font-body text-sm text-brand-text/60 leading-relaxed">{item.fix}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Closing */}
      <section className="px-4 md:px-8 pb-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-8 bg-brand-orange/5 border border-brand-orange/20 flex items-start gap-4"
        >
          <Shield size={22} className="text-brand-orange shrink-0 mt-1" />
          <p className="font-body text-sm text-brand-text/70 leading-relaxed">
            Nexus handles real financial data, so it is built and used privately rather than
            shipped as a public app. The engineering is the point of showing it, not a download link.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default NexusCaseStudy;