import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../api/getErrorMessage";
import { ErrorBanner } from "../components/StatusBanner";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ userName: "", email: "", password: "", role: "user" });
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
      await register(form);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-md flex-col justify-center px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-amber">Join Groove</p>
      <h1 className="mt-2 font-display text-3xl text-ink">Create your account</h1>
      <p className="mt-2 text-sm text-muted">Listeners stream tracks. Artists upload and publish albums.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <ErrorBanner message={error} />

        <Field label="Username">
          <input name="userName" required value={form.userName} onChange={handleChange} className="input" placeholder="e.g. shahfahad" />
        </Field>

        <Field label="Email">
          <input type="email" name="email" required value={form.email} onChange={handleChange} className="input" placeholder="you@example.com" />
        </Field>

        <Field label="Password">
          <input type="password" name="password" required minLength={6} value={form.password} onChange={handleChange} className="input" placeholder="••••••••" />
        </Field>

        <Field label="Account type">
          <select name="role" value={form.role} onChange={handleChange} className="input">
            <option value="user">Listener</option>
            <option value="artist">Artist</option>
          </select>
        </Field>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account? <Link to="/login" className="text-amber hover:underline">Log in</Link>
      </p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}