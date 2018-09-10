const express = require('express');
const router = express.Router();
const controller = require('../controllers/aluno');

/**
 * GET list all
 * POST add new aluno
 */
router.route('/')
	.get(controller.list)
	.post(controller.create);

/**
 * GET find aluno by id
 * PUT update existing aluno
 * DELETE remove aluno by id
 */
router.route('/:id')
	.get(controller.findById)
	.put(controller.update)
	.delete(controller.deleteById);

module.exports = router;
