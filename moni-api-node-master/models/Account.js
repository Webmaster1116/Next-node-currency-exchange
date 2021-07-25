const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
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
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('account', AccountSchema);
