const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const URL = config.get('exchange');
var request = require('request');
var cheerio = require('cheerio');
const Exchange = require('../models/Exchange');
const exchangeId = "5f0b10586057690017293870";

const url = 'https://cuantoestaeldolar.pe/cambio-de-dolar-online';

// @route    GET api/exchange
// @desc     Get exchange rate
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    
    const exchanges = await Exchange.find().sort({
			createdAt: 1
    });
    console.log(exchanges[0])
    const { _id, current, sunat, paralelo, dollarHouse, cambix, acomo, bcp } = exchanges[0];
    res.json({
      "_id": _id,
      "current": current,
      "PEN": current.compra,
      "USD": current.venta,
      "sunat":sunat, 
      "paralelo":paralelo,
      "dollarHouse":dollarHouse,
      "cambix":cambix,
      "acomo":acomo,
      "bcp":bcp
  });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/exchange/calculate
// @desc     Get exchange rate
// @access   Public
router.get("/calculate",  async (req, res) => {
  try {
    const { originCurrency, destinationCurrency, amount} = req.query;
    const exchanges = await Exchange.find().sort({
			createdAt: 1
    });
    
    console.log(exchanges[0])
    const { _id, current, sunat, paralelo, dollarHouse, cambix, acomo, bcp } = exchanges[0];
    console.log(current.venta)
    let rate = current.venta;
    let ex = (1/rate) * amount;
    let savings = Math.abs(bcp.venta - current.venta) * amount;
    if(originCurrency === "USD"){ 
      rate = current.compra; 
      ex = rate * amount;
      savings = Math.abs(bcp.compra - current.compra) * amount;
    }
    res.json({
      "rate": rate,
      "exchange": ex,
      "ahorros": savings
    });
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/exchange/:id
// @desc     Update current value
// @access   Public
router.put('/:id', async (req, res) => {
    const { compra, venta } = req.body;
    
    
    try {
      let exchange = await Exchange.findById(req.params.id);
      console.log(exchange);
      let c = exchange.current;
      const current = { compra: c.compra, venta: c.venta};        
      
      if(compra && compra !== null && compra !== "") current.compra = parseFloat(compra);
      if(venta && venta !== null && venta !== "") current.venta = parseFloat(venta);
      console.log(current);
      if (!exchange) return res.status(404).json({ msg: 'Database collection not found' });
      
      exchange = await Exchange.findByIdAndUpdate(
        req.params.id,
        { $set: {current: current} },
        { new: true }
      );
      res.json(exchange);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
      
    }
});

module.exports = router;
