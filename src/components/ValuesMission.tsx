import React from 'react';
import { Lightbulb, Users, Target, Leaf } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ValuesMission: React.FC = () => {
  const titleRef = useScrollReveal({ variant: 'fade-up', delay: 100 });
  const subtitleRef = useScrollReveal({ variant: 'fade-up', delay: 200 });
  const contentRef = useScrollReveal({ variant: 'fade-up', delay: 300 });
  const valuesRef = useScrollReveal({ variant: 'fade-up', delay: 400 });

  const values = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovación",
      description: "Buscamos constantemente nuevas formas de resolver desafíos tecnológicos",
      color: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      hoverColor: "group-hover:text-amber-500 dark:group-hover:text-amber-300"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Compromiso",
      description: "Nos esforzamos por cumplir nuestras promesas y superar las expectativas de nuestros clientes",
      color: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      hoverColor: "group-hover:text-blue-500 dark:group-hover:text-blue-300"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Adaptabilidad",
      description: "Nos adaptamos rápidamente a los cambios para ofrecer soluciones óptimas y personalizadas",
      color: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      hoverColor: "group-hover:text-purple-500 dark:group-hover:text-purple-300"
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Sostenibilidad",
      description: "Creamos soluciones duraderas y responsables con el futuro",
      color: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      hoverColor: "group-hover:text-green-500 dark:group-hover:text-green-300"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative transition-colors duration-300"
          >
            Nuestros Valores y Misión
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300"
          >
            Impulsando tu transformación digital con propósito y excelencia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            ref={contentRef}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
              rounded-2xl p-8 sm:p-10 shadow-lg transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                En Solware, creemos en el poder de la tecnología para transformar negocios y mejorar vidas. 
                Nuestra misión es empoderar a empresas de todas las industrias a través de soluciones 
                innovadoras, accesibles y sostenibles, adaptadas a sus necesidades específicas.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Nos guiamos por valores como la confianza, la colaboración y la excelencia, asegurando 
                que cada proyecto no solo cumpla, sino que supere tus expectativas. Juntos, construimos 
                un futuro digital donde la tecnología se convierte en el motor de tu éxito.
              </p>
            </div>
          </div>

          <div 
            ref={valuesRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg 
                  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${value.color} rounded-lg flex items-center justify-center 
                  mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  {React.cloneElement(value.icon, {
                    className: `transition-colors duration-300 ${value.iconColor} ${value.hoverColor}`
                  })}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 
                  transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesMission;