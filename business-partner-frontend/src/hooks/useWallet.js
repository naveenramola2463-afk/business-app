import { useState, useCallback } from 'react';
import walletService from '../services/walletService';

const useWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWallet = useCallback(async (partnerId) => {
    if (!partnerId) return;
    try {
      setLoading(true);
      setError('');
      const data = await walletService.getWallet(partnerId);
      setWallet(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load wallet');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async (partnerId) => {
    if (!partnerId) return;
    try {
      setLoading(true);
      setError('');
      const data = await walletService.getTransactionHistory(partnerId);
      setTransactions(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  return { wallet, transactions, loading, error, fetchWallet, fetchTransactions };
};

export default useWallet;