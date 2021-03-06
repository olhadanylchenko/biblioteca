const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Book = require("../models/Book");

router.post("/", async (req, res) => {
  try {
    const { author, title, read } = req.body;
    const owner = req.user._id;
    const book = await Book.create({
      owner,
      author,
      title,
      read,
    });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const book = await Book.find({
      owner: req.user._id,
    });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id)
//       .populate("author")
//       .populate("attendees");
//     res.status(200).json(event);
//   } catch (err) {
//     json(err);
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const { author, title, read } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { author, title, read },
      { new: true }
    );
    res.status(200).json(book);
  } catch (err) {
    json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.owner === req.user._id) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "ok" });
    } else {
      res.status(403).json({ message: "unauthorized" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
