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

    // Add more general interactivity here
});
