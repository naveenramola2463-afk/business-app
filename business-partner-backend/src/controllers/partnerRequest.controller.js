const partnerRequestService = require('../services/partnerRequest.service');
const { successResponse, errorResponse } = require('../utils/response');

const sendRequest = async (req, res) => {
  try {
    const { business_id } = req.body;
    const user_id = req.user.id;
    const request = await partnerRequestService.sendRequest({ user_id, business_id });
    return successResponse(res, 201, 'Request sent successfully', request);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const { business_id } = req.params;
    const requests = await partnerRequestService.getPendingRequests(business_id, req.user);
    return successResponse(res, 200, 'Pending requests fetched successfully', requests);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

const respondToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'accept' or 'reject'
    const result = await partnerRequestService.respondToRequest(id, action, req.user);
    return successResponse(res, 200, `Request ${result.status} successfully`, result);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await partnerRequestService.getMyRequests(req.user.id);
    return successResponse(res, 200, 'Your requests fetched successfully', requests);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

module.exports = {
  sendRequest,
  getPendingRequests,
  respondToRequest,
  getMyRequests
};