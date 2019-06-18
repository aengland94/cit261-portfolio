var toggleButton, musicItems, track, trackCount;

function init() {
   toggleButton = document.getElementById("music-button");
   toggleButton.onclick = startMusic;

   document.getElementById("stop-music-button").onclick = stopMusic;

   track = document.getElementById("track");
   trackCount = 0;
   track.onanimationiteration = setNewTrack;

   musicItems = document.getElementsByClassName("music-item");

   console.log("initualized");
}

function startMusic() {
   for (var i = 0; i < musicItems.length; i++) {
      musicItems[i].classList.add("music-ani-" + (i + 1));
   }

   track.classList.add("track-ani");
   setNewTrack();

   toggleButton.onclick = pauseMusic;
   toggleButton.innerHTML = "Pause";
}

function pauseMusic() {
   for (var i = 0; i < musicItems.length; i++) {
      musicItems[i].style.animationPlayState = "paused";
   }

   track.style.animationPlayState = "paused";
   
   toggleButton.onclick = unpauseMusic;
   toggleButton.innerHTML = "Play";
}

function unpauseMusic() {
   for (var i = 0; i < musicItems.length; i++) {
      musicItems[i].style.animationPlayState = "running";
   }

   track.style.animationPlayState = "running";
   
   toggleButton.onclick = pauseMusic;
   toggleButton.innerHTML = "Pause";
}

function stopMusic() {
   for (var i = 0; i < musicItems.length; i++) {
      musicItems[i].classList.remove("music-ani-" + (i + 1));
   }

   track.classList.remove("track-ani");
   trackCount = 0;

   toggleButton.onclick = startMusic;
   toggleButton.innerHTML = "Play";
}

function setNewTrack() {
   trackCount++;
   track.innerHTML = "Now Playing: Track " + trackCount;
}