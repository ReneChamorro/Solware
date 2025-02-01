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
      rootMargin = '-5%',
      once = true,
      delay = 0,
      variant = 'fade-up',
      duration = 600,
      distance = '20px'
    } = options;

    const element = elementRef.current;
    if (!element) return;

    // Use transform3d for better performance
    element.style.cssText = `
      visibility: hidden;
      opacity: 0;
      will-change: transform, opacity;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
      transition: opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1),
                 transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)
                 ${delay ? `, ${delay}ms` : ''};
    `;

    // Apply initial transform with hardware acceleration
    const initialTransform = (() => {
      switch (variant) {
        case 'fade-up': return `translate3d(0, ${distance}, 0)`;
        case 'fade-down': return `translate3d(0, -${distance}, 0)`;
        case 'fade-left': return `translate3d(${distance}, 0, 0)`;
        case 'fade-right': return `translate3d(-${distance}, 0, 0)`;
        case 'zoom': return 'scale3d(0.98, 0.98, 1)';
        case 'scale': return 'scale3d(0.95, 0.95, 1)';
        default: return 'translate3d(0, 0, 0)';
      }
    })();
    
    element.style.transform = initialTransform;

    // Use IntersectionObserver with a lower update threshold
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              element.style.visibility = 'visible';
              element.style.opacity = '1';
              element.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
              
              if (once) {
                observer.unobserve(entry.target);
              }
            });
          }
        });
      },
      { threshold, rootMargin, root: null }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return elementRef;
};