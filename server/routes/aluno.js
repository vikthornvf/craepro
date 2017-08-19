module.exports = function(app) {

	var controller = app.controllers.aluno;

	app.route('/aluno')
		.get(controller.list)
		.post(controller.add);

	app.route('/aluno/:id')
		.get(controller.findById)
		.put(controller.update)
		.delete(controller.deleteById);
}