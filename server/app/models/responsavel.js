const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EnderecoSchema = require('./endereco');

const responsavelSchema = new Schema({
    nome: { type: String, required: true },
    parentesco: String,
    telefones: [{ type: String }],
    enderecos: [EnderecoSchema]
});

module.exports = responsavelSchema;