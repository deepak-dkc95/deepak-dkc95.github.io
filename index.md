---
layout: default
title: Deepak Chourasia - Systems Engineer & Writer
description: Experienced systems engineer specializing in AWS, DevOps automation, and cybersecurity. Building scalable infrastructure solutions.
---

<!-- Professional Hero Section -->
<section class="hero-section">
  <div class="container">
    <img src="{{ '/assets/images/deepak.jpg' | relative_url }}" alt="Deepak Chourasia" class="hero-avatar">
    <h1 class="hero-title">Deepak Chourasia</h1>
    <p class="hero-subtitle">
      Systems Engineer • DevOps Specialist • Writer<br>
      <span class="text-gradient">Building scalable, secure, and efficient cloud solutions</span>
    </p>
    <div class="d-flex justify-content-center flex-wrap gap-3 mt-4">
      <a href="{{ '/about' | relative_url }}" class="btn btn-primary">
        <i class="fas fa-user me-2"></i>About Me
      </a>
      <a href="{{ '/assets/resume.pdf' | relative_url }}" class="btn btn-outline-primary" download>
        <i class="fas fa-download me-2"></i>Resume
      </a>
      <a href="{{ '/blogs' | relative_url }}" class="btn btn-outline-primary">
        <i class="fas fa-blog me-2"></i>Technical Blog
      </a>
    </div>
  </div>
</section>

<!-- Professional Expertise Section -->
<section class="container my-5">
  <div class="professional-card">
    <h2 class="text-center mb-4">
      <i class="fas fa-cogs me-2 text-gradient"></i>Technical Expertise
    </h2>
    <div class="tech-stack">
      <div class="tech-item">
        <i class="fab fa-aws"></i>
        <h5>AWS Cloud</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-docker"></i>
        <h5>Docker</h5>
      </div>
      <div class="tech-item">
        <i class="fas fa-kubernetes"></i>
        <h5>Kubernetes</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-python"></i>
        <h5>Python</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-js-square"></i>
        <h5>JavaScript</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-linux"></i>
        <h5>Linux</h5>
      </div>
      <div class="tech-item">
        <i class="fas fa-shield-alt"></i>
        <h5>Security</h5>
      </div>
      <div class="tech-item">
        <i class="fas fa-code-branch"></i>
        <h5>CI/CD</h5>
      </div>
    </div>
  </div>
</section>

<!-- Professional Skills Section -->
<section class="container my-5">
  <div class="skill-section">
    <h2 class="text-center mb-4">
      <i class="fas fa-chart-line me-2 text-gradient"></i>Core Competencies
    </h2>
    <div class="row">
      <div class="col-md-6">
        <h6>Cloud Architecture & DevOps</h6>
        <div class="skill-bar mb-3">
          <div class="skill-progress" data-percentage="92"></div>
        </div>
        <h6>Infrastructure Security</h6>
        <div class="skill-bar mb-3">
          <div class="skill-progress" data-percentage="88"></div>
        </div>
        <h6>Automation & Scripting</h6>
        <div class="skill-bar mb-3">
          <div class="skill-progress" data-percentage="85"></div>
        </div>
      </div>
      <div class="col-md-6">
        <h6>System Administration</h6>
        <div class="skill-bar mb-3">
          <div class="skill-progress" data-percentage="90"></div>
        </div>
        <h6>Performance Optimization</h6>
        <div class="skill-bar mb-3">
          <div class="skill-progress" data-percentage="86"></div>
        </div>
        <h6>Technical Documentation</h6>
        <div class="skill-bar mb-3">
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
  <div class="professional-card">
    <h2 class="text-center mb-4">
      <i class="fas fa-newspaper me-2 text-gradient"></i>Latest Technical Article
    </h2>
    <article class="text-center">
      <div class="blog-meta justify-content-center mb-3">
        <small><i class="far fa-calendar-alt me-1"></i>{{ latest_post.date | date: "%B %d, %Y" }}</small>
        <small><i class="far fa-clock me-1"></i><span class="reading-time" data-content="{{ latest_post.content | strip_html | split: ' ' | size }}">5</span> min read</small>
      </div>
      <h3 class="fw-bold">
        <a href="{{ latest_post.url | relative_url }}" class="text-decoration-none text-gradient">{{ latest_post.title }}</a>
      </h3>
      <p class="text-muted mb-4">{{ latest_post.excerpt | strip_html | truncatewords: 25 }}</p>
      {% if latest_post.tags %}
      <div class="blog-tags justify-content-center mb-4">
        {% for tag in latest_post.tags limit: 4 %}
        <span class="blog-tag">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
      <a href="{{ latest_post.url | relative_url }}" class="btn btn-primary">
        <i class="fas fa-arrow-right me-2"></i>Read Article
      </a>
    </article>
  </div>
</section>
{% endif %}

<!-- Professional Contact Section -->
<section class="container my-5">
  <div class="professional-card text-center">
    <h2 class="mb-4">
      <i class="fas fa-handshake me-2 text-gradient"></i>Let's Collaborate
    </h2>
    <p class="text-muted mb-4">Interested in cloud solutions, DevOps automation, or technical consulting?</p>
    <div class="d-flex justify-content-center flex-wrap gap-3">
      <a href="{{ '/contact' | relative_url }}" class="btn btn-primary">
        <i class="fas fa-envelope me-2"></i>Get In Touch
      </a>
      <a href="{{ site.social_links.linkedin }}" class="btn btn-outline-primary" target="_blank">
        <i class="fab fa-linkedin me-2"></i>LinkedIn
      </a>
      <a href="{{ site.social_links.github }}" class="btn btn-outline-primary" target="_blank">
        <i class="fab fa-github me-2"></i>GitHub
      </a>
    </div>
  </div>
</section>
