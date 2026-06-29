require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
const multer = require("multer");
const uploadFile = require("./src/services/storage.services");
const postModel = require("./modules/post.model");
const cors = require("cors");


const port= 3000
app.use(cors());
app.use(require("express").json());

const upload = multer({ storage: multer.memoryStorage() });

connectDB();

app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption,
    });

    return res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (err) {
    console.error("Create Post Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find();

  return res.status(200).json({
    message: "Post Fetched Successdully",
    posts,
  });
});

app.delete("/delete-post/:id", async (req, res)=>{
    try{
        await postModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message: "Post Delted Successfully"
        })
    }catch(error){
        res.status(500).json({
            message : "Error Deleting Post"
        })
    }
})


app.listen(port, () => {
  console.log("Your Server Is Running 3000");
});

module.exports = app;