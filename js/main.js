// main.js - MRA VANGUARD

function analizarURL() {
    const input = document.getElementById('urlInput');
    const resultado = document.getElementById('resultado');
    
    if (!input || input.value.trim() === '') {
        alert('Por favor ingresa una URL válida');
        return;
    }

    resultado.classList.remove('hidden');
    resultado.innerHTML = `
        <div class="bg-[#0a1729] border border-cyan-400 rounded-2xl p-8 text-left max-w-md mx-auto">
            <div class="flex justify-between items-center mb-6">
                <p class="font-semibold text-cyan-400">✅ Análisis completado</p>
                <p class="text-sm bg-green-500 text-black px-4 py-1 rounded-full">Seguridad: 87/100</p>
            </div>
            <p class="text-sm mb-4"><strong>URL analizada:</strong> ${input.value}</p>
            <ul class="space-y-3 text-sm">
                <li class="flex justify-between"><span class="text-gray-400">Vulnerabilidades críticas:</span> <span class="text-red-400">2</span></li>
                <li class="flex justify-between"><span class="text-gray-400">Problemas de usabilidad:</span> <span class="text-amber-400">1</span></li>
                <li class="flex justify-between"><span class="text-gray-400">Tiempo de carga:</span> <span class="text-green-400">1.8s</span></li>
                <li class="flex justify-between"><span class="text-gray-400">SSL / HTTPS:</span> <span class="text-green-400">Correcto</span></li>
            </ul>
            <p class="text-xs text-gray-500 mt-8">Este es un análisis ilustrativo. El informe completo y personalizado lo entregamos en nuestra consultoría.</p>
            <button onclick="contactar()" class="mt-6 w-full bg-cyan-400 text-black py-3 rounded-2xl font-semibold">Obtener informe completo →</button>
        </div>
    `;
}

function contactar() {
    alert('Gracias. En breve te contactaremos para entregarte el informe completo.');
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('✅ Mensaje recibido correctamente.\n\nTe responderemos en las próximas horas vía correo o WhatsApp.');
    this.reset();
});

// Cookies
function mostrarBannerCookies() {
    if (!localStorage.getItem('cookiesAceptadas')) {
        document.getElementById('cookieBanner').classList.remove('hidden');
    }
}

function aceptarCookies() {
    localStorage.setItem('cookiesAceptadas', 'true');
    document.getElementById('cookieBanner').classList.add('hidden');
}

function rechazarCookies() {
    localStorage.setItem('cookiesAceptadas', 'true');
    document.getElementById('cookieBanner').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarBannerCookies();
    console.log('%c🛡️ MRA VANGUARD - Sitio cargado correctamente', 'color:#22d3ee; font-weight:600');
});
