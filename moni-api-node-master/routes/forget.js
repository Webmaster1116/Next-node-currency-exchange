const crypto = require("crypto");
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const fs = require("fs");
const ejs = require("ejs");
const User = require("../models/User");

var auth = {
  type: "oauth2",
  user: "developermods50@gmail.com",
  clientId:
    "204950957779-0ngcr3h2ih2mg3gjmursajqsinqruog6.apps.googleusercontent.com",
  clientSecret: "GZO5nwXG1P4paTVOIamq4E5E",
  refreshToken:
    "1//0gMWhxXs-_ixUCgYIARAAGBASNwF-L9Ir0Pc20BVkzSS8TdOujubcANtz6VZSnT45ao844xqOjMqMdSTaticYhJyc8QgbbOWtRsI",
};

const transport = nodemailer.createTransport({
  name: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: auth,
});

router.post("/forgetpassword", async (req, res) => {
  console.log(req.body.email);
  const token = crypto.randomBytes(20).toString("hex");
  await User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now + 3600000,
      },
    },
    async (user) => {
      if (user === "") {
        res.send("no user found");
      } else {
        console.log("user", user);

        const messageNew = {
          // Sender address
          to: req.body.email, // List of recipients
          subject: "Link to Reset Password", // Subject line
          text:
            "You are viewing this mail because you(or someone else) has requested to reset the password of your account.\n\n " +
            "Click on the following link to continue or paste it into your browser to contnue .\n " +
            `https://infallible-curran-081295.netlify.app/recovery/${token} \n\n` +
            "If you didn't request this, please ignore this email and your passsword will remain unchanged.",
        };
        await transport.sendMail(messageNew, function (err, info) {
          if (err) {
            res.send(err);
          } else {
            res.send(info);
          }
        });
      }
    }
  );
});

router.get("/reset", (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
    (user) => {
      if (user === "") {
        res.send("password link expires");
      } else {
        console.log(user);
        res.send(user);
      }
    }
  );
});

router.post("/updatePassword", async (req, res) => {
  let { password } = await req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  console.log("pasowrd", password);

  await User.findOneAndUpdate(
    {
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },

    {
      $set: {
        password,
        resetPasswordToken: "",
        resetPasswordExpires: "",
      },
    },
    (user) => {
      if (user === "") {
        res.send("invalid user...");
      } else {
        console.log(user);
        res.send(user);
      }
    }
  );
});

module.exports = router;
