const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	type: {
		type: String,
		default: "admin"
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('admin', AdminSchema);
