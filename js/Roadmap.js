// Datos de las fases del roadmap (los mismos que antes)
const phases = [
  /* ... (tus datos de fases) ... */
];

// Obtener elementos del DOM
const tabs = document.querySelectorAll('nav a');
const tabContents = document.querySelectorAll('.tab-content');

// Función para crear un elemento de línea de tiempo (la misma que antes)
function createTimelineItem(phase) {
  /* ... (tu función createTimelineItem) ... */
}

// Función para mostrar el contenido de una pestaña
function showTab(tabId) {
  tabs.forEach(tab => tab.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));

  const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
  const selectedContent = document.getElementById(tabId);
  selectedTab.classList.add('active');
  selectedContent.classList.add('active');

  // Generar el roadmap dinámicamente solo si la pestaña ROADMAP está activa
  if (tabId === 'roadmap') {
    timelineContainer.innerHTML = ''; // Limpiar el contenido anterior
    phases.forEach(phase => {
      const timelineItem = createTimelineItem(phase);
      timelineContainer.appendChild(timelineItem);
    });
  }
}

// Event listeners para los clics en las pestañas
tabs.forEach(tab => {
  tab.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del enlace
    const tabId = tab.dataset.tab;
    showTab(tabId);
  });
});

// Mostrar la pestaña HOME por defecto al cargar la página
showTab('home');
