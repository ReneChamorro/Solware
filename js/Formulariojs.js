// Datos del form
document.addEventListener("DOMContentLoaded", () => {
  const servicioSelect = document.getElementById("servicio");
  const precioInput = document.getElementById("precio");

  servicioSelect.addEventListener("change", () => {
    const selectedOption = servicioSelect.options[servicioSelect.selectedIndex];
    const precio = selectedOption.dataset.precio; // Corrección aquí: usar dataset.precio

    if (precio) {
      precioInput.value = precio;
    } else {
      precioInput.value = "";
    }
  });
});
