/**
 * Robo Mascot - Interactive Section Guide
 * Features: Standardized positioning, Smooth transitions, Idle Notifications, Rotating Messages
 * Mobile Optimized: Adapts position for small screens
 */

(function () {
    'use strict';

    // ==================== CONFIGURATION ====================
    const CONFIG = {
        transitionDuration: 800,
        messageDisplayTime: 5000,
        sectionThreshold: 0.5,
        idleThreshold: 10000,
        messageCooldown: 5000,
        rotationInterval: 8000,
    };

    // ==================== RESPONSIVE LOGIC ====================
    const isMobile = () => window.innerWidth < 768;

    // Standard positioning for Desktop
    const DESKTOP_LEFT = 'calc(100% - 100px)';

    // ==================== SECTION DEFINITIONS ====================
    // We dynamicallly calculate positions based on screen size
    const getSectionPos = (desktopTop) => {
        if (isMobile()) {
            // Mobile: Stick to Bottom Right (FAB style) to avoid blocking content
            // We ignore specific Top positions to prevent floating over text
            return { left: 'auto', right: '15px', top: 'auto', bottom: '20px' };
        }
        return { left: DESKTOP_LEFT, top: desktopTop, right: 'auto', bottom: 'auto' };
    };

    const SECTIONS = {
        home: {
            id: 'home',
            getPos: () => getSectionPos('150px'),
            messages: [
                "You bring curiosity, we bring circuits.",
                "Warning: This club may upgrade your brain.",
                "Future roboticist detected."
            ]
        },
        about: {
            id: 'about',
            getPos: () => getSectionPos('30vh'),
            messages: [
                "Nobody here started as an expert. That’s the fun part.",
                "Robots are built by teams, not lone geniuses.",
                "Curiosity is our real entrance exam."
            ]
        },
        activities: {
            id: 'activities',
            getPos: () => getSectionPos('40vh'),
            messages: [
                "Theory is nice. Building is better.",
                "48 hours. 3 ideas. 1 working prototype.",
                "Cool projects beat high marks in interviews."
            ]
        },
        team: {
            id: 'team',
            getPos: () => getSectionPos('20vh'),
            messages: [
                "These humans help turn ideas into machines.",
                "Mentors: high knowledge, low ego."
            ]
        },
        contact: {
            id: 'contact',
            getPos: () => getSectionPos('40vh'),
            messages: [
                "Questions build better engineers.",
                "Even great roboticists started by asking simple questions."
            ]
        }
    };

    // ==================== STATE ====================
    const state = {
        currentSection: null,
        lastMessageTime: 0,
        observer: null,
        isHovered: false,
        idleTimer: null,
        isIdle: false,
        rotationTimer: null,
        messageIndex: 0
    };

    // ==================== DOM ELEMENTS ====================
    let robot, robotImg, speechBubble, footer;

    // ==================== INITIALIZATION ====================
    function init() {
        robot = document.getElementById('guide-robot');
        robotImg = document.getElementById('robot-img');
        footer = document.querySelector('.doodle-footer');

        if (!robot || !robotImg) return;

        // Create speech bubble
        if (!robot.querySelector('.robo-speech-bubble')) {
            speechBubble = document.createElement('div');
            speechBubble.className = 'robo-speech-bubble';
            speechBubble.innerHTML = '<span class="bubble-text"></span>';
            robot.appendChild(speechBubble);
        } else {
            speechBubble = robot.querySelector('.robo-speech-bubble');
        }

        // Apply transition styles
        robot.style.transition = `
            top ${CONFIG.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
            left ${CONFIG.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
            right ${CONFIG.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
            bottom ${CONFIG.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
            transform ${CONFIG.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)
        `;

        setupObserver();
        setupInteractions();
        setupFooterCollision();
        setupIdleDetection();

        // Handle Resize
        window.addEventListener('resize', () => {
            if (state.currentSection) onSectionEnter(state.currentSection);
        });

        setTimeout(() => {
            if (window.scrollY < 100) onSectionEnter('home');
        }, 500);
    }

    // ==================== INTERSECTION OBSERVER ====================
    function setupObserver() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0.2, 0.5]
        };

        state.observer = new IntersectionObserver((entries) => {
            let maxRatio = 0;
            let targetSection = null;

            entries.forEach(entry => {
                const sectionId = entry.target.id;
                if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                    if (SECTIONS[sectionId]) {
                        maxRatio = entry.intersectionRatio;
                        targetSection = sectionId;
                    }
                }
            });

            resetIdleTimer();

            if (targetSection && targetSection !== state.currentSection && maxRatio > 0.3) {
                onSectionEnter(targetSection);
            }
        }, options);

        Object.keys(SECTIONS).forEach(id => {
            const el = document.getElementById(id);
            if (el) state.observer.observe(el);
        });
    }

    // ==================== SECTION LOGIC ====================
    function onSectionEnter(sectionId) {
        if (!SECTIONS[sectionId]) return;
        state.currentSection = sectionId;

        const section = SECTIONS[sectionId];
        const pos = section.getPos();

        // Standardize transform
        robot.style.transform = 'translateX(0)';

        // Apply position based on responsiveness
        if (isMobile()) {
            // Mobile: Clear inline styles to let CSS handle static positioning
            robot.style.position = '';
            robot.style.top = '';
            robot.style.bottom = '';
            robot.style.left = '';
            robot.style.right = '';
            robot.style.transform = '';
            // Ensure static display
            robot.classList.add('mobile-static');
        } else {
            robot.classList.remove('mobile-static');
            if (pos.right !== 'auto') {
                robot.style.left = 'auto';
                robot.style.right = pos.right;
            } else {
                robot.style.left = pos.left;
                robot.style.right = 'auto';
            }

            if (pos.bottom !== 'auto') {
                robot.style.top = 'auto';
                robot.style.bottom = pos.bottom;
                // Add fixed bottom class/style to prevent floating mid-page
                robot.style.position = 'fixed';
            } else {
                robot.style.top = pos.top;
                robot.style.bottom = 'auto';
                robot.style.position = 'fixed'; // Ensure fixed for desktop
            }
        }

        // Clear previous rotation
        if (state.rotationTimer) clearInterval(state.rotationTimer);

        // Handle Messages
        if (section.messages) {
            state.messageIndex = 0;
            showPersistentMessage(section.messages[0]);
            state.rotationTimer = setInterval(() => {
                if (state.isHovered || state.isIdle) return;
                state.messageIndex = (state.messageIndex + 1) % section.messages.length;
                showPersistentMessage(section.messages[state.messageIndex]);
            }, CONFIG.rotationInterval);
        } else if (section.message) {
            setTimeout(() => {
                if (!state.isHovered && canShowMessage()) {
                    showMessage(section.message);
                }
            }, 600);
        }
    }

    // ==================== IDLE & NOTIFICATION LOGIC ====================
    function setupIdleDetection() {
        ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'].forEach(evt =>
            document.addEventListener(evt, resetIdleTimer, { passive: true })
        );
        resetIdleTimer();
    }

    function resetIdleTimer() {
        state.isIdle = false;
        if (state.idleTimer) clearTimeout(state.idleTimer);
        state.idleTimer = setTimeout(() => {
            state.isIdle = true;
            checkIdleAction();
        }, CONFIG.idleThreshold);
    }

    function checkIdleAction() {
        if (canShowMessage()) {
            showMessage("Still thinking? Great ideas take time.");
        }
    }

    // ==================== MESSAGES ====================
    function canShowMessage() {
        return (Date.now() - state.lastMessageTime > CONFIG.messageCooldown);
    }

    function showPersistentMessage(text) {
        showMessage(text);
    }

    function showMessage(text) {
        if (!speechBubble || !text) return;
        updateBubble(text);
        if (state.messageTimer) clearTimeout(state.messageTimer);
        state.messageTimer = setTimeout(() => {
            speechBubble.classList.remove('show');
        }, CONFIG.messageDisplayTime);
    }

    function updateBubble(text) {
        const bubbleText = speechBubble.querySelector('.bubble-text');
        if (bubbleText) bubbleText.textContent = text;
        speechBubble.classList.add('show');
        state.lastMessageTime = Date.now();
    }

    // ==================== INTERACTIONS ====================
    function setupInteractions() {
        robot.addEventListener('click', (e) => {
            e.stopPropagation();
            robot.classList.remove('robo-bounce');
            void robot.offsetWidth;
            robot.classList.add('robo-bounce');
            const section = SECTIONS[state.currentSection];
            if (section) {
                const msg = section.messages ? section.messages[state.messageIndex] : section.message;
                showMessage(msg);
            }
        });

        // Hover events (same as before)
        robot.addEventListener('mouseenter', () => {
            state.isHovered = true;
            robotImg.style.transform = 'scale(1.1)';
        });
        robot.addEventListener('mouseleave', () => {
            state.isHovered = false;
            robotImg.style.transform = 'scale(1)';
        });

        // ... (Btn, Learn, Activity, Team hovers - kept compact for rewrite)
        // Re-adding interaction listeners briefly
        const joinButtons = document.querySelectorAll('.primary-btn, .btn-join');
        joinButtons.forEach(btn =>
            btn.addEventListener('mouseenter', () => showMessage("One click closer to building something that moves.")));

        const learnCard = document.querySelector('.timeline-step');
        if (learnCard)
            learnCard.addEventListener('mouseenter', () => showMessage("Step 1: Break things. Step 2: Understand them."));

        const activityCards = document.querySelectorAll('#activities .doodle-card');
        const activityMessages = [
            ["Theory is nice. Building is better.", "Your first robot won’t be perfect. That’s normal."],
            ["48 hours. 3 ideas. 1 working prototype.", "Coffee becomes fuel here."],
            ["Cool projects beat high marks in interviews.", "Your GitHub is your real resume."]
        ];
        activityCards.forEach((card, index) => {
            if (activityMessages[index])
                card.addEventListener('mouseenter', () => showMessage(activityMessages[index][Math.floor(Math.random() * activityMessages[index].length)]));
        });

        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card =>
            card.addEventListener('mouseenter', () => showMessage("This human has solved problems Google couldn’t.")));

        const emailBtn = document.getElementById('email-btn');
        if (emailBtn)
            emailBtn.addEventListener('mouseenter', () => showMessage("Send signal. We respond."));
    }

    // ==================== FOOTER COLLISION ====================
    function setupFooterCollision() {
        window.addEventListener('scroll', () => {
            if (!footer) return;
            // On mobile, if we are in FAB mode (bottom-right fixed), check overlap differently?
            // Actually, if fixed to bottom 20px, it might overlap footer content if footer is tall?
            // Yes, collision check is still good.

            const footerRect = footer.getBoundingClientRect();
            const robotHeight = robot.offsetHeight || 100;
            const currentTop = robot.getBoundingClientRect().top;

            // If robot overlaps footer
            if (currentTop + robotHeight > footerRect.top - 20) {
                // On mobile, if fixed bottom, we might need to adjust 'bottom' or change to absolute
                if (isMobile()) {
                    // Mobile: Do nothing, let CSS handle it (static at bottom)
                } else {
                    // Desktop top-based logic
                    robot.style.top = (footerRect.top - robotHeight - 20) + 'px';
                    robot.style.bottom = 'auto'; // Ensure bottom doesn't conflict
                }
            } else {
                // Restore default bottom if mobile and not overlapping?
                if (isMobile()) {
                    // Mobile: Do nothing
                }
            }
        }, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
