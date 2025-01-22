import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale';
  duration?: number;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const {
      threshold = 0.1,
      rootMargin = '0px',
      once = true,
      delay = 0,
      variant = 'fade-up',
      duration = 600
    } = options;

    const element = elementRef.current;
    if (!element) return;

    // Asegurarse de que el elemento tenga las clases necesarias desde el inicio
    element.classList.add('reveal');
    if (variant) {
      element.classList.add(`reveal-${variant}`);
    }

    // Aplicar estilos de transición
    element.style.transitionDuration = `${duration}ms`;
    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('reveal-visible');
            });
            
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            requestAnimationFrame(() => {
              entry.target.classList.remove('reveal-visible');
            });
          }
        });
      },
      { 
        threshold, 
        rootMargin,
        root: null 
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return elementRef;
};