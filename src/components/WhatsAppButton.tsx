import { memo, useCallback } from 'react';
import { MessageCircle, Instagram, Linkedin } from 'lucide-react';

const WhatsAppButton = memo(() => {
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

  return (
    <>
      <style>{`
        /* Solo el botón de WhatsApp trigerea las animaciones */
        .whatsapp-btn:hover ~ .instagram-btn {
          animation: matryoshka-pop-ig 0.6s ease-out 0.1s forwards !important;
          pointer-events: auto;
        }
        .whatsapp-btn:hover ~ .linkedin-btn {
          animation: matryoshka-pop-ln 0.6s ease-out 0.2s forwards !important;
          pointer-events: auto;
        }

        /* Cuando hay hover en CUALQUIER parte del grupo, mantener TODOS visibles */
        .matryoshka-group:hover .instagram-btn {
          pointer-events: auto;
          opacity: 1;
        }

        .matryoshka-group:hover .linkedin-btn {
          pointer-events: auto;
          opacity: 1;
        }

        /* Solo aplicar posición fija cuando NO hay animación de WhatsApp */
        .matryoshka-group:hover:not(:has(.whatsapp-btn:hover)) .instagram-btn {
          transform: translateY(-50%) translateX(70px) scale(1) !important;
        }

        .matryoshka-group:hover:not(:has(.whatsapp-btn:hover)) .linkedin-btn {
          transform: translateY(-50%) translateX(120px) scale(1) !important;
        }

        /* Efectos individuales de hover */
        .instagram-btn:hover {
          transform: translateY(-50%) translateX(70px) scale(1.1) !important;
        }

        .linkedin-btn:hover {
          transform: translateY(-50%) translateX(120px) scale(1.1) !important;
        }

        /* Animaciones de salida CON delay real de 1 segundo */
        .matryoshka-group:not(:hover) .instagram-btn {
          animation: matryoshka-stay-ig 1.1s ease-out forwards, matryoshka-exit-ig 0.5s ease-in 1.1s forwards;
        }
        .matryoshka-group:not(:hover) .linkedin-btn {
          animation: matryoshka-stay-ln 1s ease-out forwards, matryoshka-exit-ln 0.5s ease-in 1s forwards;
        }

        .instagram-btn {
          --final-x: 70px;
        }
        .linkedin-btn {
          --final-x: 120px;
        }

        /* Animaciones de entrada */
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

        /* Animaciones de permanencia (mantener posición por 1 segundo) */
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

        /* Animaciones de salida (reversa) */
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
      `}</style>

      <div className="fixed bottom-5 left-5 z-50 matryoshka-group">
        {/* Área invisible para mantener hover */}
        <div className="absolute -top-5 -bottom-5 -left-5 -right-32 pointer-events-none hover:pointer-events-auto"></div>
        
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
          <MessageCircle className="w-7 h-7 text-white" />
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