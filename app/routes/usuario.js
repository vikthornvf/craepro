const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario');

/**
 * GET list all
 * POST add new usuario
 */
router.get('/solicitado', controller.listSolicitado);

/**
 * GET list all
 * POST add new usuario
 */
router.route('/')
	.get(controller.list)
	.post(controller.add);

/**
 * GET find usuario by id
 * PUT update existing usuario
 * DELETE remove usuario by id
 */
router.route('/:id')
	.get(controller.findById)
	.put(controller.update)
	.delete(controller.deleteById);

module.exports = router;