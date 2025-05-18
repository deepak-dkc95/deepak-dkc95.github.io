---
layout: default
title: Blogs
description: Read my latest thoughts and tech write-ups.
permalink: /blogs/
popular: true
---

<section class="container my-5">
  <h1 class="text-center mb-4 fw-bold">📝 Blogs</h1>

  {% if site.posts.size > 0 %}
    {% for post in site.posts %}
      <div class="blog-post mb-5">
        <h2>
          <a href="{{ post.url | relative_url }}" class="text-decoration-none text-primary fw-bold">
            {{ post.title }}
          </a>
        </h2>
        <p class="text-muted mb-1">
          <small>📅 {{ post.date | date: "%B %d, %Y" }}</small>
          {% if post.author %} | <small>✍️ {{ post.author }}</small>{% endif %}
        </p>
        <p>{{ post.description | truncatewords: 30 }}</p>
        <a href="{{ post.url | relative_url }}" class="read-more text-decoration-none">Read more →</a>
        <hr>
      </div>
    {% endfor %}
  {% else %}
    <p class="text-center">No blog posts yet. Stay tuned!</p>
  {% endif %}
</section>
