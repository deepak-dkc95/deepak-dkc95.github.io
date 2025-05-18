---
layout: default
title: Hi, I'm Deepak
description: Engineer • Learner • Cloud & Cybersecurity Enthusiast
---

<div class="text-center my-5">
  <img src="{{ '/assets/images/deepak.jpg' | relative_url }}" alt="Deepak Chourasia" class="rounded-circle shadow" width="150" height="150">
  <h1 class="mt-3 fw-bold">Deepak Chourasia</h1>
  <p class="lead">Engineer • Learner • Cloud & Cybersecurity Enthusiast</p>
  <a href="/about" class="btn btn-outline-primary m-2">More About Me</a>
  <a href="/assets/resume.pdf" class="btn btn-primary m-2" download>Download Resume</a>
</div>

<hr>

{% assign latest_post = site.posts | first %}
<article class="blog-post">
  <h2><a href="{{ latest_post.url | relative_url }}">{{ latest_post.title }}</a></h2>
  <p class="text-muted"><small>📅 {{ latest_post.date | date: "%B %d, %Y" }}</small></p>
  <p>{{ latest_post.excerpt | strip_html | truncatewords: 30 }}</p>
  <a href="{{ latest_post.url | relative_url }}" class="read-more">Read More →</a>
</article>

<hr>

{% include contact-form.html %}
