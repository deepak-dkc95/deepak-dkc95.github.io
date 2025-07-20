document.addEventListener("DOMContentLoaded", () => {

  // Dark Mode Toggle
  initializeDarkMode();

  // Smooth Scroll for internal links
  document.querySelectorAll('a.nav-link, .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Enhanced Typewriter Effect
  initializeTypewriter();

  // Tech Stack Interactions
  initializeTechStack();

  // Activity Graph
  initializeActivityGraph();

  // Skills Progress Animation
  initializeSkillsProgress();

  // Form Submission Handling
  initializeContactForm();

  // Blog Interactions
  initializeBlogFeatures();

  // Terminal Effect
  initializeTerminal();

  // Loading Animations
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
      
      // Update toggle icon
      const icon = themeToggle.querySelector('i');
      icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
  }
}

// Enhanced Typewriter Effect
function initializeTypewriter() {
  const typewriterText = document.querySelector('.lead');
  if (typewriterText) {
    const text = 'Engineer • Learner • Cloud & Cybersecurity Enthusiast';
    typewriterText.innerHTML = '';
    typewriterText.classList.add('typewriter');
    
    let idx = 0;
    function typeWriter() {
      if (idx < text.length) {
        typewriterText.innerHTML += text.charAt(idx);
        idx++;
        setTimeout(typeWriter, 75);
      }
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
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        item.style.transform = '';
      }, 150);
      
      // Show tooltip or modal with tech details
      const techName = item.querySelector('h5').textContent;
      showTechDetails(techName);
    });
  });
}

function showTechDetails(techName) {
  // Create a simple tooltip or modal
  const tooltip = document.createElement('div');
  tooltip.className = 'position-fixed bg-dark text-white p-2 rounded';
  tooltip.style.cssText = `
    top: ${event.pageY - 40}px;
    left: ${event.pageX + 10}px;
    z-index: 1000;
    font-size: 0.8rem;
  `;
  tooltip.textContent = `Click to learn more about ${techName}`;
  
  document.body.appendChild(tooltip);
  
  setTimeout(() => {
    tooltip.remove();
  }, 2000);
}

// Activity Graph Generation
function initializeActivityGraph() {
  const activityGrid = document.querySelector('.activity-grid');
  if (activityGrid) {
    // Generate random activity data (replace with real data)
    const weeks = 52;
    const days = 7;
    
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < days; day++) {
        const cell = document.createElement('div');
        cell.className = 'activity-cell';
        
        // Random activity level (0-5)
        const level = Math.floor(Math.random() * 6);
        if (level > 0) {
          cell.setAttribute('data-level', level);
        }
        
        // Add hover effect
        cell.addEventListener('mouseenter', () => {
          cell.style.transform = 'scale(1.5)';
          cell.style.zIndex = '10';
        });
        
        cell.addEventListener('mouseleave', () => {
          cell.style.transform = 'scale(1)';
          cell.style.zIndex = '1';
        });
        
        activityGrid.appendChild(cell);
      }
    }
  }
}

// Skills Progress Animation
function initializeSkillsProgress() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const percentage = progressBar.getAttribute('data-percentage') || '80';
        progressBar.style.width = percentage + '%';
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
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearValidation);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          
          if (successAlert) {
            successAlert.classList.remove('d-none');
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
      { prompt: 'deepak@portfolio:~$', command: 'echo "Ready to collaborate!"', output: 'Ready to collaborate!' }
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