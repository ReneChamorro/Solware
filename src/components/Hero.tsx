import React from 'react';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center" id="inicio">
      {/* Background with gradient overlay and animated particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px]" />
        
        {/* Animated particles */}
        <div className="particles absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full bg-white/20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in 
              [text-shadow:_0_2px_10px_rgba(0,0,0,0.2)]">
              Transformación Digital para tu Empresa
            </h1>
            
            <p className="text-xl text-white/90 mb-8 animate-fade-in-delay 
              [text-shadow:_0_1px_5px_rgba(0,0,0,0.1)]">
              Automatizamos tus procesos empresariales y potenciamos tu negocio con soluciones 
              tecnológicas innovadoras y personalizadas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-delay-2">
              <button className="group px-8 py-4 bg-white text-blue-600 rounded-full font-medium 
                hover:bg-blue-50 transition-all duration-300 flex items-center justify-center
                shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 
                active:shadow-md">
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group px-8 py-4 bg-transparent border-2 border-white text-white 
                rounded-full font-medium hover:bg-white/10 transition-all duration-300
                flex items-center justify-center backdrop-blur-sm
                hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] 
                active:shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                Ver demostración
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl 
              animate-fade-in-delay hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
              transition-all duration-500">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: <Zap className="h-8 w-8" />,
                    title: "Automatización",
                    value: "+60%",
                    label: "más eficiencia",
                    hoverColor: "group-hover:text-yellow-400"
                  },
                  {
                    icon: <Shield className="h-8 w-8" />,
                    title: "Seguridad",
                    value: "99.9%",
                    label: "tiempo activo",
                    hoverColor: "group-hover:text-green-400"
                  },
                  {
                    icon: <Clock className="h-8 w-8" />,
                    title: "Ahorro",
                    value: "-40%",
                    label: "en costos",
                    hoverColor: "group-hover:text-orange-400"
                  },
                  {
                    icon: <ArrowRight className="h-8 w-8" />,
                    title: "Escalabilidad",
                    value: "∞",
                    label: "sin límites",
                    hoverColor: "group-hover:text-blue-400"
                  }
                ].map((stat, index) => (
                  <div key={index} 
                    className="group text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 
                      transform hover:-translate-y-1 transition-all duration-300
                      hover:shadow-lg hover:shadow-white/10">
                    <div className="inline-flex items-center justify-center w-12 h-12 
                      rounded-lg bg-white/10 mb-3 transform group-hover:scale-110 
                      transition-all duration-300 group-hover:rotate-3">
                      {React.cloneElement(stat.icon, {
                        className: `h-8 w-8 text-white transition-colors duration-300 ${stat.hoverColor}`
                      })}
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1 transition-colors duration-300
                      group-hover:text-white/90">
                      {stat.title}
                    </h3>
                    <p className="text-2xl font-bold text-white mb-1 transition-transform duration-300
                      group-hover:scale-110">
                      {stat.value}
                    </p>
                    <p className="text-sm text-white/80 transition-colors duration-300
                      group-hover:text-white/90">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}