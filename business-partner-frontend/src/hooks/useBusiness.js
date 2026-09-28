import { useState, useCallback } from 'react';
import businessService from '../services/businessService';

const useBusiness = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await businessService.getAllBusiness();
      setBusinesses(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load businesses');
    } finally {
      setLoading(false);
    }
  }, []);

  return { businesses, loading, error, fetchBusinesses };
};

export default useBusiness;