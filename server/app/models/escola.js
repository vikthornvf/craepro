const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TelefoneSchema = require('./telefone_schema');
const EnderecoSchema = require('./endereco_schema');

const escolaSchema = new Schema({
    nome: { type: String, required: true },
    telefones: [TelefoneSchema],
    endereco: EnderecoSchema
});

const Escola = mongoose.model('Escola', escolaSchema);
module.exports = Escola;
