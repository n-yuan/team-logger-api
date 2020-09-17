const express = require("express");
const router = express.Router();

// @route GET api/logs
// @desc Get all team logs
// @access Private

router.get("/", (req, res) => {
  res.send("Get all logs");
});

// @route POST api/logs
// @desc Add new logs
// @access Private

router.post("/", (req, res) => {
  res.send("Add a log");
});

// @route DELETE api/logs/:id
// @desc Delete logs
// @access Private

router.delete("/:id", (req, res) => {
  res.send("Delete a log");
});

// @route PUT api/logs/:id
// @desc Update logs
// @access Private

router.put("/:id", (req, res) => {
  res.send("Update log");
});

// @route GET api/logs
// @desc Search logs
// @access Private

router.get(`/logs`, (req, res) => {
  res.send("Search logs");
});
module.exports = router;
