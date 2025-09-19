# Template para EmailJS

## Subject:
```
Nuevo contacto desde Solware - {{from_name}}
```

## Content (HTML):
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
    <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            🌟 Nuevo mensaje de contacto - Solware
        </h2>
        
        <div style="margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 15px;">📋 Información del contacto:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #f8fafc;">
                    <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 30%;">
                        👤 Nombre:
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; color: #111827;">
                        {{from_name}}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">
                        📧 Correo:
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; color: #111827;">
                        {{from_email}}
                    </td>
                </tr>
                <tr style="background-color: #f8fafc;">
                    <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">
                        📱 Teléfono:
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; color: #111827;">
                        {{phone}}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: bold; color: #374151;">
                        🎯 Servicios de interés:
                    </td>
                    <td style="padding: 12px; border: 1px solid #e5e7eb; color: #111827;">
                        {{areas}}
                    </td>
                </tr>
            </table>
        </div>
        
        <div style="margin: 25px 0;">
            <h3 style="color: #374151; margin-bottom: 10px;">💬 Mensaje:</h3>
            <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; border-radius: 0 5px 5px 0;">
                <p style="margin: 0; color: #111827; line-height: 1.6;">
                    {{message}}
                </p>
            </div>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin: 5px 0;">
                📍 <em>Mensaje enviado desde el formulario de contacto de Solware</em>
            </p>
            <p style="margin: 5px 0;">
                🔄 <strong>Puedes responder directamente a este email</strong>
            </p>
        </div>
    </div>
</div>
```

## Settings:
- **To Email:** renebehrens90@gmail.com
- **From Name:** Solware - Formulario de Contacto  
- **Reply To:** {{reply_to}}

## Variables disponibles:
- {{from_name}} - Nombre del usuario
- {{from_email}} - Email del usuario
- {{phone}} - Teléfono con código de país
- {{areas}} - Servicios seleccionados
- {{message}} - Mensaje del usuario
- {{reply_to}} - Email para responder