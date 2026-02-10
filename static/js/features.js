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


    // ==================== #3: TERMINAL EASTER EGG ====================
    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const terminalClose = document.getElementById('terminal-close');

    const COMMANDS = {
        help: {
            output: [
                { text: '  Available Commands:', type: 'info' },
                { text: '  ─────────────────────────', type: '' },
                { text: '  help         Show this menu', type: '' },
                { text: '  about        About Robo-X Club', type: '' },
                { text: '  team         Meet the team', type: '' },
                { text: '  join         How to join', type: '' },
                { text: '  events       Upcoming events', type: '' },
                { text: '  skills       Tech stack we teach', type: '' },
                { text: '  fun          A fun fact', type: '' },
                { text: '  matrix       Enter the matrix', type: '' },
                { text: '  robot        ASCII robot', type: '' },
                { text: '  clear        Clear terminal', type: '' },
                { text: '  exit         Close terminal', type: '' },
            ]
        },
        about: {
            output: [
                { text: '  ╔══════════════════════════════════╗', type: 'info' },
                { text: '  ║       ROBO-X CLUB • EST. 2026    ║', type: 'info' },
                { text: '  ╚══════════════════════════════════╝', type: 'info' },
                { text: '', type: '' },
                { text: '  Chandigarh University\'s premier robotics community.', type: '' },
                { text: '  We learn, innovate, and build the future — one bot', type: '' },
                { text: '  at a time. From Arduino to ROS, from drones to', type: '' },
                { text: '  autonomous vehicles.', type: '' },
                { text: '', type: '' },
                { text: '  "The best way to predict the future is to build it."', type: 'warning' },
            ]
        },
        team: {
            output: [
                { text: '  🎓 HOD: Ajay Kumar Singh', type: 'info' },
                { text: '  📋 Coordinator: Ratnesh Kumar Shukla', type: 'info' },
                { text: '  👑 President: Sujal Negi', type: 'success' },
                { text: '  ⚡ Vice President: Arvind Kumar Singh', type: 'success' },
                { text: '  📝 Secretary: Taksh Singh', type: 'success' },
                { text: '', type: '' },
                { text: '  Type "join" to become one of us.', type: 'warning' },
            ]
        },
        join: {
            output: [
                { text: '  Redirecting to join page...', type: 'success' },
            ],
            action: () => setTimeout(() => window.location.href = '/join', 1500)
        },
        events: {
            output: [
                { text: '  📅 Upcoming Events:', type: 'info' },
                { text: '  ─────────────────────────', type: '' },
                { text: '  [FEB 13] Workshop — Seminar Hall', type: 'success' },
                { text: '  [TBA]    Hackathon 2026', type: 'warning' },
                { text: '  [TBA]    Project Showcase', type: 'warning' },
            ]
        },
        skills: {
            output: [
                { text: '  🛠️  Tech Stack We Teach:', type: 'info' },
                { text: '  ─────────────────────────', type: '' },
                { text: '  ► Arduino / ESP32 / Raspberry Pi', type: '' },
                { text: '  ► Python / C++ / ROS', type: '' },
                { text: '  ► Computer Vision (OpenCV)', type: '' },
                { text: '  ► Machine Learning / AI', type: '' },
                { text: '  ► 3D Printing / CAD', type: '' },
                { text: '  ► IoT & Sensor Integration', type: '' },
                { text: '  ► Drone Building', type: '' },
            ]
        },
        fun: {
            output: () => {
                const facts = [
                    '"The first robot was created in 1954 by George Devol."',
                    '"The word \'robot\' comes from Czech \'robota\' meaning forced labor."',
                    '"There are over 3 million industrial robots operating worldwide."',
                    '"Boston Dynamics\' Atlas can do backflips."',
                    '"NASA\'s Perseverance rover has a helicopter named Ingenuity."',
                    '"The smallest robot is 0.2mm — smaller than an ant\'s head."',
                    '"Japan has a hotel staffed almost entirely by robots."',
                ];
                return [
                    { text: '  🤖 Fun Fact:', type: 'info' },
                    { text: '  ' + facts[Math.floor(Math.random() * facts.length)], type: 'warning' },
                ];
            }
        },
        robot: {
            output: [
                { text: '       ___T_', type: 'ascii' },
                { text: '      | o o |', type: 'ascii' },
                { text: '      |__-__|', type: 'ascii' },
                { text: '      /| [] |\\', type: 'ascii' },
                { text: '    (d  b---b  b)', type: 'ascii' },
                { text: '      |     |', type: 'ascii' },
                { text: '      d     b', type: 'ascii' },
                { text: '', type: '' },
                { text: '  Beep boop! I am Robo-X! 🤖', type: 'success' },
            ]
        },
        matrix: {
            output: [
                { text: '  Wake up, Neo...', type: 'success' },
                { text: '  The Robo-X has you...', type: 'success' },
                { text: '  Follow the red wire. 🔴', type: 'error' },
            ],
            action: () => {
                // Rain effect
                const body = document.getElementById('terminal-body');
                if (!body) return;
                let count = 0;
                const matrixInterval = setInterval(() => {
                    const chars = '01アイウエオカキクケコサシスセソ';
                    let line = '  ';
                    for (let i = 0; i < 40; i++) {
                        line += chars[Math.floor(Math.random() * chars.length)];
                    }
                    addOutputLine(line, 'success');
                    body.scrollTop = body.scrollHeight;
                    count++;
                    if (count > 15) clearInterval(matrixInterval);
                }, 150);
            }
        },
    };

    function openTerminal() {
        if (terminalOverlay) {
            terminalOverlay.classList.add('active');
            setTimeout(() => terminalInput && terminalInput.focus(), 300);
        }
    }

    function closeTerminal() {
        if (terminalOverlay) terminalOverlay.classList.remove('active');
    }

    function addOutputLine(text, type) {
        if (!terminalBody) return;
        const line = document.createElement('p');
        line.className = 'terminal-output-line' + (type ? ' ' + type : '');
        line.textContent = text;
        // Insert before the input line
        const inputLine = terminalBody.querySelector('.terminal-input-line');
        if (inputLine) {
            terminalBody.insertBefore(line, inputLine);
        } else {
            terminalBody.appendChild(line);
        }
    }

    function processCommand(cmd) {
        const trimmed = cmd.trim().toLowerCase();
        addOutputLine('robox@club:~$ ' + cmd, '');

        if (trimmed === '') return;

        if (trimmed === 'clear') {
            // Remove all output lines except input line
            const lines = terminalBody.querySelectorAll('.terminal-output-line');
            lines.forEach(l => l.remove());
            return;
        }

        if (trimmed === 'exit') {
            closeTerminal();
            return;
        }

        const command = COMMANDS[trimmed];
        if (command) {
            const output = typeof command.output === 'function' ? command.output() : command.output;
            output.forEach(line => addOutputLine(line.text, line.type));
            if (command.action) command.action();
        } else {
            addOutputLine('  Command not found: ' + trimmed, 'error');
            addOutputLine('  Type "help" for available commands.', 'warning');
        }

        // Scroll to bottom
        if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Keyboard shortcut: Ctrl + ` (backtick) to toggle terminal
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            e.preventDefault();
            if (terminalOverlay && terminalOverlay.classList.contains('active')) {
                closeTerminal();
            } else {
                openTerminal();
            }
        }
        // Escape to close
        if (e.key === 'Escape' && terminalOverlay && terminalOverlay.classList.contains('active')) {
            closeTerminal();
        }
    });

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                processCommand(terminalInput.value);
                terminalInput.value = '';
            }
        });
    }

    if (terminalClose) {
        terminalClose.addEventListener('click', closeTerminal);
    }

    if (terminalOverlay) {
        terminalOverlay.addEventListener('click', (e) => {
            if (e.target === terminalOverlay) closeTerminal();
        });
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
