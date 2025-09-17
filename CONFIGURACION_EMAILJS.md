# Configuración EmailJS - Paso a Paso

## Una vez que tengas las credenciales, reemplaza en src/lib/emailjs-config.ts:

```typescript
export const emailjsConfig = {
  // Reemplaza con tu Service ID real
  serviceId: 'service_XXXXXXX',
  
  // Reemplaza con tu Template ID real  
  templateId: 'template_XXXXXXX',
  
  // Reemplaza con tu Public Key real
  publicKey: 'XXXXXXXXXXXXXXX',
  
  // Email de destino
  toEmail: 'renebehrens90@gmail.com'
}
```

## Dónde encontrar cada valor:

### Service ID
1. Ve a Email Services en EmailJS
2. Busca el servicio Gmail que creaste
3. El ID aparece como "service_xxxxxxx"

### Template ID  
1. Ve a Email Templates en EmailJS
2. Busca el template que creaste
3. El ID aparece como "template_xxxxxxx"

### Public Key
1. Ve a Account > API Keys
2. Copia tu Public Key
3. Es una string larga como "abcdef123456789"

## Variables del Template
Asegúrate de incluir estas variables en tu template:
- {{from_name}}
- {{from_email}} 
- {{phone}}
- {{areas}}
- {{message}}
- {{reply_to}}

## Prueba
Una vez configurado:
1. Reinicia el servidor (Ctrl+C, luego pnpm dev)
2. Prueba el formulario
3. Revisa la consola para logs
4. Verifica que llegue el email