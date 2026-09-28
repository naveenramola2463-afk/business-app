const express = require('express');
const router = express.Router();

const investmentController = require('../controllers/investment.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { validateAddInvestment } = require('../validators/investment.validator');

router.post('/', authMiddleware, validateAddInvestment, investmentController.addInvestment);
router.get('/business/:business_id', authMiddleware, investmentController.getInvestmentsByBusiness);

module.exports = router;