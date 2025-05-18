document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const successAlert = document.getElementById("success-alert");
  const submitBtn = document.getElementById("submit-btn");
  const form = document.getElementById("contact-form");

  // Contact form submit button enable/disable
  if (submitBtn && form) {
    if (params.get("success") === "1") {
      if (successAlert) successAlert.classList.remove("d-none");
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = false;
    }

    form.addEventListener("submit", () => {
      submitBtn.disabled = true;
    });
  }

  // Blog post view tracking (localStorage)
  const postTitle = document.querySelector("h1.fw-bold")?.innerText;
  if (postTitle) {
    const postKey = `views_${postTitle.replace(/\s+/g, "_")}`;
    let currentViews = localStorage.getItem(postKey);
    if (currentViews === null) {
      localStorage.setItem(postKey, 1);
    } else {
      localStorage.setItem(postKey, parseInt(currentViews) + 1);
    }
  }
});
