const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parecerSchema = new Schema({
	texto: { type: String, required: true },
	data: {
		type: Date,
		default: new Date(),
		required: true
	},
	usuario: String
});

module.exports = parecerSchema;
