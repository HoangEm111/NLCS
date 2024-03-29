const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
// const nextBtn = document.querySelector(".play-forward");
// const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [
   {
      id: 1,
      title: "bird",
      file: "bird__gb_2.mp3",
      
    },
    {
      id: 2,
      title: "cat",
      file: "cat__gb_2.mp3",
      
    },
    {
      id: 3,
      title: "shark",
      file: "shark__gb_2.mp3",
      
    },
    {
      id: 4,
      title: "cow",
      file: "cow__gb_1.mp3",
      
    },
    {
      id: 5,
      title: "pig",
      file: "pig__gb_1.mp3",
      
    },
    {
      id: 6,
      title: "duck",
      file: "duck__gb_2.mp3",
      
    },

    {
      id: 7,
      title: "elephant",
      file: "elephant__gb_1.mp3",
      
    },

  //   {
  //     id: 2,
  //     title: "Summer",
  //     file: "shark__gb_2.mp3",
      
  //   },


  ];
/**
 * Music
 * id: 1
 * title: Holo
 * file: holo.mp3
 * image: unsplash
 */
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    playRepeat.removeAttribute("style");
  } else {
    isRepeat = true;
    playRepeat.style.color = "#ffb86c";
  }
});
nextBtn.addEventListener("click", function () {
  changeSong(1);
});
prevBtn.addEventListener("click", function () {
  changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    // handle repeat song
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
}
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  init(indexSong);
  // song.setAttribute("src", `./music/${musics[indexSong].file}`);
  playPause();
}
playBtn.addEventListener("click", playPause);
function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.play();
    playBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    isPlaying = false;
    timer = setInterval(displayTimer, 500);
  } else {
    musicThumbnail.classList.remove("is-playing");
    song.pause();
    playBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    isPlaying = true;
    clearInterval(timer);
  }
}
// function displayTimer() {
//   const { duration, currentTime } = song;
//   rangeBar.max = duration;
//   rangeBar.value = currentTime;
//   remainingTime.textContent = formatTimer(currentTime);
//   if (!duration) {
//     durationTime.textContent = "00:00";
//   } else {
//     durationTime.textContent = formatTimer(duration);
//   }
// }
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  song.currentTime = rangeBar.value;
}
function init(indexSong) {
  song.setAttribute("src", `./asset/voice/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong)