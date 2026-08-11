import './style.css'

// Scroll Reveal Animation Logic
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(
    entries,
    observer
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });
  
  // Navbar blur effect on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '1rem 0';
      navbar.style.background = 'rgba(5, 5, 5, 0.9)';
    } else {
      navbar.style.padding = '1.5rem 0';
      navbar.style.background = 'rgba(5, 5, 5, 0.7)';
    }
  });
});
