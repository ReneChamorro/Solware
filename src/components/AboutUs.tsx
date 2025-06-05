import React from 'react';
import { Users, Rocket, Heart } from 'lucide-react';
import BlurText from './BlurText';

const AboutUs = () => {
  return (
    <section id="quienes-somos" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-dark text-justify">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurText
            text="¿Quiénes Somos?"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          />
          <BlurText
            text="Somos un emprendimiento latinoamericano comprometido con la transformación digital de las empresas latinoamericanas."
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Nuestra Historia
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-justify">
              Nacimos de la visión de un grupo de profesionales que identificaron 
              la necesidad de las empresas por adaptarse al mundo digital. Entendemos los 
              desafíos únicos que enfrentan los negocios en Latinoamérica y trabajamos 
              incansablemente para ofrecer soluciones que impulsen su crecimiento.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Equipo Local, Impacto Global
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nuestro equipo combina el talento latinoamericano con una visión internacional.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Innovación Constante
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nos mantenemos a la vanguardia de las últimas tecnologías para ofrecer 
                    soluciones innovadoras.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Compromiso con el Cliente
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tu éxito es nuestro éxito. Trabajamos en estrecha colaboración con cada 
                    cliente para garantizar resultados excepcionales.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-[320px] h-[568px] rounded-2xl overflow-hidden shadow-xl bg-gray-900">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source 
                  src="https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/videos//Abouts_Us_Video.mp4" 
                  type="video/mp4" 
                />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;