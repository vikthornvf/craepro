const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const jwt = require('jsonwebtoken');

module.exports = {

	auth(req, res) {
		Usuario.findOne({ nome: req.body.nome })
			.populate('escola')
			.then((usuario) => {
				if (usuario) {
					usuario.verifyPassword(req.body.senha, (err, valid) => {
						if (err) console.log(err);
						if (!valid) res.json({
							success: false,
							message: 'Falha na autenticação. Senha incorreta.'
						});
						else {
							const payload = {
								admin: usuario.admin,
								escola: usuario.escola
							}

							var token = jwt.sign(payload, app.get('superSecret'), {
								expiresInMinutes: 1440
							});

							res.json({
								success: true,
								message: 'Autenticado com sucesso.',
								token: token
							});
						}
					});
				}
				res.json({
					success: false,
					message: 'Falha na autenticação. Usuário não encontrado.'
				});
			});
	},

	list(req, res) {
		Usuario.find({})
			.then((result) => {
				res.json(result);
			},
			err => {
				console.log(err);
				res.status(500).json(err);
			});
	},

	add(req, res) {
		Usuario.create(req.body)
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