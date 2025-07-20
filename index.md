---
layout: default
title: Deepak Chourasia
description: Engineer • Learner • Cloud & Cybersecurity Enthusiast
---

<!-- Particle Background -->
<div class="particle-background"></div>

<!-- Hero Section -->
<section class="hero-section">
  <div class="container">
    <img src="{{ '/assets/images/deepak.jpg' | relative_url }}" alt="Deepak Chourasia" class="hero-avatar">
    <h1 class="hero-title">Deepak Chourasia</h1>
    <p class="hero-subtitle">Cloud Engineer • DevOps Specialist • Cybersecurity Enthusiast<br><span style="font-size:1.1rem;font-weight:400;color:var(--neon-blue);">Building scalable, secure, and modern cloud solutions.</span></p>
    <div class="d-flex justify-content-center flex-wrap gap-3 mt-4">
      <a href="{{ '/about' | relative_url }}" class="btn btn-primary">
        <i class="fas fa-user me-2"></i>About Me
      </a>
      <a href="{{ '/assets/resume.pdf' | relative_url }}" class="btn btn-outline-primary" download>
        <i class="fas fa-download me-2"></i>Download Resume
      </a>
      <a href="{{ '/blogs' | relative_url }}" class="btn btn-outline-primary">
        <i class="fas fa-blog me-2"></i>Read Blog
      </a>
    </div>
  </div>
</section>

<!-- Tech Stack Section -->
<section class="container my-5">
  <div class="glass-card p-4">
    <h2 class="text-center mb-4">
      <i class="fas fa-code me-2"></i>Tech Stack & Skills
    </h2>
    <div class="tech-stack">
      <div class="tech-item">
        <i class="fab fa-aws"></i>
        <h5>AWS</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-docker"></i>
        <h5>Docker</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-kubernetes"></i>
        <h5>Kubernetes</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-python"></i>
        <h5>Python</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-js"></i>
        <h5>JavaScript</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-react"></i>
        <h5>React</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-node-js"></i>
        <h5>Node.js</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-git-alt"></i>
        <h5>Git</h5>
      </div>
      <div class="tech-item">
        <i class="fab fa-linux"></i>
        <h5>Linux</h5>
      </div>
      <div class="tech-item">
        <i class="fas fa-shield-alt"></i>
        <h5>Cybersecurity</h5>
      </div>
      <div class="tech-item">
        <i class="fas fa-cloud"></i>
        <h5>Cloud</h5>
      </div>
      <div class="tech-item">
        <i class="fas fa-server"></i>
        <h5>DevOps</h5>
      </div>
    </div>
  </div>
</section>

<!-- Skills Section -->
<section class="container my-5">
  <div class="skill-section">
    <h2 class="text-center mb-4">
      <i class="fas fa-chart-bar me-2"></i>Skills & Expertise
    </h2>
    <div class="row">
      <div class="col-md-6">
        <h5>Cloud & DevOps</h5>
        <div class="skill-bar">
          <div class="skill-progress" data-percentage="90"></div>
        </div>
        <h5>Cybersecurity</h5>
        <div class="skill-bar">
          <div class="skill-progress" data-percentage="85"></div>
        </div>
        <h5>Web Development</h5>
        <div class="skill-bar">
          <div class="skill-progress" data-percentage="80"></div>
        </div>
      </div>
      <div class="col-md-6">
        <h5>Python Programming</h5>
        <div class="skill-bar">
          <div class="skill-progress" data-percentage="88"></div>
        </div>
        <h5>System Administration</h5>
        <div class="skill-bar">
          <div class="skill-progress" data-percentage="82"></div>
        </div>
        <h5>Database Management</h5>
        <div class="skill-bar">
          <div class="skill-progress" data-percentage="75"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Activity Graph Section -->
<section class="container my-5">
  <div class="activity-graph">
    <h2 class="text-center mb-4">
      <i class="fas fa-calendar-alt me-2"></i>Coding Activity
    </h2>
    <p class="text-center text-muted mb-4">My development activity over the past year (GitHub-style)</p>
    <div class="activity-grid">
      <!-- Activity cells will be populated by JavaScript -->
    </div>
    <div class="text-center mt-4">
      <small class="text-muted">
        <span class="me-3">Less</span>
        <span class="activity-cell me-1" data-level="1"></span>
        <span class="activity-cell me-1" data-level="2"></span>
        <span class="activity-cell me-1" data-level="3"></span>
        <span class="activity-cell me-1" data-level="4"></span>
        <span class="activity-cell me-3" data-level="5"></span>
        <span>More</span>
      </small>
    </div>
  </div>
</section>

<!-- Latest Blog Post -->
{% assign latest_post = site.posts | first %}
{% if latest_post %}
<section class="container my-5">
  <div class="glass-card p-4">
    <h2 class="text-center mb-4">
      <i class="fas fa-newspaper me-2"></i>Latest Blog Post
    </h2>
    <article class="blog-post">
      <div class="blog-meta">
        <small><i class="far fa-calendar-alt me-1"></i>{{ latest_post.date | date: "%B %d, %Y" }}</small>
        <small><i class="far fa-user me-1"></i>{{ latest_post.author }}</small>
      </div>
      <h3 class="h4 fw-bold">
        <a href="{{ latest_post.url | relative_url }}" class="text-decoration-none">{{ latest_post.title }}</a>
      </h3>
      <p>{{ latest_post.excerpt | strip_html | truncatewords: 30 }}</p>
      <div class="blog-tags">
        <span class="blog-tag">Cloud</span>
        <span class="blog-tag">DevOps</span>
        <span class="blog-tag">Tech</span>
      </div>
      <a href="{{ latest_post.url | relative_url }}" class="btn btn-outline-primary mt-3">
        <i class="fas fa-arrow-right me-2"></i>Read More
      </a>
    </article>
  </div>
</section>
{% endif %}

<!-- Contact Section -->
<section class="container my-5">
  <div class="glass-card p-4">
    <h2 class="text-center mb-4">
      <i class="fas fa-envelope me-2"></i>Get In Touch
    </h2>
    <p class="text-center text-muted mb-4">Ready to collaborate? Let's discuss your next project!</p>
    {% include contact-form.html %}
  </div>
</section>
