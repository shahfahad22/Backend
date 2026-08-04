import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Albums from "./pages/Albums";
import AlbumDetail from "./pages/AlbumDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadMusic from "./pages/UploadMusic";
import CreateAlbum from "./pages/CreateAlbum";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/albums/:albumId" element={<AlbumDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<ProtectedRoute requireRole="artist"><UploadMusic /></ProtectedRoute>} />
          <Route path="/albums/new" element={<ProtectedRoute requireRole="artist"><CreateAlbum /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}