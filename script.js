// Responsive navigation toggle for mobile
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navList = document.querySelector("nav ul");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      navList.classList.toggle("show");
    });

    // Hide menu after clicking a link (on mobile)
    navList.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 600) {
          navList.classList.remove("show");
        }
      });
    });
  }

  // Contact form feedback
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("status").textContent = "Thank you! Your message has been sent (demo only).";
      contactForm.reset();
    });
  }
});
