# Configuración de EmailJS para el Formulario de Contacto

## Pasos para configurar EmailJS

### 1. Crear cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Regístrate con tu email (puedes usar renebehrens90@gmail.com)
- Verifica tu email

### 2. Configurar un Servicio de Email
- En el dashboard, ve a la sección **"Services"**
- Haz clic en **"Add Service"**
- Selecciona **Gmail** como proveedor
- Autoriza tu cuenta de Gmail (renebehrens90@gmail.com)
- Guarda el **Service ID** que se genera

### 3. Crear un Template de Email
- Ve a la sección **"Templates"**
- Haz clic en **"Create New Template"**
- Configura el template con el siguiente contenido:

**Subject:**
```
Nuevo mensaje de contacto desde Solware - {{from_name}}
```

**Content:**
```
Has recibido un nuevo mensaje de contacto desde el sitio web de Solware:

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}
Áreas de interés: {{areas}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de Solware.
Puedes responder directamente a este email.
```

**Settings:**
- To Email: `renebehrens90@gmail.com`
- From Name: `Solware Contacto`
- Reply To: `{{reply_to}}`

- Guarda el template y anota el **Template ID**

### 4. Obtener Public Key
- Ve a **Account Settings** > **API Keys**
- Copia tu **Public Key**

### 5. Actualizar la configuración
Edita el archivo `src/lib/emailjs-config.ts` y reemplaza:
```typescript
export const emailjsConfig = {
  serviceId: 'TU_SERVICE_ID_AQUI',
  templateId: 'TU_TEMPLATE_ID_AQUI', 
  publicKey: 'TU_PUBLIC_KEY_AQUI',
  toEmail: 'renebehrens90@gmail.com'
}
```

### 6. Variables del Template
Asegúrate de que tu template de EmailJS incluya estas variables:
- `{{from_name}}` - Nombre del usuario
- `{{from_email}}` - Email del usuario
- `{{phone}}` - Teléfono del usuario
- `{{areas}}` - Áreas de interés seleccionadas
- `{{message}}` - Mensaje del usuario
- `{{reply_to}}` - Email para responder (mismo que from_email)

### 7. Pruebas
Una vez configurado:
1. Reinicia el servidor de desarrollo
2. Llena el formulario de contacto
3. Verifica que llegue el email a renebehrens90@gmail.com
4. Revisa la consola del navegador por errores

### Límites de EmailJS
- Plan gratuito: 200 emails/mes
- Plan pago: desde $15/mes para 1000 emails

### Troubleshooting
- Si no llegan emails, verifica la bandeja de spam
- Revisa la consola del navegador por errores de configuración
- Verifica que las IDs en el archivo de configuración sean correctas
- Asegúrate de que el servicio de Gmail esté autorizado correctamente

### Funcionalidades implementadas
✅ Envío de emails con EmailJS
✅ Respaldo en base de datos Supabase
✅ Validación completa del formulario
✅ Estados de loading, success y error
✅ Notificaciones visuales para el usuario
✅ Formulario responsivo con modo oscuro
✅ Soporte para múltiples países y códigos telefónicos