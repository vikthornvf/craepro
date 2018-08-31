const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enderecoSchema = new Schema({
	cidade: String,
	tipo: String,
	rua: String,
	numero: Number,
	bairro: String,
	complemento: String
});

module.exports = enderecoSchema;
