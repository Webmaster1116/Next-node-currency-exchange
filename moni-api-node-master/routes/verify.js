const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');
const crypto = require('crypto');

const User = require('../models/User');
const Token = require('../models/Token');

var authMail = {
	type: 'oauth2',
	user: 'developermods50@gmail.com',
	clientId:
		'204950957779-svgikse821lsi7karfmloehmsf28calj.apps.googleusercontent.com',
	clientSecret: 'mx-Y-G2-VCF4yPPErOorcDeW',
	refreshToken:
		'1//0g3eXswT2nfVHCgYIARAAGBASNwF-L9Ir3UqZOZNC_-ryCQLKcR7os3qhrIWSo9KaqTAadz0pSfDgLEof7V0zSsSaMdDvzo_-T7Q',
};

const transport = nodemailer.createTransport({
	name: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use SSL
	auth: authMail,
});

// @route    GET api/verify/confirmation
// @desc     Confirm a User's email
// @access   Public
router.get('/confirmation', async (req, res) => {
	// Find a matching token
	console.log(req.query.token);
	console.log(req.query.token._userId);
	Token.findOne({ token: req.query.token }, function (err, token) {
		if (!token)
			return res
				.status(400)
				.json({
					type: 'not-verified',
					msg:
						'We were unable to find a valid token. Your token my have expired.',
				});

		// If we found a token, find a matching user
		User.findOne({ _id: token._userId }, function (err, user) {
			if (!user)
				return res
					.status(400)
					.json({ msg: 'We were unable to find a user for this token.' });
			if (user.isVerified)
				return res
					.status(400)
					.json({
						type: 'already-verified',
						msg: 'This user has already been verified.',
					});

			// Verify and save the user
			user.isVerified = true;
			user.save(function (err) {
				if (err) {
					return res.status(500).json({ msg: err.message });
				}
				res.status(200).send('The account has been verified. Please log in.');
			});
		});
	});
});

// @route    POST api/verify/resend
// @desc     Resend Confirmation Mail
// @access   Public
router.post('/resend', async (req, res) => {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (!user)
			return res
				.status(400)
				.json({ msg: 'We were unable to find a user with that email.' });
		if (user.isVerified)
			return res
				.status(400)
				.json({
					msg: 'This account has already been verified. Please log in.',
				});

		// Create a verification token, save it, and send email
		var token = new Token({
			_userId: user._id,
			token: crypto.randomBytes(16).toString('hex'),
		});

		// Save the token
		token.save(function (err) {
			if (err) {
				return res.status(500).send({ msg: err.message });
			}

			// Send the mail
			let mailOptions = {
				to: user.email,
				subject: 'Account Verification Token',
				text:
					'Hello,\n\n' +
					'Please verify your account by clicking the link: \nhttps://api.moni.pe/api/verify/confirmation?token=' +
					token.token +
					'.\n',
			};
			transport.sendMail(mailOptions, function (err) {
				if (err) {
					return res.status(500).send({ msg: err });
				}
				res
					.status(200)
					.send('A verification email has been sent to ' + user.email + '.');
			});
		});
	});
});

module.exports = router;
