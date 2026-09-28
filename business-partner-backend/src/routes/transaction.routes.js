const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transaction.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/:partner_id', authMiddleware, transactionController.getTransactionsByPartnerId);

module.exports = router;