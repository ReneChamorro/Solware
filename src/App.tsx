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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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