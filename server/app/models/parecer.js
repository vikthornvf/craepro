const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parecerSchema = new Schema({
    conteudo: String,
    lancamento: Date
});

parecerSchema.pre('save', function() {
    this.lancamento = new Date();
});

module.exports = parecerSchema;