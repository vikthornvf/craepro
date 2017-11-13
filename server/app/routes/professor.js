const controller = require('../controllers/professor');

module.exports = (app) => {

	app.route('/api/professor')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/professor/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
}
