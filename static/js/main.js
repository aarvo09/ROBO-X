document.addEventListener('DOMContentLoaded', () => {
    console.log('Robo-X Club Website Loaded');

    // Example: Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Notification Icon Toggle
    const notificationIcon = document.getElementById('notification-icon');
    const notificationDropdown = document.getElementById('notification-dropdown');

    if (notificationIcon && notificationDropdown) {
        notificationIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing immediately
            notificationDropdown.classList.toggle('show-notification');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationIcon.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('show-notification');
            }
        });
    }

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside (mobile UX)
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // ==================== TEAM MEMBER MODAL ====================
    const modal = document.getElementById('member-modal');
    const modalImg = document.getElementById('modal-img');
    const modalPlaceholder = document.getElementById('modal-placeholder');
    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    const modalInfo = document.getElementById('modal-info');
    const modalQuote = document.getElementById('modal-quote');
    const modalClose = document.getElementById('modal-close');

    // Open modal on team card click
    document.querySelectorAll('.home-team-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.dataset.name;
            const role = card.dataset.role;
            const info = card.dataset.info;
            const quote = card.dataset.quote;
            const img = card.dataset.img;
            const imgPosition = card.dataset.imgPosition || 'center';

            if (!name) return;

            modalName.textContent = name;
            modalRole.textContent = role;
            modalInfo.textContent = info;
            modalQuote.textContent = quote;

            if (img) {
                modalImg.src = img;
                modalImg.alt = name;
                modalImg.style.display = 'block';
                modalImg.style.objectPosition = imgPosition;
                if (modalPlaceholder) modalPlaceholder.style.display = 'none';
            } else {
                modalImg.style.display = 'none';
                if (modalPlaceholder) modalPlaceholder.style.display = 'block';
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==================== HOME TEAM SCROLL REVEAL ====================
    const homeTeamCards = document.querySelectorAll('.home-team-card');
    if (homeTeamCards.length > 0) {
        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    teamObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        homeTeamCards.forEach(card => teamObserver.observe(card));
    }
});
