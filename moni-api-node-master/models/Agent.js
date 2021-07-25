const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgentSchema = new mongoose.Schema({
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
		default: "agent"
	},
	online: {
		type: Boolean, 
		default: true
	},
	enable: {
		type: Boolean,
		default: true
	},
	commissionSoles: {
		type: Number,
		default: 0
	},
	commissionDollars: {
		type: Number,
		default: 0
	},
	operations: [
		{
		  type: Schema.Types.ObjectId,
		  ref: "operations",
		},
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('agent', AgentSchema);
