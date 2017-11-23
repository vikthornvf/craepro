const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const telefoneSchema = new Schema({
	principal: {
		type: Boolean,
		default: false,
		required: true
	},
	numero: { type: String, required: true }
});

module.exports = telefoneSchema;
