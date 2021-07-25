const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @route    GET api/profiles/all
// @desc     Get All user's profile
// @access   Private
router.get('/all', auth, async (req, res) => {
	try {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const results = {};

		if (endIndex < (await Profile.countDocuments().exec())) {
			results.next = {
				page: page + 1,
				limit: limit,
			};
		}

		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit: limit,
			};
		}
		const profiles = await Profile.find()
			.sort({
				date: -1,
			})
			.limit(limit)
			.skip(startIndex)
			.exec();
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/profiles
// @desc     Get user's profile
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const profiles = await Profile.find({ user: req.user.id }).sort({
			date: -1,
		});
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/profiles
// @desc     Save a user's profile
// @access   Private
router.post(
	'/',
	[
		auth,
		[
			check('firstName', 'First Name is required').not().isEmpty(),
			check('lastName', 'Last Name is required').not().isEmpty(),
			check('birthDate', 'BirthDate is required').not().isEmpty(),
			check('email', 'Email is required').not().isEmpty(),
			check('phone', 'Phone is required').not().isEmpty(),
			check('nationality', 'Nationality is required').not().isEmpty(),
			check('doctype', 'Document Type is required').not().isEmpty(),
			check('dni', 'Document Number is required').not().isEmpty(),
			check('accountType', 'Profile Type must be Personal or Empresa').isIn([
				'Personal',
				'Empresa',
			]),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			firstName,
			secondName,
			lastName,
			birthDate,
			email,
			phone,
			nationality,
			doctype,
			dni,
			motherLastName,
			accountType,
		} = req.body;

		try {
			let user = await Profile.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}
			const newAccount = new Profile({
				firstName,
				secondName,
				lastName,
				birthDate,
				email,
				phone,
				nationality,
				doctype,
				dni,
				motherLastName,
				accountType,
				user: req.user.id,
			});

			const account = await newAccount.save();

			res.json(account);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    Put api/profile/:id
// @desc     Edit Profile Details
// @access   Private
router.put('/:id', auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({ errors: errors.array() });

	const {
		firstName,
		secondName,
		lastName,
		birthDate,
		email,
		phone,
		nationality,
		doctype,
		dni,
		motherLastName,
	} = req.body;

	// Build account object
	const accountFields = {};
	if (firstName) accountFields.firstName = firstName;
	if (secondName) accountFields.secondName = secondName;
	if (lastName) accountFields.lastName = lastName;
	if (birthDate) accountFields.birthDate = birthDate;
	if (email) accountFields.email = email;
	if (phone) accountFields.phone = phone;
	if (nationality) accountFields.nationality = nationality;
	if (doctype) accountFields.doctype = doctype;
	if (dni) accountFields.dni = dni;
	if (motherLastName) accountFields.motherLastName = motherLastName;

	try {
		let account = await Profile.findById(req.params.id);

		if (!account) return res.status(404).json({ msg: 'Profile not found' });

		// Make sure user owns account
		if (account.user.toString() !== req.user.id)
			return res.status(401).json({ msg: 'Not authorized' });

		account = await Profile.findByIdAndUpdate(
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

module.exports = router;
