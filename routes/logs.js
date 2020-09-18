const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Log = require("../models/Log");
const User = require("../models/User");

// @route GET api/logs
// @desc Get all team logs
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route POST api/logs
// @desc Add new logs
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("message", "Message is required").not().isEmpty(),
      check("member", "Member is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { message, member, attention } = req.body;
    try {
      const newLog = new Log({
        message,
        member,
        attention,
        user: req.user.id,
      });
      const log = await newLog.save();
      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/logs/:id
// @desc Delete logs
// @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "Log not found" });

    //Make sure user owns condtact
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: "Log removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/logs/:id
// @desc Update logs
// @access Private

router.put("/:id", auth, async (req, res) => {
  const { message, member, attention } = req.body;

  //Build log object
  const logFields = {};
  if (message) logFields.message = message;
  if (member) logFields.member = member;
  if (attention) logFields.attention = attention;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "Log not found" });

    //Make sure user owns condtact
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/logs
// @desc Search logs
// @access Private

// router.get(`/logs`, (req, res) => {
//   res.send("Search logs");
// });
module.exports = router;
