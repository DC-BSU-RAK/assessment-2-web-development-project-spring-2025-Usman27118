document.addEventListener("DOMContentLoaded", function () {
  // Hero Slideshow
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(n) {
    slides.forEach((slide) => slide.classList.remove("active"));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      // In a real app, you would send this to your server
      alert(
        `Thank you for subscribing with ${email}! You'll receive our newsletter soon.`
      );
      this.reset();
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // In a real app, you would send this data to your server
      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      this.classList.toggle("active");
      const answer = this.nextElementSibling;
      if (this.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = "0";
      }
    });
  });

  // Filter Buttons
  const filterButtons = document.querySelectorAll(
    ".news-categories button, .gallery-filters button"
  );
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons in the same container
      this.parentNode.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove("active");
      });
      // Add active class to clicked button
      this.classList.add("active");
      // In a real app, you would filter content here
    });
  });

  // Mobile Menu Toggle (would be added in a real implementation)
  // You would need to add a hamburger menu button in the HTML for mobile
});
