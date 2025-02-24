import React, { useEffect, useRef } from "react";
import './App.css';

const App = () => {
  const lastSectionRef = useRef("");
  const scrollTimeoutRef = useRef(null);
  const initialLoadTimeoutRef = useRef(null);

  // Función auxiliar para scroll consistente entre navegadores
  const scrollToElement = (element) => {
    if (element) {
      try {
        // Intentar con la configuración moderna
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
      } catch (error) {
        // Fallback para navegadores más antiguos
        element.scrollIntoView(true);
      }
    }
  };

  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        const sections = document.querySelectorAll("section");
        let currentSection = "";
        let closestDistance = Infinity;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distanceFromCenter = Math.abs(rect.top - window.innerHeight / 2);

          if (distanceFromCenter < closestDistance && rect.top >= 0) {
            closestDistance = distanceFromCenter;
            currentSection = section.id;
          }
        });

        // Solo actualizamos la referencia interna, sin modificar la URL
        if (currentSection && lastSectionRef.current !== currentSection) {
          lastSectionRef.current = currentSection;
        }
      });
    }, 50);
  };

  const handleNavigation = (id) => {
    const section = document.getElementById(id);
    if (section) {
      scrollToElement(section);
      lastSectionRef.current = id;
    }
  };

  const handleInitialLoad = () => {
    // Guardamos la referencia del timeout inicial
    initialLoadTimeoutRef.current = setTimeout(() => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          scrollToElement(section);
          lastSectionRef.current = hash;
        }
      }
    }, 100);
  };

  useEffect(() => {
    handleInitialLoad();
    window.addEventListener('scroll', handleScroll);
    
    // Limpieza mejorada de todos los timeouts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      // Limpiar timeout del scroll
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
      
      // Limpiar timeout de la carga inicial
      if (initialLoadTimeoutRef.current) {
        clearTimeout(initialLoadTimeoutRef.current);
        initialLoadTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div className="app">
      <nav>
        <button onClick={() => handleNavigation('servicios')}>Servicios</button>
        <button onClick={() => handleNavigation('mision')}>Misión</button>
        <button onClick={() => handleNavigation('vision')}>Visión</button>
        <button onClick={() => handleNavigation('valores')}>Valores</button>
        <button onClick={() => handleNavigation('contacto')}>Contacto</button>
      </nav>
      <main>
        <section id="servicios">
          <h2>Servicios</h2>
          <p>Descripción breve de los servicios ofrecidos...</p>
        </section>
        <section id="mision">
          <h2>Misión</h2>
          <p>Descripción de la misión...</p>
        </section>
        <section id="vision">
          <h2>Visión</h2>
          <p>Descripción de la visión...</p>
        </section>
        <section id="valores">
          <h2>Valores</h2>
          <p>Descripción de los valores...</p>
        </section>
        <section id="contacto">
          <h2>Contacto</h2>
          <p>Información de contacto...</p>
        </section>
      </main>
    </div>
  );
};

export default App; 