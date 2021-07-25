const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
    agent: {
		type: Schema.Types.ObjectId,
		ref: 'agents'
	},
	firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
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
    dni: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        default: ""
    },
    ruc: {
        type: String,
        default: ""
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

module.exports = mongoose.model('agentprofile', ProfileSchema);
