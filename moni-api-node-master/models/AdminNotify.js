const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminNotify = new mongoose.Schema({
  //   admin: {
  //     type: Schema.Types.ObjectId,
  //     ref: "admins",
  //   },
  endpoint: {
    required: true,
    unique: true,
    type: String,
  },
  //   name: {
  // type: String,
  // required: true,
  //   },
  //   email: {
  // type: String,
  // required: true,
  // unique: true,
  //   },
  //   phone: {
  // type: String,
  // required: true,
  //   },
  //   date: {
  // type: Date,
  // default: Date.now,
  //   },

  keys: Schema.Types.Mixed,
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("adminNotify", AdminNotify);
