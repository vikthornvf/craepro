const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const atendimentoSchema = new Schema({
    encaminhamento: {
        type: Date,
        default: new Date(),
        required: true
    },
    inicio: Date,
    alta: Date,
    hora: String,
    dia: String,
    turno: String,
    tipo: { type: String, required: true },
    aluno: {
        type: Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true
    },
    professor: {
        type: Schema.Types.ObjectId,
        ref: 'Professor',
        required: true
    },
});

atendimentoSchema.virtual('status').get(function() {
    if (!this.alta) {
        return this.inicio
            ? 'Ativo'
            : 'Espera';
    }
    return 'Alta';
});

atendimentoSchema.pre('save', function(next) {
    const Aluno = mongoose.model('Aluno');
    const Professor = mongoose.model('Professor');

    Promise.all([
        Aluno.update(
            { _id: this.aluno._id },
            { $push: { atendimentos: this } }
        ),
        Professor.update(
            { _id: this.professor._id },
            { $push: { atendimentos: this } }
        )
    ])
    .then(() => next());
});

const Atendimento = mongoose.model('Atendimento', atendimentoSchema);
module.exports = Atendimento;
