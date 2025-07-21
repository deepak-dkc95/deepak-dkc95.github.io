---
layout: default
title: Deepak Chourasia - Systems Engineer & Writer
description: Experienced systems engineer specializing in AWS, DevOps automation, and cybersecurity. Building scalable infrastructure solutions.
---

<!-- Hero Section -->
<section class="hero-section">
  <img src="{{ '/assets/images/deepak.jpg' | relative_url }}" alt="Portrait of Deepak Chourasia, Systems Engineer" class="hero-avatar">
  <h1 class="hero-title">Deepak Chourasia</h1>
  <div class="animated-typing"><span id="typed-text"></span><span class="blinking-cursor">|</span></div>
  <div style="margin-top:2.5rem;display:flex;gap:1.5rem;flex-wrap:wrap;">
    <a href="{{ '/about' | relative_url }}" class="btn btn-primary">About Me</a>
    <a href="{{ '/assets/resume.pdf' | relative_url }}" class="btn btn-outline-primary" download>Resume</a>
    <a href="{{ '/blogs' | relative_url }}" class="btn btn-outline-primary">Technical Blog</a>
  </div>
</section>
<script>
document.addEventListener('DOMContentLoaded', function() {
  const phrases = [
    'Cloud Engineer',
    'DevOps Specialist',
    'Tech Writer',
    'Building scalable, secure, and efficient cloud solutions',
    'Open to new opportunities and challenges'
  ];
  let i = 0, j = 0, isDeleting = false, current = '', speed = 80;
  const el = document.getElementById('typed-text');
  function type() {
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
  }
  type();
});
</script>

<!-- Professional Expertise Section -->
<section class="container my-5">
  <div class="professional-card">
    <h2 class="text-center mb-4">
      <i class="fas fa-cogs me-2 text-gradient" aria-hidden="true"></i>Technical Expertise
    </h2>
    <div class="tech-stack">
      <div class="tech-item">
        <i class="fab fa-aws" aria-hidden="true"></i>
        <h5>AWS Cloud</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-docker" aria-hidden="true"></i>
        <h5>Docker</h5>
      </div>
      <div class="tech-item">
        <i class="fas fa-kubernetes" aria-hidden="true"></i>
        <h5>Kubernetes</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-python" aria-hidden="true"></i>
        <h5>Python</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-js-square" aria-hidden="true"></i>
        <h5>JavaScript</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-linux" aria-hidden="true"></i>
        <h5>Linux</h5>
      </div>
      <div class="tech-item">
        <i class="fas fa-shield-alt" aria-hidden="true"></i>
        <h5>Security</h5>
      </div>
      <div class="tech-item">
        <i class="fas fa-code-branch" aria-hidden="true"></i>
        <h5>CI/CD</h5>
      </div>
    </div>
  </div>
</section>

<!-- Project Highlights Section -->
<section class="professional-card" style="margin-top:5rem;">
  <h2 style="color:var(--accent);font-family:'Space Grotesk',sans-serif;font-weight:700;">Project Highlights</h2>
  <div style="display:flex;flex-wrap:wrap;gap:2.5rem;">
    <div class="project-card">
      <i class="fab fa-aws fa-2x mb-3" style="color:var(--accent);" aria-hidden="true"></i>
      <h5 style="font-weight:700;">Cloud Automation Suite</h5>
      <p>Automated AWS infrastructure provisioning and monitoring using Terraform and custom scripts.</p>
    </div>
    <div class="project-card">
      <i class="fas fa-shield-alt fa-2x mb-3" style="color:var(--accent);" aria-hidden="true"></i>
      <h5 style="font-weight:700;">Security Audit Platform</h5>
      <p>Developed a platform for automated security audits and compliance checks for cloud environments.</p>
    </div>
    <div class="project-card">
      <i class="fab fa-docker fa-2x mb-3" style="color:var(--accent);" aria-hidden="true"></i>
      <h5 style="font-weight:700;">Containerized CI/CD</h5>
      <p>Built a scalable CI/CD pipeline using Docker, Kubernetes, and GitHub Actions for rapid deployments.</p>
    </div>
  </div>
