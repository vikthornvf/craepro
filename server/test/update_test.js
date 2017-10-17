const assert = require('assert');
const Aluno = require('../app/models/aluno');

describe('Atualiza alunos', () => {
    let aluno;

    beforeEach((done) => {
        aluno = new Aluno({nome:'Joao'});
        aluno.save()
            .then(() => done());
    });

    function assertNome(operation, done) {
        operation
        .then(() => Aluno.find({}))
        .then((alunos) => {
            assert(alunos.length === 1);
            assert(alunos[0].nome === 'Pedro');
            done();
        });
    }

    it('atualizacao pela instancia de aluno utilizando set e save', (done) => {
        aluno.set('nome', 'Pedro');
        assertNome(aluno.save(), done);
    });

    it('atualizacao pela instancia do modelo', (done) => {
        assertNome(aluno.update({nome:'Pedro'}), done);
    });

    it('metodo de classe (schema) update', (done) => {
        assertNome(
            Aluno.update({nome:'Joao'}, {nome:'Pedro'}),
            done
        );
    });

    it('metodo de classe (schema) findOneAndUpdate', (done) => {
        assertNome(
            Aluno.findOneAndUpdate({nome:'Joao'}, {nome:'Pedro'}),
            done
        );
    });

    it('metodo de classe (schema) findByIdAndUpdate', (done) => {
        assertNome(
            Aluno.findByIdAndUpdate(aluno._id, {nome:'Pedro'}),
            done
        );
    });
});