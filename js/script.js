document.addEventListener("DOMContentLoaded", () => {
  // Keep the footer year current.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Smoothly reveal content as it enters the viewport.
  const revealItems = document.querySelectorAll(
    ".section-heading, .about-lead, .body-copy, .fact-card, .skill-card, .project-card, .contact-form"
  );
  revealItems.forEach(item => item.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Highlight the current navigation section.
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));

  // Back-to-top button.
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Frontend-only contact form: compose a message in the visitor's email app.
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("senderName").value.trim();
    const email = document.getElementById("senderEmail").value.trim();
    const message = document.getElementById("senderMessage").value.trim();
    const recipient = "your.email@example.com"; // Replace with your real email.
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });

  // Close the mobile navigation after a section link is selected.
  document.querySelectorAll("#mainNav .nav-link, #mainNav .nav-cta").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mainNav");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
