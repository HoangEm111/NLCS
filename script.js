const cards = document.querySelectorAll(".card");
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flip b"),
refreshBtn = document.querySelector(".details button"),
cardVoice = document.querySelector(".back-view img");
const musicThumbnail = document.querySelector(".music-thumb");
const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
let maxTime = 60;
let timeLeft = maxTime;
let flip = 0;
let matched = 0;
let cardOne, cardTwo, timer;
let disableDeck = false;
let isPlaying = false;
let indexSong = 0;
let isRepeat = false;



function initTimer(){
    if(timeLeft <= 0){
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}
function flipCardVoice({target: clickedCard})
{
    if(isPlaying){
        // clickedCard.addEventListener('click', playPause)

    }
}
function flipCard({target: clickedCard}) {

    if(!isPlaying){
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
        // clickedCard.addEventListener('click', playPause)

    };

    if(cardOne !== clickedCard && !disableDeck && timeLeft > 0) {
        flip++;
        flipsTag.innerText = flip;
        clickedCard.classList.add("flip");

        if(!cardOne) {
            return cardOne = clickedCard;

        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src;
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
function matchCards(img1, img2) {
    if(img1 == img2) {
        matched++;
        if(matched == 8 && timeLeft > 0) {
            return clearInterval(timer);
        


        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}
function shuffleCard() {
    timeLeft = maxTime;
    flip = matched = 0;
    clearInterval(timer);
    cardOne = cardTwo = "";
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flip;
    disableDeck = isPlaying = false;

    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(() => Math .random() > 0.5 ? 1 : -1);
    
    cards.forEach((card, i) =>{
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");

        setTimeout(() =>{
            // imgTag.src = `/asset/img/animal 1/img-${arr[(i)]}.png`;
            imgTag.src = `/asset/img/animal 1/img-${arr[i]}.png`;




        }, 500);
        card.addEventListener("click", flipCard);
       
    });
}




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


//   init(indexSong);
//   // song.setAttribute("src", `./music/${musics[indexSong].file}`);
//   playPause();

function playPause() {
    song.play();
    playBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    isPlaying = false;
  } 




function init(indexSong) {
  song.setAttribute("src", `./asset/voice/${musics[indexSong].file}`);

}
init(indexSong);
playBtn.addEventListener('click', playPause)
cardVoice.addEventListener('click', playPause)

shuffleCard();
    
refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
    card.addEventListener("click", flipCardVoice);
});
