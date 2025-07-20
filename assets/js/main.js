document.addEventListener("DOMContentLoaded", () => {

  // Initialize all features
  initializeDarkMode();
  initializeScrollAnimations();
  initializeTechStack();
  initializeSkillsProgress();
  initializeContactForm();
  initializeBlogFeatures();
  initializeLoadingAnimations();

});

// Dark Mode Functions
function initializeDarkMode() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Set initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update toggle icon with animation
      const icon = themeToggle.querySelector('i');
      icon.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        icon.style.transform = 'rotate(0deg)';
      }, 300);
    });
  }
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up', 'visible');
        
        // Add staggered animation for tech items
        if (entry.target.classList.contains('tech-stack')) {
          const techItems = entry.target.querySelectorAll('.tech-item');
          techItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '0';
              item.style.transform = 'translateY(30px)';
              item.style.transition = 'all 0.6s ease';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, 100);
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.glass-card, .skill-section, .activity-graph, .blog-post, .tech-stack');
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// Tech Stack Interactions
function initializeTechStack() {
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach(item => {
    item.addEventListener('click', () => {
      // Add click animation
      item.style.transform = 'scale(0.95) rotate(5deg)';
      setTimeout(() => {
        item.style.transform = '';
      }, 200);
      
      // Show tech details modal
      const techName = item.querySelector('h5').textContent;
      showTechModal(techName);
    });
    
    // Add hover sound effect (optional)
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
}

function showTechModal(techName) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'tech-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.className = 'glass-card p-4';
  modalContent.style.cssText = `
    max-width: 400px;
    text-align: center;
    transform: scale(0.8);
    transition: transform 0.3s ease;
  `;
  
  modalContent.innerHTML = `
    <h3>${techName}</h3>
    <p class="text-muted">Click to learn more about ${techName}</p>
    <button class="btn btn-primary mt-3" onclick="this.parentElement.parentElement.remove()">Close</button>
  `;
  
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  // Animate in
  setTimeout(() => {
    modal.style.opacity = '1';
    modalContent.style.transform = 'scale(1)';
  }, 10);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Skills Progress Animation
function initializeSkillsProgress() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const percentage = progressBar.getAttribute('data-percentage') || '80';
        
        // Animate progress bar
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = percentage + '%';
        }, 200);
        
        // Add completion animation
        setTimeout(() => {
          progressBar.style.boxShadow = '0 0 12px rgba(0, 212, 255, 0.5)';
        }, 2000);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

// Enhanced Contact Form
function initializeContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successAlert = document.getElementById('success-alert');

  if (form) {
    // Real-time validation with visual feedback
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearValidation);
      
      // Add floating label effect
      if (input.type !== 'checkbox') {
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            input.parentElement.classList.remove('focused');
          }
        });
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        // Show loading state with animation
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<div class="loading-spinner me-2"></div>Sending...';
        
        // Simulate form submission
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
          
          if (successAlert) {
            successAlert.classList.remove('d-none');
            successAlert.style.animation = 'slideInUp 0.5s ease';
            form.reset();
          }
        }, 2000);
      }
    });

    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === '1' && successAlert) {
      successAlert.classList.remove('d-none');
    }
  }
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  if (field.hasAttribute('required') && !value) {
    showFieldError(field, 'This field is required');
  } else if (field.type === 'email' && value && !isValidEmail(value)) {
    showFieldError(field, 'Please enter a valid email');
  } else {
    clearFieldError(field);
  }
}

function showFieldError(field, message) {
  clearFieldError(field);
  field.classList.add('is-invalid');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'invalid-feedback';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
  field.classList.remove('is-invalid');
  const errorDiv = field.parentNode.querySelector('.invalid-feedback');
  if (errorDiv) {
    errorDiv.remove();
  }
}

function clearValidation(e) {
  if (e.target.classList.contains('is-invalid')) {
    clearFieldError(e.target);
  }
}

function validateForm() {
  const inputs = document.querySelectorAll('#contact-form input[required], #contact-form textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      showFieldError(input, 'This field is required');
      isValid = false;
    }
  });
  
  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Blog Features
function initializeBlogFeatures() {
  // Blog View Counter
  const postTitleElement = document.querySelector('h1.fw-bold');
  if (postTitleElement) {
    const postTitle = postTitleElement.innerText;
    const postKey = `views_${postTitle.replace(/\s+/g, '_')}`;
    localStorage.setItem(postKey, (parseInt(localStorage.getItem(postKey)) || 0) + 1);
  }

  // Tracking blog clicks for Popular Blogs
  document.querySelectorAll(".blog-post h3 a, .carousel-item a").forEach(link => {
    link.addEventListener("click", () => {
      const key = `views_${link.innerText.replace(/\s+/g, '_')}`;
      localStorage.setItem(key, (parseInt(localStorage.getItem(key)) || 0) + 1);
    });
  });

  // Reading time calculation
  calculateReadingTime();
}

function calculateReadingTime() {
  const articles = document.querySelectorAll('article');
  articles.forEach(article => {
    const text = article.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed
    
    const timeElement = document.createElement('span');
    timeElement.className = 'text-muted ms-2';
    timeElement.innerHTML = `<i class="far fa-clock me-1"></i>${readingTime} min read`;
    
    const metaElement = article.querySelector('.blog-meta');
    if (metaElement) {
      metaElement.appendChild(timeElement);
    }
  });
}

// Loading Animations
function initializeLoadingAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.blog-post, .tech-item, .skill-bar');
  animateElements.forEach(el => {
    observer.observe(el);
  });
}

// Utility Functions
function debounce(func, wait) {
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

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add scroll to top button
window.addEventListener('scroll', debounce(() => {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (window.pageYOffset > 300) {
    if (!scrollTopBtn) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary scroll-top position-fixed';
      btn.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000;';
      btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
      btn.addEventListener('click', scrollToTop);
      document.body.appendChild(btn);
    }
  } else {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
      scrollTopBtn.remove();
    }
  }
}, 100));