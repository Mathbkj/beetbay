import { useRef, MouseEvent } from "react";

interface SoundBarProps {
  currentTime: number;
  duration: number;
  onSeek?: (time: number) => void;
}

export function SoundBar({ currentTime, duration, onSeek }: SoundBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  function handleClick(ev: MouseEvent<HTMLDivElement>) {
    if (!barRef.current || !onSeek || duration <= 0) return;

    const rect = barRef.current.getBoundingClientRect();
    const clickX = ev.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    onSeek(Math.max(0, Math.min(newTime, duration)));
  }

  return (
    <div
      className="relative w-full h-1 bg-gray rounded-sm cursor-pointer overflow-hidden hover:h-1.5 transition-all"
      ref={barRef}
      onClick={handleClick}
    >
      <div
        className="absolute top-1/2 left-0 bg-primary -translate-y-1/2 h-full transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
