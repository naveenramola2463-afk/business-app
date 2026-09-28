const express = require('express');
const router = express.Router();

const profitController = require('../controllers/profit.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validateCreateProfit } = require('../validators/profit.validator');

router.post('/', authMiddleware, validateCreateProfit, profitController.createProfit);
router.get('/business/:business_id', authMiddleware, profitController.getProfitsByBusiness);
router.get('/:id', authMiddleware, profitController.getProfitDetails);

module.exports = router;