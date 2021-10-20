// Music related
// const vinyl = document.getElementById("music-container");
const vinyl = document.getElementById("vinyl");
const playBtn = document.getElementById("playBtn");
const addBtn = document.getElementById("addBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const audio = document.getElementById("audio");
const progressContainer = document.getElementById("progress-bar");
const progressCircle = document.getElementById("progress-circle");
const progress = document.getElementById("progress-fill");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const mpCurrent = document.getElementById("current");
const mpDuration = document.getElementById("duration");

const tracker = document.querySelector(".tracker");
const stars = document.querySelector('.stars');

// Star functions
function createStar() {
  let star = document.createElement('div');

  star.classList.add('star');

  let size = generateRandomNumber(4);
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${generateRandomNumber(100)}%`;
  star.style.top = `${generateRandomNumber(100)}%`;
  star.style.animation = `twinkle 4s ${generateRandomNumber(10)}s linear infinite, drift 8s ${generateRandomNumber(10)}s linear infinite`;

  return star;
}
function appendStars(number) {
  for (let i = 0; i < number; i++) {
    stars.append(createStar());
  }
}

function getSongData() {
  return fetch("./data/music.json")
    .then((res) => res.json())
    .then((data) => data);
}

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
  progressCircle.classList.add("play");
  playBtn.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  isPlaying = false;
  vinyl.classList.remove("play");
  progressCircle.classList.remove("play");
  playBtn.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// Previous song
function prevSong(songs) {
  // If above ocean
  if (songs.ocean) {
    oceanIndex--;

    if (oceanIndex < 0) {
      oceanIndex = songs.length - 1;
    }

    loadSong(songs[oceanIndex]);
  }
  // If above land
  else {
    regularIndex--;

    if (regularIndex < 0) {
      regularIndex = songs.length - 1;
    }

    loadSong(songs[regularIndex]);
  }

  if (isPlaying) {
    playSong();
  }
}

// Next song
function nextSong(songs) {
  // If above ocean
  if (songs.ocean) {
    oceanIndex++;

    if (oceanIndex > songs.length - 1) {
      oceanIndex = 0;
    }

    loadSong(songs[oceanIndex]);
  }
  // If above land
  else {
    regularIndex++;

    if (regularIndex > songs.length - 1) {
      regularIndex = 0;
    }

    loadSong(songs[regularIndex]);
  }

  if (isPlaying) {
    playSong();
  }
}

function formatTime(seconds) {

  // console.log('formatTime: ', seconds);
  minutes = Math.floor(seconds / 60);
  minutes = (minutes >= 10) ? minutes : minutes;
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

// Update progress bar
function updateProgress(e) {
  const overlay = document.getElementById("overlay");
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  overlay.style.width = `${100 - progressPercent}%`;
  progressCircle.style.left = `${progressPercent}%`;

  const innerDot = document.getElementById("progress-circle-inner");
  let dotColor = percentToColor(progressPercent);
  innerDot.style.backgroundColor = dotColor;
  
  // Update time in DOM
  let currentToSeconds = Math.floor(currentTime)
  let durationToSeconds = Math.floor(duration)

  if (!Number.isNaN(durationToSeconds)) {
    mpCurrent.innerHTML = formatTime(currentToSeconds);
    mpDuration.innerHTML = formatTime(durationToSeconds);
  }
}

// Set progress bar
function setProgress(e) {
  console.log(this);
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function percentToColor(percent) {
  var r,
    g,
    b = 0;
  if (percent < 50) {
    r = 255;
    g = Math.round(5.1 * percent);
  } else {
    g = 255;
    r = Math.round(510 - 5.1 * percent);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  return "#" + ("000000" + h.toString(16)).slice(-6);
}

function postDataCard(lat, long, country) {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let formattedTime = `${hours}:${minutes}:${seconds}`;

  tracker.innerHTML = `
  <h4>ISS Orbit View 🛰</h4>
          <div class="tracker__list"><h5>Time: </h5> <p>${formattedTime}</p></div>
          <div class="tracker__list"><h5>Latitude: </h5> <p>${lat}</p></div>
          <div class="tracker__list"><h5>Longitude: </h5> <p>${long}</p></div>
          <div class="tracker__list"><h5>Location: </h5> <p>${country}</p></div>
  `;
}

function formatDate() {
  var d = new Date();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return d.getDate() + " " + monthNames[d.getMonth()];
}

function generateRandomLocation() {
  let number = generateRandomNumber(110);
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
      return "It's JAWS!!!! 😱🦈";
    case 12:
      console.log(number);
      return "Where do fish sleep? On the sea bed! lolz 😏";
    case 13:
      console.log(number);
      return " Quite fancy a nap actually 🥱";
    case 14:
      console.log(number);
      return " This app is sooo much better over countires, am I right? 🤔";
    case 15:
      console.log(number);
      return " Winston dropped his phone in space...Noob! 🤣";
    case 16:
      console.log(number);
      return "I need more space...😏";
    case 17:
      console.log(number);
      return "Hang on the kids have just fired a rocket @ the moon 🚀";
    case 18:
      console.log(number);
      return "Jeff's rocket looks sus ...";

    default:
      console.log(number);
      return "🏝 Orbiting Ocean Waves 🏖";
  }
}

function generateRandomNumber(max) {
  return (randomNumber = Math.floor(Math.random() * max));
}

function updateIndex(index) {
  console.log(index);
  index++;
  console.log(index);
}

// ============ Local Storage - adding and removing ============
function setupSongData() {
  let song = {
    title: currentSong,
    artist: currentArtist,
    cover: currentCover,
    date: formatDate(),
  };

  return song;
}
function addSong(playlist, song) {
  let updatedPlaylist;
  let storedPlaylist = getLocalStorage(playlist);
  console.log(storedPlaylist);
  if (!storedPlaylist) {
    updatedPlaylist = [];
  } else {
    updatedPlaylist = storedPlaylist;
  }
  updatedPlaylist.push(song);
  console.log(updatedPlaylist);
  setLocalStorage(playlist, updatedPlaylist);

  outputPlaylist(updatedPlaylist);
  // outputSong(song);
}
// Set stringified data to LS
function setLocalStorage(key, value) {
  // key = songs, value = array of song objects
  localStorage.setItem(key, JSON.stringify(value));
}
// Get parsed data from LS
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// Print Playlist to DOM
function outputPlaylist(list) {
  if (list) {
    let output = "";

    list.forEach((song, index) => {
      output += `
      <tr>
      <td><img width="25" height="25" src="${song.cover}" /></td>
      <td>
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
      </td>
      <td>${song.date}</td>
      <td><button onclick="deleteSong(this, ${index})" class="btn btn--sm" id="deleteBtn"><i class="fas fa-trash-alt"></i></button></td>
      </tr>
      `;

      const playlist = document.querySelector(".playlist tbody");
      playlist.innerHTML = output;
    });
  }
}
// Delete song from LS and DOM
function deleteSong(el, index) {
  el.parentElement.parentElement.remove();
  let playlist = getLocalStorage("playlist");
  playlist.splice(index, 1);
  setLocalStorage("playlist", playlist);
  outputPlaylist(playlist);
}

// ============ Init and run app on load ============
const locIqKey = "pk.bb10b56f6e68b7f09bcfdf9e751977b9";
let oceanLocation;
let country;

let isPlaying = true;
// Keep track of songs
let regularIndex = 0;
let oceanIndex = 0;

// Keep track of current song, artist and cover art
let currentSong, currentArtist, currentCover;

async function app() {
  
  let totalStars = 300;
  appendStars(totalStars);

  // Get all songs (both regular and ocean)
  let songs = await getSongData();
  let aboveOcean;

  let currentPlaylist;

  const list = getLocalStorage("playlist");
  outputPlaylist(list);

  // Event listeners
  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  addBtn.addEventListener("click", () => {
    const song = setupSongData();
    addSong("playlist", song);
  });

  nextBtn.addEventListener("click", () => {
    nextSong(currentPlaylist);
  });
  prevBtn.addEventListener("click", () => {
    prevSong(currentPlaylist);
  });

  // Time/song update
  audio.addEventListener("timeupdate", updateProgress);

  // Click on progress bar
  progressContainer.addEventListener("click", setProgress);

  // Song ends
  audio.addEventListener("ended", () => {
    nextSong(currentPlaylist);
  });

  setInterval(() => {
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
      .then((res) => res.json())
      .then((data) => {
        let lat = data.latitude.toFixed(4);
        let long = data.longitude.toFixed(4);

        console.log("lat: ", lat);
        console.log("long: ", long);

        fetch(`https://us1.locationiq.com/v1/reverse.php?key=${locIqKey}&lat=${lat}&lon=${long}&zoom=3&format=json`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              let newOceanLocation = generateRandomLocation();
              currentPlaylist = songs.ocean;

              if (!aboveOcean) {
                aboveOcean = true;
                nextSong(songs.ocean);
                // playSong();
                console.log(songs.ocean);
              }

              if (oceanLocation != null && oceanLocation != newOceanLocation) {
                oceanLocation = newOceanLocation; // update oceanLocation
              } else {
                oceanLocation = newOceanLocation;
              }

              postDataCard(lat, long, newOceanLocation);
            } else {
              currentPlaylist = songs.regular;
              if (aboveOcean) {
                aboveOcean = false;
              }
              let newCountry = data.address.country;
              postDataCard(lat, long, country);

              if (country != newCountry) {
                country = newCountry;
                nextSong(songs.regular);
                postDataCard(lat, long, country);
              }
            }
          });
      });
  }, 3000);
}

window.addEventListener("load", app);


// amount of stars
// for loop that runs for the amount of stars
// each iteration creates a div with class star
// set a random size to each star
// set random animation delay time to each star

