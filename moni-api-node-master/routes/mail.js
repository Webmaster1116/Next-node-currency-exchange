const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const config = require("config");
const cron = require("node-cron");
const fs = require("fs");
const ejs = require("ejs");
const authUser = require("../middleware/auth");

var auth = {
  type: "oauth2",
  user: "developermods50@gmail.com",
  clientId:
    "204950957779-svgikse821lsi7karfmloehmsf28calj.apps.googleusercontent.com",
  clientSecret: "mx-Y-G2-VCF4yPPErOorcDeW",
  refreshToken:
    "1//0g3eXswT2nfVHCgYIARAAGBASNwF-L9Ir3UqZOZNC_-ryCQLKcR7os3qhrIWSo9KaqTAadz0pSfDgLEof7V0zSsSaMdDvzo_-T7Q",
};

const transport = nodemailer.createTransport({
  name: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: auth,
});

router.post("/verify", authUser, async (req, res) => {
  const { email, date, profileDetails, bankDetails, transaction } = req.body;

  console.log(profileDetails, bankDetails, transaction);

  const ejsFile = await ejs.renderFile(
    __dirname + "/templates/mail/paymentConfirmed.ejs",
    {
      profileDetails,
      bankDetails,
      transaction,
      date,
    }
  );

  const messageNew = {
    // Sender address
    to: email, // List of recipients
    subject: "Payment Added", // Subject line

    html: ejsFile,
  };
  await transport.sendMail(messageNew, function (err, info) {
    if (err) {
      res.send(err);
    } else {
      res.send(info);
    }
  });
});

router.post("/new", authUser, async (req, res) => {
  const {
    email,
    date,
    profileDetails,
    bankDetails,
    transaction,
    id,
    agent,
    agentBank,
    agentEmail,
  } = req.body;

  const ejsFileUser = await ejs.renderFile(
    __dirname + "/templates/mail/newOperation.ejs",
    {
      profileDetails,
      bankDetails,
      transaction,
      date,
      id,
      agent,
      agentBank,
      agentEmail,
    }
  );

  const messageNewUser = {
    // User address
    to: email, // List of recipients
    subject: "Nueva operación iniciada",
    cc: process.env.admin,
    html: ejsFileUser, // Subject line
  };

  console.log(req.body);

  transport.sendMail(messageNewUser, function (err, info) {
    if (err) {
      return res.send(err);
    } else {
      return res.send(info);
    }
  });

  const ejsFileAgent = await ejs.renderFile(
    __dirname + "/templates/mail/newOperationAssigned.ejs",
    {
      profileDetails,
      bankDetails,
      transaction,
      date,
      id,
      agent,
      agentBank,
      agentEmail,
    }
  );

  const messageNewAgent = {
    // Agent's address
    to: agentEmail, // List of recipients
    subject: "Nueva operación asignada",
    cc: process.env.admin,
    html: ejsFileAgent, // Subject line
  };

  console.log(req.body);

  transport.sendMail(messageNewAgent, function (err, info) {
    if (err) {
      return res.send(err);
    } else {
      return res.send(info);
    }
  });
});

router.post("/invoice", async (req, res) => {
  const { _id, name, email, commissionDollars, commissionSoles } = req.body;
  console.log(_id);

  const ejsFile = await ejs.renderFile(
    __dirname + "/templates/mail/invoice.ejs",
    {
      _id,
      name,
      email,
      commissionDollars,
      commissionSoles,
    }
  );
  console.log(commissionDollars, commissionSoles, "SOLES");
  const messageNew = {
    // Sender address
    to: email, // List of recipients
    subject: "Factura",
    html: ejsFile, // Subject line
  };
  console.log("invoice called", messageNew);
  await transport.sendMail(messageNew, function (err, info) {
    if (err) {
      return res.send(err);
    } else {
      return res.send(info);
    }
  });
});

router.post("/success", authUser, async (req, res) => {
  const { email } = req.body;

  const ejsFile = await ejs.renderFile(
    __dirname + "/templates/mail/statusChange.ejs"
  );

  const messageNew = {
    // User's address
    to: email, // List of recipients
    subject: "Operación completada", // Subject line
    html: ejsFile,
  };
  await transport.sendMail(messageNew, function (err, info) {
    if (err) {
      res.send(err);
    } else {
      res.send(info);
    }
  });
});

module.exports = router;
