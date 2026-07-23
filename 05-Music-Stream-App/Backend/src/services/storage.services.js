const { ImageKit } = require("@imagekit/nodejs");


const ImageKitClient = new ImageKit({
    privateKey : process.env['IMAGEKIT_PRIVATE_KEY'],

})

async function  uploadFile(file) {
    console.log("Storage Service Called");
    const result = await ImageKitClient.files.upload({
        file,
        fileName : "music_" + Date.now() + ".mp3",
    })
    return result
}

module.exports = {uploadFile};
