const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const escolaSchema = new Schema({
    nome: String,
});

const Escola = mongoose.model('escola', escolaSchema);
module.exports = Escola;