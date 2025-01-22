import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent('Hola, me gustaría obtener más información sobre sus servicios.');
    window.open(`https://wa.me/584126652245?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-5 left-5 z-50 w-[60px] h-[60px] bg-[#25D366] rounded-full 
        flex items-center justify-center shadow-lg hover:shadow-xl 
        transform hover:scale-110 transition-all duration-300 
        hover:bg-[#22c35e] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Chatear por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </button>
  );
};

export default WhatsAppButton;