const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Member = require("../models/Member");
const User = require("../models/User");

// @route GET api/members
// @desc Get all team members
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const members = await Member.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/members
// @desc Add new members
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("firstName", "FirstName is required").not().isEmpty(),
      check("lastName", "LastName is required").not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName } = req.body;
    try {
      const newMember = new Member({
        firstName,
        lastName,
        user: req.user.id,
      });
      const member = await newMember.save();
      res.json(member);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE api/members/:id
// @desc Delete members
// @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let member = await Member.findById(req.params.id);

    if (!member) return res.status(404).json({ msg: "Member not found" });

    //Make sure user owns condtact
    if (member.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Member.findByIdAndRemove(req.params.id);

    res.json({ msg: "Member removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
