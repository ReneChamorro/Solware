import React from 'react';
import { Bot, Zap, BarChart2, FileSpreadsheet, Clock, Database } from 'lucide-react';
import Carousel from './Carousel';

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

const Automation = () => {
  return (
    <section className="py-24 bg-gray-50" id="automatizacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 relative">
            Automatización Empresarial
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          <p className="text-xl text-gray-600">
            Transformamos procesos manuales en flujos de trabajo eficientes y automatizados
          </p>
        </div>

        <Carousel items={automations} />
      </div>
    </section>
  );
};

export default Automation;