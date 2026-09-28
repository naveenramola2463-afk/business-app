const partnerRequestRepository = require('../repositories/partnerRequest.repository');
const partnerRepository = require('../repositories/partner.repository');
const businessRepository = require('../repositories/business.repository');

// User ne business join karne ki request bheji
const sendRequest = async ({ user_id, business_id }) => {
  const business = await businessRepository.getBusinessById(business_id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }

  // Check karo already partner toh nahi hai
  const existingPartner = await partnerRepository.findPartner(user_id, business_id);
  if (existingPartner) {
    const error = new Error('You are already a partner in this business');
    error.statusCode = 400;
    throw error;
  }

  // Check karo already pending request toh nahi hai
  const existingRequest = await partnerRequestRepository.findRequest(user_id, business_id);
  if (existingRequest) {
    const error = new Error('You already have a pending request for this business');
    error.statusCode = 400;
    throw error;
  }

  const requestId = await partnerRequestRepository.createRequest({ user_id, business_id });
  return await partnerRequestRepository.getRequestById(requestId);
};

// Business ke pending requests dikhao (sirf admin/creator ke liye)
const getPendingRequests = async (business_id, user) => {
  const business = await businessRepository.getBusinessById(business_id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }

  const isAdmin = user.role === 'admin';
  const isCreator = business.created_by === user.id;

  if (!isAdmin && !isCreator) {
    const error = new Error('You do not have permission to view requests for this business');
    error.statusCode = 403;
    throw error;
  }

  return await partnerRequestRepository.getPendingRequestsByBusiness(business_id);
};

// Request accept karo (partner bhi automatically ban jayega)
const respondToRequest = async (request_id, action, user) => {
  const request = await partnerRequestRepository.getRequestById(request_id);
  if (!request) {
    const error = new Error('Request not found');
    error.statusCode = 404;
    throw error;
  }

  const business = await businessRepository.getBusinessById(request.business_id);
  const isAdmin = user.role === 'admin';
  const isCreator = business.created_by === user.id;

  if (!isAdmin && !isCreator) {
    const error = new Error('You do not have permission to respond to this request');
    error.statusCode = 403;
    throw error;
  }

  if (request.status !== 'pending') {
    const error = new Error('This request has already been responded to');
    error.statusCode = 400;
    throw error;
  }

  const status = action === 'accept' ? 'accepted' : 'rejected';
  await partnerRequestRepository.updateRequestStatus(request_id, status);

  // Agar accept hua, toh partner table mein bhi add karo
  if (status === 'accepted') {
    await partnerRepository.addPartner({
      user_id: request.user_id,
      business_id: request.business_id
    });
  }

  return { request_id, status };
};

// User ki apni requests dikhao
const getMyRequests = async (user_id) => {
  return await partnerRequestRepository.getRequestsByUser(user_id);
};

module.exports = {
  sendRequest,
  getPendingRequests,
  respondToRequest,
  getMyRequests
};