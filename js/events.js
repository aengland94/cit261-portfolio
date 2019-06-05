var touch, shown, secret, spacers;

function initListeners() {
   shown = false;
   touch = document.getElementById("touch");
   touch.addEventListener("transitionend", afterTransition);
   // touch.addEventListener("mouseenter", showSecret);
   // touch.addEventListener("mouseleave", hideSecret);
   secret = document.getElementById("secret");

   spacers = document.getElementsByClassName("spacer");
   for (var i = 0; i < spacers.length; i++) {
      spacers[i].addEventListener("animationend", endAnimation);
      spacers[i].addEventListener("animationiteration", iterateAnimation);
   }
}

function showSecret() {
   touch.style.backgroundColor = "#38aa9f";
   shown = true;
}

function hideSecret() {
   touch.style.backgroundColor = "#fff";
   shown = false;
}

function afterTransition() {
   toggleFontWeight();
   resetAnimation();
}

function toggleFontWeight() {
   secret.style.fontWeight = shown ? 900 : 300;
}

function resetAnimation() {
   var animation = shown ? "pulseHeight 2s 4" : "pulseHeight2 2s 4";
   for (var i = 0; i < spacers.length; i++) {
      spacers[i].style.animation = animation;
   }
}

function endAnimation() {
   this.style.backgroundColor = shown ? "#fff" : "#38aa9f";
}

function iterateAnimation() {
   this.style.backgroundColor = getAColor();
}

function getAColor() {
   return "hsl(" + Math.floor(Math.random() * 359) + ", 100%, 50%)";
}