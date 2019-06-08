var dp1, dp2, dp3, dp4, dp5;

function initListeners() {
   dp1 = document.getElementById("dp1");
   dp2 = document.getElementById("dp2");
   dp3 = document.getElementById("dp3");
   dp4 = document.getElementById("dp4");
   dp5 = document.getElementById("dp5");

   dp1.style.transitionDelay = "2s";

   dp1.addEventListener("transitionstart", dp1Transition);
   dp2.addEventListener("transitionstart", dp2Transition);
   dp3.addEventListener("transitionstart", dp3Transition);
   dp4.addEventListener("transitionstart", dp4Transition);
   dp5.addEventListener("transitionend", dp5Transition);

   showGraph();
}

function showGraph() {
   console.log("showGraph");
   dp1.style.backgroundPositionX = "10%";   
}

function dp1Transition() {
   dp2.style.backgroundPositionX = "20%";
}

function dp2Transition() {
   dp3.style.backgroundPositionX = "30%";
}

function dp3Transition() {
   dp4.style.backgroundPositionX = "40%";
}

function dp4Transition() {
   dp5.style.backgroundPositionX = "50%";
}

function dp5Transition() {
   document.getElementById("secret").style.opacity = "1";
}