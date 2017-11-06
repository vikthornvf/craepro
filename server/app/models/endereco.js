const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enderecoSchema = new Schema({
    rua: String,
    numero: String,
    bairro: String,
    cidade: String
});

module.exports = enderecoSchema;