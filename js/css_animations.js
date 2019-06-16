var toggleButton, musicItems;

function init() {
   toggleButton = document.getElementById("music-button");
   toggleButton.onclick = startMusic;

   document.getElementById("stop-music-button").onclick = stopMusic;

   musicItems = document.getElementsByClassName("music-item");

   console.log("initualized");
}

function startMusic() {
   for (var i = 0; i < musicItems.length; i++) {
      musicItems[i].classList.add("music-ani-" + (i + 1));
   }
   // document.getElementById("music-item-1").classList.add("music-ani-1");
   toggleButton.onclick = pauseMusic;
   toggleButton.innerHTML = "Pause Music";
}

function pauseMusic() {
   for (var i = 0; i < musicItems.length; i++) {
      musicItems[i].style.animationPlayState = "paused";
   }
   // document.getElementById("music-item-1").classList.remove("music-ani-1");
   toggleButton.onclick = unpauseMusic;
   toggleButton.innerHTML = "Play Music";
}

function unpauseMusic() {
   for (var i = 0; i < musicItems.length; i++) {
      musicItems[i].style.animationPlayState = "running";
   }
   // document.getElementById("music-item-1").classList.remove("music-ani-1");
   toggleButton.onclick = pauseMusic;
   toggleButton.innerHTML = "Pause Music";
}

function stopMusic() {
   for (var i = 0; i < musicItems.length; i++) {
      musicItems[i].classList.remove("music-ani-" + (i + 1));
   }
   // document.getElementById("music-item-1").classList.remove("music-ani-1");
   toggleButton.onclick = startMusic;
   toggleButton.innerHTML = "Play Music";
}