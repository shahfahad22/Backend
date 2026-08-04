import { Link } from "react-router-dom";
import { Disc3 } from "lucide-react";

export default function AlbumCard({ album }) {
  return (
    <Link
      to={`/albums/${album._id}`}
      className="group rounded-lg border border-line bg-surface p-5 transition hover:border-amber/50 hover:bg-surface2"
    >
      <div className="mb-4 flex h-32 items-center justify-center rounded-md bg-surface2 group-hover:bg-base">
        <Disc3
          className="h-12 w-12 text-muted transition group-hover:text-amber group-hover:animate-[spin_3s_linear_infinite]"
          strokeWidth={1}
        />
      </div>
      <p className="truncate font-display text-lg text-ink">{album.title}</p>
      <p className="mt-1 truncate text-xs text-muted">
        {album.artist?.userName || "Unknown artist"}
      </p>
    </Link>
  );
}