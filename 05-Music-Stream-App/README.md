# Groove — Music Streaming Platform

A full-stack music streaming app where **artists** can upload tracks and organize them into albums, and **listeners** can browse and play everything. Built as a two-role MERN application with cookie-based JWT auth.

---

## Features

### Authentication
- Register / login / logout with hashed passwords (bcrypt)
- JWT stored in an httpOnly-style cookie, verified on every protected request
- Two account roles: **user** (listener) and **artist**
- Session persists across refreshes; auto-clears if the server ever returns `401`

### For everyone (listeners + artists)
- Browse all uploaded tracks on the home page
- Browse all albums in a grid
- Open an album to see its tracklist
- Inline audio player — **only one track plays at a time**, starting a new one auto-pauses the last

### For artists only
- Upload a track (audio file → stored via ImageKit, metadata saved in MongoDB)
- Create an album from a selection of their own uploaded tracks
- Delete a track permanently (auto-removes it from any albums it was in)
- Delete an entire album (the tracks inside it are **not** deleted — they stay in the library)
- Remove a single track from an album without deleting the track itself

### UI / UX
- Dark theme with a warm amber accent, custom type scale (Fraunces + Inter + JetBrains Mono)
- Loading, empty, and error states on every data-driven page
- Role-aware navigation (Upload / New album links only show for artist accounts)
- Ownership-aware controls (delete/remove buttons only appear for the artist who owns that content)

---

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) for auth, `bcryptjs` for password hashing
- `multer` for handling file uploads in memory
- ImageKit for audio file storage/hosting
- `cookie-parser`, `cors`

**Frontend**
- React 18/19 + Vite
- React Router (`react-router-dom`) for client-side routing
- Axios (`withCredentials: true`) for API calls
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- `lucide-react` for icons
- React Context (`AuthContext`) for auth/session state — no Redux needed at this scale

---

## Folder Structure

### Backend
```
backend/
├── server.js
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

### Frontend
```
frontend/
├── index.html
├── vite.config.js
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

---

## API Reference

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create an account (`role`: `"user"` or `"artist"`) |
| POST | `/api/auth/login` | Public | Log in with username/email + password |
| POST | `/api/auth/logout` | Public | Clear the auth cookie |
| POST | `/api/music/upload` | Artist | Upload a track (`multipart/form-data`: `title`, `music`) |
| POST | `/api/music/album` | Artist | Create an album from a list of track IDs |
| GET | `/api/music` | Logged in (any role) | List all tracks |
| GET | `/api/music/albums` | Logged in (any role) | List all albums |
| GET | `/api/music/albums/:albumId` | Logged in (any role) | Get one album with its populated tracks |
| DELETE | `/api/music/:musicId` | Artist, owner only | Delete a track everywhere |
| DELETE | `/api/music/albums/:albumId` | Artist, owner only | Delete an album (tracks are kept) |
| DELETE | `/api/music/albums/:albumId/musics/:musicId` | Artist, owner only | Remove one track from an album |

---

## Setup

### Backend
```bash
cd backend
npm install
```

Create a `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
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
```
VITE_API_URL=http://localhost:3000
```

Run:
```bash
npm run dev
```
App runs on `http://localhost:5173`.

---

## Auth Middleware Design

Three middleware functions gate the routes:

- **`authArtist`** — valid token **and** `role === "artist"`. Used on upload/create/delete routes.
- **`authUser`** — valid token **and** `role === "user"`. (Kept for any listener-only route, currently unused by the read endpoints.)
- **`authAny`** — valid token, any role. Used on the browse/read endpoints (`GET /api/music`, `GET /api/music/albums`, `GET /api/music/albums/:albumId`) so both listeners and artists can browse the catalog.

---

## Known Limitations / Next Steps

- No input validation layer yet (empty/malformed fields aren't rejected before hitting the DB)
- No global error-handling middleware — each controller relies on its own try/catch
- Register response currently includes the hashed password in the JSON body; should be stripped
- No pagination on `GET /api/music` (hardcoded `.limit(10)`)
- No search/filter on tracks or albums
- No album/track cover images — uses a generic icon
- No "My Uploads" dashboard for an artist to see everything they own in one place
- Not yet deployed — runs locally only

---

## Roles Summary

| Action | Listener (`user`) | Artist (`artist`) |
|---|---|---|
| Browse tracks/albums | ✅ | ✅ |
| Play tracks | ✅ | ✅ |
| Upload a track | ❌ | ✅ |
| Create an album | ❌ | ✅ (from their own tracks) |
| Delete/remove content | ❌ | ✅ (only their own) |