// EmailJS Configuration
// Para configurar EmailJS:
// 1. Ve a https://www.emailjs.com/ y crea una cuenta
// 2. Crea un nuevo servicio de email (Gmail, Outlook, etc.)
// 3. Crea un template para el email
// 4. Obtén tu Public Key desde Account Settings
// 5. Reemplaza los valores a continuación con los reales

export const emailjsConfig = {
  // Service ID - obtenido de la sección Services en EmailJS
  serviceId: 'service_jyvc03w', // ✅ CONFIGURADO
  
  // Template ID - obtenido de la sección Templates en EmailJS
  templateId: 'template_6qlaug8', // ✅ CONFIGURADO
  
  // Public Key - obtenido de Account Settings > API Keys
  publicKey: 'cPPKf_MNWiEYr73Xh', // ✅ CONFIGURADO
  
  // Email de destino
  toEmail: 'renebehrens90@gmail.com'
}

// Función para verificar si EmailJS está configurado
export const isEmailJSConfigured = () => {
  return emailjsConfig.serviceId !== 'YOUR_SERVICE_ID' &&
         emailjsConfig.templateId !== 'YOUR_TEMPLATE_ID' &&
         emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY'
}

// Configuración de demo para testing (no usar en producción)
export const demoEmailjsConfig = {
  serviceId: 'service_demo',
  templateId: 'template_demo', 
  publicKey: 'demo_public_key',
  toEmail: 'renebehrens90@gmail.com'
}

// Template de ejemplo para EmailJS:
// 
// Subject: Nuevo mensaje de contacto desde Solware - {{from_name}}
// 
// Content:
// Has recibido un nuevo mensaje de contacto desde el sitio web de Solware:
// 
// Nombre: {{from_name}}
// Email: {{from_email}}
// Teléfono: {{phone}}
// Áreas de interés: {{areas}}
// 
// Mensaje:
// {{message}}
// 
// ---
// Este mensaje fue enviado desde el formulario de contacto de Solware.
// Puedes responder directamente a este email.
// 
// Variables disponibles:
// - {{from_name}} - Nombre del usuario
// - {{from_email}} - Email del usuario  
// - {{phone}} - Teléfono del usuario
// - {{areas}} - Áreas de interés seleccionadas
// - {{message}} - Mensaje del usuario
// - {{reply_to}} - Email para responder (mismo que from_email)