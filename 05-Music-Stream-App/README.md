<div align="center">

# 🎵 Groove — Music Streaming Platform

A full-stack music streaming app where **artists** upload tracks and organize them into albums, and **listeners** browse and play everything. Built as a two-role MERN application with cookie-based JWT auth.

**[🎧 View Frontend](https://groove-music-app-pi.vercel.app/)** &nbsp;·&nbsp; **[⚙️ View Backend](https://groove-backend.vercel.app)**

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## ✨ Features

### 🔐 Authentication
- Register / login / logout with hashed passwords (bcrypt)
- JWT stored in a secure httpOnly cookie, verified on every protected request
- Two account roles: **listener** and **artist**
- Session persists across refreshes; auto-clears if the server ever returns `401`

### 🎧 For everyone (listeners + artists)
- Browse all uploaded tracks on the home page
- Browse all albums in a grid
- Open an album to see its tracklist
- Inline audio player — **only one track plays at a time**, starting a new one auto-pauses the last

### 🎤 For artists only
- Upload a track (audio file → stored via ImageKit, metadata saved in MongoDB)
- Create an album from a selection of their own uploaded tracks
- Delete a track permanently (auto-removes it from any albums it was in)
- Delete an entire album (the tracks inside it are **not** deleted — they stay in the library)
- Remove a single track from an album without deleting the track itself

### 🎨 UI / UX
- Dark theme with a warm amber accent, custom type scale (Fraunces + Inter + JetBrains Mono)
- Loading, empty, and error states on every data-driven page
- Role-aware navigation (Upload / New album links only show for artist accounts)
- Ownership-aware controls (delete/remove buttons only appear for the artist who owns that content)

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) for auth, `bcryptjs` for hashing
- `multer` for in-memory file uploads
- ImageKit for audio file storage/hosting
- `cookie-parser`, `cors`
- Deployed on Vercel (serverless functions)

</td>
<td valign="top" width="50%">

**Frontend**
- React 18/19 + Vite
- React Router (`react-router-dom`)
- Axios (`withCredentials: true`)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- `lucide-react` for icons
- React Context (`AuthContext`) for session state
- Deployed on Vercel

</td>
</tr>
</table>

---

## 📁 Folder Structure

<details>
<summary><b>Backend</b></summary>

```
backend/
├── api/
│   └── index.js          # Vercel serverless entry point
├── server.js               # Local dev entry point
├── vercel.json
└── src/
    ├── app.js
    ├── db/
    │   └── db.js
    ├── controllers/
    │   ├── auth.controller.js
    │   └── music.controller.js
    ├── middlewares/
    │   └── auth.middleware.js
    ├── models/
    │   ├── user.model.js
    │   ├── music.model.js
    │   └── album.model.js
    ├── routes/
    │   ├── auth.routes.js
    │   └── music.routes.js
    └── services/
        └── storage.services.js
```
</details>

<details>
<summary><b>Frontend</b></summary>

```
frontend/
├── index.html
├── vite.config.js
├── vercel.json
├── .env
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/
    │   ├── axios.js
    │   └── getErrorMessage.js
    ├── context/
    │   └── AuthContext.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProtectedRoute.jsx
    │   ├── StatusBanner.jsx
    │   ├── MusicCard.jsx
    │   └── AlbumCard.jsx
    └── pages/
        ├── Login.jsx
        ├── Register.jsx
        ├── Home.jsx
        ├── Albums.jsx
        ├── AlbumDetail.jsx
        ├── UploadMusic.jsx
        └── CreateAlbum.jsx
```
</details>

---

## 📡 API Reference

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Create an account (`role`: `"user"` or `"artist"`) |
| `POST` | `/api/auth/login` | Public | Log in with username/email + password |
| `POST` | `/api/auth/logout` | Public | Clear the auth cookie |
| `POST` | `/api/music/upload` | Artist | Upload a track (`multipart/form-data`: `title`, `music`) |
| `POST` | `/api/music/album` | Artist | Create an album from a list of track IDs |
| `GET` | `/api/music` | Logged in (any role) | List all tracks |
| `GET` | `/api/music/albums` | Logged in (any role) | List all albums |
| `GET` | `/api/music/albums/:albumId` | Logged in (any role) | Get one album with its populated tracks |
| `DELETE` | `/api/music/:musicId` | Artist, owner only | Delete a track everywhere |
| `DELETE` | `/api/music/albums/:albumId` | Artist, owner only | Delete an album (tracks are kept) |
| `DELETE` | `/api/music/albums/:albumId/musics/:musicId` | Artist, owner only | Remove one track from an album |

---

## 🚀 Setup (Local Development)

### Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
FRONTEND_URL=http://localhost:5173
```

Run:
```bash
node server.js
```
Server runs on `http://localhost:3000`.

### Frontend
```bash
cd frontend
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

Run:
```bash
npm run dev
```
App runs on `http://localhost:5173`.

---

## 🌍 Deployment

Both apps are deployed independently on **Vercel**:

| App | URL | Notes |
|---|---|---|
| 🎧 Frontend | [groove-music-app-pi.vercel.app](https://groove-music-app-pi.vercel.app) | Vite build, SPA routing via `vercel.json` rewrites |
| ⚙️ Backend | [groove-backend.vercel.app](https://groove-backend.vercel.app) | Express app wrapped as a serverless function (`api/index.js`) |

Cross-domain cookie auth is handled via `sameSite: "none"` + `secure: true` cookies, and `FRONTEND_URL`/`VITE_API_URL` environment variables connect the two deployments to each other.

---

## 🔒 Auth Middleware Design

Three middleware functions gate the routes:

- **`authArtist`** — valid token **and** `role === "artist"`. Used on upload/create/delete routes.
- **`authUser`** — valid token **and** `role === "user"`. (Kept for any listener-only route, currently unused by the read endpoints.)
- **`authAny`** — valid token, any role. Used on the browse/read endpoints (`GET /api/music`, `GET /api/music/albums`, `GET /api/music/albums/:albumId`) so both listeners and artists can browse the catalog.

---

## 🧭 Roles Summary

| Action | Listener (`user`) | Artist (`artist`) |
|---|:---:|:---:|
| Browse tracks/albums | ✅ | ✅ |
| Play tracks | ✅ | ✅ |
| Upload a track | ❌ | ✅ |
| Create an album | ❌ | ✅ (from their own tracks) |
| Delete/remove content | ❌ | ✅ (only their own) |

---

## 📋 Known Limitations / Next Steps

- No input validation layer yet (empty/malformed fields aren't rejected before hitting the DB)
- No global error-handling middleware — each controller relies on its own try/catch
- No pagination on `GET /api/music` (hardcoded `.limit(10)`)
- No search/filter on tracks or albums
- No album/track cover images — uses a generic icon
- No "My Uploads" dashboard for an artist to see everything they own in one place

---

<div align="center">

Built by **Shah Fahad** — [Portfolio](https://shahfahaddev.vercel.app) · [GitHub](https://github.com/shahfahad22)

</div>