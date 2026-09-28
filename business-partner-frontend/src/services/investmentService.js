import api from './api';

const addInvestment = async (data) => {
  const response = await api.post('/investments', data);
  return response.data.data;
};

const getInvestmentsByBusiness = async (businessId) => {
  const response = await api.get(`/investments/business/${businessId}`);
  return response.data.data;
};

export default {
  addInvestment,
  getInvestmentsByBusiness
};