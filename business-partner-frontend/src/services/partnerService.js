import api from './api';

const addPartner = async (data) => {
  const response = await api.post('/partners', data);
  return response.data.data;
};

const getPartnersByBusiness = async (businessId) => {
  const response = await api.get(`/partners/business/${businessId}`);
  return response.data.data;
};

const removePartner = async (id) => {
  const response = await api.delete(`/partners/${id}`);
  return response.data;
};
const getAvailableUsers = async (businessId) => {
  const response = await api.get(`/partners/available-users/${businessId}`);
  return response.data.data;
};



export default {
  addPartner,
  getPartnersByBusiness,
  removePartner,
  getAvailableUsers
};