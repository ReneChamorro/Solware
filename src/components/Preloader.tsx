import React, { memo, useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';

const Preloader = memo(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 3000);

    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500
        ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{
        background: 'linear-gradient(135deg, #2B003B 0%, #00184E 100%)'
      }}
    >
      <div className="relative">
        {/* Logo Container */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          {/* Rotating Circle */}
          <div className="absolute inset-0 animate-spin-slow">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="70 180"
                className="transform origin-center"
              />
            </svg>
          </div>

          {/* Pulsing Logo */}
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <Code2 className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-max">
          <div className="flex items-center space-x-1">
            {['S', 'o', 'l', 'w', 'a', 'r', 'e'].map((letter, index) => (
              <span
                key={index}
                className="text-white text-lg sm:text-xl font-medium animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-48 sm:w-56">
          <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-progress" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Preloader;