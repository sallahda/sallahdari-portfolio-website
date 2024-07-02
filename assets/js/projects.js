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

// Initialize sliders
function initializeSliders() {
  var sliders = document.querySelectorAll(".image-wrapper");
  sliders.forEach(slider => {
      var sliderId = slider.id;
      slideIndexes[sliderId] = 0;
      showSlides(sliderId);
  });
}

initializeSliders();
