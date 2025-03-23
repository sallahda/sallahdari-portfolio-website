document.addEventListener('DOMContentLoaded', function() {
  // Make window.moveSlide available globally for inline event handlers
  window.moveSlide = function(n, sliderId) {
      moveSlide(n, sliderId);
  };

  // Slider functionality (Keep existing code)
  var slideIndexes = {
      slider1: 0,
      slider2: 0
  };

  function moveSlide(n, sliderId) {
      slideIndexes[sliderId] += n;
      showSlides(sliderId);
  }

  function showSlides(sliderId) {
      var i;
      var slides = document.querySelectorAll(`#${sliderId} img`);
      var slideIndex = slideIndexes[sliderId];

      if (slideIndex >= slides.length) {
          slideIndexes[sliderId] = 0;
          slideIndex = 0;
      }
      if (slideIndex < 0) {
          slideIndexes[sliderId] = slides.length - 1;
          slideIndex = slides.length - 1;
      }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      slides[slideIndex].style.display = "block";
  }

  // Initialize sliders (if they exist)
  function initializeSliders() {
      var sliders = document.querySelectorAll(".image-wrapper");
      if (sliders.length > 0) {
          sliders.forEach(slider => {
              var sliderId = slider.id;
              slideIndexes[sliderId] = 0;
              showSlides(sliderId);
          });
      }
  }
  
  initializeSliders();

  // Project filtering functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
          button.addEventListener('click', () => {
              // Remove active class from all buttons
              filterButtons.forEach(btn => btn.classList.remove('active'));
              
              // Add active class to clicked button
              button.classList.add('active');
              
              // Get filter value
              const filterValue = button.getAttribute('data-filter');
              
              // Filter projects
              projectItems.forEach(item => {
                  const categories = item.getAttribute('data-category').split(' ');
                  
                  if (filterValue === 'all' || categories.includes(filterValue)) {
                      item.classList.remove('hidden');
                  } else {
                      item.classList.add('hidden');
                  }
              });
          });
      });
  }

  // Project Modal Functionality
  const projectDetailLinks = document.querySelectorAll('.project-view-details');
  const modalContainers = document.querySelectorAll('.project-modal-container');
  const modalCloseButtons = document.querySelectorAll('.modal-close');

  // Open modal when clicking "View Details"
  if (projectDetailLinks.length > 0) {
      projectDetailLinks.forEach(link => {
          link.addEventListener('click', (e) => {
              e.preventDefault();
              const projectId = link.getAttribute('data-project');
              const modal = document.getElementById(`${projectId}-modal`);
              
              if (modal) {
                  modal.style.display = 'block';
                  document.body.style.overflow = 'hidden'; // Prevent scrolling
              }
          });
      });
  }

  // Close modal when clicking the X button
  if (modalCloseButtons.length > 0) {
      modalCloseButtons.forEach(button => {
          button.addEventListener('click', () => {
              const modal = button.closest('.project-modal-container');
              modal.style.display = 'none';
              document.body.style.overflow = 'auto'; // Re-enable scrolling
          });
      });
  }

  // Close modal when clicking outside the modal content
  if (modalContainers.length > 0) {
      modalContainers.forEach(container => {
          container.addEventListener('click', (e) => {
              if (e.target === container) {
                  container.style.display = 'none';
                  document.body.style.overflow = 'auto'; // Re-enable scrolling
              }
          });
      });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          modalContainers.forEach(container => {
              if (container.style.display === 'block') {
                  container.style.display = 'none';
                  document.body.style.overflow = 'auto'; // Re-enable scrolling
              }
          });
      }
  });

  // Animate projects on scroll
  function animateOnScroll() {
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach((card, index) => {
          const cardPosition = card.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          // Add animation delay based on index
          const delay = index * 0.15;
          
          if (cardPosition < screenPosition) {
              card.style.animation = `fadeInUp 0.6s ease-out ${delay}s forwards`;
              card.style.opacity = '1';
          }
      });
  }
  
  // Initial check on page load
  if (document.querySelectorAll('.project-card').length > 0) {
      setTimeout(animateOnScroll, 300);
      
      // Check on scroll
      window.addEventListener('scroll', animateOnScroll);
  }
});