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
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  // Create extended items array with cloned items for infinite effect
  const extendedItems = [
    items[items.length - 1], // Clone last item to start
    ...items,
    items[0] // Clone first item to end
  ];

  const resetTransition = (newIndex: number) => {
    // Disable transition temporarily
    if (slideRef.current) {
      slideRef.current.style.transition = 'none';
    }
    setIsTransitioning(true);
    
    // Force a reflow to ensure the transition is disabled
    slideRef.current?.offsetHeight;
    
    // Set new index
    setCurrentIndex(newIndex);
    
    // Re-enable transition after a short delay
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

  const handleDotClick = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index + 1);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlay && !isHovered && !isTransitioning) {
      interval = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay, isHovered, isTransitioning, autoPlayInterval]);

  const getTransform = () => {
    const translateValue = -currentIndex * 100;
    return {
      transform: `translateX(${translateValue}%)`,
      transition: isTransitioning ? 'transform 275ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
    };
  };

  return (
    <div 
      className="relative max-w-3xl mx-auto px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
    >
      <div className="overflow-hidden">
        <div 
          ref={slideRef}
          className="flex"
          style={getTransform()}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`w-full flex-shrink-0 px-4 transition-all duration-275 ease-out
                ${index === currentIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-40'}`}
              aria-hidden={index !== currentIndex}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg 
                transition-all duration-275 ease-out hover:shadow-xl max-w-sm mx-auto
                transform hover:translate-y-[-2px]">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform 
                      duration-275 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.icon && (
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-blue-600/90 dark:bg-blue-500/90 p-1.5 rounded-lg 
                        backdrop-blur-sm transition-transform duration-275 ease-out 
                        hover:scale-105">
                        {React.cloneElement(item.icon, {
                          className: 'h-4 w-4 text-white'
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 
                    transition-colors duration-275">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 
                    transition-colors duration-275">
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
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full
          bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-700 
          transition-all duration-275 ease-out hover:scale-105 hover:shadow-xl
          transform active:scale-95"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full
          bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-700 
          transition-all duration-275 ease-out hover:scale-105 hover:shadow-xl
          transform active:scale-95"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      </button>

      <div className="flex justify-center items-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
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