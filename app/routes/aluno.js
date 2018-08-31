const express = require('express');
const router = express.Router();
const controller = require('../controllers/aluno');

/**
 * GET list all
 * POST add new aluno
 */
router.route('/aluno')
	.get(controller.list)
	.post(controller.create);

/**
 * GET find aluno by id
 * PUT update existing aluno
 * DELETE remove aluno by id
 */
router.route('/aluno/:id')
	.get(controller.findById)
	.put(controller.update)
	.delete(controller.deleteById);

/**
 * PUT updates specific field of aluno by id
 */
router.put('/aluno/situacao/:id', controller.updateSituacao)

module.exports = router;