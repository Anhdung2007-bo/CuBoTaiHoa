document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Typing Effect (Hiệu ứng gõ chữ Banner) --- */
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ['Frontend Developer', 'UI/UX Designer', 'Software Engineer'];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textIndex].length) {
            typedTextSpan.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 500);
        }
    }

    type();

    /* --- 2. Dark / Light Theme Toggle --- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fa-solid fa-sun';
        }
    });

    /* --- 3. Mobile Navigation Menu --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    /* --- 4. Scroll to Top & Active Navbar Item --- */
    const scrollTopBtn = document.getElementById('scroll-top');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }

        // Active link on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --- 5. Project Filter (Bộ lọc dự án) --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* --- 6. Project Modal Popup --- */
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalBtns = document.querySelectorAll('.btn-modal');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modal-title').textContent = btn.getAttribute('data-title');
            document.getElementById('modal-desc').textContent = btn.getAttribute('data-desc');
            document.getElementById('modal-tech').textContent = btn.getAttribute('data-tech');
            document.getElementById('modal-link').setAttribute('href', btn.getAttribute('data-link'));
            modal.style.display = 'flex';
        });
    });

    modalClose.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    /* --- 7. Form Validation (Kiểm tra dữ liệu Form Liên hệ) --- */
    const contactForm = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Reset errors
        document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Vui lòng nhập họ tên.');
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Vui lòng nhập email.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Email không hợp lệ.');
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Vui lòng nhập nội dung.');
            isValid = false;
        }

        if (isValid) {
            successMsg.style.display = 'block';
            contactForm.reset();
            setTimeout(() => successMsg.style.display = 'none', 4000);
        }
    });

    function showError(input, message) {
        const errorEl = input.nextElementSibling;
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});