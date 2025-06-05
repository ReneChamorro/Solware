import React from 'react';
import { Bot, Zap, BarChart2, FileSpreadsheet, Clock, Database } from 'lucide-react';
import Carousel from './Carousel';
import BlurText from './BlurText';

const automations = [
  {
    id: 1,
    title: "Automatización de Procesos",
    description: "Optimizamos flujos de trabajo repetitivos para aumentar la eficiencia operativa",
    icon: <Zap className="w-12 h-12 text-blue-500" />
  },
  {
    id: 2,
    title: "Análisis de Datos",
    description: "Transformamos datos en insights accionables para mejor toma de decisiones",
    icon: <BarChart2 className="w-12 h-12 text-green-500" />
  },
  {
    id: 3,
    title: "Gestión Documental",
    description: "Digitalización y automatización de procesos documentales",
    icon: <FileSpreadsheet className="w-12 h-12 text-purple-500" />
  },
  {
    id: 4,
    title: "Programación de Tareas",
    description: "Automatización de tareas programadas y seguimiento en tiempo real",
    icon: <Clock className="w-12 h-12 text-orange-500" />
  },
  {
    id: 5,
    title: "Integración de Sistemas",
    description: "Conectamos sus sistemas existentes para un flujo de datos seamless",
    icon: <Database className="w-12 h-12 text-red-500" />
  },
  {
    id: 6,
    title: "Asistentes Virtuales",
    description: "Implementación de chatbots y asistentes automatizados",
    icon: <Bot className="w-12 h-12 text-indigo-500" />
  }
];

const Automation = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300\" id="automatizacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurText
            text="Automatización Empresarial"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center"
          />
          <BlurText
            text="Transformamos procesos manuales en flujos de trabajo eficientes y automatizados"
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-xl text-gray-600 dark:text-gray-300 text-center"
          />
        </div>

        <div>
          <Carousel items={automations} />
        </div>
      </div>
    </section>
  );
};

export default Automation;