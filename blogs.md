---
layout: default
title: Blog Posts
description: Read my thoughts and tutorials on Cloud, Cybersecurity, and more.
---

<section class="professional-card" style="max-width:1100px;margin:5rem auto 0 auto;text-align:left;">
  <h1 style="color:var(--accent);font-family:'Space Grotesk',sans-serif;font-weight:800;">Blog Posts</h1>
  <p style="color:var(--text-secondary);">Read my thoughts and tutorials on Cloud, Cybersecurity, and more.</p>
  <div style="margin:2.5rem 0;display:flex;gap:2rem;align-items:center;">
    <input type="text" class="form-control" id="blogSearch" placeholder="Search blogs..." style="max-width:320px;">
    <select class="form-select" id="categoryFilter" style="max-width:200px;">
      <option value="">All Categories</option>
      <option value="cloud">Cloud</option>
      <option value="devops">DevOps</option>
      <option value="cybersecurity">Cybersecurity</option>
      <option value="web-development">Web Development</option>
      <option value="tutorial">Tutorial</option>
    </select>
  </div>
  <h2 style="color:var(--accent);font-family:'Space Grotesk',sans-serif;font-weight:700;margin-top:3.5rem;">Most Popular Blogs</h2>
  <div id="popularBlogCarousel" style="margin-bottom:3.5rem;">
    <div class="carousel-inner">
      {% assign popular_posts = site.posts | sort: 'views' | reverse | slice: 0, 3 %}
      {% for post in popular_posts %}
        <div class="carousel-item {% if forloop.first %}active{% endif %}">
          <div class="project-card">
            <h3 style="color:var(--accent);font-weight:700;">
              <a href="{{ post.url | relative_url }}" style="color:var(--accent);">{{ post.title }}</a>
            </h3>
            <div class="blog-meta" style="color:var(--text-muted);margin-bottom:0.5rem;">
              <small><i class="far fa-calendar-alt me-1"></i>{{ post.date | date: "%B %d, %Y" }}</small>
              <small><i class="far fa-user me-1"></i>{{ post.author | default: site.author.name }}</small>
            </div>
            <p style="color:var(--text-secondary);">{{ post.excerpt | strip_html | truncate: 120 }}</p>
            {% if post.tags %}
            <div class="blog-tags mb-3">
              {% for tag in post.tags limit: 3 %}
              <span class="blog-tag">{{ tag }}</span>
              {% endfor %}
            </div>
            {% endif %}
            <a href="{{ post.url | relative_url }}" class="btn btn-outline-primary mt-2">Read More</a>
          </div>
        </div>
      {% endfor %}
    </div>
  </div>
  <h2 style="color:var(--accent);font-family:'Space Grotesk',sans-serif;font-weight:700;margin-top:3.5rem;">Latest Blogs</h2>
  <div id="blogList">
    {% include blog-list.html %}
  </div>
  <div id="noResults" style="text-align:center;padding:2rem;display:none;color:var(--text-muted);">
    <i class="fas fa-search fa-3x mb-3"></i>
    <h4>No blogs found</h4>
    <p>Try adjusting your search terms or filters.</p>
  </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('blogSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const blogList = document.getElementById('blogList');
  const noResults = document.getElementById('noResults');
  
  function filterBlogs() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value.toLowerCase();
    const blogPosts = document.querySelectorAll('.blog-post');
    let visibleCount = 0;
    
    blogPosts.forEach(post => {
      const title = post.querySelector('h3 a').textContent.toLowerCase();
      const content = post.querySelector('p').textContent.toLowerCase();
      const tags = Array.from(post.querySelectorAll('.blog-tag')).map(tag => tag.textContent.toLowerCase());
      
      const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
      const matchesCategory = !selectedCategory || tags.includes(selectedCategory);
      
      if (matchesSearch && matchesCategory) {
        post.style.display = 'block';
        visibleCount++;
      } else {
        post.style.display = 'none';
      }
    });
    
    if (visibleCount === 0) {
      noResults.classList.remove('d-none');
      blogList.classList.add('d-none');
    } else {
      noResults.classList.add('d-none');
      blogList.classList.remove('d-none');
    }
  }
  
  searchInput.addEventListener('input', filterBlogs);
  categoryFilter.addEventListener('change', filterBlogs);
});
</script>
