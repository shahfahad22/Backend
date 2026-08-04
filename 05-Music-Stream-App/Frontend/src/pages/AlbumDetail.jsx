import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Disc3 } from "lucide-react";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import MusicCard from "../components/MusicCard";
import { ErrorBanner, EmptyState, Spinner } from "../components/StatusBanner";

export default function AlbumDetail() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function fetchAlbum() {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get(`/api/music/albums/${albumId}`);
        if (!cancelled) setAlbum(data.album);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Couldn't load this album."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAlbum();
    return () => { cancelled = true; };
  }, [albumId]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/albums" className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-ink">
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Back to albums
      </Link>

      {loading && <Spinner />}
      <ErrorBanner message={error} />

      {album && !loading && (
        <>
          <div className="mt-6 flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-surface2">
              <Disc3 className="h-9 w-9 text-amber" strokeWidth={1} />
            </div>
            <div>
              <h1 className="font-display text-3xl text-ink">{album.title}</h1>
              <p className="mt-1 text-sm text-muted">{album.artist?.userName || "Unknown artist"}</p>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            {(!album.musics || album.musics.length === 0) && (
              <EmptyState title="No tracks in this album yet" />
            )}
            {album.musics?.map((music, index) => (
              <MusicCard key={music._id} music={music} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}