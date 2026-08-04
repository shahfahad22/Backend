import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function MusicCard({ music, index }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="flex items-center gap-4 rounded-md border border-line bg-surface px-4 py-3 transition hover:border-amber/40">
      <span className="w-6 shrink-0 text-center font-mono text-xs text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? `Pause ${music.title}` : `Play ${music.title}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber text-base transition hover:bg-amber-soft"
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
        ) : (
          <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{music.title}</p>
        <p className="truncate text-xs text-muted">
          {music.artist?.userName || "Unknown artist"}
        </p>
      </div>

      <audio
        ref={audioRef}
        src={music.uri}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
}