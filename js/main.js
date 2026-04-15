/**
 * MRA VANGUARD - Lógica de Interfaz
 */

function analizarURL() {
    const urlInput = document.getElementById('urlInput').value;
    const resultsDiv = document.getElementById('demoResults');

    if (!urlInput || !urlInput.includes('.')) {
        alert("Por favor, ingrese una URL válida.");
        return;
    }

    // Mostrar estado de carga
    resultsDiv.classList.remove('hidden');
    resultsDiv.innerHTML = `
        <div class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            <span class="ml-4 text-zinc-400 font-mono">Iniciando escaneo OWASP en ${urlInput}...</span>
        </div>
    `;

    // Simulación de análisis por etapas
    const etapas = [
        "Verificando certificados SSL/TLS...",
        "Escaneando encabezados de seguridad (HSTS, CSP)...",
        "Buscando puertos abiertos y servicios expuestos...",
        "Analizando scripts de pasarelas de pago..."
    ];

    let i = 0;
    const interval = setInterval(() => {
        if (i < etapas.length) {
            resultsDiv.innerHTML = `
                <div class="flex items-center justify-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                    <span class="ml-4 text-zinc-400 font-mono">${etapas[i]}</span>
                </div>
            `;
            i++;
        } else {
            clearInterval(interval);
            mostrarResultadoFinal(urlInput);
        }
    }, 1200);
}

function mostrarResultadoFinal(url) {
    const resultsDiv = document.getElementById('demoResults');
    
    // Resultados simulados pero con tono profesional
    resultsDiv.innerHTML = `
        <div class="demo-result bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div class="flex justify-between items-center mb-6">
                <h4 class="font-bold text-lg text-cyan-400">Reporte Preliminar: ${url}</h4>
                <span class="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded-full border border-yellow-500/20 font-bold">RIESGO MODERADO</span>
            </div>
            
            <div class="grid md:grid-cols-3 gap-4 mb-6">
                <div class="p-4 bg-black rounded-xl border border-zinc-800">
                    <p class="text-zinc-500 text-xs mb-1">Cifrado SSL</p>
                    <p class="text-green-400 font-bold">Óptimo</p>
                </div>
                <div class="p-4 bg-black rounded-xl border border-zinc-800">
                    <p class="text-zinc-500 text-xs mb-1">Encabezados</p>
                    <p class="text-red-400 font-bold">Faltan CSP/HSTS</p>
                </div>
                <div class="p-4 bg-black rounded-xl border border-zinc-800">
                    <p class="text-zinc-500 text-xs mb-1">Pasarelas</p>
                    <p class="text-cyan-400 font-bold">Detectadas</p>
                </div>
            </div>

            <p class="text-sm text-zinc-400 mb-6 italic">
                * Se han detectado posibles fugas de información en encabezados y falta de blindaje en scripts transaccionales. Este análisis es superficial.
            </p>

            <button onclick="document.getElementById('contacto').scrollIntoView()" class="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl transition-all">
                Obtener Informe Detallado Gratis
            </button>
        </div>
    `;
}

// Suavizar scroll de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
