import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'scale';
  duration?: number;
  distance?: string;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const {
      threshold = 0.1,
      rootMargin = '-50px',
      once = true,
      delay = 0,
      variant = 'fade-up',
      duration = 600,
      distance = '30px'
    } = options;

    const element = elementRef.current;
    if (!element) return;

    // Configurar estilos iniciales
    element.style.visibility = 'hidden';
    element.style.opacity = '0';
    element.style.willChange = 'opacity, transform';
    element.style.transition = `
      opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1),
      transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)
    `;

    if (delay) {
      element.style.transitionDelay = `${delay}ms`;
    }

    // Aplicar transformación inicial según la variante
    switch (variant) {
      case 'fade-up':
        element.style.transform = `translateY(${distance})`;
        break;
      case 'fade-down':
        element.style.transform = `translateY(-${distance})`;
        break;
      case 'fade-left':
        element.style.transform = `translateX(${distance})`;
        break;
      case 'fade-right':
        element.style.transform = `translateX(-${distance})`;
        break;
      case 'zoom':
        element.style.transform = 'scale(0.95)';
        break;
      case 'scale':
        element.style.transform = 'scale(0.9)';
        break;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              element.style.visibility = 'visible';
              element.style.opacity = '1';
              element.style.transform = 'none';
            });
            
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            requestAnimationFrame(() => {
              element.style.visibility = 'hidden';
              element.style.opacity = '0';
              switch (variant) {
                case 'fade-up':
                  element.style.transform = `translateY(${distance})`;
                  break;
                case 'fade-down':
                  element.style.transform = `translateY(-${distance})`;
                  break;
                case 'fade-left':
                  element.style.transform = `translateX(${distance})`;
                  break;
                case 'fade-right':
                  element.style.transform = `translateX(-${distance})`;
                  break;
                case 'zoom':
                  element.style.transform = 'scale(0.95)';
                  break;
                case 'scale':
                  element.style.transform = 'scale(0.9)';
                  break;
              }
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