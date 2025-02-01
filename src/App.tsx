import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WorkProcess from './components/WorkProcess';
import Automation from './components/Automation';
import ValuesMission from './components/ValuesMission';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  let scrollTimeout: NodeJS.Timeout;

  const handleScroll = useCallback(() => {
    // Skip if we're already in scrolling state
    if (!isScrolling) {
      document.documentElement.classList.add('scrolling');
      setIsScrolling(true);
    }

    // Clear any existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set new timeout
    scrollTimeout = setTimeout(() => {
      document.documentElement.classList.remove('scrolling');
      setIsScrolling(false);
    }, 150);
  }, [isScrolling]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Use requestAnimationFrame to throttle scroll events
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', scrollListener);
    };
  }, [handleScroll]);

  return (
    <>
      <Preloader />
      <div className={`min-h-screen bg-gray-50 dark:bg-dark transition-colors duration-300 ${
        isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
      }`}>
        <Header />
        <main>
          <Hero />
          <Services />
          <WorkProcess />
          <Automation />
          <ValuesMission />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}

export default App;