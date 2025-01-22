import React, { useState } from 'react';
import { Target, Route, Lightbulb, Cog, ClipboardList, X } from 'lucide-react';

const steps = [
  {
    number: "1",
    title: "Establecer metas claras",
    icon: <Target className="h-6 w-6" />,
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    description: "Definimos objetivos específicos, medibles y alcanzables para tu transformación digital.",
    details: [
      "Análisis detallado de la situación actual",
      "Identificación de áreas de mejora",
      "Establecimiento de KPIs",
      "Definición de plazos realistas",
      "Alineación con objetivos empresariales"
    ]
  },
  {
    number: "2",
    title: "Crear plan de acción",
    icon: <Route className="h-6 w-6" />,
    bgColor: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
    description: "Desarrollamos una estrategia detallada con pasos concretos para alcanzar los objetivos.",
    details: [
      "Mapeo de procesos actuales",
      "Diseño de flujos de trabajo optimizados",
      "Selección de herramientas y tecnologías",
      "Asignación de recursos y responsabilidades",
      "Establecimiento de hitos y checkpoints"
    ]
  },
  {
    number: "3",
    title: "Desarrollar habilidades",
    icon: <Lightbulb className="h-6 w-6" />,
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    description: "Capacitamos a tu equipo en las nuevas tecnologías y metodologías.",
    details: [
      "Programas de capacitación personalizados",
      "Talleres prácticos y hands-on",
      "Documentación y recursos de aprendizaje",
      "Mentorías y soporte continuo",
      "Evaluación de competencias adquiridas"
    ]
  },
  {
    number: "4",
    title: "Implementar soluciones",
    icon: <Cog className="h-6 w-6" />,
    bgColor: "bg-pink-100 dark:bg-pink-900/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    description: "Ponemos en marcha las soluciones diseñadas de manera gradual y controlada.",
    details: [
      "Implementación por fases",
      "Pruebas y validación continua",
      "Ajustes y optimizaciones",
      "Monitoreo de rendimiento",
      "Gestión del cambio organizacional"
    ]
  },
  {
    number: "5",
    title: "Evaluar el progreso",
    icon: <ClipboardList className="h-6 w-6" />,
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    description: "Medimos y analizamos los resultados para garantizar el éxito del proceso.",
    details: [
      "Seguimiento de KPIs establecidos",
      "Análisis de feedback de usuarios",
      "Identificación de áreas de mejora",
      "Reportes de progreso periódicos",
      "Ajustes estratégicos basados en resultados"
    ]
  }
];

const WorkProcess: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const handleStepClick = (index: number) => {
    setSelectedStep(selectedStep === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="proceso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative transition-colors duration-300">
            El camino para alcanzar tus metas profesionales
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Un proceso estructurado para garantizar el éxito de tu transformación digital
          </p>
        </div>

        <div className="relative pt-32 pb-40">
          {/* Líneas conectoras (solo visibles en desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 1200 300"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100,150 C250,150 300,50 450,50 S600,250 750,250 S900,50 1100,50"
                stroke="currentColor"
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M100,150 C250,150 300,50 450,50 S600,250 750,250 S900,50 1100,50"
                stroke="url(#gradientLine)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="path-animation"
              />
              <defs>
                <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className="text-blue-600 dark:text-blue-400" stopColor="currentColor" />
                  <stop offset="100%" className="text-purple-600 dark:text-purple-400" stopColor="currentColor" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Pasos del proceso */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center ${
                  index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-64'
                }`}
              >
                {/* Número y círculo */}
                <button
                  onClick={() => handleStepClick(index)}
                  className={`relative w-16 h-16 rounded-full ${step.bgColor} flex items-center justify-center mb-8 
                    transform transition-all duration-300 hover:scale-110 cursor-pointer
                    border-2 border-white dark:border-gray-800 shadow-md group z-20
                    ${selectedStep === index ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
                  aria-expanded={selectedStep === index}
                >
                  <span className="text-2xl font-bold text-gray-800 dark:text-white group-hover:scale-110 transition-transform">
                    {step.number}
                  </span>
                  <div className="absolute inset-0 rounded-full bg-white/50 dark:bg-white/10 blur-md -z-10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Icono */}
                <div className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center mb-6 
                  transform transition-all duration-300 hover:rotate-12 hover:scale-110 hover:shadow-md
                  border border-white/50 dark:border-gray-700/50`}>
                  {React.cloneElement(step.icon, {
                    className: `h-6 w-6 ${step.iconColor}`
                  })}
                </div>

                {/* Título */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg transform hover:scale-105 
                  transition-all duration-300 hover:shadow-xl max-w-[200px] cursor-pointer"
                  onClick={() => handleStepClick(index)}
                >
                  <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white whitespace-normal transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>

                {/* Modal con detalles */}
                {selectedStep === index && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto
                      shadow-2xl transform transition-all duration-300 animate-fade-in">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full ${step.bgColor} flex items-center justify-center mr-3`}>
                            {React.cloneElement(step.icon, {
                              className: `h-5 w-5 ${step.iconColor}`
                            })}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {step.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedStep(null)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        >
                          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {step.description}
                      </p>

                      <div className="space-y-4">
                        {step.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          >
                            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-500"></div>
                            <p className="text-gray-700 dark:text-gray-200">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;