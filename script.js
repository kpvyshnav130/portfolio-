document.addEventListener("DOMContentLoaded", function() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    const selectors = [
        '.hero-content', '.hero-image', 
        '.tools h2', '.tool-item', 
        '.explore-box', 
        '.certificates h2', '.cert', 
        '.connect h2', '.connect p', '.contact-pill',
        '.project-card'
    ];

    const elementsToAnimate = document.querySelectorAll(selectors.join(', '));

    elementsToAnimate.forEach((el) => {
        el.classList.add('animate-on-scroll');
        
        // Add staggered delays for items in flex/grid containers
        if (el.classList.contains('tool-item') || el.classList.contains('contact-pill') || el.classList.contains('cert')) {
            const parent = el.parentElement;
            const siblings = Array.from(parent.children);
            const siblingIndex = siblings.indexOf(el);
            el.style.transitionDelay = `${siblingIndex * 0.15}s`;
        } else if (el.classList.contains('project-card')) {
            const parent = el.parentElement;
            const siblings = Array.from(parent.children).filter(c => c.classList.contains('project-card'));
            const siblingIndex = siblings.indexOf(el);
            el.style.transitionDelay = `${siblingIndex * 0.2}s`;
        }
        
        observer.observe(el);
    });

    // Modal Logic for Certificates
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".modal-close");
    const certs = document.querySelectorAll(".cert");

    if (modal && modalImg && closeBtn) {
        certs.forEach(cert => {
            cert.addEventListener('click', function() {
                const img = this.querySelector('img');
                if(img) {
                    modal.style.display = "flex";
                    modalImg.src = img.src;
                    
                    // Small delay to allow display:flex to apply before adding class for CSS transition animation
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            modal.classList.add("show");
                        });
                    });
                }
            });
        });

        // Close functions
        const closeModal = () => {
            modal.classList.remove("show");
            // Wait for CSS transition to finish before hiding display
            setTimeout(() => {
                modal.style.display = "none";
            }, 400); 
        };

        closeBtn.addEventListener('click', closeModal);
        
        // Close if clicking outside the image
        modal.addEventListener('click', function(e) {
            if(e.target === modal) { 
                closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && modal.classList.contains("show")) {
                closeModal();
            }
        });
    }
});

// Single Page Application logic
window.switchView = function(view, event) {
    if (event) event.preventDefault();
    
    const homeView = document.getElementById('home-view');
    const portfolioView = document.getElementById('portfolio-view');
    const navHome = document.getElementById('nav-home');
    const navPortfolio = document.getElementById('nav-portfolio');
    
    if (view === 'portfolio') {
        homeView.style.display = 'none';
        portfolioView.style.display = 'flex';
        if(navHome) navHome.classList.remove('active');
        if(navPortfolio) navPortfolio.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        homeView.style.display = 'block';
        portfolioView.style.display = 'none';
        if(navPortfolio) navPortfolio.classList.remove('active');
        if(navHome) navHome.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
