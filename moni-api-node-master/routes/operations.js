const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const multer = require("multer");

const Operation = require("../models/Operation");
const User = require("../models/User");
const Agent = require("../models/Agent");

//middleware for file upload
const upload = multer({
  limits: {
    fileSize: 5000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    console.log("file...", file);
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true); // continue with upload
  },
});

// @route    GET api/operations/:id
// @desc     Get a Operations
// @access   Private
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const operation = await Operation.findById(id);
    res.json(operation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/operations/commission/agent/id
// @desc     Get all Operations commission for agent
// @access   Private
router.get("/commission/agent/:id", auth, async (req, res) => {
  try {
    let id = req.params.id;
    
    const data = await Operation.find({agent : id})
      .select("-userTransactionPhoto")
      .sort({
        date: -1,
      });
    let t = 0, t2 = 0;
    for(let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      if(data[i].transaction.currencyTo === "Dollars" && data[i].transaction.status === "Finalizado")
        t += parseFloat(data[i].transaction.amountToPay);
      else if(data[i].transaction.currencyTo === "Soles" && data[i].transaction.status === "Finalizado")
        t2 += parseFloat(data[i].transaction.amountToPay);
    }
    res.json({
      "dollar": t,
      "soles": t2
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route    GET api/operations/commission/admin
// @desc     Get all Operations commission 
// @access   Private
router.get("/commission/admin", auth, async (req, res) => {
  try {
    // let id = req.params.id;
    
    const data = await Operation.find()
      .select("-userTransactionPhoto")
      .sort({
        date: -1,
      });
    let t = 0, t2 = 0;
    for(let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      if(data[i].transaction.currencyTo === "Dollars" && data[i].transaction.status === "Finalizado")
        t += parseFloat(data[i].transaction.amountToPay);
      else if(data[i].transaction.currencyTo === "Soles" && data[i].transaction.status === "Finalizado")
        t2 += parseFloat(data[i].transaction.amountToPay);
    }
    res.json({
      "dollar": t,
      "soles": t2
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route    GET api/operations/agent/id
// @desc     Get all Operations
// @access   Private
router.get("/agent/:id", auth, async (req, res) => {
  try {
    let id = req.params.id;
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await Operation.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    const operations = await Operation.find({agent : id})
      .select("-userTransactionPhoto")
      .sort({
        date: -1,
      }).limit(limit).skip(startIndex).exec();
    res.json(operations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});


// @route    GET api/operations
// @desc     Get all Operations
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await Operation.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    const operations = await Operation.find()
      .select("-userTransactionPhoto")
      .sort({
        date: -1,
      }).limit(limit).skip(startIndex).exec();
    res.json(operations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// @route    GET api/operations/count
// @desc     Get count of operations
// @access   Private
router.get("/count", auth, async (req, res) => {
  try {
    const operations = await Operation.count();
    res.json(operations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/operations/photo/:id
// @desc     Get image of user operation
// @access   Public
router.get("/photo/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const operation = await Operation.findById(id);
    res.set("Content-Type", "image/jpeg");
    res.send(operation.userTransactionPhoto);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/operations/user
// @desc     Get all Operations os single User
// @access   Private
router.post("/user", auth, async (req, res) => {
  try {
    console.log(req.user);
    const operations = await Operation.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(operations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/operations
// @desc     Add a new operation
// @access   Private
router.post(
  "/",
  [
    auth,
    upload.single("file"),
    [
      check("profileDetails", "Profile Details are required").not().isEmpty(),
      check("bankDetails", "Bank Account Details are required").not().isEmpty(),
      check("destinationBank", "Destination Bank is required").not().isEmpty(),
      check("transaction", "Transaction Details Required").not().isEmpty(),
      check("agentBank", "Agent Bank Details Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      profileDetails,
      bankDetails,
      transaction,
      agent,
      commissionType,
      commissionValue,
      destinationBank,
      transactionNumber,
      agentBank,
      savings,
      exchange,
    } = req.body;

    profileDetails = JSON.parse(profileDetails);
    bankDetails = JSON.parse(bankDetails);
    transaction = JSON.parse(transaction);
    agent = JSON.parse(agent);
    commissionType = JSON.parse(commissionType);
    commissionValue = JSON.parse(commissionValue);
    destinationBank = JSON.parse(destinationBank);
    transactionNumber = JSON.parse(transactionNumber);
    savings = JSON.parse(savings);
    exchange = JSON.parse(exchange);
    agentBank = JSON.parse(agentBank);

    let userTransactionPhoto = "";

    if (req.file) {
      userTransactionPhoto = req.file.buffer;
    }

    try {
      let user = await Agent.findById(agent);
      console.log(user);
      const newOperation = new Operation({
        profileDetails,
        bankDetails,
        transaction,
        destinationBank,
        transactionNumber,
        user: req.user.id,
        agent,
        agentName: user.name,
        agentEmail: user.email,
        savings,
        exchange,
        agentBank,
        userTransactionPhoto,
      });

      const operation = await newOperation.save();

      console.log("operation: ---", newOperation);
      res.json(newOperation);

      if (!user)
        return res.status(404).json({ msg: "Agent with that ID not found" });

      user = await Agent.findByIdAndUpdate(
        agent,
        { $push: { operations: operation._id } },
        { new: true }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/operations/:id
// @desc     Update an operation
// @access   Private
router.put("/:id", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    profileDetails,
    bankDetails,
    destinationBank,
    transactionNumber,
    transaction,
    agentBank,
    userTransactionPhoto,
    agentTransactionNumber,
  } = req.body;

  // Build operation object
  const accountFields = {};
  if (profileDetails) accountFields.profileDetails = profileDetails;
  if (bankDetails) accountFields.bankDetails = bankDetails;
  if (transaction) accountFields.transaction = transaction;
  if (transactionNumber) accountFields.transactionNumber = transactionNumber;
  if (agentBank) accountFields.agentBank = agentBank;
  if (destinationBank) accountFields.destinationBank = destinationBank;
  if (userTransactionPhoto) accountFields.userTransactionPhoto = userTransactionPhoto;
  if (agentTransactionNumber)
    accountFields.agentTransactionNumber = agentTransactionNumber;

  try {
    let operation = await Operation.findById(req.params.id);

    if (!operation) return res.status(404).json({ msg: "Operation not found" });
    let user = await Agent.findById(operation.agent);

    operation = await Operation.findByIdAndUpdate(
      req.params.id,
      { $set: accountFields },
      { new: true }
    );
    let commissionType = operation.transaction.currencyFrom,
      commissionValue = operation.transaction.amountReceive * 0.0006;
    if (operation.transaction.status === "Finalizado") {
      if (!user)
        return res.status(404).json({ msg: "Agent with that ID not found" });
      if (commissionType === "Soles") {
        user = await Agent.findByIdAndUpdate(
          operation.agent,
          { $inc: { commissionSoles: commissionValue } },
          { new: true }
        );
        console.log(user);
      } else if (commissionType === "Dollars") {
        user = await Agent.findByIdAndUpdate(
          operation.agent,
          { $inc: { commissionDollars: commissionValue } },
          { new: true }
        );
        console.log(user);
      }
    }
    res.json(operation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    DELETE api/operations/:id
// @desc     Delete a operation
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const operation = await Operation.findById(req.params.id);

    if (!operation) return res.status(404).json({ msg: "Operation not found" });

    user = await Agent.findByIdAndUpdate(
      operation.agent,
      { $pull: { operations: operation._id } },
      { new: true }
    );

    await Operation.findByIdAndRemove(req.params.id);

    res.json({ msg: "Operation removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
