const walletService = require('../services/wallet.service');
const { successResponse, errorResponse } = require('../utils/response');

const getWallet = async (req, res) => {
  try {
    const { partner_id } = req.params;
    const wallet = await walletService.getWalletByPartnerId(partner_id, req.user);
    return successResponse(res, 200, 'Wallet fetched successfully', wallet);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const { partner_id } = req.params;
    const transactions = await walletService.getTransactionHistory(partner_id, req.user);
    return successResponse(res, 200, 'Transaction history fetched successfully', transactions);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

module.exports = {
  getWallet,
  getTransactionHistory
};