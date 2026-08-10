const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

console.log("FRONTEND_URL is:", process.env.FRONTEND_URL);

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
)
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

module.exports = app;