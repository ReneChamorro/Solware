import React from 'react';
import { Bot, Zap, BarChart2, FileSpreadsheet, Clock, Database } from 'lucide-react';
import Carousel from './Carousel';
import { useScrollReveal } from '../hooks/useScrollReveal';
import MarketingAutomationIllustration from './MarketingAutomationIllustration';

const Automation = () => {
  const titleRef = useScrollReveal({ variant: 'fade-up', delay: 100 });
  const descriptionRef = useScrollReveal({ variant: 'fade-up', delay: 200 });
  const carouselRef = useScrollReveal({ variant: 'fade-up', delay: 300 });

  const automations = [
    {
      id: 1,
      title: "Facturación Inteligente",
      description: "Sistema inteligente que automatiza la generación, envío, y reduciendo errores y ahorrando tiempo valioso.",
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Carrusel/9.avif",
      icon: <FileSpreadsheet className="h-6 w-6 text-white" />
    },
    {
      id: 2,
      title: "Inventario Predictivo",
      description: "IA que predice niveles óptimos de inventario y automatiza pedidos basándose en patrones históricos.",
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Carrusel/8.png",
      icon: <Database className="h-6 w-6 text-white" />
    },
    {
      id: 3,
      title: "Asistentes Virtuales Inteligentes",
      description: "Asistentes virtuales que manejan consultas de clientes, proporcionando respuestas inteligentes e instantáneas.",
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Carrusel/5.png",
      icon: <Bot className="h-6 w-6 text-white" />
    },
    {
      id: 4,
      title: "Automatización de Marketing",
      description: "Campañas personalizadas que se adaptan en tiempo real al comportamiento del usuario.",
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Carrusel/1.png",
      icon: <BarChart2 className="h-6 w-6 text-white" />
    },
    {
      id: 5,
      title: "Soporte Inteligente",
      description: "Resuelve incidencias de forma más eficiente con flujos de soporte técnico automatizados y seguimiento inteligente.",
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Carrusel/4.png",
      icon: <Zap className="h-6 w-6 text-white" />
    },
    {
      id: 6,
      title: "Gestión Financiera",
      description: "Simplifica la gestión de presupuestos, pagos y reportes financieros con flujos automatizados que garantizan precisión.",
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Carrusel/7.avif",
      icon: <Clock className="h-6 w-6 text-white" />
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="automatizacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative transition-colors duration-300">
            Automatización Empresarial
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
          </h2>
          <p ref={descriptionRef as React.RefObject<HTMLParagraphElement>} className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Transformamos procesos manuales en flujos de trabajo eficientes y automatizados
          </p>
        </div>

        <div ref={carouselRef as React.RefObject<HTMLDivElement>}>
          <Carousel items={automations} />
        </div>
      </div>
    </section>
  );
};

export default Automation;