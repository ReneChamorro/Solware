import React, { useState } from 'react';
import { Cuboid as Cube, ArrowLeft, ChevronRight } from 'lucide-react';

const FlipCard3D: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective-1000 w-full max-w-2xl mx-auto h-[600px]">
      <div
        className={`relative w-full h-full transition-transform duration-600 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Frente de la card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="h-full bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&q=80&w=800"
                alt="Digitalización 3D"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="bg-blue-600/90 p-2 rounded-lg backdrop-blur-sm">
                  <Cube className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Digitalización 3D y Capturas 360°
              </h3>
              <p className="text-gray-600 mb-6">
                Creamos experiencias inmersivas y visualizaciones interactivas de alta calidad.
              </p>
              
              <button
                onClick={handleFlip}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 
                  text-white rounded-full hover:bg-blue-700 transition-colors duration-300
                  group/btn"
              >
                Saber más
                <ChevronRight className="ml-2 h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Reverso de la card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="h-full bg-white rounded-2xl shadow-lg p-6 overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Detalles del Servicio
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">
                  Modelado 3D Profesional
                </h4>
                <p className="text-gray-600">
                  Creación de modelos tridimensionales detallados para productos y espacios, 
                  utilizando tecnología avanzada para una representación precisa.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">
                  Tours Virtuales 360°
                </h4>
                <p className="text-gray-600">
                  Experiencias interactivas que permiten explorar espacios desde cualquier lugar, 
                  ideales para inmobiliarias y negocios.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">
                  Visualización Arquitectónica
                </h4>
                <p className="text-gray-600">
                  Transformación de planos en visualizaciones 3D impactantes, facilitando 
                  la comprensión del diseño y la funcionalidad.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">
                  Renderizado en 4K
                </h4>
                <p className="text-gray-600">
                  Imágenes de alta resolución que destacan cada detalle, perfectas para 
                  presentaciones y marketing.
                </p>
              </div>
            </div>

            <button
              onClick={handleFlip}
              className="mt-6 inline-flex items-center justify-center px-6 py-3 
                border-2 border-blue-600 text-blue-600 rounded-full 
                hover:bg-blue-50 transition-colors duration-300 group/btn"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transform group-hover/btn:-translate-x-1 transition-transform" />
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard3D;