// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

const HomePage = () => {
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    // Set the current section based on the pathname
    const path = location.pathname;
    
    if (path === '/projects') {
      setCurrentSection('projects');
      trackPageView('Projects Section', 'projects');
    } else if (path === '/skills') {
      setCurrentSection('skills');
      trackPageView('Skills Section', 'skills');
    } else if (path === '/contact') {
      setCurrentSection('contact');
      trackPageView('Contact Section', 'contact');
    } else {
      setCurrentSection('home');
      trackPageView('Home Page', 'home');
    }
  }, [location.pathname]);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero />
            <About />
          </>
        );
    }
  };

  return (
    <>
      {renderCurrentSection()}
    </>
  );
};

export default HomePage;