import { Settings, Code2, Users, Bot, BarChart2, Cuboid as Cube } from 'lucide-react';
import ServiceCard from './ServiceCard';
import BlurText from './effectsComponents/BlurText'
import { useTranslation } from 'react-i18next'


const Services = () => {
  const { t } = useTranslation()
  const services = [
    {
      icon: <Settings className="h-6 w-6 text-white" />,
      title: t('services.automatizacion.title'),
      description: t('services.automatizacion.description'),
      image: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/automatizacion.webp',
      details: [
        {
          title: t('services.automatizacion.details.0.title'),
          description: t('services.automatizacion.details.0.description'),
        },
        {
          title: t('services.automatizacion.details.1.title'),
          description: t('services.automatizacion.details.1.description'),
        },
        {
          title: t('services.automatizacion.details.2.title'),
          description: t('services.automatizacion.details.2.description'),
        },
      ],
    },
    {
      icon: <Bot className="h-6 w-6 text-white" />,
      title: t('services.agentes.title'),
      description: t('services.agentes.description'),
      image: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/Agentes%20ia2.webp',
      details: [
        {
          title: t('services.agentes.details.0.title'),
          description: t('services.agentes.details.0.description'),
        },
        {
          title: t('services.agentes.details.1.title'),
          description: t('services.agentes.details.1.description'),
        },
        {
          title: t('services.agentes.details.2.title'),
          description: t('services.agentes.details.2.description'),
        },
      ],
    },
    {
      icon: <Code2 className="h-6 w-6 text-white" />,
      title: t('services.desarrollo.title'),
      description: t('services.desarrollo.description'),
      image: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/desarrollo.webp',
      details: [
        {
          title: t('services.desarrollo.details.0.title'),
          description: t('services.desarrollo.details.0.description'),
        },
        {
          title: t('services.desarrollo.details.1.title'),
          description: t('services.desarrollo.details.1.description'),
        },
        {
          title: t('services.desarrollo.details.2.title'),
          description: t('services.desarrollo.details.2.description'),
        },
      ],
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: t('services.crm.title'),
      description: t('services.crm.description'),
      image: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/crm.webp',
      details: [
        {
          title: t('services.crm.details.0.title'),
          description: t('services.crm.details.0.description'),
        },
        {
          title: t('services.crm.details.1.title'),
          description: t('services.crm.details.1.description'),
        },
        {
          title: t('services.crm.details.2.title'),
          description: t('services.crm.details.2.description'),
        },
      ],
    },
    {
      icon: <Cube className="h-6 w-6 text-white" />,
      title: t('services.digitalizacion.title'),
      description: t('services.digitalizacion.description'),
      image:
        'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/digitalizacion%20(2).webp',
      details: [
        {
          title: t('services.digitalizacion.details.0.title'),
          description: t('services.digitalizacion.details.0.description'),
        },
        {
          title: t('services.digitalizacion.details.1.title'),
          description: t('services.digitalizacion.details.1.description'),
        },
        {
          title: t('services.digitalizacion.details.2.title'),
          description: t('services.digitalizacion.details.2.description'),
        },
      ],
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-white" />,
      title: t('services.soporte.title'),
      description: t('services.soporte.description'),
      image: 'https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/soporte.webp',
      details: [
        {
          title: t('services.soporte.details.0.title'),
          description: t('services.soporte.details.0.description'),
        },
        {
          title: t('services.soporte.details.1.title'),
          description: t('services.soporte.details.1.description'),
        },
        {
          title: t('services.soporte.details.2.title'),
          description: t('services.soporte.details.2.description'),
        },
      ],
    },
  ]
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300\" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurText
            text={t('services.title')}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4 relative"
          />
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
          <BlurText
            text={t('services.description')}
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-xl text-gray-600 dark:text-gray-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;