const express = require('express');
const router = express.Router();

const walletController = require('../controllers/wallet.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/:partner_id', authMiddleware, walletController.getWallet);
router.get('/:partner_id/transactions', authMiddleware, walletController.getTransactionHistory);

module.exports = router;