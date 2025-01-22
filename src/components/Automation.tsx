import React from 'react';
import { Bot, Zap, BarChart2, FileSpreadsheet, Clock, Database } from 'lucide-react';
import Carousel from './Carousel';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Automation = () => {
  const titleRef = useScrollReveal({ variant: 'fade-up', delay: 100 });
  const descriptionRef = useScrollReveal({ variant: 'fade-up', delay: 200 });
  const carouselRef = useScrollReveal({ variant: 'fade-up', delay: 300 });

  const automations = [
    {
      id: 1,
      title: "Automatización de Facturación",
      description: "Sistema inteligente que automatiza la generación, envío y seguimiento de facturas, reduciendo errores y ahorrando tiempo valioso.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
      icon: <FileSpreadsheet className="h-6 w-6 text-white" />
    },
    {
      id: 2,
      title: "Gestión de Inventario Predictivo",
      description: "IA que predice niveles óptimos de inventario y automatiza pedidos basándose en patrones históricos y tendencias.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      icon: <Database className="h-6 w-6 text-white" />
    },
    {
      id: 3,
      title: "Chatbots de Atención 24/7",
      description: "Asistentes virtuales que manejan consultas de clientes automáticamente, proporcionando respuestas instantáneas y derivación inteligente.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
      icon: <Bot className="h-6 w-6 text-white" />
    },
    {
      id: 4,
      title: "Automatización de Marketing",
      description: "Campañas personalizadas que se adaptan automáticamente según el comportamiento del usuario y métricas en tiempo real.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      icon: <BarChart2 className="h-6 w-6 text-white" />
    },
    {
      id: 5,
      title: "Procesos de RR.HH.",
      description: "Simplificación de reclutamiento, onboarding y gestión de personal mediante flujos de trabajo automatizados.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
      icon: <Clock className="h-6 w-6 text-white" />
    },
    {
      id: 6,
      title: "Integración de Sistemas",
      description: "Conectamos y sincronizamos automáticamente diferentes plataformas y aplicaciones empresariales para un flujo de datos perfecto.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      icon: <Zap className="h-6 w-6 text-white" />
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="automatizacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 ref={titleRef} className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative transition-colors duration-300">
            Automatización Empresarial
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
          </h2>
          <p ref={descriptionRef} className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Transformamos procesos manuales en flujos de trabajo eficientes y automatizados
          </p>
        </div>

        <div ref={carouselRef}>
          <Carousel items={automations} />
        </div>
      </div>
    </section>
  );
};

export default Automation;