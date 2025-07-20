document.addEventListener("DOMContentLoaded", () => {

  // Initialize all features
  initializeDarkMode();
  initializeParticleBackground();
  initializeScrollAnimations();
  initializeTypewriter();
  initializeTechStack();
  initializeActivityGraph();
  initializeSkillsProgress();
  initializeContactForm();
  initializeBlogFeatures();
  initializeTerminal();
  initializeLoadingAnimations();
  initializeParallaxEffects();
  initializeMouseTrail();

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

// Particle Background
function initializeParticleBackground() {
  const particleBg = document.querySelector('.particle-background');
  if (!particleBg) return;

  // Create floating particles
  for (let i = 0; i < 50; i++) {
    createParticle(particleBg);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.cssText = `
    position: absolute;
    width: ${Math.random() * 4 + 2}px;
    height: ${Math.random() * 4 + 2}px;
    background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
    border-radius: 50%;
    opacity: ${Math.random() * 0.5 + 0.1};
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    animation: float ${Math.random() * 10 + 10}s linear infinite;
    pointer-events: none;
  `;
  
  container.appendChild(particle);
}

// Add floating animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
    100% { transform: translateY(0px) rotate(360deg); }
  }
`;
document.head.appendChild(style);

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

// Enhanced Typewriter Effect
function initializeTypewriter() {
  const typewriterText = document.querySelector('.hero-subtitle');
  if (typewriterText) {
    const texts = [
      'Cloud Engineer • DevOps Specialist • Cybersecurity Enthusiast',
      'Building Scalable Infrastructure • Securing Digital Assets',
      'Passionate About Technology • Always Learning'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typewriterText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before next word
      }
      
      setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
  }
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

// Activity Graph Generation
function initializeActivityGraph() {
  const activityGrid = document.querySelector('.activity-grid');
  if (activityGrid) {
    // Generate more realistic activity data
    const weeks = 52;
    const days = 7;
    
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < days; day++) {
        const cell = document.createElement('div');
        cell.className = 'activity-cell';
        
        // More realistic activity pattern
        let level = 0;
        const random = Math.random();
        
        if (random > 0.8) level = 5;
        else if (random > 0.6) level = 4;
        else if (random > 0.4) level = 3;
        else if (random > 0.2) level = 2;
        else if (random > 0.1) level = 1;
        
        if (level > 0) {
          cell.setAttribute('data-level', level);
        }
        
        // Add hover effect with tooltip
        cell.addEventListener('mouseenter', (e) => {
          cell.style.transform = 'scale(2)';
          cell.style.zIndex = '10';
          
          // Show tooltip
          const tooltip = document.createElement('div');
          tooltip.className = 'activity-tooltip';
          tooltip.textContent = `${level} contributions on ${getDateFromGrid(week, day)}`;
          tooltip.style.cssText = `
            position: absolute;
            background: var(--glass-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            top: ${e.pageY - 40}px;
            left: ${e.pageX + 10}px;
          `;
          document.body.appendChild(tooltip);
          
          cell.tooltip = tooltip;
        });
        
        cell.addEventListener('mouseleave', () => {
          cell.style.transform = 'scale(1)';
          cell.style.zIndex = '1';
          if (cell.tooltip) {
            cell.tooltip.remove();
          }
        });
        
        activityGrid.appendChild(cell);
      }
    }
  }
}

function getDateFromGrid(week, day) {
  const date = new Date();
  date.setDate(date.getDate() - (52 - week) * 7 - (7 - day));
  return date.toLocaleDateString();
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

// Terminal Effect
function initializeTerminal() {
  const terminal = document.querySelector('.terminal');
  if (terminal) {
    const commands = [
      { prompt: 'deepak@portfolio:~$', command: 'whoami', output: 'Deepak Chourasia' },
      { prompt: 'deepak@portfolio:~$', command: 'cat skills.txt', output: 'Cloud Computing, DevOps, Cybersecurity, Web Development' },
      { prompt: 'deepak@portfolio:~$', command: 'ls projects/', output: 'aws-deployment, docker-container, kubernetes-cluster' },
      { prompt: 'deepak@portfolio:~$', command: 'echo "Ready to collaborate!"', output: 'Ready to collaborate!' },
      { prompt: 'deepak@portfolio:~$', command: 'git status', output: 'On branch main\nYour branch is up to date with origin/main.' }
    ];
    
    let commandIndex = 0;
    
    function typeCommand() {
      if (commandIndex < commands.length) {
        const cmd = commands[commandIndex];
        const terminalContent = terminal.querySelector('.terminal-content');
        
        const commandLine = document.createElement('div');
        commandLine.innerHTML = `
          <span class="terminal-prompt">${cmd.prompt}</span>
          <span class="terminal-command"> ${cmd.command}</span>
        `;
        
        terminalContent.appendChild(commandLine);
        
        setTimeout(() => {
          const outputLine = document.createElement('div');
          outputLine.className = 'terminal-output';
          outputLine.textContent = cmd.output;
          terminalContent.appendChild(outputLine);
          
          commandIndex++;
          setTimeout(typeCommand, 1000);
        }, 1000);
      }
    }
    
    setTimeout(typeCommand, 500);
  }
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

// Parallax Effects
function initializeParallaxEffects() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.particle-background');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Mouse Trail Effect
function initializeMouseTrail() {
  let mouseTrail = [];
  const maxTrailLength = 10; // Reduced for better performance
  
  document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'mouse-trail';
    dot.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--neon-blue);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      opacity: 0.8;
      transition: all 0.1s ease;
    `;
    
    document.body.appendChild(dot);
    mouseTrail.push(dot);
    
    if (mouseTrail.length > maxTrailLength) {
      const oldDot = mouseTrail.shift();
      if (oldDot && oldDot.parentNode) {
        oldDot.remove();
      }
    }
    
    // Fade out trail
    mouseTrail.forEach((trailDot, index) => {
      if (trailDot && trailDot.parentNode) {
        const opacity = (index / mouseTrail.length) * 0.8;
        trailDot.style.opacity = opacity;
        trailDot.style.transform = `scale(${opacity})`;
      }
    });
    
    // Clean up trail dots after animation
    setTimeout(() => {
      if (dot && dot.parentNode) {
        dot.remove();
      }
    }, 1000);
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