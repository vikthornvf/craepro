const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parecerSchema = new Schema({
	dia: { type: Number },
	hora: { type: String }
});

module.exports = parecerSchema;
