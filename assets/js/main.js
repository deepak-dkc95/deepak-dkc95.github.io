class ProfessionalPortfolio {
  constructor() {
    this.init();
  }

  init() {
    this.initTheme();
    this.initTypingAnimation();
    this.initScrollAnimations();
    this.initTechStack();
    this.initSkillBars();
    this.initContactForm();
    this.initBlogFeatures();
    this.initPerformanceOptimizations();
  }

  // Professional theme management
  initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    console.log('Theme toggle found:', !!themeToggle);
    
    // Set initial theme
    let theme = 'light';
    if (savedTheme) {
      theme = savedTheme;
    } else if (prefersDark.matches) {
      theme = 'dark';
    }
    
    console.log('Setting initial theme:', theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.updateThemeIcon(theme);

    if (themeToggle) {
      themeToggle.addEventListener('click', (e) => {
        console.log('Theme toggle clicked!');
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        console.log('Switching from', currentTheme, 'to', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
        
        // Force a repaint
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
      });
    } else {
      console.error('Theme toggle button not found!');
    }
  }

  updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    const button = document.querySelector('.theme-toggle');
    if (icon) {
      console.log('Updating theme icon to:', theme);
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      icon.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      if (button) {
        button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      }
      icon.style.transform = 'scale(1.2) rotate(180deg)';
      setTimeout(() => {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }, 250);
    } else {
      console.error('Theme toggle icon not found!');
    }
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

  // Blog reading time and features
  initBlogFeatures() {
    this.calculateReadingTime();
    this.initBlogSearch();
  }

  calculateReadingTime() {
    document.querySelectorAll('.reading-time').forEach(element => {
      const content = element.getAttribute('data-content') || 
                    element.closest('article')?.textContent || '';
      const wordCount = content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200);
      element.textContent = readingTime;
    });
  }

  initBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput && categoryFilter) {
      const debouncedFilter = this.debounce(this.filterBlogs.bind(this), 300);
      
      searchInput.addEventListener('input', debouncedFilter);
      categoryFilter.addEventListener('change', debouncedFilter);
    }
  }

  filterBlogs() {
    const searchTerm = document.getElementById('blogSearch')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('categoryFilter')?.value.toLowerCase() || '';
    const blogPosts = document.querySelectorAll('.blog-post');
    let visibleCount = 0;
    
    blogPosts.forEach(post => {
      const title = post.querySelector('h3')?.textContent.toLowerCase() || '';
      const content = post.querySelector('p')?.textContent.toLowerCase() || '';
      const tags = Array.from(post.querySelectorAll('.blog-tag'))
                       .map(tag => tag.textContent.toLowerCase());
      
      const matchesSearch = !searchTerm || title.includes(searchTerm) || content.includes(searchTerm);
      const matchesCategory = !selectedCategory || tags.includes(selectedCategory);
      
      if (matchesSearch && matchesCategory) {
        post.style.display = 'block';
        visibleCount++;
      } else {
        post.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    const noResults = document.getElementById('noResults');
    const blogList = document.getElementById('blogList');
    
    if (noResults && blogList) {
      if (visibleCount === 0) {
        noResults.classList.remove('d-none');
        blogList.style.opacity = '0.5';
      } else {
        noResults.classList.add('d-none');
        blogList.style.opacity = '1';
      }
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
  console.log('DOM loaded, initializing portfolio...');
  new ProfessionalPortfolio();
  
  // Additional debug for navbar
  console.log('Portfolio initialized');
  const navbar = document.querySelector('.navbar');
  const navbarNav = document.querySelector('.navbar-nav');
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (navbar) {
    console.log('Navbar found, computed style:', window.getComputedStyle(navbar).display);
  }
  if (navbarNav) {
    console.log('Navbar-nav found, computed style:', window.getComputedStyle(navbarNav).flexDirection);
  }
  if (themeToggle) {
    console.log('Theme toggle found in DOM');
  } else {
    console.error('Theme toggle NOT found in DOM');
  }
});
