var touch;

function initListeners() {
   touch = document.getElementById("touch");
   touch.addEventListener("transitionend", afterTransition);
}

function showSecret() {
   touch.style.backgroundColor = "#38aa9f";
}

function hideSecret() {
   touch.style.backgroundColor = "#fff";
}

function afterTransition() {
   toggleFontWeight();
}

function toggleFontWeight() {
   document.getElementById("secret").style.fontWeight = 900;
}