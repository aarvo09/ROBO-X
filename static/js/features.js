/**
 * Features JS — Dark Mode, Countdown, Terminal Easter Egg, Roadmap Animations
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== #8: DARK / LIGHT MODE ====================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('robox-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('robox-theme', next);

            // Subtle animation
            themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => themeToggle.style.transform = '', 400);
        });
    }

    // ==================== #10: EVENT COUNTDOWN TIMER ====================
    const countdownSection = document.getElementById('countdown');
    if (countdownSection) {
        // Target event: customize this date
        const eventDate = new Date('2026-02-13T10:00:00').getTime();
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-mins');
        const secsEl = document.getElementById('cd-secs');

        function updateCountdown() {
            const now = new Date().getTime();
            const diff = eventDate - now;

            if (diff <= 0) {
                // Event has passed
                if (daysEl) daysEl.textContent = '0';
                if (hoursEl) hoursEl.textContent = '0';
                if (minsEl) minsEl.textContent = '0';
                if (secsEl) secsEl.textContent = '0';
                const eventName = countdownSection.querySelector('.countdown-event-name');
                if (eventName) eventName.textContent = '🚀 The event is happening NOW!';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            // Animate number changes
            function animateUpdate(el, newVal) {
                if (!el) return;
                const strVal = String(newVal);
                if (el.textContent !== strVal) {
                    el.textContent = strVal;
                    el.parentElement.classList.add('pulse');
                    setTimeout(() => el.parentElement.classList.remove('pulse'), 500);
                }
            }

            animateUpdate(daysEl, days);
            animateUpdate(hoursEl, hours);
            animateUpdate(minsEl, mins);
            animateUpdate(secsEl, secs);
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }


    // ==================== #4: ROADMAP SCROLL ANIMATIONS ====================
    const roadmapNodes = document.querySelectorAll('.roadmap-node');
    if (roadmapNodes.length > 0) {
        const roadmapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        roadmapNodes.forEach(node => {
            node.style.opacity = '0';
            node.style.transform = 'translateY(30px)';
            node.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            roadmapObserver.observe(node);
        });
    }

});
