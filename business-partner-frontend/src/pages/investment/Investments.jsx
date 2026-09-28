import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import InvestmentTable from '../../components/investment/InvestmentTable';
import InvestmentSummary from '../../components/investment/InvestmentSummary';
import Loader from '../../components/common/Loader';
import businessService from '../../services/businessService';
import investmentService from '../../services/investmentService';

const Investments = () => {
  const [businesses, setBusinesses] = useState([]);
  const [businessId, setBusinessId] = useState('');
  const [investments, setInvestments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const fetchInvestments = useCallback(async () => {
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
  }, [businessId]);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInvestments();
  }, [fetchInvestments]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Investments</h1>
          <p className="text-[#9aa0b4] text-[13.5px] mt-1">View investments by business</p>
        </div>

        <Link
          to="/investments/add"
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg text-[13.5px] font-medium hover:opacity-90 shadow-lg shadow-indigo-500/25"
        >
          <Plus size={17} />
          Add Investment
        </Link>
      </div>

      <div className="max-w-xs mb-6">
        <label className="block text-[13px] font-medium text-[#9aa0b4] mb-1.5">Select Business</label>
        <select
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)}
          className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[13.5px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {businesses.length === 0 && <option value="" className="bg-[#12151c]">No businesses found</option>}
          {businesses.map((b) => (
            <option key={b.id} value={b.id} className="bg-[#12151c]">
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loader />}

      {!loading && error && (
        <div className="bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[13.5px] p-3 rounded-lg mb-4">{error}</div>
      )}

      {!loading && businessId && !error && (
        <>
          <div className="mb-4 max-w-xs">
            <InvestmentSummary total={total} />
          </div>
          <div className="glass p-5 rounded-2xl">
            <InvestmentTable investments={investments} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Investments;