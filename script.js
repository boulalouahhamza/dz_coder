const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('[data-target]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.18 });

sections.forEach((section) => {
    revealObserver.observe(section);
});

const setActiveNav = (id) => {
    navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.dataset.target === id && link.classList.contains('nav-pill'));
    });
};

const sectionObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) {
        return;
    }

    const id = visibleSection.target.id;
    setActiveNav(id);
    history.replaceState(null, '', `#${id}`);
}, {
    threshold: [0.3, 0.55, 0.8],
    rootMargin: '-20% 0px -20% 0px'
});

sections.forEach((section) => {
    sectionObserver.observe(section);
});

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const id = link.dataset.target;
        const target = document.getElementById(id);

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('load', () => {
    const initialId = window.location.hash.replace('#', '');
    const initialSection = document.getElementById(initialId) || document.getElementById('home');

    setActiveNav(initialSection.id);

    if (initialId) {
        setTimeout(() => {
            initialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
});
