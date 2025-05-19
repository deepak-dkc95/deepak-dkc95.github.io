---
layout: default
title: Deepak Chourasia
description: Engineer • Learner • Cloud & Cybersecurity Enthusiast
---

<!-- Hero Section -->
<section class="text-center my-5">
  <img src="{{ '/assets/images/deepak.jpg' | relative_url }}" alt="Deepak Chourasia" class="rounded-circle shadow mb-3" width="150" height="150">
  <h1 class="fw-bold">Deepak Chourasia</h1>
  <p class="lead text-secondary">Engineer • Learner • Cloud & Cybersecurity Enthusiast</p>
  <div class="d-flex justify-content-center flex-wrap gap-2 mt-3">
    <a href="/about" class="btn btn-outline-primary">More About Me</a>
    <a href="/assets/resume.pdf" class="btn btn-primary" download>
      <i class="fas fa-download me-1"></i> Download Resume
    </a>
  </div>
</section>

<hr class="my-5">

<!-- Latest Blog Post -->
{% assign latest_post = site.posts | first %}
{% if latest_post %}
<article class="blog-post mb-5">
  <h2 class="h4 fw-bold"><a href="{{ latest_post.url | relative_url }}" class="text-decoration-none">{{ latest_post.title }}</a></h2>
  <p class="text-muted mb-1"><small><i class="far fa-calendar-alt me-1"></i>{{ latest_post.date | date: "%B %d, %Y" }}</small></p>
  <p>{{ latest_post.excerpt | strip_html | truncatewords: 30 }}</p>
  <a href="{{ latest_post.url | relative_url }}" class="btn btn-sm btn-outline-secondary">Read More →</a>
</article>
{% endif %}

<hr class="my-5">

<!-- Contact Form -->
{% include contact-form.html %}
