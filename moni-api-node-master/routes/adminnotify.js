const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AdminNotify = require("../models/AdminNotify");

router.post("/adminnotify", (req, res) => {
  const subscriptionModel = new AdminNotify(req.body);
  subscriptionModel.save((err, subscription) => {
    if (err) {
      console.error(`Error occurred while saving subscription. Err: ${err}`);
      res.status(500).json({
        error: "Technical error occurred",
      });
    } else {
      res.json({
        data: "AdminNotify saved.",
      });
    }
  });
});

module.exports = router;
