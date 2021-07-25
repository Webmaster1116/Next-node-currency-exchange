const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const Agent = require('../models/Agent');
const Invoice = require('../models/Invoice');

// @route    GET api/agent/reset/:id
// @desc     Reset agent commissions
// @access   Private
router.get('/reset/:id', auth, async (req, res) => {
	let id = req.params.id;
	try {
		const agent = await Agent.findByIdAndUpdate(
			id,
			{ $set: { commissionDollars: 0, commissionSoles: 0 } },
			{ new: true }
		);
		res.json(agent);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/agent/enable/:id
// @desc     Make agent enabled
// @access   Private
router.get('/enable/:id', auth, async (req, res) => {
	let id = req.params.id;
	try {
		const agent = await Agent.findByIdAndUpdate(
			id,
			{ $set: { enable: true } },
			{ new: true }
		);
		res.json(agent);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/agent/disable/:id
// @desc     Make agent disabled
// @access   Private
router.get('/disable/:id', auth, async (req, res) => {
	let id = req.params.id;
	try {
		const agent = await Agent.findByIdAndUpdate(
			id,
			{ $set: { enable: false } },
			{ new: true }
		);
		res.json(agent);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/agent/online/:id
// @desc     Make agent online
// @access   Private
router.get('/online/:id', auth, async (req, res) => {
	let id = req.params.id;
	try {
		const agent = await Agent.findByIdAndUpdate(
			id,
			{ $set: { online: true } },
			{ new: true }
		);
		res.json(agent);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/agent/offline/:id
// @desc     Make agent offline
// @access   Private
router.get('/offline/:id', auth, async (req, res) => {
	let id = req.params.id;
	try {
		const agent = await Agent.findByIdAndUpdate(
			id,
			{ $set: { online: false } },
			{ new: true }
		);
		res.json(agent);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/agent
// @desc     Get all agent's profile
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const users = await Agent.aggregate(
			[
				{
					$project: {
						name: 1,
						email: 1,
						commissionSoles: 1,
						commissionDollars: 1,
						enable: 1,
						type: 1,
						online: 1,
						operations: 1,
						date: 1,
						length: { $size: '$operations' },
					},
				},
				{ $sort: { length: 1 } },
			],
			function (err, results) {
				res.json(results);
			}
		);
		// res.json(users);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/agent/invoice
// @desc     Get every agent's invoice data
// @access   Private
router.get('/invoice', auth, async (req, res) => {
	try {
		const invoice = await Invoice.find().sort({
			date: -1,
		});
		res.json(invoice);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/agent/new
// @desc     Register Agent
// @access   Public
router.post(
	'/new',
	[
		auth,
		[
			check('name', 'Name is required').not().isEmpty(),
			check('email', 'Please include a valid email').isEmail(),
			check(
				'password',
				'Please enter a password with 6 or more characters'
			).isLength({ min: 6 }),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await Agent.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'Agent already exists' });
			}

			user = new Agent({
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route    GET api/agent/auth
// @desc     Get logged Agent
// @access   Private
router.get('/auth', auth, async (req, res) => {
	try {
		const user = await Agent.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/agent/auth
// @desc     Authenticate Agent & get token
// @access   Public
router.post(
	'/auth',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await Agent.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
