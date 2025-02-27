const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Ruta para manejar las solicitudes a la API de OpenAI
app.post('/api/chat', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: req.body.messages,
      max_tokens: req.body.max_tokens,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // API Key desde las variables de entorno
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data); // Enviar la respuesta de OpenAI al cliente
  } catch (error) {
    console.error("Error al comunicarse con la API de OpenAI:", error);
    res.status(500).send("Error en la comunicación con la API");
  }
});

// Configurar el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
