// 247 Managed Network Solutions - Enhanced JavaScript
// Modern interactions with reduced motion support

(function() {
  'use strict';
  
  let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let userPausedMotion = sessionStorage.getItem('motion-paused') === 'true';
  
  // DOM Elements
  const header = document.querySelector('[data-site-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');
  const contactForm = document.querySelector('[data-contact-form]');
  const formStatus = document.querySelector('[data-form-status]');
  
  // Header scroll state
  if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateHeader = () => {
      const scrollY = window.scrollY;
      header.classList.toggle('is-scrolled', scrollY > 10);
      lastScrollY = scrollY;
      ticking = false;
    };
    
    const requestHeaderUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };
    
    updateHeader();
    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
  }
  
  // Mobile menu
  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      
      // Trap focus in menu when open
      if (isOpen) {
        const firstLink = siteNav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
    
    // Close menu on navigation
    siteNav.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu on escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }
  
  // FAQ accordions
  const faqButtons = document.querySelectorAll('.faq-button');
  
  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      
      if (!item) return;
      
      // Close other open items (optional - remove for multi-open)
      // faqButtons.forEach((otherButton) => {
      //   if (otherButton !== button) {
      //     const otherItem = otherButton.closest('.faq-item');
      //     otherButton.setAttribute('aria-expanded', 'false');
      //     if (otherItem) otherItem.classList.remove('is-open');
      //   }
      // });
      
      button.setAttribute('aria-expanded', String(!isOpen));
      item.classList.toggle('is-open', !isOpen);
    });
  });
  
  // Motion pause control
  const motionToggle = document.querySelector('[data-motion-toggle]');
  
  function updateMotionState() {
    const motionEnabled = !prefersReducedMotion && !userPausedMotion;
    document.documentElement.classList.toggle('motion-paused', !motionEnabled);
    if (motionToggle) {
      motionToggle.setAttribute('aria-pressed', userPausedMotion ? 'true' : 'false');
      motionToggle.setAttribute('aria-label', userPausedMotion ? 'Play decorative animations' : 'Pause decorative animations');
    }
  }
  
  if (motionToggle) {
    motionToggle.addEventListener('click', () => {
      userPausedMotion = !userPausedMotion;
      sessionStorage.setItem('motion-paused', String(userPausedMotion));
      updateMotionState();
    });
  }
  
  updateMotionState();
  
  // Scroll animations
  if (!prefersReducedMotion && !userPausedMotion) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);
    
    // Observe elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));
    
    // Add animation classes to sections as they load
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section, index) => {
      section.style.setProperty('--animation-delay', `${index * 0.1}s`);
    });
  }
  
  // Smooth scroll with offset for anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 32;
        
        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });
  
  // Contact form
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const company = String(formData.get('company') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const need = String(formData.get('need') || '').trim();
      const message = String(formData.get('message') || '').trim();
      
      if (!name || !email || !need || !message) {
        formStatus.textContent = 'Please complete all required fields.';
        formStatus.style.color = 'var(--orange-600)';
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.style.color = 'var(--orange-600)';
        return;
      }
      
      const subject = encodeURIComponent(`Project inquiry from ${name}`);
      const body = encodeURIComponent(
        [
          'New project inquiry from 247managed.com',
          '',
          `Name: ${name}`,
          `Company: ${company || 'Not provided'}`,
          `Email: ${email}`,
          `Phone: ${phone || 'Not provided'}`,
          `Need: ${need}`,
          '',
          'Project details:',
          message
        ].join('\n')
      );
      
      formStatus.textContent = 'Opening your email client with a prepared message...';
      formStatus.style.color = 'var(--navy-600)';
      
      setTimeout(() => {
        window.location.href = `mailto:sales@247managed.com?subject=${subject}&body=${body}`;
      }, 300);
    });
    
    // Form field validation feedback
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => {
        if (!input.value.trim()) {
          input.style.borderColor = 'var(--orange-600)';
        } else {
          input.style.borderColor = '';
        }
      });
      
      input.addEventListener('input', () => {
        input.style.borderColor = '';
        formStatus.textContent = '';
      });
    });
  }
  
  // Parallax effect for hero (subtle)
  if (!prefersReducedMotion) {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      let ticking = false;
      
      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        ticking = false;
      };
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });
    }
  }
  
  // Card hover effects (enhance with micro-interactions)
  const cards = document.querySelectorAll('.service-card, .tech-card, .process-steps li');
  
  cards.forEach((card) => {
    card.addEventListener('mouseenter', function() {
      if (!prefersReducedMotion) {
        this.style.setProperty('--hover-x', '0');
        this.style.setProperty('--hover-y', '0');
      }
    });
    
    card.addEventListener('mousemove', function(e) {
      if (!prefersReducedMotion) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        this.style.setProperty('--hover-x', `${x}px`);
        this.style.setProperty('--hover-y', `${y}px`);
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (!prefersReducedMotion) {
        this.style.setProperty('--hover-x', '0');
        this.style.setProperty('--hover-y', '0');
      }
    });
  });
  
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
  
  // Video fallback handling
  const heroVideo = document.querySelector('.hero-background video');
  if (heroVideo) {
    heroVideo.addEventListener('error', function() {
      console.log('Hero video failed to load, using fallback');
      this.parentElement.style.background = 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 50%, var(--navy-800) 100%)';
    });
  }
  
  // Preload critical fonts
  if ('fonts' in document) {
    Promise.all([
      document.fonts.load('600 1rem Inter'),
      document.fonts.load('700 2rem Inter'),
    ]).then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }
  
  // Performance monitoring (optional)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.renderTime || entry.loadTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // PerformanceObserver not fully supported
    }
  }
  
  // Service worker registration (future enhancement)
  if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    // Uncomment when service worker is ready
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
  
})();
