const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TelefoneSchema = require('./telefone_schema');
const EnderecoSchema = require('./endereco_schema');

const responsavelSchema = new Schema({
	nome: { type: String, required: true },
	parentesco: String,
	telefones: [TelefoneSchema],
	enderecos: [EnderecoSchema]
});

module.exports = responsavelSchema;
