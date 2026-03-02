
const containerRecent = document.getElementById("recent_list");
const containerPopular = document.getElementById("popular_album");
const containerTop = document.getElementById('top_songs');


const data = await fetch("http://localhost:5000/api/releases").then(res=>res.json()).catch(err=>alert(err.message));
const songs = data.musics

const top10 = songs.slice(0,10);

top10.forEach((file,index) => {
    const topElement = `<li class="pop-song">
    <div class="pop-song-inner">
    <div class="pop-song-detail">
    <span>${index+1}</span>
    <span class="pop-song-text">
    <img width="54" height="54" src=${file.cover}/>
    <span>${file.title}</span>
    </span>
    </div>
    <div class="pop-song-record">
    <div class="duration">
    <i class="fa-solid fa-clock"></i>
    <span>00:30</span>
    </div>
    <i class="fa-solid fa-heart"></i>
    <button class="play-btn"><i class="fa-solid fa-play"></i></button>
    </div>
    </div>
    </li>`
    containerTop.innerHTML += topElement;
})
