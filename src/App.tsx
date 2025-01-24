import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Manejador del evento scroll
    const handleScroll = () => {
      if (!isScrolling) {
        document.documentElement.classList.add('scrolling');
        setIsScrolling(true);
      }

      // Limpiar el timeout anterior
      clearTimeout(scrollTimeout);

      // Establecer nuevo timeout
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('scrolling');
        setIsScrolling(false);
      }, 150); // Duración después de que el usuario deja de hacer scroll
    };

    // Agregar event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

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