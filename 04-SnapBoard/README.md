# 📸 SnapBoard — Full Stack Image Posting App

A full stack web application where users can **create posts with images and captions**, view all posts, and **delete** any post. Built with React on the frontend and Node.js + Express on the backend, with cloud image storage via ImageKit and MongoDB database.

---

## 🚀 Features

- 📤 Upload an image with a caption to create a post
- 🖼️ View all posts in a responsive grid layout
- 🗑️ Delete any post (removes from both UI and database)
- ☁️ Images stored on cloud (ImageKit)
- 💾 Posts saved in MongoDB Atlas

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| React Router DOM | Client-side routing |
| Fetch API | HTTP requests to backend |
| CSS (custom) | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework & REST API |
| MongoDB + Mongoose | Database & ODM |
| Multer | Handling image file uploads |
| ImageKit | Cloud image storage |
| CORS | Cross-origin requests |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
SnapBoard/
│
├── Backend/
│   ├── modules/
│   │   └── post.model.js            # Mongoose Post schema
│   ├── src/
│   │   ├── app.js                   # Express app instance
│   │   ├── db/
│   │   │   └── db.js                # MongoDB connection
│   │   └── services/
│   │       └── storage.services.js  # ImageKit upload logic
│   ├── server.js                    # Main server file & API routes
│   ├── .env                         # Environment variables (not pushed)
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── CreatePost.jsx       # Create post form
    │   │   └── AllPosts.jsx         # All posts grid + delete
    │   ├── App.jsx                  # Routing setup
    │   ├── main.jsx                 # React entry point
    │   └── index.css                # Global styles
    └── package.json
```

---

## ⚙️ API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/create-post` | Create a new post (image + caption) |
| `GET` | `/posts` | Fetch all posts |
| `DELETE` | `/delete-post/:id` | Delete a post by ID |

---

## 🔧 Getting Started

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/atlas) account
- [ImageKit](https://imagekit.io/) account

---

### 1. Clone the Repository

```bash
git clone https://github.com/shahfahad22/Backend.git
cd Backend/04-SnapBoard
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:

```env
MONGO_URL=your_mongodb_atlas_connection_string
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the backend server:

```bash
node server.js
```

Backend will run on: `http://localhost:3000`

---

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🌐 Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URL` | MongoDB Atlas connection string |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key for image uploads |

---

## 🙋‍♂️ Author

**Shah Fahad**
- LinkedIn: https://www.linkedin.com/in/shah-fahad-4290a0251/

---
