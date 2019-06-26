var slideContainer, slideShow, slides, slideIndex, width, lastButtonClicked;

// var leftBtn = $('#left');
// var rightBtn = $('#right');
// var width = 1140;

function init() {
   slideContainer = document.getElementById("slideContainer");
   slideShow = document.getElementById("slideShow");
   slides = document.getElementsByClassName("slides");

   slideIndex = 0;
   setWidth();

   document.getElementById("left").onclick = slideLeft;
   document.getElementById("right").onclick = slideRight;

   slideShow.ontransitionend = loopSlides;

   for (let i = 0; i < slides.length; i++) {
      slides[i].onclick = rotate;
   }
}

function rotate() {
   if (this.style.transform == "rotate(360deg)") {
      this.style.transform = "rotate(0deg)"
   } else {
      this.style.transform = "rotate(360deg)"
   }
}

function setWidth() {
   width = slideContainer.offsetWidth;

   for (let i = 0; i < slides.length; i++) {
      slides[i].style.maxWidth = width;
   }
}

function slideRight() {
   lastButtonClicked = "right";

   if (slideIndex < slides.length - 1) {
      slideIndex++;
   }
   
   translateSlides();  
}

function slideLeft() {
   lastButtonClicked = "left";

   if (slideIndex > 0) {
      slideIndex--;
   }
   
   translateSlides();   
}

function translateSlides() {
   slideShow.style.transform = "translate(" + (-1 * width * (slideIndex)) + "px, 0px)";
}

function loopSlides() {
   let loop = false;

   if (lastButtonClicked == "right" && slideIndex >= slides.length - 1) {
      slideIndex = 0;
      loop = true;
   } else if (lastButtonClicked == "left" && slideIndex <= 0) {
      slideIndex = slides.length - 1;
      loop = true;
   } else if (lastButtonClicked = "loop") {
      slideShow.style.transitionDuration = "2s";
   }

   if (loop) {
      slideShow.style.transitionDuration = "1ms";
      translateSlides();
      lastButtonClicked = "loop";
   }
}