const express = require('express');
const router = express.Router();

const businessController = require('../controllers/business.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validateCreateBusiness } = require('../validators/business.validator');

// Sab routes protected hain (login zaroori hai)
router.post('/', authMiddleware, validateCreateBusiness, businessController.createBusiness);
router.get('/', authMiddleware, businessController.getAllBusiness);
router.get('/:id', authMiddleware, businessController.getBusinessById);
router.put('/:id', authMiddleware, validateCreateBusiness, businessController.updateBusiness);
router.delete('/:id', authMiddleware, businessController.deleteBusiness);

module.exports = router;