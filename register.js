// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Navigation menu toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navLinks.classList.toggle("active")
      })
    }
  
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar")
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Form submission
    const registrationForm = document.getElementById("registrationForm")
  
    if (registrationForm) {
      registrationForm.addEventListener("submit", (event) => {
        event.preventDefault()
  
        // Form validation
        const requiredFields = document.querySelectorAll("[required]")
        let isValid = true
  
        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            isValid = false
            field.classList.add("error")
          } else {
            field.classList.remove("error")
          }
        })
  
        if (isValid) {
          // Show success message
          alert("Registration successful! We will contact you soon.")
          registrationForm.reset()
        } else {
          alert("Please fill in all required fields.")
        }
      })
    }
  })
  
  