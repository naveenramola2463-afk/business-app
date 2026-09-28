import api from './api';

const createProfit = async (data) => {
  const response = await api.post('/profits', data);
  return response.data.data;
};

const getProfitsByBusiness = async (businessId) => {
  const response = await api.get(`/profits/business/${businessId}`);
  return response.data.data;
};

const getProfitDetails = async (profitId) => {
  const response = await api.get(`/profits/${profitId}`);
  return response.data.data;
};

export default {
  createProfit,
  getProfitsByBusiness,
  getProfitDetails
};