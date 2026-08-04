import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);
const STORAGE_KEY = "groove_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    function handleUnauthorized() {
      persist(null);
    }
    window.addEventListener("groove:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("groove:unauthorized", handleUnauthorized);
  }, []);

  function persist(userData) {
    setUser(userData);
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  async function register({ userName, email, password, role }) {
    const { data } = await api.post("/api/auth/register", { userName, email, password, role });
    persist(data.user);
    return data.user;
  }

  async function login({ userName, email, password }) {
    const { data } = await api.post("/api/auth/login", { userName, email, password });
    persist(data.user);
    return data.user;
  }

  async function logout() {
    await api.post("/api/auth/logout");
    persist(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isArtist: user?.role === "artist",
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}