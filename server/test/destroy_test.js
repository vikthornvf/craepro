const assert = require('assert');
const Aluno = require('../app/models/aluno');

describe('Deleta alunos', () => {
   let aluno;

   beforeEach((done) => {
       aluno = new Aluno({nome:'Joao'});
       aluno.save()
           .then(() => done());
   });

   function assertNome(operation, done) {
       operation
           .then(() => Aluno.findOne({nome:'Joao'}))
           .then((aluno) => {
               assert(aluno === null);
               done();
           });
   }

   it('remocao pela instancia do modelo', (done) => {
       assertNome(aluno.remove(), done);
   });

   it('metodo de classe (schema) remove', (done) => {
       assertNome(
           Aluno.remove({nome:'Joao'}),
           done
       );
   });

   it('metodo de classe (schema) findAndRemove', (done) => {
       assertNome(
           Aluno.findOneAndRemove({nome:'Joao'}),
           done
       );
   });

   it('metodo de classe (schema) findByIdAndRemove', (done) => {
       assertNome(
           Aluno.findByIdAndRemove(aluno._id),
           done
       );
   });
})