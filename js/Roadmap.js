// Datos de las fases del roadmap
const phases = [
  {
    title: "Fase 1: Preparación y Aprendizaje (Mes 1-2)",
    icon: "fas fa-book",
    tasks: [
      "Investigación de Mercado: Identificar nichos, analizar competencia, definir cliente ideal.",
      "Dominio de SQLite: Instalar, practicar consultas, crear base de datos de Solware.",
      "Inmersión en GoHighLevel: Explorar funcionalidades, crear flujos de trabajo, experimentar con integraciones.",
      "Desarrollo de Habilidades: Cursos online sobre marketing, automatización, desarrollo web y diseño.",
      "Investigación de Plataformas de Hosting: Analizar opciones de hosting en la nube (DigitalOcean, Render, AWS, GCP, etc.).",
    ],
  },
  {
    title: "Fase 2: Desarrollo y Validación (Mes 3-4)",
    icon: "fas fa-code",
    tasks: [
      "Diseño y Desarrollo del Sitio Web: Estructura, wireframes, HTML, CSS, JavaScript, integración con SQLite, SEO.",
      "Implementación de Chatbots: Configurar ManyChat, crear flujos de conversación, integrar con GoHighLevel.",
      "Validación del Modelo de Negocio: Ofrecer servicios a clientes piloto, recopilar feedback, ajustar.",
      "Establecer Precios y Paquetes: Analizar costos, definir precios competitivos y paquetes escalables.",
    ],
  },
  {
    title: "Fase 3: Lanzamiento y Crecimiento Inicial (Mes 5-8)",
    icon: "fas fa-rocket",
    tasks: [
      "Lanzamiento Oficial: Campaña de marketing, materiales promocionales, promociones especiales.",
      "Adquisición de Clientes: Perfiles en freelance, redes sociales, marketing de contenidos, alianzas, publicidad online.",
      "Implementación de Proyectos Piloto: Seleccionar clientes, demostrar valor, obtener testimonios.",
      "Optimización Continua: Recopilar feedback, analizar datos, mejorar servicios y estrategias.",
    ],
  },
  {
    title: "Fase 4: Escalabilidad y Consolidación (Mes 9-12)",
    icon: "fas fa-chart-line",
    tasks: [
      "Migración a la Nube: Elegir proveedor (DigitalOcean, Render, AWS, GCP), crear base de datos PostgreSQL/MySQL, migrar datos, configurar dominio.",
      "Desarrollo de la Integración: Elegir herramienta (Zapier, Make, personalizado), diseñar integración, sincronizar datos, control de errores.",
      "Expansión de Servicios: Automatizaciones complejas, integración con Power BI, paquetes personalizados, nuevos servicios (consultoría, capacitación).",
      "Fortalecimiento de la Marca: Definir identidad, estrategia de marketing de contenidos, redes sociales, publicidad, alianzas, eventos.",
    ],
  },
];

const timelineContainer = document.querySelector(".timeline");

// Función para crear un elemento de línea de tiempo
function createTimelineItem(phase) {
  const timelineItem = document.createElement("div");
  timelineItem.classList.add(
    "timeline-item",
    `fase${phases.indexOf(phase) + 1}`
  );

  const title = document.createElement("h3");
  title.innerHTML = `<i class="${phase.icon}"></i> ${phase.title}`;
  timelineItem.appendChild(title);

  const taskList = document.createElement("ul");
  phase.tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    taskList.appendChild(listItem);
  });
  timelineItem.appendChild(taskList);

  return timelineItem;
}

// Generar el roadmap dinámicamente
phases.forEach((phase) => {
  const timelineItem = createTimelineItem(phase);
  timelineContainer.appendChild(timelineItem);
});
