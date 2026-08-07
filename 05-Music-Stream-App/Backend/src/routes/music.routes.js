const express = require("express");
const musicController = require("../controllers/music.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});
const router = express.Router();

router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.single("music"),
  musicController.createMusic,
);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);

// router.get("/", authMiddleware.authAny, musicController.getAllMusics);
// router.get("/albums", authMiddleware.authAny, musicController.getAllAlbums);

router.get("/", musicController.getAllMusics);
router.get("/albums", musicController.getAllAlbums);

// router.get(
//   "/albums/:albumId",
//   authMiddleware.authUser,
//   musicController.getAlbumById,
// );

router.get(
  "/albums/:albumId",
  authMiddleware.authAny,
  musicController.getAlbumById,
);

router.delete("/:musicId", authMiddleware.authArtist, musicController.deleteMusic)

module.exports = router;
