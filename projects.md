---
layout: default
title: Projects
description: Explore my portfolio of enterprise-level projects in cloud automation, DevOps, and full-stack development
---

<!-- Projects Page -->
<section class="card-section">
  <h1 class="text-center mb-12">
    <i class="fas fa-project-diagram me-2 text-gradient" aria-hidden="true"></i>My Projects
  </h1>
  <p class="text-center text-muted mb-16 mx-auto" style="max-width: 700px;">
    A collection of enterprise-level projects showcasing automation, AI integration, and full-stack development capabilities.
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {% for project in site.projects %}
    <div>
      <div class="project-card-item">
        <div class="project-header">
          <h3>
            <a href="{{ project.url | relative_url }}" class="project-title-link">{{ project.title }}</a>
          </h3>
          {% if project.technologies %}
          <div class="tech-badges mt-3">
            {% for tech in project.technologies limit:4 %}
            <span class="tech-badge">{{ tech }}</span>
            {% endfor %}
          </div>
          {% endif %}
        </div>
        <p class="project-excerpt mt-4">{{ project.description }}</p>
        {% if project.highlights %}
        <ul class="project-highlights-list">
          {% for highlight in project.highlights limit:3 %}
          <li><i class="fas fa-check-circle me-2" aria-hidden="true"></i>{{ highlight }}</li>
          {% endfor %}
        </ul>
        {% endif %}
        <div class="project-footer mt-4">
          <a href="{{ project.url | relative_url }}" class="btn btn-primary">
            View Details <i class="fas fa-arrow-right ms-2" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</section>

<style>
.project-card-item {
  background: var(--bg-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  padding: 2rem;
  border: 1px solid var(--border);
  transition: all var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card-item:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-4px);
  border-color: var(--accent);
}

.project-title-link {
  color: var(--text-main);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  transition: color 0.2s;
}

.project-title-link:hover {
  color: var(--accent);
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
}

.project-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  flex-grow: 1;
}

.project-highlights-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.project-highlights-list li {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.project-highlights-list i {
  color: var(--accent);
}

.project-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}
</style>
