import { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RobotTraking from './RobotTraking';

const NotFound = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);

  useEffect(() => {
    // Crear partículas iniciales
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1
    }));
    setParticles(initialParticles);

    // Animación de partículas
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5
      })));
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `hsl(${particle.id * 25}, 70%, 60%)`,
            transform: `translateY(${particle.y > 100 ? -100 : 0}%)`
          }}
        />
      ))}
      
      <div className="max-w-md w-full text-center relative z-10">
        {/* Solwy Icon */}
        <div className="mb-4 sm:mb-6">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
            <RobotTraking className="w-full h-full" />
          </div>
        </div>

        {/* 404 Number */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            {t('404.title', 'Página no encontrada')}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            {t('404.button', 'Volver al inicio')}
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 text-sm sm:text-base"
          >
            {t('404.backButton', 'Volver atrás')}
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-4 sm:mt-6 lg:mt-8 opacity-20">
          <div className="flex justify-center space-x-1 sm:space-x-2">
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 sm:w-2 sm:h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NotFound;