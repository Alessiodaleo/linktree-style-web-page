// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add click tracking to all links
    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track link clicks (you can integrate with analytics here)
            console.log(`Link clicked: ${this.textContent.trim()}`);
            
            // Add a small delay for visual feedback before navigating
            if (this.href !== '#' && !this.href.startsWith('mailto:')) {
                e.preventDefault();
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                    window.open(this.href, '_blank');
                }, 150);
            }
        });
    });

    // Add hover effects to profile image
    const profileImage = document.getElementById('profile-pic');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            // Add extra glow effect on hover
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
            this.style.filter = 'brightness(1) saturate(1)';
        });
        
        // Add subtle floating animation
        this.style.animation = 'profileFloat 6s ease-in-out infinite';
    }



    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.profile-section, .links-section, .social-section, .footer');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Add ripple effect to link cards
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .link-card {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add theme toggle functionality (optional)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function updateTheme() {
        if (prefersDark.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
    
    prefersDark.addListener(updateTheme);
    updateTheme();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add CSS for loading state
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) .container {
            opacity: 0;
        }
        
        body.loaded .container {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(loadingStyle);

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
        
        if (e.key === 'Tab') {
            // Let default tab behavior work
            return;
        }
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[nextIndex].focus();
        }
        
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
            focusableElements[prevIndex].focus();
        }
    });

    // Add analytics tracking (example)
    function trackEvent(eventName, properties = {}) {
        // You can integrate with Google Analytics, Mixpanel, or other analytics services here
        console.log('Event tracked:', eventName, properties);
        
        // Example: Send to a custom analytics endpoint
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ event: eventName, properties })
        // });
    }

    // Track page views
    trackEvent('page_view', {
        page: 'links_page',
        timestamp: new Date().toISOString()
    });

    // Track link clicks
    allLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('link_click', {
                link_text: this.textContent.trim(),
                link_url: this.href,
                link_type: this.classList.contains('primary-link') ? 'primary' : 'secondary'
            });
        });
    });

    console.log('Linktree website loaded successfully! 🚀');
});
