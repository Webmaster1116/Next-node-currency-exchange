const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	commissionSoles: {
		type: Number,
		default: 0,
	},
	commissionDollars: {
		type: Number,
		default: 0,
	},
	startDay: {
		type: Date,
		default: Date.now,
	},
	endDay: {
		type: Date,
		default: Date.now,
	},
	agent: {
		type: Schema.Types.ObjectId,
		ref: 'agents',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('invoice', InvoiceSchema);
