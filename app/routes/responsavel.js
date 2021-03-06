const express = require('express');
const router = express.Router();
const controller = require('../controllers/responsavel');

/**
 * GET list responsavel by aluno
 */
router.get('/aluno/:alunoId', controller.list);

/**
 * GET list all
 * POST create new responsavel
 */
router.route('/')
	.get(controller.list)
	.post(controller.add);

/**
 * GET find responsavel by id
 * PUT update existing responsavel
 * DELETE remove responsavel by id
 */
router.route('/:id')
	.get(controller.findById)
	.put(controller.update)
	.delete(controller.deleteById);

module.exports = router;
