// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const smoothScrollToTop = () => {
            const startPosition = window.pageYOffset; // Current scroll position
            const distance = -startPosition; // Distance to scroll
            const duration = 500; // Duration of the scroll in ms
            let startTime = null;

            const animation = currentTime => {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1); // Clamp progress to 1
                const easeInOutQuad = progress < 0.5 
                    ? 2 * progress * progress 
                    : -1 + (4 - 2 * progress) * progress; // Easing function

                window.scrollTo(0, startPosition + distance * easeInOutQuad);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation); // Continue the animation
                }
            };

            requestAnimationFrame(animation); // Start the animation
        };

        smoothScrollToTop(); // Call the function to smooth scroll to top

    }, [pathname]);

    return null;
};

export default ScrollToTop;
