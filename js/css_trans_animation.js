var item;

function setTriggers() {
   item = document.getElementById("item");
   document.getElementById("horButton").onclick = moveHorizonally;
   document.getElementById("verButton").onclick = moveVertically;
   document.getElementById("boxButton").onclick = moveInABox;
   item.onmouseenter = aniPause;
   item.onmouseleave = aniPlay;
   item.style.transition = "background-color 0.5s"
}

function moveHorizonally() {
   item.style.animation = "moveRight 3s infinite";
   item.style.animationFillMode = "both";
   item.style.animationDirection = "alternate";
   item.style.animationTimingFunction = "ease-in";
}

function moveVertically() {
   item.style.animation = "moveDown 1s infinite";
   item.style.animationFillMode = "both";
   item.style.animationDirection = "alternate";
   item.style.animationTimingFunction = "ease-out";
}

function moveInABox() {
   item.style.animation = "moveInABox 4s 4";
   item.style.animationFillMode = "both";
   item.style.animationDirection = "normal";
   item.style.animationTimingFunction = "linear";
}

function aniPause() {
   item.style.animationPlayState = "paused";
}

function aniPlay() {
   item.style.animationPlayState = "running";
}