</section>

<!-- Professional Skills Section -->
<section class="container my-5">
  <div class="professional-card">
    <h2 class="text-center mb-4">
      <i class="fas fa-chart-line me-2 text-gradient" aria-hidden="true"></i>Core Competencies
    </h2>
    <div class="row">
      <div class="col-md-6">
        <h6>Cloud Architecture & DevOps</h6>
        <div class="skill-bar mb-3 visually-hidden">
          <div class="skill-progress" data-percentage="92"></div>
        </div>
        <h6>Infrastructure Security</h6>
        <div class="skill-bar mb-3 visually-hidden">
          <div class="skill-progress" data-percentage="88"></div>
        </div>
        <h6>Automation & Scripting</h6>
        <div class="skill-bar mb-3 visually-hidden">
          <div class="skill-progress" data-percentage="85"></div>
        </div>
      </div>
      <div class="col-md-6">
        <h6>System Administration</h6>
        <div class="skill-bar mb-3 visually-hidden">
          <div class="skill-progress" data-percentage="90"></div>
        </div>
        <h6>Performance Optimization</h6>
        <div class="skill-bar mb-3 visually-hidden">
          <div class="skill-progress" data-percentage="86"></div>
        </div>
        <h6>Technical Documentation</h6>
        <div class="skill-bar mb-3 visually-hidden">
          <div class="skill-progress" data-percentage="94"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Latest Technical Content -->
{% assign latest_post = site.posts | first %}
{% if latest_post %}
<section class="container my-5">
  <div class="professional-card animate__animated animate__fadeInUp">
    <h2 class="text-center mb-4">
      <i class="fas fa-newspaper me-2 text-gradient" aria-hidden="true"></i>Latest Technical Article
    </h2>
    <article class="text-center">
      <div class="blog-meta justify-content-center mb-3">
        <small><i class="far fa-calendar-alt me-1" aria-hidden="true"></i>{{ latest_post.date | date: "%B %d, %Y" }}</small>
        <small><i class="far fa-clock me-1" aria-hidden="true"></i><span class="reading-time" data-content="{{ latest_post.content | strip_html | split: ' ' | size }}">5</span> min read</small>
      </div>
      <h3 class="fw-bold">
        <a href="{{ latest_post.url | relative_url }}" class="text-decoration-none text-gradient">{{ latest_post.title }}</a>
      </h3>
      <p class="text-muted mb-4">{{ latest_post.excerpt | strip_html | truncatewords: 25 }}...</p>
      {% if latest_post.tags %}
      <div class="blog-tags justify-content-center mb-4">
        {% for tag in latest_post.tags limit: 4 %}
        <span class="blog-tag">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
      <a href="{{ latest_post.url | relative_url }}" class="btn btn-primary">
        <i class="fas fa-arrow-right me-2" aria-hidden="true"></i>Read Article
      </a>
    </article>
  </div>
</section>
{% endif %}

<!-- Professional Contact Section -->
<section class="container my-5">
  <div class="professional-card text-center animate__animated animate__fadeInUp">
    <h2 class="mb-4">
      <i class="fas fa-handshake me-2 text-gradient" aria-hidden="true"></i>Let's Collaborate
    </h2>
    <p class="text-muted mb-4">Interested in cloud solutions, DevOps automation, or technical consulting?</p>
    <div class="d-flex justify-content-center flex-wrap gap-3">
      <a href="{{ '/contact' | relative_url }}" class="btn btn-primary">
        <i class="fas fa-envelope me-2" aria-hidden="true"></i>Get In Touch
      </a>
      <a href="{{ site.social_links.linkedin }}" class="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-linkedin me-2" aria-hidden="true"></i>LinkedIn
      </a>
      <a href="{{ site.social_links.github }}" class="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-github me-2" aria-hidden="true"></i>GitHub
      </a>
    </div>
  </div>
</section>
