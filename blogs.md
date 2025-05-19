---
layout: default
title: Blog Posts
description: Read my thoughts and tutorials on Cloud, Cybersecurity, and more.
---

<div class="container my-5 animate__animated animate__fadeIn">

  <!-- Popular Blog Slider -->
  <h2 class="mb-4 text-center fw-bold">🌟 Most Popular Blogs</h2>
  <div id="popularBlogCarousel" class="carousel slide mb-5 shadow" data-bs-ride="carousel">
    <div class="carousel-inner">
      {% assign popular_posts = site.posts | sort: 'views' | reverse | slice: 0, 3 %}
      {% for post in popular_posts %}
        <div class="carousel-item {% if forloop.first %}active{% endif %}">
          <div class="d-flex flex-column align-items-center p-4">
            <h3 class="fw-bold text-primary">
              <a href="{{ post.url | relative_url }}" class="text-decoration-none text-primary">{{ post.title }}</a>
            </h3>
            <p class="text-muted">
              <small><i class="far fa-calendar-alt"></i> {{ post.date | date: "%B %d, %Y" }}</small>
            </p>
            <p class="text-center">{{ post.excerpt | strip_html | truncate: 120 }}</p>
            <a href="{{ post.url | relative_url }}" class="btn btn-outline-primary mt-2">Read More</a>
          </div>
        </div>
      {% endfor %}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#popularBlogCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#popularBlogCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>

  <!-- Blog List -->
  <h2 class="mb-4 text-center fw-bold">📝 Latest Blogs</h2>
  {% include blog-list.html %}

</div>
