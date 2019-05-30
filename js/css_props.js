var borderStyleOptions = ["solid", "double", "dashed", "dotted"];

function getAColor() {
   return "hsl(" + Math.floor(Math.random() * 359) + ", 100%, 50%)";
}

function getABorderStyle() {
   return borderStyleOptions[Math.floor(Math.random() * 4)];
}

function changeBackgroundColor() {
   var div = document.getElementById("colors");

   div.style.backgroundColor = getAColor();
}

function changeBorder() {
   var div = document.getElementById("borderControl");

   div.style.borderColor = getAColor();
   div.style.borderStyle = getABorderStyle();

}

function hideFull() {
   var div = document.getElementById("full");

   div.style.display = "none";
}

function showFull() {
   var div = document.getElementById("full");

   div.style.display = "block";
}

function changeHeight() {
   var div = document.getElementById("tall");

   div.style.height = (Math.floor(Math.random() * 5 + 1) * 100) + "px";
}

function changeWidth() {
   var div = document.getElementById("full");

   div.style.width = (Math.floor(Math.random() * 10 + 1) * 10) + "%";
}

function roundCorners() {
   var divs = document.getElementsByClassName("round");

   for (var d in divs) {
      divs[d].style.borderRadius = "100px";
   }
}

function squareCorners() {
   var divs = document.getElementsByClassName("round");

   for (var d in divs) {
      divs[d].style.borderRadius = "0px";
   }
}