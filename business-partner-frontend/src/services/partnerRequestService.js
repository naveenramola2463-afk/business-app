import api from './api';

const sendRequest = async (business_id) => {
  const response = await api.post('/partner-requests', { business_id });
  return response.data.data;
};

const getPendingRequests = async (businessId) => {
  const response = await api.get(`/partner-requests/business/${businessId}`);
  return response.data.data;
};

const respondToRequest = async (requestId, action) => {
  const response = await api.patch(`/partner-requests/${requestId}/respond`, { action });
  return response.data.data;
};

const getMyRequests = async () => {
  const response = await api.get('/partner-requests/my-requests');
  return response.data.data;
};

export default {
  sendRequest,
  getPendingRequests,
  respondToRequest,
  getMyRequests
};