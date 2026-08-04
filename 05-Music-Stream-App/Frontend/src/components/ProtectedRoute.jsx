import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireRole }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="font-display text-2xl text-ink">Artists only</p>
        <p className="mt-2 text-muted">
          This page needs an artist account. You're signed in as{" "}
          <span className="text-amber">{user.role}</span>.
        </p>
      </div>
    );
  }

  return children;
}