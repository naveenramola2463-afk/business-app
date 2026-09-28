const investmentService = require('../services/investment.service');
const { successResponse, errorResponse } = require('../utils/response');

// Nayi investment add karo
const addInvestment = async (req, res) => {
  try {
    const { partner_id, business_id, amount } = req.body;
    const investment = await investmentService.addInvestment({ partner_id, business_id, amount });
    return successResponse(res, 201, 'Investment added successfully', investment);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

// Business ki saari investments dikhao
const getInvestmentsByBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;
    const result = await investmentService.getInvestmentsByBusiness(business_id, req.user);
    return successResponse(res, 200, 'Investments fetched successfully', result);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

module.exports = {
  addInvestment,
  getInvestmentsByBusiness
};