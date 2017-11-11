const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parecerSchema = new Schema({
    conteudo: { type:String, required: true },
    lancamento: {
        type: Date,
        default: new Date(),
        required: true
    }
});

module.exports = parecerSchema;