const assert = require('assert');
const Aluno = require('../app/models/aluno');

describe('Reading users', (done) => {
    let aluno;

    beforeEach((done) => {
        aluno = new Aluno({nome:'Joao'});
        aluno.save()
            .then(() => done());
    });

    it('finds all alunos named Joao', (done) => {
        Aluno.find({nome:'Joao'})
            .then((alunos) => {
                assert(alunos[0]._id.toString() === aluno._id.toString());
                done();
            });
    });

    it('find aluno with a particular id', (done) => {
        Aluno.findOne({_id:aluno._id})
            .then((aluno) => {
                assert(aluno.nome === 'Joao');
                done();
            });
    });
});