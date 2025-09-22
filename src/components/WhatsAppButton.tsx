import { memo, useCallback, useState, useRef, useEffect } from 'react';
import { Instagram, Linkedin } from 'lucide-react';

const WhatsAppButton = memo(() => {
  const [isActive, setIsActive] = useState(false);
  const [isAutoHover, setIsAutoHover] = useState(false);
  const [isAutoHoverExit, setIsAutoHoverExit] = useState(false);
  const [isMobileExit, setIsMobileExit] = useState(false);
  const [isManualHover, setIsManualHover] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openWhatsApp = useCallback(() => {
  const message = encodeURIComponent('Hola, me gustaría obtener más información sobre sus servicios.');
    window.open(`https://wa.me/584129974533?text=${message}`, '_blank');
  }, []);

  const openInstagram = useCallback(() => {
    window.open('https://instagram.com/solware_', '_blank');
  }, []);

  const openLinkedIn = useCallback(() => {
    window.open('https://www.linkedin.com/company/agencia-solware', '_blank');
  }, []);

  const handleMobileToggle = useCallback(() => {
    if (isActive) {
      setIsActive(false);
      setIsMobileExit(true);
      // Limpiar el estado de salida después de las animaciones
      setTimeout(() => {
        setIsMobileExit(false);
      }, 1600);
    } else {
      setIsActive(true);
      setIsMobileExit(false); // Limpiar estado de salida
      // Auto-cerrar después de 1.6 segundos (mismo timing que desktop)
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
        setIsMobileExit(true);
        // Limpiar el estado de salida después de las animaciones
        setTimeout(() => {
          setIsMobileExit(false);
        }, 1600);
      }, 1600);
    }
  }, [isActive]);

  // Auto hover effect cada 10 segundos
  useEffect(() => {
    if (!isManualHover) {
      const autoHoverInterval = setInterval(() => {
        setIsAutoHover(true);
        // Duración de la animación: 1.6 segundos (como el mobile)
        setTimeout(() => {
          setIsAutoHover(false);
          setIsAutoHoverExit(true);
          // Tiempo para las animaciones de salida (1.6 segundos)
          setTimeout(() => {
            setIsAutoHoverExit(false);
          }, 1600);
        }, 1600);
      }, 10000); // Cada 10 segundos

      return () => clearInterval(autoHoverInterval);
    }
  }, [isManualHover]);

  // Handlers para hover manual
  const handleMouseEnter = useCallback(() => {
    setIsManualHover(true);
    setIsAutoHover(false); // Parar autohover
    setIsAutoHoverExit(false); // Limpiar estado de salida
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsManualHover(false);
    setIsAutoHoverExit(false); // Limpiar estado de salida
    // El autohover se reanuda automáticamente por el useEffect
  }, []);

  return (
    <>
      <style>{`
        /* DESKTOP STYLES (Por defecto - hacia la derecha) */
        .whatsapp-btn:hover ~ .instagram-btn,
        .matryoshka-group.auto-hover .instagram-btn,
        .matryoshka-group:hover .instagram-btn {
          animation: matryoshka-pop-ig 0.8s ease-out 0.1s forwards !important;
          pointer-events: auto;
        }
        .whatsapp-btn:hover ~ .linkedin-btn,
        .matryoshka-group.auto-hover .linkedin-btn,
        .matryoshka-group:hover .linkedin-btn {
          animation: matryoshka-pop-ln 0.8s ease-out 0.2s forwards !important;
          pointer-events: auto;
        }

        .matryoshka-group:hover .instagram-btn,
        .matryoshka-group.auto-hover .instagram-btn {
          pointer-events: auto;
          opacity: 1;
        }

        .matryoshka-group:hover .linkedin-btn,
        .matryoshka-group.auto-hover .linkedin-btn {
          pointer-events: auto;
          opacity: 1;
        }

        .instagram-btn:hover {
          transform: translateY(-50%) translateX(70px) scale(1.1) !important;
        }

        .linkedin-btn:hover {
          transform: translateY(-50%) translateX(120px) scale(1.1) !important;
        }

        .matryoshka-group:not(:hover):not(.auto-hover):not(.auto-hover-exit) .instagram-btn {
          animation: matryoshka-stay-ig 1.1s ease-out forwards, matryoshka-exit-ig 0.5s ease-in 1.1s forwards;
        }
        .matryoshka-group:not(:hover):not(.auto-hover):not(.auto-hover-exit) .linkedin-btn {
          animation: matryoshka-stay-ln 1s ease-out forwards, matryoshka-exit-ln 0.5s ease-in 1s forwards;
        }

        /* Animaciones de salida específicas para autohover */
        .matryoshka-group.auto-hover-exit .instagram-btn {
          animation: matryoshka-stay-ig 1.1s ease-out forwards, matryoshka-exit-ig 0.5s ease-in 1.1s forwards;
        }
        .matryoshka-group.auto-hover-exit .linkedin-btn {
          animation: matryoshka-stay-ln 1s ease-out forwards, matryoshka-exit-ln 0.5s ease-in 1s forwards;
        }

        .instagram-btn {
          --final-x: 70px;
          --final-y: 0px;
        }
        .linkedin-btn {
          --final-x: 120px;
          --final-y: 0px;
        }

        /* DESKTOP ANIMATIONS (hacia la derecha) */
        @keyframes matryoshka-pop-ig {
          0% {
            transform: translateY(-50%) translateX(64px) scale(0) rotate(-180deg);
            opacity: 0;
          }
          60% {
            transform: translateY(-50%) translateX(75px) scale(1.15) rotate(-10deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-50%) translateX(70px) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes matryoshka-pop-ln {
          0% {
            transform: translateY(-50%) translateX(64px) scale(0) rotate(-270deg);
            opacity: 0;
          }
          60% {
            transform: translateY(-50%) translateX(125px) scale(1.2) rotate(-15deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-50%) translateX(120px) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes matryoshka-stay-ig {
          0%, 100% {
            transform: translateY(-50%) translateX(70px) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes matryoshka-stay-ln {
          0%, 100% {
            transform: translateY(-50%) translateX(120px) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes matryoshka-exit-ig {
          0% {
            transform: translateY(-50%) translateX(70px) scale(1) rotate(0deg);
            opacity: 1;
          }
          40% {
            transform: translateY(-50%) translateX(75px) scale(1.15) rotate(10deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-50%) translateX(64px) scale(0) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes matryoshka-exit-ln {
          0% {
            transform: translateY(-50%) translateX(120px) scale(1) rotate(0deg);
            opacity: 1;
          }
          40% {
            transform: translateY(-50%) translateX(125px) scale(1.2) rotate(15deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-50%) translateX(64px) scale(0) rotate(270deg);
            opacity: 0;
          }
        }

        /* MOBILE STYLES (hacia arriba) */
        @media (max-width: 768px) {
          /* Área invisible ajustada para móvil */
          .matryoshka-group .hover-area {
            top: -80px !important;
            right: -5px !important;
            bottom: -5px !important;
            left: -5px !important;
          }

          /* Flecha indicadora para móvil - Estado base */
          .mobile-arrow {
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 60px;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 1;
            transition: all 0.3s ease;
            pointer-events: auto;
            z-index: 25;
            cursor: pointer;
            animation: arrow-pulse 2s infinite;
          }

          /* Ocultar flecha cuando hay animación activa - Z-INDEX BAJO */
          .matryoshka-group:hover .mobile-arrow,
          .matryoshka-group.active .mobile-arrow,
          .matryoshka-group.auto-hover .mobile-arrow {
            opacity: 0 !important;
            animation: none !important;
            top: -40px !important;
            z-index: 15 !important;
          }

          /* FORZAR mostrar flecha de nuevo después del auto-hover - Z-INDEX ALTO */
          .matryoshka-group:not(.active):not(.auto-hover):not(:hover) .mobile-arrow {
            opacity: 1 !important;
            animation: arrow-pulse 2s infinite !important;
            top: -40px !important;
            z-index: 25 !important;
          }

          /* Trigger para móvil usando :active, clase y autohover */
          .matryoshka-group:active .instagram-btn,
          .matryoshka-group.active .instagram-btn,
          .matryoshka-group.auto-hover .instagram-btn {
            animation: matryoshka-pop-ig 0.8s ease-out 0.1s forwards !important;
            pointer-events: auto;
            opacity: 1;
          }

          .matryoshka-group:active .linkedin-btn,
          .matryoshka-group.active .linkedin-btn,
          .matryoshka-group.auto-hover .linkedin-btn {
            animation: matryoshka-pop-ln 0.8s ease-out 0.2s forwards !important;
            pointer-events: auto;
            opacity: 1;
          }

          /* También para hover manual en móvil */
          .matryoshka-group:hover .instagram-btn {
            animation: matryoshka-pop-ig 0.8s ease-out 0.1s forwards !important;
            pointer-events: auto;
            opacity: 1;
          }

          .matryoshka-group:hover .linkedin-btn {
            animation: matryoshka-pop-ln 0.8s ease-out 0.2s forwards !important;
            pointer-events: auto;
            opacity: 1;
          }

          /* Animaciones de salida CON delay real de 1 segundo para móvil */
          .matryoshka-group:not(.active):not(.auto-hover):not(.auto-hover-exit):not(:hover) .instagram-btn {
            animation: matryoshka-stay-ig 1.1s ease-out forwards, matryoshka-exit-ig 0.5s ease-in 1.1s forwards;
          }
          .matryoshka-group:not(.active):not(.auto-hover):not(.auto-hover-exit):not(:hover) .linkedin-btn {
            animation: matryoshka-stay-ln 1s ease-out forwards, matryoshka-exit-ln 0.5s ease-in 1s forwards;
          }

          /* Animaciones de salida cuando .active se quita */
          @media (pointer: coarse) {
            .matryoshka-group:not(.active):not(.auto-hover):not(.auto-hover-exit) .instagram-btn {
              animation: matryoshka-stay-ig 1.1s ease-out forwards, matryoshka-exit-ig 0.5s ease-in 1.1s forwards !important;
            }
            .matryoshka-group:not(.active):not(.auto-hover):not(.auto-hover-exit) .linkedin-btn {
              animation: matryoshka-stay-ln 1s ease-out forwards, matryoshka-exit-ln 0.5s ease-in 1s forwards !important;
            }
          }

          /* Animaciones de salida específicas para autohover en móvil */
          .matryoshka-group.auto-hover-exit .instagram-btn {
            animation: matryoshka-stay-ig 1.1s ease-out forwards, matryoshka-exit-ig 0.5s ease-in 1.1s forwards;
          }
          .matryoshka-group.auto-hover-exit .linkedin-btn {
            animation: matryoshka-stay-ln 1s ease-out forwards, matryoshka-exit-ln 0.5s ease-in 1s forwards;
          }

          /* Animaciones de salida específicas para mobile manual */
          .matryoshka-group.mobile-exit .instagram-btn {
            animation: matryoshka-stay-ig 1.1s ease-out forwards, matryoshka-exit-ig 0.5s ease-in 1.1s forwards !important;
          }
          .matryoshka-group.mobile-exit .linkedin-btn {
            animation: matryoshka-stay-ln 1s ease-out forwards, matryoshka-exit-ln 0.5s ease-in 1s forwards !important;
          }

          /* Posiciones para móvil - Instagram PEGADITO */
          .instagram-btn:hover {
            transform: translateX(-50%) translateY(-10px) scale(1.1) !important;
          }

          .linkedin-btn:hover {
            transform: translateX(-50%) translateY(-60px) scale(1.1) !important;
          }

          /* Botones posicionados arriba del botón principal */
          .instagram-btn {
            top: auto !important;
            bottom: 60px;
            left: 50% !important;
            transform: translateX(-50%) translateY(16px) scale(0) !important;
          }

          .linkedin-btn {
            top: auto !important;
            bottom: 60px;
            left: 50% !important;
            transform: translateX(-50%) translateY(16px) scale(0) !important;
          }

          /* Animación de pulso para la flecha */
          .mobile-arrow {
            animation: arrow-pulse 2s infinite;
          }

          @keyframes arrow-pulse {
            0%, 100% {
              opacity: 1;
              transform: translateX(-50%) scale(1);
            }
            50% {
              opacity: 0.6;
              transform: translateX(-50%) scale(1.1);
            }
          }

          /* MOBILE ANIMATIONS (hacia arriba) CON ROTACIÓN */
          @keyframes matryoshka-pop-ig {
            0% {
              transform: translateX(-50%) translateY(-4px) scale(0) rotate(-180deg);
              opacity: 0;
            }
            60% {
              transform: translateX(-50%) translateY(-15px) scale(1.15) rotate(-10deg);
              opacity: 0.9;
            }
            100% {
              transform: translateX(-50%) translateY(-10px) scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes matryoshka-pop-ln {
            0% {
              transform: translateX(-50%) translateY(-4px) scale(0) rotate(-270deg);
              opacity: 0;
            }
            60% {
              transform: translateX(-50%) translateY(-65px) scale(1.2) rotate(-15deg);
              opacity: 0.9;
            }
            100% {
              transform: translateX(-50%) translateY(-60px) scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes matryoshka-stay-ig {
            0%, 100% {
              transform: translateX(-50%) translateY(-10px) scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes matryoshka-stay-ln {
            0%, 100% {
              transform: translateX(-50%) translateY(-60px) scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes matryoshka-exit-ig {
            0% {
              transform: translateX(-50%) translateY(-10px) scale(1) rotate(0deg);
              opacity: 1;
            }
            40% {
              transform: translateX(-50%) translateY(-15px) scale(1.15) rotate(10deg);
              opacity: 0.9;
            }
            100% {
              transform: translateX(-50%) translateY(-4px) scale(0) rotate(180deg);
              opacity: 0;
            }
          }

          @keyframes matryoshka-exit-ln {
            0% {
              transform: translateX(-50%) translateY(-60px) scale(1) rotate(0deg);
              opacity: 1;
            }
            40% {
              transform: translateX(-50%) translateY(-65px) scale(1.2) rotate(15deg);
              opacity: 0.9;
            }
            100% {
              transform: translateX(-50%) translateY(-4px) scale(0) rotate(270deg);
              opacity: 0;
            }
          }
        }
      `}</style>

      <div 
        className={`fixed bottom-5 left-5 z-50 matryoshka-group ${isActive ? 'active' : ''} ${isAutoHover ? 'auto-hover' : ''} ${isAutoHoverExit ? 'auto-hover-exit' : ''} ${isMobileExit ? 'mobile-exit' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Área invisible para mantener hover - ajustada según dispositivo */}
        <div className="hover-area absolute -top-5 -bottom-5 -left-5 -right-32 pointer-events-none hover:pointer-events-auto"></div>
        
        {/* Flecha indicadora para móvil */}
        <div className="mobile-arrow md:hidden" onClick={handleMobileToggle}>
          <svg 
            className="w-10 h-10 text-[#25D366]" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M7 14l5-5 5 5z"/>
          </svg>
        </div>
        
        {/* Botón principal de WhatsApp */}
        <button
          onClick={openWhatsApp}
          className="whatsapp-btn relative w-[60px] h-[60px] bg-[#25D366] rounded-full 
            flex items-center justify-center shadow-lg hover:shadow-xl 
            transform hover:scale-110 transition-all duration-300 
            hover:bg-[#22c35e] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2
            animate-pulse hover:animate-none z-30"
          aria-label="Chatear por WhatsApp"
        >
          <svg 
            className="w-7 h-7 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.787"/>
          </svg>
        </button>

        {/* Botón de Instagram - Primera matryoshka */}
        <button
          onClick={openInstagram}
          className="instagram-btn absolute top-1/2 left-0 w-[45px] h-[45px] bg-gradient-to-r from-purple-500 to-pink-500 
            rounded-full flex items-center justify-center shadow-lg
            transform -translate-y-1/2 translate-x-16 scale-0 opacity-0 z-20
            hover:shadow-xl hover:scale-110 transition-transform duration-200"
          aria-label="Seguir en Instagram"
        >
          <Instagram className="w-5 h-5 text-white" />
        </button>

        {/* Botón de LinkedIn - Segunda matryoshka */}
        <button
          onClick={openLinkedIn}
          className="linkedin-btn absolute top-1/2 left-0 w-[35px] h-[35px] bg-[#0077B5] 
            rounded-full flex items-center justify-center shadow-lg
            transform -translate-y-1/2 translate-x-16 scale-0 opacity-0 z-10
            hover:shadow-xl hover:scale-110 transition-transform duration-200"
          aria-label="Conectar en LinkedIn"
        >
          <Linkedin className="w-4 h-4 text-white" />
        </button>
      </div>
    </>
  );
});

export default WhatsAppButton;