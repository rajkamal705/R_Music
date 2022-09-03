console.log("Welcome to spotify");

// intialise the variables :
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

// Array of object type :
let songs = [
    {songName: "sabnami - Arijit singh", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Tu hi re - Ar Rahmaan", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "chithi - jubin nutiyal", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Breathless - shankar mahadevan", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Hero - Salman khan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Ashq na ho - Akshay kumar", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "kabhi yadoon me - divya khosla", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Rab dikhta hai - shreya ghoshal", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "do pal - lata mangeshkar", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "barish - Arijit singh", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

// handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})


// Listen to event :
audioElement.addEventListener('timeupdate', ()=> {
    // console.log('timeupdate'); // this is written just to check that time is updating or not.
    //update seekbar

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); //finding percentage of song played.
    // console.log(progress); // written just to check progress bar.
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100; // from above percentage formula.
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target); // just to check whether click is happening or not.

        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src= `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})

document.getElementById('next').addEventListener('click', ()=> {

    if(songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=> {

    if(songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }

    audioElement.src= `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName; // taken from songs array from above line
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})