document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navMenu = document.querySelector('.nav-d');
  
  mobileMenuButton.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        navMenu.classList.remove('active');
      }
    });
  });

  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitButton = this.querySelector('button[type="submit"]');
      
      // Disable button during submission
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.message.includes('success')) {
          this.reset();
        }
      })
      .catch(error => {
        alert('Error: ' + error.message);
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });
    });
  }

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});
