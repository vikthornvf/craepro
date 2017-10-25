const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const escolaSchema = new Schema({
    nome: String,
});

const Escola = mongoose.model('escola');
module.exports = Escola;