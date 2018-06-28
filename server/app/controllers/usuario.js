const passport = require('passport');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const jwt = require('jsonwebtoken');

module.exports = {

	login(req, res) {
		passport.authenticate('local', function(err, usuario, info) {
			var token;
			if (err) {
				res.status(404).json(err);
				return;
			}
			if(usuario) {
				token = usuario.generateJwt();
				res.status(200);
				res.json({
					"token" : token
				});
			} else {
				res.status(401).json(info);
			}
		})(req, res);
	},

	list(req, res) {
		Usuario.find({})
			.populate('escola')
			.then((result) => {
				res.json(result);
			},
			err => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	add(req, res) {
		const usuario = new Usuario();
		usuario.nome = req.body.nome;
		usuario.email = req.body.email;
		usuario.tipo = req.body.tipo;
		usuario.escola = req.body.escola;
		usuario.permissoes = req.body.permissoes;
		usuario.solicitado = req.body.solicitado;
		usuario.setPassword(req.body.senha);

		Usuario.create(usuario)
			.then((result) => {
				res.json(result);
			},
			err => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	findById(req, res) {
		Usuario.findById(req.params.id)
			.then(function(result) {
				if (!result) throw Error('Usuário não encontrado.');
				res.json(result);
			},
			function(err) {
				console.log(err);
				res.status(404).json(err);
			});
	},

	update(req, res) {
		Usuario.findByIdAndUpdate(req.params.id, req.body)
			.then(function(result) {
				res.json(result);
			},
			function(err) {
				console.log(err);
				res.status(500).json(err);
			});
	},

	deleteById(req, res) {
		Usuario.remove({_id: req.params.id})
			.then(function() {
				res.sendStatus(204);
			},
			function(err) {
				console.log(err);
				res.status(500).json(err);
			});
	}
};
