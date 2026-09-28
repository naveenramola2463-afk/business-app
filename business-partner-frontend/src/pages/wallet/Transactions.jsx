import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import TransactionTable from '../../components/wallet/TransactionTable';
import TransactionFilter from '../../components/wallet/TransactionFilter';
import Loader from '../../components/common/Loader';
import walletService from '../../services/walletService';

const Transactions = () => {
  const [searchParams] = useSearchParams();
  const [partnerId] = useState(searchParams.get('partner_id') || '');
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTransactions = useCallback(async () => {
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
  }, [partnerId]);

  useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
  }, [fetchTransactions]);

  const filteredTransactions =
    filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-white mb-6">Transaction History</h1>

      {loading && <Loader />}

      {!loading && error && (
        <div className="bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[13.5px] p-3 rounded-lg mb-4">{error}</div>
      )}

      {!loading && !error && (
        <div className="glass p-5 rounded-2xl">
          <TransactionFilter filter={filter} onFilterChange={setFilter} />
          <TransactionTable transactions={filteredTransactions} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Transactions;