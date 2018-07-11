const controller = require('../controllers/profissional');

module.exports = (app) => {

	app.route('/api/profissional')
		.get(controller.list)
		.post(controller.add);

	app.route('/api/profissional/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
}
