const express = require("express");
const router = express.Router();

// @route GET api/members
// @desc Get all team members
// @access Private

router.get("/", (req, res) => {
  res.send("Get all members");
});

// @route POST api/members
// @desc Add new members
// @access Private

router.post("/", (req, res) => {
  res.send("Add members");
});

// @route DELETE api/members/:id
// @desc Delete logs
// @access Private

router.delete("/:id", (req, res) => {
  res.send("Delete members");
});

module.exports = router;
