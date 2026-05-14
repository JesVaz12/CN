document.addEventListener('DOMContentLoaded', () => {
    // ========== Scroll Reveal & Navigation Active States ==========
    const sections = document.querySelectorAll('section');
    const sideLinks = document.querySelectorAll('.side-link');
    const sideMainLinks = document.querySelectorAll('.side-link-main');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Update side unit links
                sideLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Update side main links (Inicio/Reflexión)
                sideMainLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.background = 'rgba(37, 99, 235, 0.05)';
                        link.style.color = 'var(--primary)';
                    } else {
                        link.style.background = 'transparent';
                        link.style.color = 'var(--text-dark)';
                    }
                });

                // Animate entrance of content
                const container = entry.target.querySelector('.container');
                if (container) {
                    container.classList.add('reveal');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // ========== Sidebar Interaction Logic ==========
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    };

    // Open when clicking the peeking area
    sidebar.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 || !sidebar.classList.contains('active')) {
            if (e.target.closest('.sidebar')) {
                sidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
            }
        }
    });

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    // Close sidebar when a link is clicked
    const allSideLinks = document.querySelectorAll('.sidebar a');
    allSideLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    });

    // ========== Smooth Internal Scrolling ==========
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
});

// ========== PDF Viewer Logic ==========
function openPDF(btn) {
    const pdfPath = btn.getAttribute('data-pdf');
    const pdfTitle = btn.closest('.activity-card').querySelector('h4').textContent;
    
    const modal = document.getElementById('pdf-modal');
    const viewer = document.getElementById('pdf-viewer');
    const titleHeader = document.getElementById('pdf-title');

    titleHeader.textContent = pdfTitle;
    viewer.src = pdfPath;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closePDFModal() {
    const modal = document.getElementById('pdf-modal');
    const viewer = document.getElementById('pdf-viewer');
    
    modal.classList.remove('active');
    viewer.src = ''; 
    document.body.style.overflow = 'auto';
}

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePDFModal();
});
