const partnerService = require('../services/partner.service');
const { successResponse, errorResponse } = require('../utils/response');

const addPartner = async (req, res) => {
  try {
    const { user_id, business_id } = req.body;
    const partner = await partnerService.addPartner({ user_id, business_id });
    return successResponse(res, 201, 'Partner added successfully', partner);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

const getPartnersByBusiness = async (req, res) => {
  try {
    const { business_id } = req.params;
    const partners = await partnerService.getPartnersByBusiness(business_id, req.user);
    return successResponse(res, 200, 'Partners fetched successfully', partners);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

const removePartner = async (req, res) => {
  try {
    const { id } = req.params;
    await partnerService.removePartner(id);
    return successResponse(res, 200, 'Partner removed successfully');
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

const getAvailableUsers = async (req, res) => {
  try {
    const { business_id } = req.params;
    const users = await partnerService.getAvailableUsers(business_id);
    return successResponse(res, 200, 'Available users fetched successfully', users);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

module.exports = {
  addPartner,
  getPartnersByBusiness,
  removePartner,
  getAvailableUsers
};