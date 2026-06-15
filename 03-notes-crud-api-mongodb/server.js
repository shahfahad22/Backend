const express = require("express")
const app = require("./src/app");
const connectDB = require("./src/db/db")
const noteModel = require("./models/note.model")
require("dotenv").config();

const port = 3000;
app.use(express.json())

connectDB()

app.post("/notes", async (req,res)=>{
    const data = req.body;
   await noteModel.create({
        title: data.title,
        description: data.description
    })

    res.status(201).json({
        message: "Note Created"
    })
})


app.get("/notes", async (req, res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched Successfully ",
        notes:notes
    })
})

app.delete("/notes/:id",async (req, res)=>{
    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message: "Note Deleted Successfully"
    })
})


app.patch("/notes/:id", async (req, res)=>{
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({_id:id},{description:description})

    res.status(200).json({
        message: "Note Updated Sucessfully"
    })
})

app.listen(port, (req, res)=>{
    console.log("Your Port Is Running 3000")
})
