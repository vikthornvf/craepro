module.exports = function(app) {

        var controller = app.controllers.aluno;

        app.route('/')
            .get(controller.list)
            .post(controller.add);
    }