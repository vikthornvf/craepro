const assert = require('assert');
const Aluno = require('../app/models/aluno');

describe('Criando registros', () => {
    it('salva um aluno', () => {
        const aluno = new Aluno({ nome: 'Joao' });
        aluno.save()
            .then(() => {
                assert(!aluno.isNew);
            });
    })
});