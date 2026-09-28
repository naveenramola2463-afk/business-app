const profitService = require('../services/profit.service');
const { successResponse, errorResponse } = require('../utils/response');

// Naya profit create karo aur distribute karo
const createProfit = async (req, res) => {
  try {
    const { business_id, total_amount, type, remarks } = req.body;
    const result = await profitService.createProfitAndDistribute({
      business_id,
      total_amount,
      type,
      remarks
    });
    return successResponse(res, 201, 'Profit created and distributed successfully', result);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

// Business ki saari profit history dikhao
const getProfitsByBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;
    const profits = await profitService.getProfitsByBusiness(business_id, req.user);
    return successResponse(res, 200, 'Profit history fetched successfully', profits);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

// Ek profit ki poori distribution details dikhao
const getProfitDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await profitService.getProfitDetails(id);
    return successResponse(res, 200, 'Profit details fetched successfully', result);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

module.exports = {
  createProfit,
  getProfitsByBusiness,
  getProfitDetails
};