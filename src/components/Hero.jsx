// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section id="hero" className="max-w-3xl mx-auto py-20 lg:py-32 text-center">
      <p className="font-bold text-primary-light dark:text-primary-dark">
        ASPRING PRODUCT MANAGER | BUILDER BY NATURE
      </p>
      <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mt-4">
        A Builder Who Turns Problems into Products
      </h1>
      <p className="mt-6 text-lg text-text-light/80 dark:text-text-dark/80">
        A hands-on professional transitioning into product, backed by practical experience in building apps, automating workflows, and a passion for creating intuitive, user-centric solutions.
      </p>
    </section>
  );
};

export default Hero;