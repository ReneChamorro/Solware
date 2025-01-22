import React from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  details: {
    title: string;
    description: string;
  }[];
  isFlipped: boolean;
  onFlip: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  image,
  details,
  isFlipped,
  onFlip
}) => {
  return (
    <div className="perspective-1000 w-full h-[500px]">
      <div
        className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Frente de la card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group 
            hover:shadow-xl transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="bg-blue-600/90 dark:bg-blue-500/90 p-2 rounded-lg backdrop-blur-sm">
                  {icon}
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                {description}
              </p>
              
              <button
                onClick={onFlip}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium 
                  hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/btn"
              >
                Saber más
                <ChevronRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Reverso de la card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Detalles del Servicio
            </h3>

            <div className="space-y-4">
              {details.map((detail, index) => (
                <div key={index}>
                  <h4 className="text-base font-semibold text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-300">
                    {detail.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={onFlip}
              className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 font-medium 
                hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/btn"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transform group-hover/btn:-translate-x-1 transition-transform" />
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;