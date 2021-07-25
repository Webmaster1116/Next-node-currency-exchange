const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OperationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  profileDetails: {
    type: Schema.Types.Mixed,
    required: true,
  },
  bankDetails: {
    type: Schema.Types.Mixed,
    required: true,
  },
  destinationBank: {
    type: String,
    required: true,
  },
  transaction: {
    type: Schema.Types.Mixed,
    required: true,
  },
  transactionNumber: {
    type: String,
  },
  agentTransactionNumber: {
    type: String,
  },
  agent: {
    type: Schema.Types.ObjectId,
    ref: "agents",
  },
  agentName: {
    type: String,
  },
  agentEmail: {
    type: String,
  },
  agentBank: {
    type: Schema.Types.Mixed,
    required: true,
  },
  userTransactionPhoto: {
    type: Buffer,
    // reqired: true,
  },
  agentTransactionPhoto: {
    type: Buffer,
  },
  savings: {
    type: Number
  },
  exchange: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("operation", OperationSchema);
