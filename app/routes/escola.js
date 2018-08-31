const express = require('express');
const router = express.Router();
const controller = require('../controllers/escola');

/**
 * GET list all
 * POST add new escola
 */
router.route('/escola')
	.get(controller.list)
	.post(controller.add);

/**
 * GET find escola by id
 * PUT update existing escola
 * DELETE remove escola by id
 */
router.route('/escola/:id')
	.get(controller.findById)
	.put(controller.update)
	.delete(controller.deleteById);

module.exports = router;
