// main.js - MRA VANGUARD

document.addEventListener('DOMContentLoaded', () => {
  // ======================
  // Smooth Scroll para navegación
  // ======================
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const navbarHeight = 80; // altura aproximada de la navbar fija
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ======================
  // Formulario de contacto con validación y feedback
  // ======================
  const form = document.querySelector('form[action*="formspree"]');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      // Validación básica adicional (HTML5 ya cubre required y type=email)
      const nombre = form.querySelector('input[name="nombre"]');
      const email = form.querySelector('input[name="email"]');
      const mensaje = form.querySelector('textarea[name="mensaje"]');

      let isValid = true;

      // Limpiar mensajes de error previos
      document.querySelectorAll('.error-msg').forEach(el => el.remove());

      // Validación extra simple
      if (nombre && nombre.value.trim().length < 3) {
        showError(nombre, 'El nombre debe tener al menos 3 caracteres');
        isValid = false;
      }

      if (mensaje && mensaje.value.trim().length < 20) {
        showError(mensaje, 'Por favor, describe brevemente tu necesidad (mínimo 20 caracteres)');
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
        return;
      }

      // Mostrar indicador de envío
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">⟳</span>
        Enviando...
      `;

      // Formspree maneja el envío real (POST)
      // Solo agregamos feedback visual
      try {
        // Pequeña espera simulada para mejor UX (Formspree es rápido)
        await new Promise(resolve => setTimeout(resolve, 800));

        // Éxito (Formspree redirige automáticamente si configuras "Redirect after submission")
        // Pero mostramos mensaje de éxito por si acaso
        showSuccessMessage(form);
        
      } catch (error) {
        console.error('Error en el envío:', error);
        showError(form, 'Hubo un problema al enviar. Inténtalo de nuevo.');
      } finally {
        // Restaurar botón (solo si no redirige)
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 3000);
      }
    });
  }

  // ======================
  // Funciones auxiliares
  // ======================
  function showError(input, message) {
    const error = document.createElement('p');
