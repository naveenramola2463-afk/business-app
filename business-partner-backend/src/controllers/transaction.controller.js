const transactionService = require('../services/transaction.service');
const { successResponse, errorResponse } = require('../utils/response');

const getTransactionsByPartnerId = async (req, res) => {
  try {
    const { partner_id } = req.params;
    const transactions = await transactionService.getTransactionsByPartnerId(partner_id);
    return successResponse(res, 200, 'Transactions fetched successfully', transactions);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

module.exports = {
  getTransactionsByPartnerId
};