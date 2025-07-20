---
layout: default
title: Deepak Chourasia
description: Engineer • Learner • Cloud & Cybersecurity Enthusiast
---

<!-- Hero Section -->
<section class="text-center my-5 animate__animated animate__fadeIn">
  <img src="{{ '/assets/images/deepak.jpg' | relative_url }}" alt="Deepak Chourasia" class="rounded-circle shadow mb-3 border border-4 border-primary" width="150" height="150">
  <h1 class="fw-bold text-primary">Deepak Chourasia</h1>
  <p class="lead text-dark-emphasis"></p>
  <div class="d-flex justify-content-center flex-wrap gap-2 mt-3">
    <a href="{{ '/about' | relative_url }}" class="btn btn-outline-primary">
      <i class="fas fa-user me-1"></i> More About Me
    </a>
    <a href="{{ '/assets/resume.pdf' | relative_url }}" class="btn btn-primary" download>
      <i class="fas fa-download me-1"></i> Download Resume
    </a>
  </div>
</section>

<hr class="my-5">

<!-- Terminal Demo Section -->
<section class="my-5">
  <h2 class="h3 fw-bold text-primary mb-4">
    <i class="fas fa-terminal me-2"></i>Terminal Demo
  </h2>
  <div class="terminal">
    <div class="terminal-content">
      <!-- Terminal content will be populated by JavaScript -->
    </div>
  </div>
</section>

<hr class="my-5">

<!-- Tech Stack Section -->
<section class="my-5">
  <h2 class="h3 fw-bold text-primary mb-4">
    <i class="fas fa-code me-2"></i>Tech Stack
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
</section>

<hr class="my-5">

<!-- Skills Section -->
<section class="my-5">
  <h2 class="h3 fw-bold text-primary mb-4">
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
</section>

<hr class="my-5">

<!-- Activity Graph Section -->
<section class="my-5">
  <h2 class="h3 fw-bold text-primary mb-4">
    <i class="fas fa-calendar-alt me-2"></i>Activity Overview
  </h2>
  <div class="activity-graph">
    <p class="text-muted mb-3">My coding activity over the past year (GitHub-style)</p>
    <div class="activity-grid">
      <!-- Activity cells will be populated by JavaScript -->
    </div>
    <div class="mt-3">
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

<hr class="my-5">

<!-- Latest Blog Post -->
{% assign latest_post = site.posts | first %}
{% if latest_post %}
<article class="blog-post mb-5 animate__animated animate__fadeInUp">
  <div class="blog-meta">
    <small><i class="far fa-calendar-alt me-1"></i>{{ latest_post.date | date: "%B %d, %Y" }}</small>
    <small><i class="far fa-user me-1"></i>{{ latest_post.author }}</small>
  </div>
  <h2 class="h4 fw-bold text-primary"><a href="{{ latest_post.url | relative_url }}" class="text-decoration-none">{{ latest_post.title }}</a></h2>
  <p>{{ latest_post.excerpt | strip_html | truncatewords: 30 }}</p>
  <div class="blog-tags">
    <span class="blog-tag">Cloud</span>
    <span class="blog-tag">DevOps</span>
    <span class="blog-tag">Tech</span>
  </div>
  <a href="{{ latest_post.url | relative_url }}" class="btn btn-sm btn-outline-secondary mt-2">Read More →</a>
</article>
{% endif %}

<hr class="my-5">

<!-- Contact Form -->
{% include contact-form.html %}
