import { useState, useRef, useEffect } from "react";
import { Play, Pause, Trash2, X } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/getErrorMessage";

export default function MusicCard({
  music,
  index,
  onDeleted,
  albumId,
  isAlbumOwner,
  onRemovedFromAlbum,
  activeId,
  onPlay,
}) {
  const { user, isArtist } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [removing, setRemoving] = useState(false);
  const audioRef = useRef(null);

  const isTrackOwner = isArtist && user?.id === music.artist?._id;
  const isPlaying = activeId === music._id;

  // Jab koi doosri track active ho jaye, ye apne aap pause ho jaye
  useEffect(() => {
    if (activeId !== music._id && audioRef.current) {
      audioRef.current.pause();
    }
  }, [activeId, music._id]);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      onPlay?.(null);
    } else {
      audioRef.current.play();
      onPlay?.(music._id);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${music.title}" permanently? This can't be undone.`,
    );
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

  async function handleRemoveFromAlbum() {
    const confirmed = window.confirm(
      `Remove "${music.title}" from this album? The track itself won't be deleted.`,
    );
    if (!confirmed) return;

    setRemoving(true);
    try {
      await api.delete(`/api/music/albums/${albumId}/musics/${music._id}`);
      onRemovedFromAlbum?.(music._id);
    } catch (err) {
      alert(getErrorMessage(err, "Couldn't remove this track from the album."));
    } finally {
      setRemoving(false);
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

      {albumId && isAlbumOwner && (
        <button
          onClick={handleRemoveFromAlbum}
          disabled={removing}
          aria-label={`Remove ${music.title} from album`}
          title="Remove from this album"
          className="shrink-0 rounded-md p-2 text-muted transition hover:bg-surface2 hover:text-ink disabled:opacity-50"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>
      )}

      {isTrackOwner && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          aria-label={`Delete ${music.title}`}
          title="Delete track permanently"
          className="shrink-0 rounded-md p-2 text-muted transition hover:bg-danger/10 hover:text-danger disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
        </button>
      )}

      <audio
        ref={audioRef}
        src={music.uri}
        onEnded={() => onPlay?.(null)}
      />
    </div>
  );
}