import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Music2 } from "lucide-react";
import api from "../api/axios";
import { getErrorMessage } from "../api/getErrorMessage";
import { ErrorBanner } from "../components/StatusBanner";

export default function UploadMusic() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) {
      setError("Pick an audio file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("music", file);

    setLoading(true);
    try {
      const { data } = await api.post("/api/music/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(`"${title}" was uploaded. Track ID: ${data.music.id}`);
      setTitle("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(getErrorMessage(err, "Upload failed."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-amber">Artist tools</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Upload a track</h1>
      <p className="mt-2 text-sm text-muted">Publish a track so listeners can find it on Tracks and add it to an album later.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <ErrorBanner message={error} />
        {success && (
          <div className="rounded-md border border-amber/40 bg-amber/10 px-4 py-3 text-sm text-amber">{success}</div>
        )}

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Track title</span>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="e.g. Midnight Drive" />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Audio file</span>
          <div className="flex items-center gap-3 rounded-md border border-dashed border-line bg-surface px-4 py-6">
            {file ? (
              <Music2 className="h-6 w-6 shrink-0 text-amber" strokeWidth={1.5} />
            ) : (
              <UploadCloud className="h-6 w-6 shrink-0 text-muted" strokeWidth={1.5} />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-ink">{file ? file.name : "No file selected"}</p>
              <p className="text-xs text-muted">MP3, WAV, or similar audio file</p>
            </div>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-secondary shrink-0">
              Choose
            </button>
          </div>
          <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Uploading…" : "Upload track"}
        </button>
      </form>
    </div>
  );
}