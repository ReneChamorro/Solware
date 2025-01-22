import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  items: {
    id: number;
    title: string;
    description: string;
    image: string;
    icon?: React.ReactNode;
  }[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const extendedItems = [
    items[items.length - 1],
    ...items,
    items[0]
  ];

  const resetTransition = (newIndex: number) => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'none';
    }
    setIsTransitioning(true);
    
    slideRef.current?.offsetHeight;
    
    setCurrentIndex(newIndex);
    
    requestAnimationFrame(() => {
      if (slideRef.current) {
        slideRef.current.style.transition = 'transform 275ms cubic-bezier(0.4, 0, 0.2, 1)';
      }
      setIsTransitioning(false);
    });
  };

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      resetTransition(items.length);
    } else if (currentIndex === items.length + 1) {
      resetTransition(1);
    } else {
      setIsTransitioning(false);
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouchActive(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchActive) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
      setIsTouchActive(false);
    }
  };

  const handleTouchEnd = () => {
    setIsTouchActive(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlay && !isHovered && !isTransitioning && !isTouchActive) {
      interval = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay, isHovered, isTransitioning, isTouchActive, autoPlayInterval]);

  const getTransform = () => {
    const translateValue = window.innerWidth < 640 
      ? -(currentIndex * 70) + 15 // Móvil: reducido de 80% a 70%
      : -(currentIndex * 30) + 35; // Desktop: reducido de 33.333% a 30%
    
    return {
      transform: `translateX(${translateValue}%)`,
      transition: isTransitioning ? 'transform 275ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
    };
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
    >
      <div className="overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={slideRef}
          className="flex"
          style={getTransform()}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[70%] sm:w-[30%] flex-shrink-0 px-2 sm:px-3 lg:px-4"
              style={{ 
                transform: `scale(${index === currentIndex ? 1 : 0.9})`,
                opacity: index === currentIndex ? 1 : 0.5,
                transition: 'all 275ms cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: index === currentIndex ? 10 : 0
              }}
              aria-hidden={index !== currentIndex}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg 
                transition-all duration-275 ease-out hover:shadow-xl
                transform hover:translate-y-[-2px]">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform 
                      duration-275 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.icon && (
                    <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                      <div className="bg-blue-600/90 dark:bg-blue-500/90 p-1.5 rounded-lg 
                        backdrop-blur-sm transition-transform duration-275 ease-out 
                        hover:scale-105">
                        {React.cloneElement(item.icon, {
                          className: 'h-4 w-4 sm:h-5 sm:w-5 text-white'
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 
                    transition-colors duration-275 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 
                    transition-colors duration-275 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full
          bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-700 
          transition-all duration-275 ease-out hover:scale-105 hover:shadow-xl
          transform active:scale-95 -translate-x-1/2 sm:translate-x-0"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 dark:text-gray-200" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full
          bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-700 
          transition-all duration-275 ease-out hover:scale-105 hover:shadow-xl
          transform active:scale-95 translate-x-1/2 sm:translate-x-0"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 dark:text-gray-200" />
      </button>

      <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => !isTransitioning && setCurrentIndex(index + 1)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-275 ease-out 
              transform hover:scale-110 ${
              index === currentIndex - 1
                ? 'bg-blue-600 dark:bg-blue-500 scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-400'
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
            aria-current={index === currentIndex - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;