import { getUserFromServer } from "@/storage/getUserFromServer";
import { Route } from "../routes/+types/Favorites";
import { toast } from "sonner";
import { IAPIResponse } from "@/types/IAPIResponse";
import { Button } from "@/ui/Button";
import { useEffect, useRef, useState } from "react";
import { SoundBar } from "@/components/SoundBar";
import { ISong } from "@/types/ISong";

export async function loader({ request }: Route.LoaderArgs) {
  const { email } = getUserFromServer(request);
  const response = await fetch(
    `http://localhost:3000/api/favorite-songs/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    const data: IAPIResponse = await response.json();
    toast.error(data.message);
  }
  const data: IAPIResponse = await response.json();
  return { favoriteSongs: data.favoriteSongs || [] };
}

export default function Favorites({ loaderData }: Route.ComponentProps) {
  const { favoriteSongs } = loaderData;
  // Player state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useState(favoriteSongs[0]);
  const [isPaused, setIsPaused] = useState(true);
  const [isRepeating, setIsRepeating] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.load();
    const handleCanPlay = () => {
      if (!isPaused) audio.play().catch(() => {});
    };
    const handleEnded = () => {
      if (!isRepeating) return;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };
    audio.addEventListener("canplaythrough", handleCanPlay, { once: true });
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
      audio.removeEventListener("loadedmetadata", () => setDuration(audio.duration));
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isRepeating, isPaused]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (isPaused) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [isPaused]);

  function handleSeek(time: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }
  function toggleAudio() {
    setIsPaused((prev) => !prev);
  }
  function goBackAudio() {
    if (!audioRef.current) return;
    audioRef.current.currentTime -= 2;
  }
  function goForwardAudio() {
    if (!audioRef.current) return;
    audioRef.current.currentTime += 2;
  }
  function toggleRepeat() {
    setIsRepeating((prev) => !prev);
  }
  function handleSelectSong(song:ISong) {
    setCurrentSong(song);
    setIsPaused(false);
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 rounded-2xl shadow-lg font-[Manrope] bg-black relative min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Your Favorite Songs</h1>
      <div className="flex flex-col gap-6">
        {favoriteSongs.length === 0 ? (
          <div className="text-center text-white/70 text-lg py-12">
            You still have no liked musics
          </div>
        ) : (
          favoriteSongs.map((song, index) => (
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4" key={index}>
              <img
                src={song.imgSrc}
                alt="Song Cover"
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-white">
                  {song.title}
                </span>
                <span className="text-sm text-white/60">{song.artist}</span>
              </div>
              <Button variant="ghost" className="ml-auto rounded-lg" onClick={() => handleSelectSong(song)}>
                Play
              </Button>
            </div>
          ))
        )}
      </div>
      {/* Player footer */}
      {favoriteSongs.length > 0 && (
        <footer className="fixed text-white bg-black z-11 bottom-0 left-0 w-full">
          <audio ref={audioRef} src={currentSong?.audioSrc} />
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
                  <span className="text-xs text-white/50">{currentSong?.artist}</span>
                  <b className="text-sm">{currentSong?.title}</b>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Button onClick={() => setCurrentSong(favoriteSongs[Math.floor(Math.random() * favoriteSongs.length)])} size="icon">
                {/* Shuffle icon */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shuffle"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
              </Button>
              <Button onClick={goBackAudio} size="icon">
                {/* StepBack icon */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-step-back"><polyline points="19 20 9 12 19 4"/><line x1="5" y1="19" x2="5" y2="5"/></svg>
              </Button>
              <Button onClick={toggleAudio} variant="ghost" size="icon">
                {isPaused ? (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                ) : (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                )}
              </Button>
              <Button onClick={goForwardAudio} size="icon">
                {/* StepForward icon */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-step-forward"><polyline points="5 4 15 12 5 20"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
              </Button>
              <Button variant={isRepeating ? "filled" : "ghost"} onClick={toggleRepeat} size="icon">
                {/* Repeat1 icon */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat-1"><path d="M17 2v6h6"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22v-6H1"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 17h2v-6"/></svg>
              </Button>
            </div>
            <div className="flex gap-6">
              <span className="text-xs text-white/50">
                {duration ? `${Math.floor(currentTime)} / ${Math.floor(duration)}` : "0 / 0"}
              </span>
            </div>
          </div>
          {/* SoundBar */}
          <div className="w-full mt-2">
           
            <SoundBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
          </div>
        </footer>
      )}
    </div>
  );
}
