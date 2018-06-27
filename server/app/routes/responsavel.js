const controller = require('../controllers/responsavel');

module.exports = (app) => {

	app.get('/api/responsavel/aluno/:alunoId', controller.list);

	app.route('/api/responsavel')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/responsavel/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
}
