// Next Orbital Code - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileToggle.classList.remove('active');
        }
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.background = 'rgba(9, 9, 11, 0.95)';
    } else {
      header.style.background = 'rgba(9, 9, 11, 0.8)';
    }
    
    lastScroll = currentScroll;
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
  });
  
  // Form handling with fetch (no redirect)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      try {
        const formData = new FormData(contactForm);
        
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          // Success - show message and reset form
          contactForm.reset();
          showFormMessage(contactForm, 'Thank you! Your message has been sent successfully.', 'success');
        } else {
          throw new Error('Server responded with an error');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage(contactForm, 'Something went wrong. Please try again or email us directly.', 'error');
      } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
  
  // Helper function to show form messages
  function showFormMessage(form, message, type) {
    // Remove any existing message
    const existingMsg = form.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `form-message form-message-${type}`;
    msgDiv.textContent = message;
    
    // Insert after the submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.insertAdjacentElement('afterend', msgDiv);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => msgDiv.remove(), 5000);
    }
  }
});

