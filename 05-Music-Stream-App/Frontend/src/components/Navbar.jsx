import { Link, useNavigate } from "react-router-dom";
import { Disc3, Upload, Library, LogOut, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, isArtist, user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-base/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl">
          <Disc3 className="h-6 w-6 text-amber" strokeWidth={1.5} />
          Groove
        </Link>

        <div className="flex items-center gap-1 text-sm">
          <Link to="/" className="rounded-md px-3 py-2 text-muted transition hover:bg-surface hover:text-ink">
            Tracks
          </Link>
          <Link to="/albums" className="flex items-center gap-1.5 rounded-md px-3 py-2 text-muted transition hover:bg-surface hover:text-ink">
            <Library className="h-4 w-4" strokeWidth={1.5} />
            Albums
          </Link>

          {isAuthenticated && isArtist && (
            <>
              <Link to="/upload" className="flex items-center gap-1.5 rounded-md px-3 py-2 text-muted transition hover:bg-surface hover:text-ink">
                <Upload className="h-4 w-4" strokeWidth={1.5} />
                Upload
              </Link>
              <Link to="/albums/new" className="rounded-md px-3 py-2 text-muted transition hover:bg-surface hover:text-ink">
                New album
              </Link>
            </>
          )}

          <div className="ml-3 flex items-center gap-2 border-l border-line pl-3">
            {isAuthenticated ? (
              <>
                <span className="hidden font-mono text-xs text-muted sm:inline">
                  {user.userName} · {user.role}
                </span>
                <button onClick={handleLogout} className="flex items-center gap-1.5 rounded-md px-3 py-2 text-danger transition hover:bg-surface">
                  <LogOut className="h-4 w-4" strokeWidth={1.5} />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1.5 rounded-md px-3 py-2 text-muted transition hover:bg-surface hover:text-ink">
                  <LogIn className="h-4 w-4" strokeWidth={1.5} />
                  Log in
                </Link>
                <Link to="/register" className="flex items-center gap-1.5 rounded-md bg-amber px-3 py-2 font-medium text-base transition hover:bg-amber-soft">
                  <UserPlus className="h-4 w-4" strokeWidth={1.5} />
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}