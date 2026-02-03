document.addEventListener('DOMContentLoaded', () => {
    const robot = document.getElementById('guide-robot');
    const speechBubble = document.getElementById('robot-speech');
    const logo = document.querySelector('.robox-logo');

    function positionRobot() {
        if (logo && robot) {
            const rect = logo.getBoundingClientRect();
            // Position to the right of the logo (Absolute Page Coordinates)
            const targetX = rect.right + 10 + window.scrollX;
            // Center vertically relative to logo
            const targetY = rect.top + window.scrollY + (rect.height / 2) - 35;

            robot.style.left = `${targetX}px`;
            robot.style.top = `${targetY}px`;
        }
    }

    // Listeners
    window.addEventListener('resize', positionRobot);

    // Initial call
    positionRobot();
});

