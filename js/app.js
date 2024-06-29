document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Build the nav
    sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = section.querySelector('h2').textContent;
        a.href = `#${section.id}`;
        li.appendChild(a);
        navbar.appendChild(li);
    });

    updateSectionStatus();

    // Add active class to section in viewport
    window.addEventListener('scroll', updateSectionStatus);

    function updateSectionStatus() {
        let currentSection;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                currentSection = section;
            }
        });

        // Remove active class from all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Add active class to the current section, if it exists
        if (currentSection) {
            currentSection.classList.add('active');
        }

        // Highlight the active link in navbar
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.classList.remove('highlight');
            if (currentSection && link.getAttribute('href') === `#${currentSection.id}`) {
                link.classList.add('highlight');
            }
        });

        // Show or hide scroll to top button
        if (window.scrollY > window.innerHeight) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }

    // Smooth scroll to section
    navbar.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            document.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
