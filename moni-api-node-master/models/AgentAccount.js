const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
	agent: {
		type: Schema.Types.ObjectId,
		ref: 'agents'
	},
	bankName: {
		type: String,
		required: true
	},
	bankShort: {
		type: String,
		required: true
	},
	bankUser: {
		type: String,
		required: true
    },
    accountNumber: {
        type: String, 
        required: true
    },
	type: {
		type: String,
		default: 'Ahorros'
	},
	currency: {
		type: String,
		default: 'Soles'
	},
	nickname: {
		type: String
    },
    purpose: {
        type: String,
        default: "Receive"
	},
	balance: {
		type: Boolean,
		default: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('agentaccount', AccountSchema);
