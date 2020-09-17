const express = require("express");
const router = express.Router();

// @route GET api/auth
// @desc Get logged in team
// @access Private

router.get("/", (req, res) => {
  res.send("Get logged in team");
});

// @route POST api/auth
// @desc Auth team & get token
// @access Public

router.post("/", (req, res) => {
  res.send("Log in team");
});

module.exports = router;
