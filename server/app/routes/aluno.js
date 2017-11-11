const controller = require('../controllers/aluno');

module.exports = (app) => {

	app.get('/api/aluno/escola/:escolaId', controller.list);
	app.get('/api/aluno/escola/:escolaId/desativados/:isDesativados', controller.list);

	app.route('/api/aluno')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/aluno/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
}