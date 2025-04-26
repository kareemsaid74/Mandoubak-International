// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission with FormSubmit.co
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    const formMessage = document.getElementById('form-message');
    const currentLang = document.documentElement.lang;
    
    // Show loading state
    formMessage.textContent = currentLang === 'ar' ? 
        'جاري إرسال رسالتك...' : 
        'Sending your message...';
    formMessage.className = 'form-message';
    formMessage.style.display = 'block';
    
    // Send form using EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            formMessage.textContent = currentLang === 'ar' ? 
                'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.' : 
                'Your message has been sent successfully! We will contact you soon.';
            formMessage.className = 'form-message success';
            document.getElementById('contactForm').reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, function(error) {
            formMessage.textContent = currentLang === 'ar' ?
                'حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.' :
                'An error occurred, please try again.';
            formMessage.className = 'form-message error';
        });
});

// Social Sidebar Toggle
const socialToggle = document.querySelector('.social-toggle');
if (socialToggle) {
    socialToggle.addEventListener('click', () => {
        const socialLinks = document.querySelector('.social-links');
        socialLinks.style.display = socialLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}
// massage



// Scroll Animation
const animateOnScroll = () => {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // Check if section is in viewport
        if (sectionBottom >= windowTop && sectionTop <= windowBottom) {
            section.style.opacity = '1';
        }
    });
};

// Initialize animations on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Sticky Header on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Initialize language switcher
// document.addEventListener('DOMContentLoaded', () => {
//     const savedLang = localStorage.getItem('preferredLang') || 'ar';
//     switchLanguage(savedLang);
    
//     document.querySelectorAll('.lang-btn').forEach(btn => {
//         btn.addEventListener('click', () => {
//             const lang = btn.dataset.lang;
//             switchLanguage(lang);
//             localStorage.setItem('preferredLang', lang);
//         });
//     });
// });

// تبديل اللغة
document.querySelectorAll('.lang-menu a').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

// وظيفة تبديل اللغة
function switchLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث النصوص حسب اللغة
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// كود الجافاسكريبت لتفعيل الشريط على الجوال
document.addEventListener('DOMContentLoaded', function() {
    const socialSidebar = document.querySelector('.social-sidebar');
    const socialToggle = document.querySelector('.social-toggle');
    
    // للجوال: تفعيل بالنقر
    socialToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        socialSidebar.classList.toggle('active');
    });
    
    // إغلاق الشريط عند النقر خارج المنطقة
    document.addEventListener('click', function() {
        socialSidebar.classList.remove('active');
    });
    
    // منع إغلاق الشريط عند النقر عليه
    socialSidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Auto-scroll for clients slider
// Slider Navigation
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.clients-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    // Navigation buttons
    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }
    
    // Auto-scroll with reset
    let autoScroll = setInterval(() => {
        if (slider) {
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            const currentScroll = slider.scrollLeft;
            
            if (currentScroll >= maxScroll - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }
    }, 3000);
    
    // Pause on hover
    slider?.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });
    
    slider?.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            const currentScroll = slider.scrollLeft;
            
            if (currentScroll >= maxScroll - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }, 3000);
    });
    
    // Animate items on scroll
    const animateItems = () => {
        const logos = document.querySelectorAll('.client-logo');
        const windowHeight = window.innerHeight;
        
        logos.forEach(logo => {
            const logoPosition = logo.getBoundingClientRect().top;
            
            if (logoPosition < windowHeight - 100) {
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial animation
    setTimeout(() => {
        animateItems();
    }, 500);
    
    // Animate on scroll
    window.addEventListener('scroll', animateItems);
});




 // Initialize Particles.js
 document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    // Initialize Typed.js
    const typed = new Typed('.typed-text', {
        strings: ['حلول أعمال متكاملة^1000', 'إستراتيجيات ناجحة^1000', 'شركاء نجاحك^1000'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.cta-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (x - centerX) / 10;
            const angleY = (y - centerY) / 10;
            
            btn.style.transform = `perspective(500px) rotateX(${angleY}deg) rotateY(${angleX}deg)`;
            
            const effect = btn.querySelector('.hover-effect');
            effect.style.left = `${x}px`;
            effect.style.top = `${y}px`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Initialize 3D Shape (Basic Three.js)
    if (document.getElementById('3d-shape')) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('3d-shape'),
            alpha: true,
            antialias: true
        });
        renderer.setSize(400, 400);
        
        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);
        
        camera.position.z = 30;
        
        function animate() {
            requestAnimationFrame(animate);
            torusKnot.rotation.x += 0.005;
            torusKnot.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        animate();
    }
});
