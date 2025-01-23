import React, { useState } from 'react';
import { Settings, Code2, Users, Bot, BarChart2, Cuboid as Cube } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

const services = [
  {
    icon: <Settings className="h-6 w-6 text-white" />,
    title: "Automatización de Procesos",
    description: "Optimiza tus operaciones con soluciones automatizadas inteligentes.",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=800",
    details: [
      {
        title: "Flujos de Trabajo Automatizados",
        description: "Diseñamos y configuramos flujos de trabajo que automatizan tareas repetitivas."
      },
      {
        title: "Reducción de Errores",
        description: "Minimizamos errores humanos mediante la automatización de procesos críticos."
      },
      {
        title: "Análisis y Optimización",
        description: "Monitoreamos y optimizamos continuamente los procesos automatizados."
      }
    ]
  },
  {
    icon: <Bot className="h-6 w-6 text-white" />,
    title: "Agentes AI",
    description: "Integra agentes inteligentes que optimizan procesos y mejoran la experiencia del cliente.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    details: [
      {
        title: "Asistentes Virtuales",
        description: "Implementación de chatbots y asistentes AI para atención al cliente 24/7."
      },
      {
        title: "Automatización Inteligente",
        description: "Agentes AI que aprenden y mejoran continuamente sus respuestas y acciones."
      },
      {
        title: "Soporte Multicanal Inteligente",
        description: "Centraliza tu comunicación con agentes AI capaces de gestionar en diversos canales."
      },
    ]
  },
  {
    icon: <Code2 className="h-6 w-6 text-white" />,
    title: "Desarrollo Web y Móvil",
    description: "Creamos aplicaciones modernas y responsivas para tu negocio.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    details: [
      {
        title: "Diseño UX/UI Intuitivo",
        description: "Creamos interfaces atractivas y fáciles de usar que mejoran la experiencia del usuario."
      },
      {
        title: "Desarrollo Full-Stack",
        description: "Implementamos soluciones que integran front-end y back-end de manera eficiente."
      },
      {
        title: "Optimización SEO",
        description: "Tu Web y aplicaciones serán visibles en motores de búsqueda."
      }
    ]
  },
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "CRM & Business Intelligence",
    description: "Toma de decisiones estratégicas basadas en  análisis inteligente de datos.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    details: [
      {
        title: "Análisis Predictivo de Clientes",
        description: "Anticipamos comportamientos y necesidades de clientes mediante modelos de análisis."
      },
      {
        title: "Segmentación Inteligente",
        description: "Clasificación automática de clientes basada en patrones de comportamiento."
      },
      {
        title: "Automatización de Insights",
        description: "Generación automática de reportes y alertas basadas en análisis de datos del CRM."
      }
    ]
  },
  {
    icon: <Cube className="h-6 w-6 text-white" />,
    title: "Digitalización 3D y Capturas 360°",
    description: "Creamos experiencias inmersivas y visualizaciones interactivas de alta calidad.",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&q=80&w=800",
    details: [
      {
        title: "Modelado 3D Profesional",
        description: "Creación de modelos tridimensionales detallados para productos y espacios."
      },
      {
        title: "Tours Virtuales 360°",
        description: "Experiencias interactivas que permiten explorar espacios desde cualquier lugar."
      },
      {
        title: "Visualización Arquitectónica",
        description: "Transformación de planos en visualizaciones 3D impactantes."
      },
      {
        title: "Renderizado en 4K",
        description: "Imágenes de alta resolución que destacan cada detalle."
      }
    ]
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-white" />,
    title: "Reportes y Análisis de Data",
    description: "Obtén insights clave para tomar decisiones informadas y mejorar tus resultados.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    details: [
      {
        title: "Análisis Predictivo",
        description: "Utilización de modelos avanzados para predecir tendencias y comportamientos."
      },
      {
        title: "Dashboards Interactivos",
        description: "Visualizaciones dinámicas que permiten explorar y comprender los datos fácilmente."
      },
      {
        title: "Reportes Automatizados",
        description: "Generación y distribución automática de informes personalizados."
      },
      {
        title: "Integración de Fuentes",
        description: "Consolidación de datos de múltiples fuentes para un análisis completo."
      }
    ]
  }
];

const Services: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const titleRef = useScrollReveal({ variant: 'fade-up', delay: 100 });
  const descriptionRef = useScrollReveal({ variant: 'fade-up', delay: 200 });
  const cardsContainerRef = useScrollReveal({ variant: 'fade-up', delay: 300 });

  const handleFlip = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 ref={titleRef} className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative transition-colors duration-300">
            Soluciones Digitales Integrales
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
          </h2>
          <p ref={descriptionRef} className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Transformamos tu negocio con tecnología de vanguardia y soluciones personalizadas
          </p>
        </div>

        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              isFlipped={flippedCard === index}
              onFlip={() => handleFlip(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;