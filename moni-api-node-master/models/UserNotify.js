const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserNotify = new mongoose.Schema({
  //   user: {
  // type: Schema.Types.ObjectId,
  // ref: "users",
  //   },
  endpoint: {
    required: true,
    unique: true,
    type: String,
  },
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   email: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //   },
  //   phone: {
  //     type: String,
  //     required: true,
  //   },
  //   date: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   endpoint: String,
  keys: Schema.Types.Mixed,
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userNotify", UserNotify);
