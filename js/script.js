document.addEventListener('DOMContentLoaded', () => {
    // ========== Mobile Menu ==========
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = mobileBtn.querySelectorAll('span');
            const isActive = navLinks.classList.contains('active');
            spans[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = isActive ? '0' : '1';
            spans[2].style.transform = isActive ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
        });
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => { if (navLinks.classList.contains('active')) mobileBtn.click(); });
    });

    // ========== Scroll Reveal ==========
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ========== Smooth Scroll ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
            const target = document.querySelector(id);
            if (target) {
                const offset = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
            }
        });
    });

    // ========== Editable Text Autosave ==========
    document.querySelectorAll('.editable-text').forEach((el, i) => {
        const saved = localStorage.getItem(`portfolio_text_${i}`);
        if (saved) el.innerHTML = saved;
        el.addEventListener('input', () => localStorage.setItem(`portfolio_text_${i}`, el.innerHTML));
        el.addEventListener('focus', function () { if (this.innerHTML.includes('[Haz clic aquí')) this.innerHTML = ''; });
    });
});

// ========== PDF Modal ==========
function openPDF(btn) {
    const card = btn.closest('.evidence-card');
    const pdfPath = card.getAttribute('data-pdf');
    const title = card.querySelector('h3').textContent;
    const modal = document.getElementById('pdf-modal');
    const viewer = document.getElementById('pdf-viewer');
    const modalTitle = document.getElementById('pdf-modal-title');

    viewer.src = pdfPath;
    modalTitle.textContent = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePDFModal() {
    const modal = document.getElementById('pdf-modal');
    const viewer = document.getElementById('pdf-viewer');
    modal.classList.remove('active');
    viewer.src = '';
    document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePDFModal();
});
