---
layout: default
title: Blog Posts
description: Read my thoughts and tutorials on Cloud, Cybersecurity, and more.
---

<div class="container my-5 animate__animated animate__fadeIn">

  <!-- Search and Filter Section -->
  <div class="row mb-4">
    <div class="col-md-8">
      <div class="input-group">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
        <input type="text" class="form-control" id="blogSearch" placeholder="Search blogs...">
      </div>
    </div>
    <div class="col-md-4">
      <select class="form-select" id="categoryFilter">
        <option value="">All Categories</option>
        <option value="cloud">Cloud</option>
        <option value="devops">DevOps</option>
        <option value="cybersecurity">Cybersecurity</option>
        <option value="web-development">Web Development</option>
        <option value="tutorial">Tutorial</option>
      </select>
    </div>
  </div>

  <!-- Popular Blog Slider -->
  <h2 class="mb-4 text-center fw-bold">
    <i class="fas fa-star me-2"></i>Most Popular Blogs
  </h2>
  <div id="popularBlogCarousel" class="carousel slide mb-5 shadow rounded" data-bs-ride="carousel">
    <div class="carousel-inner">
      {% assign popular_posts = site.posts | sort: 'views' | reverse | slice: 0, 3 %}
      {% for post in popular_posts %}
        <div class="carousel-item {% if forloop.first %}active{% endif %}">
          <div class="d-flex flex-column align-items-center p-4">
            <h3 class="fw-bold text-primary">
              <a href="{{ post.url | relative_url }}" class="text-decoration-none text-primary">{{ post.title }}</a>
            </h3>
            <div class="blog-meta mb-2">
              <small><i class="far fa-calendar-alt me-1"></i>{{ post.date | date: "%B %d, %Y" }}</small>
              <small><i class="far fa-user me-1"></i>{{ post.author | default: site.author }}</small>
            </div>
            <p class="text-center">{{ post.excerpt | strip_html | truncate: 120 }}</p>
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
    <button class="carousel-control-prev" type="button" data-bs-target="#popularBlogCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#popularBlogCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>

  <!-- Blog List -->
  <h2 class="mb-4 text-center fw-bold">
    <i class="fas fa-pen-fancy me-2"></i>Latest Blogs
  </h2>
  <div id="blogList">
    {% include blog-list.html %}
  </div>

  <!-- No Results Message -->
  <div id="noResults" class="text-center py-5 d-none">
    <i class="fas fa-search fa-3x text-muted mb-3"></i>
    <h4 class="text-muted">No blogs found</h4>
    <p class="text-muted">Try adjusting your search terms or filters.</p>
  </div>

</div>

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
