const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");

const Profile = require("../models/AgentProfile");
const User = require("../models/Agent");

// @route    GET api/agentprofile/id
// @desc     Get agent profile with agent id
// @access   Private
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const agent = await Profile.find({ agent: id });
    res.json(agent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/agentprofile
// @desc     Get user's profile
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const profiles = await Profile.find({ agent: req.user.id }).sort({
      date: -1,
    });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profiles
// @desc     Save a user's profile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("firstName", "First Name is required").not().isEmpty(),
      check("lastName", "Last Name is required").not().isEmpty(),
      check("email", "Email is required").not().isEmpty(),
      check("phone", "Phone is required").not().isEmpty(),

      check("address", "Address is required").not().isEmpty(),
      check("dni", "Document Number is required").not().isEmpty(),
      check("accountType", "Profile Type must be Personal or Empresa").isIn([
        "Personal",
        "Empresa",
      ]),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      dni,
      address,
      companyName,
      ruc,
      accountType,
    } = req.body;

    try {
      const newAccount = new Profile({
        firstName,
        lastName,
        email,
        phone,
        dni,
        address,
        companyName,
        ruc,
        accountType,
        agent: req.user.id,
      });

      const account = await newAccount.save();

      res.json(account);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    Put api/agentprofile/:id
// @desc     Edit Agent Profile Details
// @access   Private
router.put("/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    firstName,
    lastName,
    email,
    phone,
    dni,
    address,
    companyName,
    ruc,
    accountType,
  } = req.body;

  // Build account object
  const accountFields = {};
  if (firstName) accountFields.firstName = firstName;
  if (lastName) accountFields.lastName = lastName;
  if (email) accountFields.email = email;
  if (phone) accountFields.phone = phone;
  if (dni) accountFields.dni = dni;
  if (address) accountFields.address = address;
  if (companyName) accountFields.companyName = companyName;
  if (ruc) accountFields.ruc = ruc;
  if (accountType) accountFields.accountType = accountType;

  try {
    let account = await Profile.find({ agent: req.params.id });

    if (!account) return res.status(404).json({ msg: "Profile not found" });

    // // Make sure user owns account
    // if (account.user.toString() !== req.user.id)
    // 	return res.status(401).json({ msg: 'Not authorized' });

    account = await Profile.findByIdAndUpdate(
      account[0]._id,
      { $set: accountFields },
      { new: true }
    );

    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
