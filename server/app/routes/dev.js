module.exports = function(app) {

    app.get('/*', function(req, res) {

        res.format({
            html: function() {
                res.render('home/index', {
                    livros: result
                });
            }
        });
    });
}