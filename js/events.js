var touch, grow, secret;

function initListeners() {
   grow = true;
   touch = document.getElementById("touch");
   touch.addEventListener("transitionend", afterTransition);
   secret = document.getElementById("secret");
   secret.addEventListener("transitionend", breakaway)   
}

function showSecret() {
   touch.style.backgroundColor = "#38aa9f";
}

function hideSecret() {
   touch.style.backgroundColor = "#fff";
}

function afterTransition() {
   toggleFontWeight();
   resetAnimation();
}

function toggleFontWeight() {
   var size;

   if (grow) {
      grow = false;
      size = 900;
   } else {
      grow = true;
      size = 300;
   }

   secret.style.fontWeight = size;
}

function resetAnimation() {
   for (var item in document.getElementsByClassName("spacer")) {
      item.style.animation = "blank";
      item.style.animation = "pulseHeight 2s 4";
   }
}

function breakaway() {
   console.log("secret transition ended");
}