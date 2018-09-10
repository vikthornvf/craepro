var passport = require('passport');

exports.login = (req, res) => {
	passport.authenticate('local', (err, usuario, info) => {
		var token;
		if (err) return res.status(404).json(err);
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
