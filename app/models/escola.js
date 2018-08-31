const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EnderecoSchema = require('./endereco_schema');

const escolaSchema = new Schema({
	nome: { type: String, required: true },
	qtdAlunos: Number,
	telefones: [String],
	enderecos: [EnderecoSchema]
});

const Escola = mongoose.model('Escola', escolaSchema);
module.exports = Escola;
