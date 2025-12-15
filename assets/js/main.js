class ProfessionalPortfolio {
  constructor() {
    this.init();
  }

  init() {
    this.initTheme();
    this.initMobileMenu();
    this.initTypingAnimation();
    this.initScrollAnimations();
    this.initTechStack();
    this.initSkillBars();
    this.initContactForm();
    this.initPerformanceOptimizations();
  }

  // Professional theme management
  initTheme() {
    // Wait a bit to ensure DOM is fully ready
    setTimeout(() => {
      const themeToggles = document.querySelectorAll('.theme-toggle');
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Set initial theme
      let theme = 'light';
      if (savedTheme) {
        theme = savedTheme;
      } else if (prefersDark.matches) {
        theme = 'dark';
      }
      
      document.documentElement.setAttribute('data-theme', theme);
      this.updateThemeIcon(theme);

      // Add event listeners to all theme toggle buttons
      themeToggles.forEach(themeToggle => {
        themeToggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          this.updateThemeIcon(newTheme);
        });
      });
    }, 100);
  }

    updateThemeIcon(theme) {
    const buttons = document.querySelectorAll('.theme-toggle');
    
    if (buttons.length === 0) {
      console.error('Theme toggle buttons not found!');
      return;
    }
    
    // Update all theme toggle buttons
    buttons.forEach(button => {
      // Clear the button and create fresh icon
      button.innerHTML = '';
      
      // Create new icon element
      const icon = document.createElement('i');
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      button.appendChild(icon);
      
      // Update accessibility
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      
      // Add visual feedback with a slight delay to let Font Awesome process
      setTimeout(() => {
        const currentIcon = button.querySelector('i, svg');
        if (currentIcon) {
          currentIcon.style.transform = 'scale(1.2) rotate(180deg)';
          setTimeout(() => {
            currentIcon.style.transform = 'scale(1) rotate(0deg)';
          }, 250);
        }
      }, 50);
    });
  }

  // Mobile menu functionality
  initMobileMenu() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (!navbarToggle || !navbarMenu) return;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'navbar-overlay';
    body.appendChild(overlay);
    
    // Toggle menu function
    const toggleMenu = () => {
      const isOpen = navbarMenu.classList.contains('open');
      
      if (isOpen) {
        // Close menu
        navbarMenu.classList.remove('open');
        overlay.classList.remove('show');
        navbarToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
      } else {
        // Open menu
        navbarMenu.classList.add('open');
        overlay.classList.add('show');
        navbarToggle.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
      }
    };
    
    // Event listeners
    navbarToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking nav links
    const navLinks = navbarMenu.querySelectorAll('.nav-link, .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarMenu.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navbarMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  }

  // Animated typing effect
  initTypingAnimation() {
    const phrases = [
      'Cloud Engineer',
      'DevOps Specialist', 
      'Tech Writer',
      'Building scalable, secure, and efficient cloud solutions',
      'Open to new opportunities and challenges'
    ];
    
    let i = 0, j = 0, isDeleting = false, current = '', speed = 80;
    const el = document.getElementById('typed-text');
    
    const type = () => {
      if (!el) return;
      
      if (!isDeleting && j <= phrases[i].length) {
        current = phrases[i].substring(0, j++);
        el.textContent = current;
        setTimeout(type, speed);
      } else if (isDeleting && j >= 0) {
        current = phrases[i].substring(0, j--);
        el.textContent = current;
        setTimeout(type, speed / 2);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) i = (i + 1) % phrases.length;
        setTimeout(type, 900);
      }
    };
    
    if (el) type();
  }

  // Refined scroll animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);
    
    // Observe elements for professional animations
    document.querySelectorAll('.professional-card, .tech-stack, .skill-section, .blog-post').forEach(el => {
      observer.observe(el);
    });
  }

  // Professional tech stack interactions
  initTechStack() {
    document.querySelectorAll('.tech-item').forEach(item => {
      item.addEventListener('click', () => {
        // Subtle professional feedback
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
          item.style.transform = '';
        }, 150);
      });
    });
  }

  // Remove skill bar/percentage logic
  initSkillBars() {
    // No-op: skill bars removed for modern design
  }

  // Professional contact form
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (this.validateForm()) {
        await this.submitForm(form);
      }
    });

    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
    });
  }

  validateForm() {
    const requiredFields = document.querySelectorAll('#contact-form [required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        this.showFieldError(field, 'This field is required');
        isValid = false;
      } else {
        this.clearFieldError(field);
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
      this.showFieldError(field, 'This field is required');
    } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
      this.showFieldError(field, 'Please enter a valid email');
    } else {
      this.clearFieldError(field);
    }
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    field.style.borderColor = 'var(--red-500)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.style.borderColor = '';
    const errorDiv = field.parentNode.querySelector('.text-red-500');
    if (errorDiv) errorDiv.remove();
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async submitForm(form) {
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    
    try {
      // Simulate form submission (replace with actual logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      const successAlert = document.getElementById('success-alert');
      if (successAlert) {
        successAlert.classList.remove('d-none');
        form.reset();
      }
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  // Performance optimizations
  initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Utility functions
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}



// Initialize the portfolio when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProfessionalPortfolio();
});

