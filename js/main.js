// main.js - MRA VANGUARD

document.addEventListener('DOMContentLoaded', () => {
    console.log('%cMRA VANGUARD - Sitio premium cargado correctamente', 'color: #00d4ff; font-weight: bold; font-size: 13px;');

    // Scroll suave para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación de aparición de tarjetas al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.service-card, .cert-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });

    // Efecto en botones principales
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const originalText = this.textContent;
            if (originalText.includes('Diagnóstico') || originalText.includes('Conversación')) {
                this.style.transition = 'all 0.3s';
                this.textContent = 'Procesando...';
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1600);
            }
        });
    });

    // Pequeño efecto parallax sutil en el hero (opcional)
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollY = window.scrollY;
            hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
        }
    });
});
