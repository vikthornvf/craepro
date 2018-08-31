var passport = require('passport');

exports.login = function(req, res) {
	passport.authenticate('local', function(err, usuario, info) {
		var token;
		if (err) {
			res.status(404).json(err);
			return;
		}
		if (usuario) {
			token = usuario.generateJwt();
			res.status(200);
			res.json({
				"token" : token
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res);
};
