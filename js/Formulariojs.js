document.addEventListener("DOMContentLoaded", () => {
  const servicioSelect = document.getElementById("servicio");
  const precioInput = document.getElementById("precio"); // Campo de precio visible
  const contactForm = document.getElementById("contactForm");
  const mensajeDiv = document.getElementById("mensaje");

  servicioSelect.addEventListener("change", () => {
    const selectedOption = servicioSelect.options[servicioSelect.selectedIndex];
    const precio = selectedOption.dataset.precio;

    if (precio) {
      precioInput.value = precio; // Actualiza el campo visible
    } else {
      precioInput.value = "";
    }
  });

  // Manejar el envío del formulario
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const datosFormulario = {
      nombre: formData.get("nombre"),
      apellido: formData.get("apellido"),
      correo_electronico: formData.get("email"),
      telefono: formData.get("telefono"),
      fecha_ingreso: formData.get("fechaIngreso"),
      servicio: formData.get("servicio"),
      precio: parseFloat(formData.get("precio")), // Obtener precio del campo visible y convertirlo a número
    };

    try {
      const response = await fetch(
        "https://datos-formulario.solwaremap.workers.dev",
        {
          // Ruta correcta del Worker
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosFormulario),
        }
      );

      if (response.ok) {
        mensajeDiv.textContent = "Datos enviados correctamente";
        contactForm.reset();
      } else {
        mensajeDiv.textContent = "Error al enviar los datos";
      }
    } catch (error) {
      console.error("Error:", error);
      mensajeDiv.textContent = "Error al enviar los datos";
    }
  });
});

