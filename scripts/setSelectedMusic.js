
const data = await fetch("http://localhost:5000/api/releases").then(res=>res.json()).catch(err=>alert(err.message));
const songs = data.musics;

const footer = document.querySelector("footer");
const footerTemplate = footer.querySelector("#footer_template");
const playBtns = document.querySelectorAll(".play-btn");

function playAudio(ranking){
    const audio = footer.querySelector("audio");
    const song = songs.find(item=>Number(item.ranking) === Number(ranking));
    audio.src=song.audio_src;
    audio.play();
}

function pauseAudio(ev){
    const audio = footer.querySelector("audio");
    const pauseBtn = ev.currentTarget;
    pauseBtn.classList.replace("pause-btn","play-btn");
    pauseBtn.querySelector("i").classList.replace("fa-pause","fa-play");
    audio.pause();
}
function goBackAudio(){
    const audio = footer.querySelector("audio");
    audio.currentTime -= 10;
}
function goFurtherAudio(){
    const audio = footer.querySelector("audio");
    audio.currentTime += 10;
}
function resumeAudio(ev){
    const audio = footer.querySelector("audio");
    const playBtn = ev.currentTarget;
    playBtn.classList.replace("play-btn","pause-btn");
    playBtn.querySelector("i").classList.replace("fa-play","fa-pause");
    audio.play();
}

function formatTime(seconds){
    if(!Number.isFinite(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function paintSeekBar(barElement, currentTime, duration){
    const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
    const progress = safeDuration ? (currentTime / safeDuration) * 100 : 0;
    barElement.style.background = `linear-gradient(to right, var(--primary) ${progress}%, var(--gray) ${progress}%)`;
}


function renderSongDetails(ranking){
    const song = songs.find(item=>Number(item.ranking) === Number(ranking));
    const element = `<section class="footer-container">
                <input id="bar_playtime" type="range" min="0" max="0" value="0" step="0.1"/>
                <div id="detail_3">
                    <div id="artist">
                        <div id="detail_4">
                            <img width="64" height="64" src=${song.cover}/>
                            <div id="info_2">
                                <span>${song.title}</span>
                                <span>${song.artist}</span>
                            </div>
                        </div>
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div id="play">
                        <audio><source src=${song.audio_src}/></audio>
                        <button class="shuffle-btn"><i class="fa-solid fa-shuffle"></i></button>
                        <button class="go-back-btn"><i class="fa-solid fa-backward"></i></button>
                        <button class="pause-btn toggler"><i class="fa-solid fa-pause"></i></button>
                        <button class="go-further-btn"><i class="fa-solid fa-forward"></i></button>
                        <button><i class="fa-solid fa-repeat"></i></button>
                    </div>
                    <div id="sound">
                        <span>XX:XX / 00:30</span>
                        <div id="sound_inner">
                            <div id="bar_sound">
                                <button><i class="fa-solid fa-volume"></i></button>
                                <div id="bar"></div>
                            </div>
                            <button><i class="fa-solid fa-bars"></i></button>
                        </div>
        
                    </div>
                </div>
            </section>`
    footer.innerHTML = element;
    
    const toggler = footer.querySelector(".toggler");
    const shuffleBtn = footer.querySelector(".shuffle-btn");
    const goBack = footer.querySelector(".go-back-btn");
    const audio = footer.querySelector("audio");
    const barPlaytime = footer.querySelector("#bar_playtime");
    const timeDisplay = footer.querySelector("#sound span");
    
    if(toggler){
        toggler.addEventListener("click", function(ev){
            if(toggler.classList.contains("pause-btn")){
                pauseAudio(ev);
            }
            else if(toggler.classList.contains("play-btn")){
                resumeAudio(ev);
            }
        })
    }
    goBack.addEventListener("click", function(){
        goBackAudio();
    })
    shuffleBtn.addEventListener("click",function(){
        const randomIndex = Math.floor(Math.random()*10);
        const randomSong = songs[Math.floor(randomIndex)];
        renderSongDetails(randomSong.ranking);
        playAudio(randomSong.ranking);
    })
    const goFurther = footer.querySelector(".go-further-btn");
    goFurther.addEventListener("click", function(){
        goFurtherAudio();
    })

    audio.addEventListener("loadedmetadata", function(){
        barPlaytime.max = String(audio.duration || 0);
        timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        paintSeekBar(barPlaytime, audio.currentTime, audio.duration);
    })

    barPlaytime.addEventListener("input", function(){
        audio.currentTime = Number(barPlaytime.value);
        paintSeekBar(barPlaytime, audio.currentTime, audio.duration);
    })
    
    audio.addEventListener("timeupdate", function(){
        if(Number.isFinite(audio.duration)){
            barPlaytime.max = String(audio.duration);
            barPlaytime.value = String(audio.currentTime);
        }
        paintSeekBar(barPlaytime, audio.currentTime, audio.duration);
        timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });
}


for(const btn of playBtns){;
    btn.addEventListener("click",function(){
        const info = this.parentElement.parentElement
        const ranking = info.querySelector("span").textContent;
        renderSongDetails(ranking);
        playAudio(ranking);
    })
}