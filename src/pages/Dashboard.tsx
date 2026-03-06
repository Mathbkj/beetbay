import "@splidejs/react-splide/css";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { formatTime, highlightText } from "../utils";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { ISong } from "../types/ISong";
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Bell,
  Clock,
  Headphones,
  Heart,
  ListMusic,
  Pause,
  Play,
  Repeat1,
  Search,
  Shuffle,
  StepBack,
  StepForward,
} from "lucide-react";
import { Button } from "../ui/Button";
import Cookies from "js-cookie";
import { IAPIResponse } from "../types/IAPIResponse";
import { SoundBar } from "../components/SoundBar";

export default function Dashboard() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState<ISong[]>();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState<ISong>();
  const [isPaused, setIsPaused] = useState(true);
  const [isRepeating, setIsRepeating] = useState(false);

  function handleTimeUpdate(audio: HTMLAudioElement) {
    setCurrentTime(audio.currentTime);
  }
  function handleLoadedMetadata(audio: HTMLAudioElement) {
    setDuration(audio.duration);
  }
  function toggleAudio(ev: MouseEvent<HTMLButtonElement>) {
    console.log(ev.currentTarget);
    setIsPaused((prev) => !prev);
  }
  function shuffleAudio() {
    const random = Math.floor(Math.random() * songs!.length);
    const song = songs![random];
    setCurrentSong(song);
  }
  function goBackAudio() {
    if (!audioRef.current) return;
    audioRef.current.currentTime -= 2;
  }
  function goForwardAudio() {
    if (!audioRef.current) return;
    audioRef.current.currentTime += 2;
  }

  function handleSeek(time: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }
  function toggleRepeat() {
    setIsRepeating((prev) => !prev);
  }
  function handleSearch(ev: React.ChangeEvent<HTMLInputElement>) {
    setSearch(ev.target.value);
  }

  function handleCurrentSong(ev: MouseEvent<HTMLButtonElement>) {
    const parentElement = ev.currentTarget.parentElement?.parentElement;
    const titleElement = parentElement?.querySelector(".song-title");
    const imageElement = parentElement?.querySelector(".song-img");
    const audioElement = parentElement?.querySelector("audio");

    setCurrentSong({
      title: titleElement?.textContent!,
      artist: "",
      imgSrc: imageElement?.getAttribute("src")!,
      audioSrc: audioElement?.querySelector("source")?.getAttribute("src")!,
    });
  }

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/top-songs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      });
      const data: IAPIResponse = await response.json();
      setSongs(data.songs as ISong[]);
    })();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;

    audio.load();

    const handleCanPlay = () => {
      audio.play().catch(console.error);
    };

    const handleEnded = () => {
      if (!isRepeating) return;
      console.log("Song ended, repeating...");
      audio.currentTime = 0;
      audio.play().catch(console.error);
    };

    audio.addEventListener("canplaythrough", handleCanPlay, { once: true });
    audio.addEventListener("timeupdate", () => handleTimeUpdate(audio));
    audio.addEventListener("loadedmetadata", () => handleLoadedMetadata(audio));
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", () => handleTimeUpdate(audio));
      audio.removeEventListener("loadedmetadata", () =>
        handleLoadedMetadata(audio),
      );
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isRepeating]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    if (isPaused) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
  }, [isPaused]);

  useEffect(() => {
    if (!dashboardRef.current) return;
    const dashboard = dashboardRef.current;
    const textElements = dashboard.querySelectorAll("h1,h2,h3,span,b,p");
    textElements.forEach((el) => {
      const isMatching = highlightText(el.textContent!, search);
      if (isMatching)
        el.classList.add("bg-yellow-400", "text-black", "px-0.5", "rounded-sm");
      else {
        el.classList.remove(
          "bg-yellow-400",
          "text-black",
          "px-0.5",
          "rounded-sm",
        );
      }
    });
  }, [search]);

  return (
    <div
      ref={dashboardRef}
      className="font-[Manrope] flex min-h-screen bg-black"
    >
      <Sidebar position="left" currentPage="home" />
      <main className="flex flex-col place-content-center place-items-center bg-black text-white min-h-screen ml-67.5 mr-67.5 gap-6 w-[calc(100vw-540px)]">
        <header className="flex justify-center items-center w-full">
          <div className="w-full flex justify-around items-center">
            <div className="flex gap-6 items-center justify-start">
              <div className="bg-white/20 rounded-xl p-3.5">
                <ArrowLeft size={18} />
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-white/40 text-sm font-semibold">
                  Home
                </span>
                <ArrowRight size={14} className="text-white/40" />
                <span className="text-sm font-semibold">Popular Artist</span>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex gap-3 px-4 py-3 bg-white/10 rounded-xl items-center">
                <Search size={18} className="text-white/50" />
                <input
                  type="search"
                  placeholder="Search for songs, artists, albums..."
                  value={search}
                  onChange={handleSearch}
                  className="bg-transparent text-white outline-none border-none text-xs"
                />
              </div>
              <div className="bg-white/10 rounded-xl p-3.5">
                <Bell size={18} />
              </div>
            </div>
          </div>
        </header>

        <section className="w-202 rounded-2xl h-73.75 flex justify-between items-center overflow-hidden relative">
          <div className="absolute z-1 top-5 right-2.5">
            <img
              width="351"
              height="318"
              src="/assets/artist-2.png"
              alt="Artist Two"
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="z-1 flex flex-col px-10 gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <img src="/assets/verified.svg" alt="Verified" />
                  <span className="text-xs">Verified Artist</span>
                </div>
                <h2 className="text-5xl font-bold text-white">Ed Sheeran</h2>
              </div>
              <div className="flex gap-3">
                <Headphones size={18} />
                <span className="text-xs">
                  82,756,134{" "}
                  <span className="text-white/40">monthly listeners</span>
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <button className="bg-primary text-white px-6 py-3.5 rounded-[44px]">
                PLAY
              </button>
              <button className="bg-transparent text-white px-6 py-3.5 outline outline-white w-44.5 rounded-[44px]">
                Following
              </button>
            </div>
          </div>
          <div className="absolute z-0 w-full h-full">
            <img
              src="/assets/bg-hero.png"
              alt="Background Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="flex justify-center items-center w-full">
          <div className="w-202 flex flex-col justify-center items-center gap-6">
            <div className="flex justify-center items-center gap-5">
              {/* Albums will be populated here */}
            </div>
            <div className="w-full flex justify-between items-center">
              <h1 className="text-xl font-bold">Popular Releases</h1>
              <button className="text-primary hover:text-lighter">
                See All
              </button>
            </div>
          </div>
        </section>

        <section className="w-202">
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-lg">Popular Song</h2>
            <audio ref={audioRef}>
              <source src={currentSong?.audioSrc} />
            </audio>
            <ul className="flex flex-col justify-start items-start min-h-fit gap-4 list-none">
              {songs?.map((song, index) => (
                <li
                  key={song.title}
                  className="flex flex-col gap-4 relative rounded-xl"
                >
                  <div className="flex justify-center items-center gap-19">
                    <div className="flex justify-center items-center gap-6">
                      <span className="text-xs">{index + 1}</span>
                      <div className="flex flex-row-reverse justify-center items-center gap-4">
                        <audio>
                          <source src={song.audioSrc} />
                        </audio>
                        <span className="song-title text-xs">{song.title}</span>
                        <img
                          width={118}
                          height={118}
                          src={song.imgSrc}
                          className="song-img w-29.5 h-29.5 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-14">
                      <div className="flex gap-3">
                        <Headphones size={18} />
                        <span className="text-xs">82,756,134</span>
                      </div>
                      <div className="flex gap-3">
                        <Clock size={18} />
                        <span className="text-xs">00:30</span>
                      </div>
                      <Button size="icon" variant="destructive">
                        <Heart />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCurrentSong}
                      >
                        <Play size={24} />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="fixed text-white bg-black z-11 bottom-0 w-full">
        <SoundBar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
        <div className="w-full px-8 py-6 flex justify-around items-center">
          <div className="flex items-center gap-8">
            <div className="flex gap-4">
              <img
                width="48"
                height="48"
                src={currentSong?.imgSrc}
                alt="Artist"
                className="rounded-xl"
              />
              <div className="flex flex-col gap-1">
                <span className="text-xs text-white/50">
                  {currentSong?.artist}
                </span>
                <b className="text-sm">{currentSong?.title}</b>
              </div>
            </div>
            <Heart size={24} color="gray" />
          </div>
          <div className="flex items-center gap-6">
            <Button onClick={shuffleAudio} size="icon">
              <Shuffle size={24} />
            </Button>
            <Button onClick={goBackAudio} size="icon">
              <StepBack size={24} />
            </Button>
            <Button onClick={toggleAudio} variant="outline" size="icon">
              {isPaused ? <Play size={24} /> : <Pause size={24} />}
            </Button>
            <Button onClick={goForwardAudio} size="icon">
              <StepForward size={24} />
            </Button>
            <Button
              variant={isRepeating ? "filled" : "ghost"}
              onClick={toggleRepeat}
              size="icon"
            >
              <Repeat1 size={24} />
            </Button>
          </div>
          <div className="flex gap-6">
            <span className="text-xs text-white/50">
              {formatTime(currentTime)} / 00:30
            </span>
            <div className="flex gap-8">
              <div className="flex gap-3">
                <AudioLines size={24} />
                <ListMusic size={24} />
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Sidebar position="right" />
    </div>
  );
}
