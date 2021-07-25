const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsletterSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('newsletter', NewsletterSchema);
