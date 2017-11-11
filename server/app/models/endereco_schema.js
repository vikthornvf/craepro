const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enderecoSchema = new Schema({
    principal: {
        type: Boolean,
        default: false,
        required: true
    },
    rua: String,
    numero: String,
    bairro: String,
    cidade: String
});

module.exports = enderecoSchema;