document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const successAlert = document.getElementById("success-alert");
  const submitBtn = document.getElementById("submit-btn");
  const form = document.getElementById("contact-form");

  if (!submitBtn || !form) return; // Exit if elements not on the page

  if (params.get("success") === "1") {
    if (successAlert) successAlert.classList.remove("d-none");
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = false;
  }

  form.addEventListener("submit", () => {
    submitBtn.disabled = true;
  });
});
