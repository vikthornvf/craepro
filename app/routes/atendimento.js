const express = require('express');
const router = express.Router();
const controller = require('../controllers/atendimento');

/**
 * GET list atendimento by aluno
 */
router.get('/atendimento/aluno/:alunoId', controller.list);

/**
 * GET list atendimento by profissional
 */
router.get('/atendimento/profissional/:profissionalId', controller.list);

/**
 * GET list all
 * POST add new atendimento
 */
router.route('/atendimento')
	.get(controller.list)
	.post(controller.add);

/**
 * GET find atendimento by id
 * PUT update existing atendimento
 * DELETE remove atendimento by id
 */
router.route('/atendimento/:id')
	.get(controller.findById)
	.put(controller.update)
	.delete(controller.deleteById);

module.exports = router;