 // GSAP Animation
 document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById("form-container");

    // Fade-in and slide-up animation
    gsap.to(formContainer, {
      opacity: 1,
      translateY: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Focus animation for inputs
    const inputFields = document.querySelectorAll(".input-field");
    inputFields.forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, {
          scale: 1.05,
          duration: 0.3,
          ease: "power1.out",
        });
      });
      input.addEventListener("blur", () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.3,
          ease: "power1.out",
        });
      });
    });
  });

  // Form Validation
  document.getElementById("orderForm").addEventListener("submit", function (e) {
    // Validate the form before submitting
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const designType = document.getElementById("designType").value;

    if (!name || !email || !phone || designType === "pilih") {
      e.preventDefault(); // Prevent form submission
      alert("Semua field harus diisi kecuali upload referensi!");
    }
  });