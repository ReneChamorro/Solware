import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-300 text-justify">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center text-gray-600 dark:text-gray-300 
            hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al inicio
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors duration-300">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Política de Privacidad de Solware
          </h1>
          
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <p className="text-lg leading-relaxed">
              Tu privacidad es importante para nosotros. En Solware, respetamos tu privacidad y cumplimos con cualquier ley y regulación aplicable respecto a la información personal que podamos recopilar sobre ti, ya sea a través de nuestro sitio web, aplicaciones o servicios asociados.
            </p>

            <p className="text-lg leading-relaxed">
              Información personal se refiere a cualquier dato que pueda ser usado para identificarte como individuo, incluyendo nombre, dirección, correo electrónico, detalles de dispositivos, información de pago y cómo interactúas con nuestras plataformas digitales.
            </p>

            <p className="text-lg leading-relaxed">
              Si nuestro sitio contiene enlaces a servicios de terceros, te recordamos que dichos servicios tienen sus propias políticas de privacidad. Te recomendamos leer sus políticas antes de proporcionarles tu información. Esta Política de Privacidad no cubre actividades realizadas fuera de nuestras plataformas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Esta política es efectiva a partir de: 01/03/2024</p>
              <p>Última actualización: 01/03/2024</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Información que Recopilamos
              </h2>
              <p className="mb-4">
                La información que recopilamos se clasifica en dos categorías principales:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Información proporcionada voluntariamente:</span> Datos que nos proporcionas de forma consciente al utilizar nuestros servicios, como formularios de contacto o registros.
                </li>
                <li>
                  <span className="font-medium">Información recopilada automáticamente:</span> Datos que se envían automáticamente desde tus dispositivos cuando accedes a nuestras plataformas, como dirección IP, tipo de navegador, y datos de uso.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Finalidad de la Información
              </h2>
              <p className="mb-4">Usamos la información para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mejorar nuestros servicios.</li>
                <li>Comunicarnos contigo en respuesta a consultas.</li>
                <li>Proteger la seguridad de nuestras plataformas.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Protección de Datos
              </h2>
              <p>
                Implementamos medidas técnicas y organizativas para proteger tu información contra accesos no autorizados, pérdida o divulgación.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Derechos del Usuario
              </h2>
              <p className="mb-4">Tienes derecho a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder, corregir o eliminar tus datos personales.</li>
                <li>Revocar el consentimiento para el uso de tus datos.</li>
                <li>Presentar quejas ante autoridades de protección de datos.</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contacto
              </h2>
              <p className="mb-4">
                Si tienes preguntas o deseas ejercer tus derechos, puedes contactarnos en:
              </p>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Correo electrónico:</span>{' '}
                  <a 
                    href="mailto:ventas@solware.agency"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    ventas@solware.agency
                  </a>
                </li>
                <li>
                  <span className="font-medium">Teléfono:</span>{' '}
                  <a 
                    href="tel:+584129974533"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    +58 412-9974533
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;