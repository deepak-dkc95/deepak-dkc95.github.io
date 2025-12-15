# Deepak Chourasia - Tech Portfolio Website

A modern, tech-savvy personal portfolio website built with Jekyll, featuring dark mode, interactive elements, and a focus on cloud computing, DevOps, and cybersecurity.

## 🚀 Features

### Core Features
- **Dark/Light Mode Toggle** - Automatic system preference detection
- **Interactive Terminal Demo** - Real-time command simulation
- **Tech Stack Showcase** - Animated technology icons with hover effects
- **GitHub-style Activity Graph** - Visual representation of coding activity
- **Skills Progress Bars** - Animated skill visualization
- **Responsive Design** - Mobile-first approach with Bootstrap 5

### Technical Features
- **Performance Optimized** - Lazy loading, image optimization, caching
- **SEO Optimized** - Meta tags, structured data, sitemap
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Modern CSS** - CSS Grid, Flexbox, CSS Variables, animations
- **Progressive Enhancement** - Works without JavaScript

## 🛠️ Tech Stack

- **Static Site Generator**: Jekyll 4.3
- **CSS Framework**: Bootstrap 5.3
- **Icons**: Font Awesome 6.5
- **Animations**: Animate.css
- **Deployment**: GitHub Pages + GitHub Actions
- **Form Handling**: Formspree
- **Performance**: Service Worker (planned)

## 📦 Installation

### Prerequisites
- Ruby 3.2 or higher
- Node.js 18 or higher
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/deepak-dkc95/deepak-dkc95.github.io.git
   cd deepak-dkc95.github.io
   ```

2. **Install dependencies**
   ```bash
   # Install Ruby gems
   bundle install
   
   # Install Node.js dependencies (if any)
   npm install
   ```

3. **Run the development server**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Open your browser**
   Navigate to `http://localhost:4000`

## 🎨 Customization

### Configuration
Edit `_config.yml` to customize:
- Site title, description, and author
- Social media links
- SEO configuration

### Styling
- **CSS Variables**: Edit `assets/css/styles.css` for theme colors
- **Dark Mode**: Customize dark theme colors in CSS variables
- **Animations**: Modify animation durations and effects

### Content
- **Pages**: Create new pages in the root directory
- **Images**: Store images in `assets/images/`

## 🚀 Deployment

### GitHub Pages (Recommended)
1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Your site will be available at `https://deepak-dkc95.github.io`

### Manual Deployment
```bash
# Build the site
bundle exec jekyll build

# Deploy to your preferred hosting service
```

## 🔧 Development

### Project Structure
```
├── _config.yml          # Site configuration
├── _layouts/            # Page layouts
├── _includes/           # Reusable components
├── assets/              # Static assets
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   └── images/         # Images
├── .github/workflows/   # GitHub Actions
└── Gemfile             # Ruby dependencies
```

### Key Files
- `assets/css/styles.css` - Main stylesheet with CSS variables
- `assets/js/main.js` - Main JavaScript functionality
- `_layouts/default.html` - Base layout template
- `_includes/navbar.html` - Navigation component
- `_includes/contact-form.html` - Contact form component

## 🎯 Performance

### Optimizations Implemented
- **Image Optimization**: WebP format support
- **CSS Minification**: Production builds
- **JavaScript Bundling**: Optimized loading
- **Caching**: Browser and CDN caching
- **Lazy Loading**: Images and components

### Performance Metrics
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

### Implemented Security Measures
- **HTTPS Only**: All connections encrypted
- **Content Security Policy**: XSS protection
- **Form Validation**: Client and server-side validation
- **Input Sanitization**: All user inputs sanitized
- **Dependency Scanning**: Regular security updates

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bootstrap** - CSS framework
- **Font Awesome** - Icons
- **Animate.css** - Animations
- **Jekyll** - Static site generator
- **GitHub Pages** - Hosting

## 📞 Contact

- **Website**: [deepak-dkc95.github.io](https://deepak-dkc95.github.io)
- **LinkedIn**: [Deepak Chourasia](https://www.linkedin.com/in/deepak-chourasia-3bb283256)
- **GitHub**: [deepak-dkc95](https://github.com/deepak-dkc95)
- **Blog**: [deepakdc94.blogspot.com](https://deepakdc94.blogspot.com)

---

**Built with ❤️ by Deepak Chourasia**

