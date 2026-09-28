import { useState, useCallback } from 'react';
import profitService from '../services/profitService';

const useProfit = () => {
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfits = useCallback(async (businessId) => {
    if (!businessId) return;
    try {
      setLoading(true);
      setError('');
      const data = await profitService.getProfitsByBusiness(businessId);
      setProfits(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profit history');
    } finally {
      setLoading(false);
    }
  }, []);

  return { profits, loading, error, fetchProfits };
};

export default useProfit;