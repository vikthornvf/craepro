var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'senha'
	},
	function(username, password, done) {
		Usuario.findOne({ email: username }, function (err, usuario) {
			if (err) {
				return done(err);
			}
			if (!usuario) {
				return done(null, false, { message: 'Usuário não existe' });
			}
			if (!usuario.validPassword(password)) {
				return done(null, false, { message: 'Senha incorreta' });
			}
			if (usuario.solicitado) {
				return done(null, false, { message: 'Usuário ainda não verificado, por favor, aguarde' });
			}
			return done(null, usuario);
		});
	}
));