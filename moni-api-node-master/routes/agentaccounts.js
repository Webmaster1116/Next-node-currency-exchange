const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');

const Account = require('../models/AgentAccount');
const User = require('../models/Agent');

// @route    GET api/agent/balance/true/:id
// @desc     Make account balance true
// @access   Private
router.get('/balance/true/:id', auth, async (req, res) => {
	let id = req.params.id;
	try {
		const agent =  await Account.findByIdAndUpdate(
			id,
			{ $set: { balance: true } },
			{ new: true }
		);
		res.json(agent);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/agent/balance/false/:id
// @desc     Make account balance false
// @access   Private
router.get('/balance/false/:id', auth, async (req, res) => {
	let id = req.params.id;
	try {
		const agent =  await Account.findByIdAndUpdate(
			id,
			{ $set: { balance: false } },
			{ new: true }
		);
		res.json(agent);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/agentaccounts/id
// @desc     Get agent accounts with agent id
// @access   Private
router.get("/:id", async (req, res) => {
	let id = req.params.id;
	try {
	  const agent = await Account.find({ agent: id });
	  res.json(agent);
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send("Server Error");
	}
  });

// @route    GET api/agentaccounts
// @desc     Get all accounts of agent
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const accounts = await Account.find({ agent: req.user.id }).sort({
			date: -1
		});
		res.json(accounts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/agentaccounts
// @desc     Save an agent account Data
// @access   Private
router.post(
	'/',
	[
		auth,
		[
			check('bankName', 'Bank Name is required')
				.not()
                .isEmpty(),
            check('accountNumber', 'Account Number is required')
                .not()
                .isEmpty(),
			check('type', 'Type must be current or savings').isIn([
				'Ahorros',
				'Corriente'
			]),
			check('currency', 'Currency must be dollars, soles or bitcoin')
				.not()
				.isEmpty(),
			check('bankShort', 'Short Bank Name is required')
				.not()
				.isEmpty(),
			check('bankUser', 'Short Bank Name is required')
				.not()
				.isEmpty()
			
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { bankName, accountNumber, type, nickname, currency, bankShort, bankUser, purpose } = req.body;

		try {
			const newAccount = new Account({
				bankName,
				accountNumber,
				type,
				bankShort, 
				bankUser,
				nickname,
                currency,
                purpose,
				agent: req.user.id
			});

			const account = await newAccount.save();

			res.json(account);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    PUT api/agentaccounts/:id
// @desc     Update an agent account
// @access   Private
router.put('/:id', auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const { bankName, accountNumber, type, nickname, currency, bankShort, bankUser } = req.body;

	// Build account object
	const accountFields = {};
	if (bankName) accountFields.bankName = bankName;
	if (bankShort) accountFields.bankShort = bankShort;
	if (bankUser) accountFields.bankUser = bankUser;
	if (accountNumber) accountFields.accountNumber = accountNumber;
	if (nickname) accountFields.nickname = nickname;
	if (type) accountFields.type = type;
	if (currency) accountFields.currency = currency;

	try {
		let account = await Account.findById(req.params.id);

		if (!account) return res.status(404).json({ msg: 'Account not found' });

		// // Make sure user owns account
		// if (account.user.toString() !== req.user.id)
		// 	return res.status(401).json({ msg: 'Not authorized' });

		account = await Account.findByIdAndUpdate(
			req.params.id,
			{ $set: accountFields },
			{ new: true }
		);

		res.json(account);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route    DELETE api/agentaccounts/:id
// @desc     Delete a account
// @access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const account = await Account.findById(req.params.id);

		if (!account) return res.status(404).json({ msg: 'Account not found' });

		// // Make sure user owns account
		// if (account.user.toString() !== req.user.id)
		// 	return res.status(401).json({ msg: 'Not authorized' });

		await Account.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Account removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
