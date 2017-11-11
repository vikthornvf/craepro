const controller = require('../controllers/escola');

module.exports = (app) => {

	app.route('/api/escola')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/escola/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
}