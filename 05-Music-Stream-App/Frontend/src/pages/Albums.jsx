import { useEffect, useState } from "react";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import AlbumCard from "../components/AlbumCard";
import { ErrorBanner, EmptyState, Spinner } from "../components/StatusBanner";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function fetchAlbums() {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("/api/music/albums");
        if (!cancelled) setAlbums(data.albums);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, "Couldn't load albums."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchAlbums();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-amber">Collections</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Albums</h1>

      <div className="mt-8">
        <ErrorBanner message={error} />
        {loading && <Spinner />}
        {!loading && albums.length === 0 && !error && (
          <EmptyState title="No albums yet" subtitle="Artists can group tracks into an album from the New album page." />
        )}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}