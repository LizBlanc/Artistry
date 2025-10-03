// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.style.display === 'flex') {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Update
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Musicians Slider Functionality
let currentSlide = 0;
const musicianCards = document.querySelectorAll('.musician-card');
const totalSlides = musicianCards.length;

function showSlide(index) {
    musicianCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Initialize slider
if (musicianCards.length > 0) {
    showSlide(0);
    
    // Add event listeners to slider buttons
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Music Player Functionality
let isPlaying = false;
let currentTrack = 0;
const tracks = document.querySelectorAll('.track-item');
const playBtn = document.querySelector('.play-btn');

function togglePlay() {
    isPlaying = !isPlaying;
    const icon = playBtn.querySelector('i');
    
    if (isPlaying) {
        icon.className = 'fas fa-pause';
        // Add playing animation to current track
        if (tracks[currentTrack]) {
            tracks[currentTrack].style.background = 'rgba(255, 255, 255, 0.3)';
        }
    } else {
        icon.className = 'fas fa-play';
        // Remove playing animation
        if (tracks[currentTrack]) {
            tracks[currentTrack].style.background = 'rgba(255, 255, 255, 0.1)';
        }
    }
}

if (playBtn) {
    playBtn.addEventListener('click', togglePlay);
}

// Track selection
tracks.forEach((track, index) => {
    track.addEventListener('click', function() {
        // Remove active state from all tracks
        tracks.forEach(t => {
            t.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        
        // Set current track
        currentTrack = index;
        this.style.background = 'rgba(255, 255, 255, 0.3)';
        
        // Update play button
        if (playBtn) {
            const icon = playBtn.querySelector('i');
            icon.className = 'fas fa-pause';
            isPlaying = true;
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }, 3000);
    });
}

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.musician-card, .section-title, .quote-content, .music-player, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Spotify Button Functionality
const spotifyBtn = document.querySelector('.spotify-btn');
if (spotifyBtn) {
    spotifyBtn.addEventListener('click', function() {
        // In a real implementation, this would integrate with Spotify API
        alert('This would open the playlist in Spotify. Integration requires Spotify API setup.');
    });
}

// Social Media Links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.querySelector('i').className;
        
        if (platform.includes('instagram')) {
            alert('This would link to the Instagram profile.');
        } else if (platform.includes('facebook')) {
            alert('This would link to the Facebook page.');
        } else if (platform.includes('linkedin')) {
            alert('This would link to the LinkedIn profile.');
        }
    });
});

// Get In Touch Button Functionality
document.querySelectorAll('.btn-secondary, .btn[href="#contact"]').forEach(btn => {
    if (btn.textContent.includes('Get In Touch') || btn.getAttribute('href') === '#contact') {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Artist Sign-Up Button
const signUpBtn = document.querySelector('.btn-primary');
if (signUpBtn && signUpBtn.textContent.includes('Artist Sign-Up')) {
    signUpBtn.addEventListener('click', function() {
        alert('This would open the artist registration form or redirect to a sign-up page.');
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
