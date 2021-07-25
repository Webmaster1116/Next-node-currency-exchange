const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const crypto = require('crypto');

const User = require("../models/User");
const Token = require("../models/Token");


var authMail = {
  type: 'oauth2',
  user: 'developermods50@gmail.com',
  clientId: '204950957779-0ngcr3h2ih2mg3gjmursajqsinqruog6.apps.googleusercontent.com',
  clientSecret: 'GZO5nwXG1P4paTVOIamq4E5E',
  refreshToken: '1//0gMWhxXs-_ixUCgYIARAAGBASNwF-L9Ir0Pc20BVkzSS8TdOujubcANtz6VZSnT45ao844xqOjMqMdSTaticYhJyc8QgbbOWtRsI'
};

const transport = nodemailer.createTransport({
  name: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: authMail
});

// @route    GET api/users
// @desc     Get all user's profile
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({
      date: -1,
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/users/count
// @desc     Get count of user profiles
// @access   Private
router.get("/count", auth, async (req, res) => {
  try {
    const users = await User.count();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save(function (err) {
        if (err) { 
          return res.status(500).json({ msg: err.message }); 
        }
 
        // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
 
            // Send the mail
            let mailOptions = { 
                to: user.email, 
                subject: 'Account Verification Token', 
                text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api\/verify\/confirmation?token=' + token.token + '.\n' 
            };
            transport.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
    });

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
