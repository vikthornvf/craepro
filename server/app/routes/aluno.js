const controller = require('../controllers/aluno');

module.exports = (app) => {

	app.route('/api/aluno')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/aluno/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);

	app.put('/api/aluno/situacao/:id', controller.updateSituacao)
}
