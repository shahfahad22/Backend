import { useEffect, useState } from "react";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import MusicCard from "../components/MusicCard";
import { ErrorBanner, EmptyState, Spinner } from "../components/StatusBanner";

export default function Home() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchMusics() {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("/api/music");
        if (!cancelled) setMusics(data.musics);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Couldn't load tracks."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchMusics();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-amber">Latest uploads</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Tracks</h1>

      <div className="mt-8 space-y-2">
        <ErrorBanner message={error} />
        {loading && <Spinner />}
        {!loading && musics.length === 0 && !error && (
          <EmptyState title="No tracks yet" subtitle="Once an artist uploads a track, it'll show up here." />
        )}
        {musics.map((music, index) => (
          <MusicCard
            key={music._id}
            music={music}
            index={index}
            activeId={activeId}
            onPlay={setActiveId}
            onDeleted={(deletedId) =>
              setMusics((prev) => prev.filter((m) => m._id !== deletedId))
            }
          />
        ))}
      </div>
    </div>
  );
}