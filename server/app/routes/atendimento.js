const controller = require('../controllers/atendimento');

module.exports = (app) => {

	app.get('/api/atendimento/aluno/:alunoId', controller.list);
	app.get('/api/atendimento/professor/:professorId', controller.list);

	app.route('/api/atendimento')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/atendimento/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
}