const express = require("express");
const app = require("./src/app");
const port = 3000;

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "Notes created sucessfully",
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Notes Fetch Seccessfully",
    notes: notes,
  });
});

app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;

  delete notes[index];
  res.status(200).json({
    message: "notes delete successfully",
  });
});

app.patch("/notes/:index", (req, res) => {
  const index = req.params.index;
  const { title, description } = req.body;
  notes[index] = { ...notes[index], title, description };

  res.status(200).json({
    message: "notes updated successfully",
    notes: notes[index],
  });
});

app.listen(port, (req, res) => {
  console.log("Your Port Is Running 3000");
});
