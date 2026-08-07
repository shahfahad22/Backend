import { useState, useRef } from "react";
import { Play, Pause, Trash2 } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/getErrorMessage";

export default function MusicCard({ music, index, onDeleted }) {
  const { user, isArtist } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const audioRef = useRef(null);

  const isOwner = isArtist && user?.id === music.artist?._id;

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${music.title}"? This can't be undone.`);
    if (!confirmed) return;

    setDeleting(true);
    try {
      await api.delete(`/api/music/${music._id}`);
      onDeleted?.(music._id);
    } catch (err) {
      alert(getErrorMessage(err, "Couldn't delete this track."));
    } finally {
      setDeleting(false);
    }
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

      {isOwner && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          aria-label={`Delete ${music.title}`}
          className="shrink-0 rounded-md p-2 text-muted transition hover:bg-danger/10 hover:text-danger disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
        </button>
      )}

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