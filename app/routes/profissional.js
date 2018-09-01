const express = require('express');
const router = express.Router();
const controller = require('../controllers/profissional');

/**
 * GET list all
 * POST create new profissional
 */
router.route('/')
	.get(controller.list)
	.post(controller.add);

/**
 * GET find profissional by id
 * PUT update existing profissional
 * DELETE remove profissional by id
 */
router.route('/:id')
	.get(controller.findById)
	.put(controller.update)
	.delete(controller.deleteById);

module.exports = router;
