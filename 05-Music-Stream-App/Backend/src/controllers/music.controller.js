const musicModel = require("../models/music.model");
const albumMusic = require("../models/album.model");
const { uploadFile } = require("../services/storage.services");
const jsonwebtoken = require("jsonwebtoken");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Music file is required" });
  }

  const result = await uploadFile(file.buffer.toString("base64"));

  const createMusic = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music Created Successfully",
    music: {
      id: createMusic._id,
      uri: createMusic.uri,
      title: createMusic.title,
      artist: createMusic.artist,
    },
  });
}

async function createAlbum(req, res) {
  const { title, musicIds } = req.body;

  const album = await albumMusic.create({
    title,
    artist: req.user.id,
    musics: musicIds,
  });

  console.log("Album Saved:", album);

  res.status(201).json({
    message: "Album Created Successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

async function getAllMusics(req, res) {
  const musics = await musicModel
    .find()
    .limit(10)
    .populate("artist", "userName email");

  res.status(200).json({
    message: "Musics fetched Successfully",
    musics: musics,
  });
}

async function getAllAlbums(req, res) {
  const albums = await albumMusic
    .find()
    .select("title artist")
    .populate("artist", "userName email");

  console.log(JSON.stringify(albums, null, 2));
  res.status(200).json({
    message: "Album Fetched Successfully",
    albums: albums,
  });
}

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "userName email")
    .populate("musics", "title uri");

  res.status(200).json({
    message: "Album Fetched Successfully",
    album: album,
  });
}

async function deleteMusic(req, res) {
  const musicId = req.params.musicId

  const music = await musicModel.findById(musicId)

  if(!music){
    return res.status(404).json({message : "Music Not Found"})
  }

  if(music.artist.toString() !== req.user.id){
    return res.status(403).json({message : "You can only delete your own tracks"})
  }

  await musicModel.findByIdAndDelete(musicId)

  await albumModel.updateMany(
    {musics : musicId },
    {$pull : {musics : musicId } }
  )

  res.status(200).json({message : "Music deleted successfully" })
}



async function deleteAlbum(req, res) {
  const { albumId } = req.params;

  const album = await albumModel.findById(albumId)

  if(!album){
    return res.status(404).json({message : "Album not found" });
  }
  if(album.artist.toString() !== req.user.id){
    return res.status(403).json({message : "You can only delete your own albums"  })
  }

  await albumModel.findByIdAndDelete(albumId)
}



async function removeMusicFromAlbum(params) {
  const {albumId, musicId} = req.params;

  if(!album){
    return res.status(404).json({message : "Album not found" })
  }if(album.artist.toString() !== req.user.id){
    return res.status(403).json({message : "You can only edit your own albums" })
  }

  album.musics = album.filter((id)=> id.toString() !== musicId);
  await album.save();

  res.status(200).json({ message: "Track removed from album" });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
  deleteMusic,
  deleteAlbum,
  removeMusicFromAlbum,
};
