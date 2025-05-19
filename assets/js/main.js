document.addEventListener("DOMContentLoaded", () => {

  // Smooth Scroll for internal links
  document.querySelectorAll('a.nav-link, .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        document.querySelector(this.hash).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Typewriter Effect (Homepage)
  const typewriterText = document.querySelector('.lead');
  if(typewriterText){
    const text = 'Engineer • Learner • Cloud & Cybersecurity Enthusiast';
    let idx = 0;

    function typeWriter() {
      if (idx < text.length) {
        typewriterText.innerHTML += text.charAt(idx);
        idx++;
        setTimeout(typeWriter, 75);
      }
    }
    typeWriter();
  }

  // Form Submission Handling
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successAlert = document.getElementById('success-alert');

  if (form) {
    form.addEventListener('submit', () => {
      submitBtn.disabled = true;
      setTimeout(() => { submitBtn.disabled = false; }, 5000);
    });

    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === '1' && successAlert) {
      successAlert.classList.remove('d-none');
    }
  }

  // Blog View Counter
  const postTitleElement = document.querySelector('h1.fw-bold');
  if(postTitleElement){
    const postTitle = postTitleElement.innerText;
    const postKey = `views_${postTitle.replace(/\s+/g, '_')}`;
    localStorage.setItem(postKey, (parseInt(localStorage.getItem(postKey)) || 0) + 1);
  }

  // Tracking blog clicks for Popular Blogs
  document.querySelectorAll(".blog-post h3 a, .carousel-item a").forEach(link => {
    link.addEventListener("click", () => {
      const key = `views_${link.innerText.replace(/\s+/g, '_')}`;
      localStorage.setItem(key, (parseInt(localStorage.getItem(key)) || 0) + 1);
    });
  });

});