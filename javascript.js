
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    els.forEach(el => observer.observe(el));
}

function initScrollSpy() {
    if (window.bootstrap && bootstrap.ScrollSpy) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#navbarNav',
            rootMargin: '0px 0px -40%',
            smoothScroll: true
        });
    }
}

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) {
        return;
    }

    const toggle = () => {
        if (window.scrollY > 500) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
}

function copyAndToast(text, message) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {});
    }

    let toast = document.getElementById('portfolio-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'portfolio-toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast._hideTimeout);
    toast._hideTimeout = setTimeout(() => toast.classList.remove('show'), 2600);
}
