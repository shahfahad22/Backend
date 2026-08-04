import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/getErrorMessage";
import { ErrorBanner } from "../components/StatusBanner";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ userName: form.userName, email: form.userName, password: form.password });
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Invalid credentials."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md flex-col justify-center px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-amber">Welcome back</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Log in to Groove</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <ErrorBanner message={error} />

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Username or email</span>
          <input name="userName" required value={form.userName} onChange={handleChange} className="input" placeholder="you@example.com" />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">Password</span>
          <input type="password" name="password" required value={form.password} onChange={handleChange} className="input" placeholder="••••••••" />
        </label>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Don't have an account? <Link to="/register" className="text-amber hover:underline">Sign up</Link>
      </p>
    </div>
  );
}