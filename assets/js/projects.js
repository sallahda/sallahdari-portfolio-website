document.addEventListener('DOMContentLoaded', function() {
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

    // Image Viewer Functionality
    const zoomableImages = document.querySelectorAll('.zoomable-image');
    const imageViewer = document.getElementById('image-viewer-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const closeViewerBtn = document.querySelector('.close-viewer');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const thumbnailsContainer = document.querySelector('.image-thumbnails-container');
    
    let currentImagesSet = [];
    let currentIndex = 0;

    // Function to open the image viewer
    function openImageViewer(images, index) {
        currentImagesSet = images;
        currentIndex = index;
        
        // Set the main image
        updateMainImage();
        
        // Create thumbnails
        createThumbnails();
        
        // Show the viewer
        imageViewer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Function to update the main image
    function updateMainImage() {
        const imageSrc = currentImagesSet[currentIndex].src;
        fullscreenImage.src = imageSrc;
        
        // Update thumbnails active state
        const thumbnails = document.querySelectorAll('.image-thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (index === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // Function to create thumbnails
    function createThumbnails() {
        thumbnailsContainer.innerHTML = '';
        
        currentImagesSet.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.src;
            thumbnail.alt = image.alt || 'Thumbnail';
            thumbnail.classList.add('image-thumbnail');
            
            if (index === currentIndex) {
                thumbnail.classList.add('active');
            }
            
            thumbnail.addEventListener('click', () => {
                currentIndex = index;
                updateMainImage();
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
    }

    // Function to navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + currentImagesSet.length) % currentImagesSet.length;
        updateMainImage();
    }

    // Function to navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % currentImagesSet.length;
        updateMainImage();
    }

    // Add click event to zoomable images
    if (zoomableImages.length > 0) {
        zoomableImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                // Find all images in the same modal
                const modalContent = img.closest('.modal-content');
                const allImages = Array.from(modalContent.querySelectorAll('.zoomable-image'));
                
                openImageViewer(allImages, allImages.indexOf(img));
            });
        });
    }

    // Event listeners for image viewer controls
    if (closeViewerBtn) {
        closeViewerBtn.addEventListener('click', () => {
            imageViewer.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextImage);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevImage);
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (imageViewer.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'Escape') {
                imageViewer.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        } else if (e.key === 'Escape') {
            // Close modal with Escape key
            modalContainers.forEach(container => {
                if (container.style.display === 'block') {
                    container.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Close image viewer when clicking outside the image
    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            imageViewer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});