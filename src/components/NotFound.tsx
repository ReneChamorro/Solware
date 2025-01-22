import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent 
              text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 
              transition-colors duration-300 w-full sm:w-auto"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;