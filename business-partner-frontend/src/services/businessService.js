import api from './api';

const getAllBusiness = async () => {
  const response = await api.get('/business');
  return response.data.data;
};

const getBusinessById = async (id) => {
  const response = await api.get(`/business/${id}`);
  return response.data.data;
};

const createBusiness = async (data) => {
  const response = await api.post('/business', data);
  return response.data.data;
};

const updateBusiness = async (id, data) => {
  const response = await api.put(`/business/${id}`, data);
  return response.data.data;
};

const deleteBusiness = async (id) => {
  const response = await api.delete(`/business/${id}`);
  return response.data;
};

export default {
  getAllBusiness,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness
};