// Music related
// const vinyl = document.getElementById("music-container");
const vinyl = document.getElementById("vinyl");
const playBtn = document.getElementById("playBtn");
const addBtn = document.getElementById("addBtn");

const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-bar");
const progressCircle = document.getElementById("progress-circle");
const progress = document.getElementById("progress-fill");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
// const musicContainer = document.getElementById("music-container");
// const playBtn = document.getElementById("play");

// const audio = document.getElementById("audio");
// const progress = document.getElementById("progress");
// const progressContainer = document.getElementById("progress-container");
// const title = document.getElementById("title");
// const cover = document.getElementById("cover");

//Space related
const tracker = document.querySelector(".tracker");

let isPlaying = true;
// Keep track of song
let songIndex = 0;
let currentSong, currentArtist, currentCover;

// Song titles
// const songs = ["Cold Heart", "Heat Waves", "Love Nwantiti", "Obsessed With You", "Shivers", "Whale"];
function getSongData() {
  return fetch("./data/music.json")
    .then((res) => res.json())
    .then((data) => data);
}

// Update song details
function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.audioSrc;
  cover.src = song.imageSrc;

  currentSong = song.title;
  currentArtist = song.artist;
  currentCover = song.imageSrc;
}

// Play song
function playSong() {
  isPlaying = true;
  vinyl.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play-circle");
  playBtn.querySelector("i.fas").classList.add("fa-pause-circle");

  console.log("pop music");

  audio.play();
}

// Pause song
function pauseSong() {
  isPlaying = false;
  vinyl.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play-circle");
  playBtn.querySelector("i.fas").classList.remove("fa-pause-circle");

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
  progressCircle.style.left = `${progressPercent}%`;
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
//   const isPlaying = vinyl.classList.contains("play");

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

addBtn.addEventListener("click", () => {
  const song = setupSongData();
  addSong('playlist', song);
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

  tracker.innerHTML = `
  <h4>ISS Orbit View 🛰</h4>
  <h4>Time: ${formattedTime}</h4>
  <h4>Latidude: ${lat}</h4>
  <h4>Longitude: ${long}</h4>
  <h4>Location: ${country} </h4>
  `;
}

function formatDate() {
  var d = new Date();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return d.getDate() + " " + monthNames[d.getMonth()];
}

function generateRandomLocation() {
  let number = generateRandomNumber(80);
  switch (number) {
    case 1:
      console.log(number);
      return "🐠 Above a fish";
    case 2:
      console.log(number);
      return "⚓️ Ships over there...";
    case 3:
      console.log(number);
      return " 🏴‍☠️ Was that Jack Sparrow!! Mental...";
    case 4:
      console.log(number);
      return "🐳 Just seen a whale! ";
    case 5:
      console.log(number);
      return "🦦 OMG a sea otter! #adorabbbble";
    case 6:
      console.log(number);
      return "Above Tom Hanks and Wilson ⚽️";
    case 7:
      console.log(number);
      return "Cheeky wave to Nepture 👋";
    case 8:
      console.log(number);
      return "Ooooh Davy Jones' locker 💰... Sneaky spot tbf";
    case 9:
      console.log(number);
      return "Huuuuge iceburg - 🥶";
    case 10:
      console.log(number);
      return "Titanic went down right there ... 🚢";
    case 11:
      console.log(number);
      return "It's JAWS - ACTUALLY P**PED ME PANTS 😱🦈";
    case 12:
      console.log(number);
      return "Where do fish sleep? On the sea bed! lolz 😏";
    case 13:
      console.log(number);
      return "Why did the fish blush? Because it saw the oceans bottom! 😏";
    case 14:
      console.log(number);
      return "Whale, hello there! Well I laughed...😳 ";
    case 15:
      console.log(number);
      return " Quite fancy a nap actually 🥱";
    case 16:
      console.log(number);
      return " This app is sooo much better over countires, am I right? 🤔";
    case 17:
      console.log(number);
      return " Winston dropped his phone in space...Noob! 🤣";
    case 18:
      console.log(number);
      return "I need more space...😏";
    case 19:
      console.log(number);
      return "Space was cool before it mattered 😏";
    case 20:
      console.log(number);
      return "Hang on the kids have just fired a rocket @ the moon 🚀";
    case 21:
      console.log(number);
      return "Jeff's rocket looks sus ...";

    default:
      console.log(number);
      return "🏝 Ocean Waves 🏖";
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
  const list = getLocalStorage('playlist');
  outputPlaylist(list);

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

              if (!aboveOcean) {
                loadSong(songs[0]);
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
              if (aboveOcean) {
                aboveOcean = false;
              }
              let newCountry = data.address.country;
              postDataCard(lat, long, country);

              if (country != newCountry) {
                country = newCountry;
                nextSong(songs);
                postDataCard(lat, long, country);
              }
            }
          });
      });
  }, 3000);
}

window.addEventListener("load", app);

function setupSongData() {

  let song = {
    title: currentSong,
    artist: currentArtist,
    cover: currentCover,
    date: formatDate(),
  };

  return song;
}

function removeSong(id) {

}


function addSong(playlist, song) {
  let updatedPlaylist;
  let storedPlaylist = getLocalStorage(playlist);
  console.log(storedPlaylist);
  if(!storedPlaylist) {
    updatedPlaylist = []
  } else {
    updatedPlaylist = storedPlaylist;
  }
  updatedPlaylist.push(song);
  console.log(updatedPlaylist);
  setLocalStorage(playlist, updatedPlaylist);

  outputPlaylist(updatedPlaylist);
  // outputSong(song);
}

// key = songs, value = array of song objects
function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// function outputSong(song, index) {
//   const playlist = document.querySelector(".playlist tbody");

//     playlist.innerHTML += `
//       <tr data-id='${song.id}'>
//         <td><img width="25" height="25" src="${song.cover}" /></td>
//         <td>
//           <h4>${song.title}</h4>
//           <p>${song.artist}</p>
//         </td>
//         <td>${song.date}</td>
//         <td><button onclick="deleteSong(this, ${index})" id="deleteBtn">delete</button></td>
//       </tr>
//       `;
//       console.log(index);
// }

function outputPlaylist(list) {
  
  if(list) {

    let output = '';

    list.forEach((song, index) => {
      output += `
      <tr>
      <td><img width="25" height="25" src="${song.cover}" /></td>
      <td>
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
      </td>
      <td>${song.date}</td>
      <td><button onclick="deleteSong(this, ${index})" id="deleteBtn">delete</button></td>
      </tr>
      `;
  
      const playlist = document.querySelector(".playlist tbody");
      playlist.innerHTML = output;
  
    })
  }
}

function deleteSong(el, index) {
  el.parentElement.parentElement.remove();
  let playlist = getLocalStorage('playlist');
  playlist.splice(index, 1);
  setLocalStorage('playlist', playlist);
  outputPlaylist(playlist)
}