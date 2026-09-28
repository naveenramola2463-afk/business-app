import api from './api';

const getWallet = async (partnerId) => {
  const response = await api.get(`/wallet/${partnerId}`);
  return response.data.data;
};

const getTransactionHistory = async (partnerId) => {
  const response = await api.get(`/wallet/${partnerId}/transactions`);
  return response.data.data;
};

export default {
  getWallet,
  getTransactionHistory
};