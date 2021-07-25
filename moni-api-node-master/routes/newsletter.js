const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Newsletter = require('../models/Newsletter');

// @route    GET api/newsletter
// @desc     Get all emails subscribed to newsletter
// @access   Public
router.get('/', async (req, res) => {
	try {
		const agent = await Newsletter.find();
		res.json(agent);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/newsletter
// @desc     Save a email to newsletter object
// @access   Public
router.post(
	'/',
	[check('email', 'email is Required').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email } = req.body;

		try {
			const newAccount = new Newsletter({
				email,
			});

			const account = await newAccount.save();

			res.json(account);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
