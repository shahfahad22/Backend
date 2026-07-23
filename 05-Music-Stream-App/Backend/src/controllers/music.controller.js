const musicModel = require("../models/music.model");
const albumMusic = require("../models/album.model")
const { uploadFile } = require("../services/storage.services");
const jsonwebtoken = require("jsonwebtoken");

async function createMusic(req, res) {
  

  const { title } = req.body
  const file = req.file

   if (!file) {
    return res.status(400).json({ message: "Music file is required" });
  }


     const result = await uploadFile(file.buffer.toString("base64"));
     console.log("Upload Result:", result);

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
  })
  }


async function createAlbum(req, res) {
   
        const {title, musicIds } = req.body

        const album = await albumMusic.create({
            title,
            artist : req.user.id,
            musics : musicIds
        })
        res.status(201).json({
            message : "Album Created Successfully",
            album : {
                id : album._id,
                title : album.title,
                artist : album.artist ,
                musics : album.musics
            }
        })

    } 



module.exports = { createMusic, createAlbum };
