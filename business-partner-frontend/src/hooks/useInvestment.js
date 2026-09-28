import { useState, useCallback } from 'react';
import investmentService from '../services/investmentService';

const useInvestment = () => {
  const [investments, setInvestments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchInvestments = useCallback(async (businessId) => {
    if (!businessId) return;
    try {
      setLoading(true);
      setError('');
      const data = await investmentService.getInvestmentsByBusiness(businessId);
      setInvestments(data.investments);
      setTotal(data.total_investment);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load investments');
    } finally {
      setLoading(false);
    }
  }, []);

  return { investments, total, loading, error, fetchInvestments };
};

export default useInvestment;