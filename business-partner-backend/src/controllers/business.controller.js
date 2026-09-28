const businessService = require('../services/business.service');
const { successResponse, errorResponse } = require('../utils/response');

// Naya business create karo
const createBusiness = async (req, res) => {
  try {
    const { name, description } = req.body;
    const created_by = req.user.id;

    const business = await businessService.createBusiness({ name, description, created_by });
    return successResponse(res, 201, 'Business created successfully', business);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

// Business list (admin: sab, user: sirf apne)
const getAllBusiness = async (req, res) => {
  try {
    const businesses = await businessService.getAllBusiness(req.user);
    return successResponse(res, 200, 'Business list fetched successfully', businesses);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

// Ek business detail mein dekho (access check ke saath)
const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await businessService.getBusinessByIdForUser(id, req.user);
    return successResponse(res, 200, 'Business fetched successfully', business);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

// Business update karo
const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const business = await businessService.updateBusiness(id, { name, description });
    return successResponse(res, 200, 'Business updated successfully', business);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

// Business delete karo
const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    await businessService.deleteBusiness(id);
    return successResponse(res, 200, 'Business deleted successfully');
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

module.exports = {
  createBusiness,
  getAllBusiness,
  getBusinessById,
  updateBusiness,
  deleteBusiness
};