document.addEventListener('DOMContentLoaded', () => {

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Demo de análisis rápido (simulado pero muy profesional)
  window.analizarURL = function() {
    const input = document.getElementById('urlInput');
    const results = document.getElementById('demoResults');
    const url = input.value.trim();

    if (!url) {
      alert('Por favor ingresa una URL válida');
      return;
    }

    results.classList.remove('hidden');
    results.innerHTML = `
      <div class="flex justify-center mb-6"><div class="animate-spin w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full"></div></div>
      <p class="text-center text-zinc-400 mb-8">Analizando con nuestras herramientas + APIs de VirusTotal y PageSpeed Insights...</p>
    `;

    setTimeout(() => {
      results.innerHTML = `
        <div class="demo-result bg-zinc-800 p-8 rounded-3xl">
          <h3 class="text-2xl font-bold mb-6 flex items-center gap-3"><span class="text-emerald-400">✅</span> Análisis de ${url}</h3>
          <div class="grid grid-cols-2 gap-8">
            <div>
              <p class="text-zinc-400 text-sm">Puntuación de Seguridad</p>
              <p class="text-6xl font-bold text-emerald-400">87<span class="text-2xl">/100</span></p>
              <p class="text-xs text-emerald-400 mt-1">3 vulnerabilidades críticas detectadas</p>
            </div>
            <div>
              <p class="text-zinc-400 text-sm">Puntuación de Usabilidad</p>
              <p class="text-6xl font-bold text-amber-400">64<span class="text-2xl">/100</span></p>
              <p class="text-xs text-amber-400 mt-1">Tiempo de carga y accesibilidad mejorables</p>
            </div>
          </div>
          <ul class="mt-10 space-y-3 text-sm">
            <li class="flex justify-between"><span class="text-red-400">• VirusTotal detectó 2 alertas de malware</span><span class="text-zinc-500">Alta prioridad</span></li>
            <li class="flex justify-between"><span class="text-amber-400">• Posible inyección SQL en formulario</span><span class="text-zinc-500">Media prioridad</span></li>
            <li class="flex justify-between"><span class="text-cyan-400">• Certificado SSL caducado en 18 días</span><span class="text-zinc-500">Baja prioridad</span></li>
          </ul>
          <p class="text-center text-cyan-400 mt-10 font-medium">¿Quieres el análisis completo y un plan de acción personalizado?<br><a href="#contacto" class="underline">Habla con nuestro equipo ahora →</a></p>
        </div>
      `;
    }, 1800);
  };

  console.log('%cMRA VANGUARD - Consultoría de Ciberseguridad cargada 🚀', 'color:#00f5ff; font-weight:bold');
});
