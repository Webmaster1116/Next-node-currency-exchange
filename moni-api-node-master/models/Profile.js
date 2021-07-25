const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
    user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
	},
	email: {
        type: String,
        required: true
    },
    phone: {
		type: String,
		required: true
	},
    nationality: {
        type: String,
        required: true
    },
    doctype: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    motherLastName: {
        type: String,
        default: ''
    },
    accountType: {
        type: String, 
        default: 'Personal'
    },
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('profile', ProfileSchema);
