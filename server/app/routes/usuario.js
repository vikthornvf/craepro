const controller = require('../controllers/usuario');

module.exports = (app) => {

	app.post('/api/login', controller.login)

	app.route('/api/usuario')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/usuario/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
}
