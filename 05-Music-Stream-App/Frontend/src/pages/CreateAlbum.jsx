import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import { ErrorBanner } from "../components/StatusBanner";

export default function CreateAlbum() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [musics, setMusics] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [manualIds, setManualIds] = useState("");
  const [listUnavailable, setListUnavailable] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    async function fetchMusics() {
      setLoadingList(true);
      try {
        const { data } = await api.get("/api/music");
        setMusics(data.musics);
      } catch (err) {
        setListUnavailable(true);
      } finally {
        setLoadingList(false);
      }
    }
    fetchMusics();
  }, []);

  function toggleId(id) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const musicIds = listUnavailable
      ? manualIds.split(",").map((id) => id.trim()).filter(Boolean)
      : selectedIds;

    if (musicIds.length === 0) {
      setError("Pick at least one track for the album.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/api/music/album", { title, musicIds });
      navigate(`/albums/${data.album.id}`);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't create the album."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-amber">Artist tools</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Create an album</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <ErrorBanner message={error} />

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Album title</span>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="e.g. Late Nights" />
        </label>

        <div>
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Tracks</span>

          {loadingList && <p className="text-sm text-muted">Loading your tracks…</p>}

          {!loadingList && !listUnavailable && (
            <div className="max-h-64 space-y-1 overflow-y-auto rounded-md border border-line bg-surface p-2">
              {musics.length === 0 && (
                <p className="px-2 py-3 text-sm text-muted">No tracks found. Upload a track first.</p>
              )}
              {musics.map((m) => (
                <label key={m._id} className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition hover:bg-surface2">
                  <input type="checkbox" checked={selectedIds.includes(m._id)} onChange={() => toggleId(m._id)} className="accent-amber" />
                  {m.title}
                </label>
              ))}
            </div>
          )}

          {!loadingList && listUnavailable && (
            <div className="space-y-2">
              <p className="rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger">
                Track list isn't available to artist accounts yet (backend fix needed — see Step 9 below). Paste track IDs instead.
              </p>
              <input value={manualIds} onChange={(e) => setManualIds(e.target.value)} className="input" placeholder="musicId1, musicId2" />
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating…" : "Create album"}
        </button>
      </form>
    </div>
  );
}