const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const webpush = require("web-push");

const User = require("../models/UserNotify");
const Admin = require("../models/AdminNotify");

// notification setup
const subject = "mailto:you@example.com";
const publicKey =
  "BBzxUnsSFfJls1TkK3_3EPsOrN3iI05ZjUvB8fc03Vezvh2Bo39c3oV-sT0_x-bYCEgPAMgvbeLqrDgHTxYsCAA";
const privateKey = "64pD1tm4JGYSW_tIh56AdnR3VwXCYKCQ3gg7e95wpy4";

webpush.setVapidDetails(subject, publicKey, privateKey);

// @route    POST api/notifications/subscribe
// @desc     Send notification to opening app1
// @access   Public
router.post("/subscribe", async (req, res) => {
  const userBody = req.body;

  const { endpoint } = req.body;

  try {
    let user = User.findOne({ endpoint });

    if (user) {
      res.send(200).send("user already exist..!");
    } else {
      const user = new User(req.body);
      const result = await user.save((err, res) => {
        if (err) {
          console.error(`Error occurred while saving userBody. Err: ${err}`);
          return {
            error: "Technical error occurred",
          };
        } else {
          return {
            data: "User saved.",
          };
        }
      });
      res.status(201).json({ ...result });
    }
  } catch (err) {
    console.log(err);
  }

  const payload = JSON.stringify({ title: "Moni" });
  console.log("subscribe called..", userBody);

  await webpush
    .sendNotification(userBody, payload)
    .catch((err) => console.error(err));
});

// @route    POST api/notifications/subscribe
// @desc     Send notifications to all admins about transaction
// @access   Public
router.post("/notify", async (req, res) => {
  const subscription = req.body;
  console.log("subscribe called..", subscription);
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Moni" });

  await User.find({}, async (err, admins) => {
    if (err) {
      console.error(`Error occurred while getting admins`);
      res.status(500).json({
        error: "Technical error occurred",
      });
    } else {
      // res.status(200);
      try {
        let parallelSubscriptionCalls = admins.map(async (admin) => {
          return new Promise(async (resolve, reject) => {
            const pushSubscription = {
              endpoint: admin.endpoint,
              keys: {
                p256dh: admin.keys.p256dh,
                auth: admin.keys.auth,
              },
            };

            const pushPayload = JSON.stringify(payload);
            const pushOptions = {
              vapidDetails: {
                subject: "http://example.com",
                privateKey: privateKey,
                publicKey: publicKey,
              },
              TTL: payload.ttl,
              headers: {},
            };
            await webpush
              .sendNotification(pushSubscription, pushPayload, pushOptions)
              .then((value) => {
                resolve({
                  status: true,
                  endpoint: admin.endpoint,
                  data: value,
                });
              })
              .catch((err) => {
                reject({
                  status: false,
                  endpoint: admin.endpoint,
                  data: err,
                });
              });
          }).catch((err) => console.log("error:-", err));
        });
      } catch {
        (err) => console.log(err);
      }
      // await q.allSettled(parallelSubscriptionCalls).then((pushResults) => {
      //   console.info(pushResults);
      // });
    }
    res.json({
      data: "Push triggered",
    });
  });
});

module.exports = router;
