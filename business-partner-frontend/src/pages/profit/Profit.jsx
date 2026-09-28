import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProfitHistory from '../../components/profit/ProfitHistory';
import Loader from '../../components/common/Loader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import businessService from '../../services/businessService';
import profitService from '../../services/profitService';

const Profit = () => {
  const [businesses, setBusinesses] = useState([]);
  const [businessId, setBusinessId] = useState('');
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({ total_amount: '', type: 'profit', remarks: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const loadBusinesses = async () => {
      try {
        const data = await businessService.getAllBusiness();
        setBusinesses(data);
        if (data.length > 0) setBusinessId(data[0].id);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load businesses');
      }
    };
    loadBusinesses();
  }, []);

  const fetchProfits = useCallback(async () => {
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
  }, [businessId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfits();
  }, [fetchProfits]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProfit = async (e) => {
    e.preventDefault();
    if (!businessId) {
      setError('Please select a business first');
      return;
    }

    setCreating(true);
    setError('');
    try {
      await profitService.createProfit({ ...formData, business_id: businessId });
      setFormData({ total_amount: '', type: 'profit', remarks: '' });
      fetchProfits();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create profit');
    } finally {
      setCreating(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-white mb-6">Profit Management</h1>

      <div className="max-w-xs mb-6">
        <label className="block text-[13px] font-medium text-[#9aa0b4] mb-1.5">Select Business</label>
        <select
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
          className="w-full px-3 py-2 bg-[#12151c] border border-white/[0.12] rounded-lg text-[13.5px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {businesses.length === 0 && <option value="" className="bg-[#12151c]">No businesses found</option>}
          {businesses.map((b) => (
            <option key={b.id} value={b.id} className="bg-[#12151c]">
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {businessId && (
        <div className="glass p-5 rounded-2xl mb-6 max-w-lg">
          <h2 className="font-semibold text-white text-[14.5px] mb-4">Create New Profit Entry</h2>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[13.5px] p-3 rounded-lg mb-4">{error}</div>
          )}

          <form onSubmit={handleCreateProfit}>
            <Input
              label="Total Amount"
              type="number"
              name="total_amount"
              value={formData.total_amount}
              onChange={handleChange}
              placeholder="e.g. 2000"
              required
            />

            <div className="mb-4">
              <label className="block text-[13px] font-medium text-[#9aa0b4] mb-1.5">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#12151c] border border-white/[0.12] rounded-lg text-[13.5px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="profit" className="bg-[#12151c]">Profit</option>
                <option value="loss" className="bg-[#12151c]">Loss</option>
              </select>
            </div>

            <Input
              label="Remarks (optional)"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="e.g. Q1 earnings"
            />

            <Button type="submit" loading={creating}>
              Create & Distribute Profit
            </Button>
          </form>
        </div>
      )}

      {loading && <Loader />}

      {!loading && businessId && (
        <div>
          <h2 className="font-semibold text-white text-[14.5px] mb-4">Profit History</h2>
          <ProfitHistory profits={profits} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Profit;