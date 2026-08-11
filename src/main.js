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

  // Modal and Live Chat Simulation Logic
  const openChatModalBtn = document.getElementById('openChatModalBtn');
  const closeChatModalBtn = document.getElementById('closeModalBtn');
  const chatModal = document.getElementById('chatModal');
  const chatSimForm = document.getElementById('chatSimForm');

  if (openChatModalBtn && chatModal) {
    openChatModalBtn.addEventListener('click', () => {
      chatModal.classList.add('active');
    });

    closeChatModalBtn.addEventListener('click', () => {
      chatModal.classList.remove('active');
    });

    // Close on overlay click
    chatModal.addEventListener('click', (e) => {
      if (e.target === chatModal) {
        chatModal.classList.remove('active');
      }
    });

    // Handle form submission
    chatSimForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('chatName').value;
      const rawPhone = document.getElementById('chatPhone').value;
      const phone = '+60' + rawPhone.replace(/^0+/, ''); // Prepend +60 and remove any leading zero

      if (window.NXLiveChat) {
        // Set user info to NXLiveChat
        window.NXLiveChat.setUserInfo({
          name: name,
          phone: phone,
          customer_id: 'user_' + Math.floor(Math.random() * 1000000) // Dummy ID
        });
        
        // Open the chat widget
        window.NXLiveChat.showChatBtn();
        // There is no documented openChat() method in NXLink docs, so we just show the button and they can click it.
        // Wait 300ms and close the modal
        setTimeout(() => {
          chatModal.classList.remove('active');
          chatSimForm.reset();
        }, 300);
      } else {
        alert("Live chat is still loading. Please try again in a moment.");
      }
    });
  }
});
