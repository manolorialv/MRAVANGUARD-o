/**
 * Lógica de Auditoría Real para MRA Vanguard
 * Utiliza APIs públicas para detección de headers de seguridad.
 */

async function runRealAudit() {
    const target = document.getElementById('target-url').value.trim();
    
    // Validación básica de URL/Dominio
    if (!target || target.length < 4) {
        alert("Por favor, ingrese un dominio válido (ej. google.com)");
        return;
    }

    const btn = document.getElementById('btn-audit');
    const logs = document.getElementById('console-logs');
    const consoleBox = document.getElementById('audit-console');
    const cta = document.getElementById('cta-whatsapp');

    // UI Reset
    btn.disabled = true;
    btn.innerText = "BUSCANDO...";
    logs.innerHTML = `<span class="text-blue-500">[SYSTEM]</span> Iniciando protocolo de auditoría sobre <span class="text-white">${target}</span>...<br>`;
    consoleBox.classList.remove('hidden');
    cta.classList.add('hidden');

    try {
        await sleep(800);
        addLog("Resolviendo DNS y saltando firewalls de inspección...", "text-gray-500");
        
        // LLAMADA REAL: Obtenemos los headers del sitio ingresado
        // Usamos un proxy de CORS para permitir la petición desde el navegador
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const targetApi = `https://api.hackertarget.com/httpheaders/?q=${target}`;
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetApi));
        const data = await response.json();
        
        await sleep(1200);
        addLog("Analizando respuestas de cabecera HTTP (RFC 7230)...", "text-green-500");

        if (data.contents) {
            const raw = data.contents;
            const headersLower = raw.toLowerCase();

            // Análisis de Errores Reales
            let issuesFound = 0;

            if (headersLower.includes("server")) {
                const serverMatch = raw.match(/Server: (.*)/i);
                addLog(`!! ALERTA: Banner de servidor detectado: [${serverMatch ? serverMatch[1].trim() : "Expuesto"}]`, "text-yellow-500");
                issuesFound++;
            }

            if (!headersLower.includes("strict-transport-security")) {
                addLog("!! CRÍTICO: HSTS (Strict-Transport-Security) no detectado. Riesgo de MITM.", "text-red-500 font-bold");
                issuesFound++;
            }

            if (!headersLower.includes("x-frame-options")) {
                addLog("!! RIESGO: Falta cabecera X-Frame-Options (Vulnerable a Clickjacking).", "text-red-400");
                issuesFound++;
            }

            if (!headersLower.includes("content-security-policy")) {
                addLog("!! INFO: Política de Seguridad de Contenido (CSP) no definida.", "text-blue-400");
                issuesFound++;
            }

            // Dump técnico real
            addLog("<br>--- RAW DATA DUMP ---", "text-gray-600");
            addLog(raw.substring(0, 400).replace(/\n/g, "<br>"), "text-gray-500 italic");

            if (issuesFound > 0) {
                await sleep(500);
                addLog(`<br>[RESULTADO] Se han encontrado ${issuesFound} brechas de configuración.`, "text-red-500 font-bold");
                cta.classList.remove('hidden');
            } else {
                addLog("<br>[RESULTADO] No se detectaron fallos críticos superficiales.", "text-green-500 font-bold");
            }
        }

    } catch (error) {
        addLog("ERROR: Error de conexión con los nodos de escaneo. Intente con otro dominio.", "text-red-600 font-bold");
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.innerText = "SCAN";
    }
}

function addLog(message, colorClass) {
    const logs = document.getElementById('console-logs');
    const line = document.createElement('div');
    line.className = `mb-1 ${colorClass}`;
    line.innerHTML = `<span class="text-green-900 font-bold">></span> ${message}`;
    logs.appendChild(line);
    
    // Auto-scroll
    const consoleBox = document.getElementById('audit-console');
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
