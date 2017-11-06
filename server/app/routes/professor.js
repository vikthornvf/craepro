module.exports = (app) => {

	var controller = app.controllers.professor;

	app.route('/professor')
		.get(controller.list)
		.post(controller.add);

	app.route('/professor/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
}