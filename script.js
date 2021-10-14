// Music related
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

//Space related
const info = document.querySelector(".info-box");

let isPlaying = true;
// Keep track of song
let songIndex = 0;

// Song titles
// const songs = ["Cold Heart", "Heat Waves", "Love Nwantiti", "Obsessed With You", "Shivers", "Whale"];
function getSongData() {
  return fetch("./data/music.json")
    .then(res => res.json())
    .then(data => data)
}

// Update song details
function loadSong(song) {
  title.innerText = song.title;
  audio.src = song.audioSrc;
  cover.src = song.imageSrc;
}

// Play song
function playSong() {
  isPlaying = true;
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  console.log('pop music');

  audio.play();
}

// Pause song
function pauseSong() {
  isPlaying = false;
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// // Previous song
// function prevSong() {
//   songIndex--;

//   if (songIndex < 0) {
//     songIndex = songs.length - 1;
//   }

//   loadSong(songs[songIndex]);
//   playSong();
// }

// Next song
function nextSong(songs) {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  
  if (isPlaying) {
    playSong();
  }
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
// window.addEventListener("load", () => {
//   const isPlaying = musicContainer.classList.contains("play");

//   if (isPlaying) {
//     pauseSong();
//   } else {
//     playSong();
//   }
// });

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});


// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// Click on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);

// Fetch apis
const locIqKey = "pk.bb10b56f6e68b7f09bcfdf9e751977b9";
let oceanLocation;
let country;



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
      return "Above the ocean";
  }
}

function generateRandomNumber(max) {
  return (randomNumber = Math.floor(Math.random() * max));
}

// create oceanLocation
// get current location
// check if we have anything in stored location
// if not set oceanLocation
// else check if they are equal
// if they are not equal change song

async function app() {
  let songs = await getSongData();
  let aboveOcean;

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
              let newOceanLocation = generateRandomLocation();

              if(!aboveOcean) {
                loadSong(songs[songIndex]);
                playSong();
                aboveOcean = true;
              }
  
              if (oceanLocation != null && oceanLocation != newOceanLocation) {

                oceanLocation = newOceanLocation; // update oceanLocation
              } else {
                oceanLocation = newOceanLocation;
              }
  
              postDataCard(lat, long, newOceanLocation);
  
            } else {
              if(aboveOcean) {
                aboveOcean = false;
              }
              let newCountry = data.address.country;
              postDataCard(lat, long, country);
              
              if(country != newCountry) {
                country = newCountry;
                nextSong(songs);
                postDataCard(lat, long, country);
              }
            }
          });
      });
  }, 3000);
  
}

window.addEventListener('load', app);