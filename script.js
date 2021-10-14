// Music related
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//Space related
const info = document.querySelector(".info-box");

// Song titles
const songs = ["Cold Heart", "Heat Waves", "Love Nwantiti", "Obsessed With You", "Shivers", "Whale"];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener("onload", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// Fetch apis
const locIqKey = "pk.bb10b56f6e68b7f09bcfdf9e751977b9";
let storedLocation;

setInterval(() => {
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then((res) => res.json())
    .then((data) => {
      let lat = data.latitude;
      let long = data.longitude;

      console.log("lat: ", lat);
      console.log("long: ", long);

      fetch(`https://us1.locationiq.com/v1/reverse.php?key=${locIqKey}&lat=${lat}&lon=${long}&zoom=3&format=json`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // console.log("above the ocean");
            let currentLocation = generateRandomLocation();
            if (storedLocation != null) {
              if (storedLocation != currentLocation) {
                nextSong();
                storedLocation = currentLocation;
              }
            } else {
              storedLocation = currentLocation;
            }
            postDataCard(lat, long, currentLocation);
          } else {
            nextSong();
            let country = data.address.country;
            postDataCard(lat, long, country);
            console.log("Country: ", data.address.country);
          }
        });
    });

  fetch("http://api.open-notify.org/astros.json")
    .then((res) => res.json())
    .then((data) => {
      let people = data.number;
      console.log("ppl in space: ", people);
    });
}, 3000);

function postDataCard(lat, long, country) {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let formattedTime = `${hours}:${minutes}:${seconds}`;
  info.innerHTML = `
  <h4>Time: </h4>
  <p>${formattedTime}</p>
  <h4>Latidude: </h4>
  <p>${lat}</p>
  <h4>Longitude: </h4>
  <p>${long}</p>
  <h4>Location: ${country} </h4>
  `;
}

function generateRandomLocation() {
  let number = generateRandomNumber(15);
  switch (number) {
    case 1:
      console.log(number);
      return "Above a fish";
    case 2:
      console.log(number);
      return "Above a ship";
    case 3:
      console.log(number);
      return "Above a pirate";
    case 4:
      console.log(number);
      return "Above a whale 🐳";
    case 5:
      console.log(number);
      return "Above a nuclear submarine";
    case 6:
      console.log(number);
      return "Above Tom Hanks and Wilson ⚽️";
    default:
      console.log(number);
      return "Above the shit";
  }
}

function generateRandomNumber(max) {
  return (randomNumber = Math.floor(Math.random() * max));
}

// create storedLocation
// get current location
// check if we have anything in stored location
// if not set storedLocation
// else check if they are equal
// if they are not equal change song
