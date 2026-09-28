import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProfitDistributionTable from '../../components/profit/ProfitDistributionTable';
import Loader from '../../components/common/Loader';
import formatCurrency from '../../utils/formatCurrency';
import profitService from '../../services/profitService';

const ProfitDetails = () => {
  const { id } = useParams();
  const [profit, setProfit] = useState(null);
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const data = await profitService.getProfitDetails(id);
      setProfit(data.profit);
      setDistribution(data.distribution);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profit details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDetails();
  }, [fetchDetails]);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[13.5px] p-3 rounded-lg">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-white mb-6">Profit Details</h1>

      <div className="max-w-sm mb-6 glass p-5 rounded-2xl">
        <p className="text-[12.5px] text-[#9aa0b4] capitalize">{profit.type}</p>
        <p className="text-xl font-semibold text-white tabular">{formatCurrency(profit.total_amount)}</p>
        {profit.remarks && <p className="text-[13px] text-[#5a6172] mt-2">{profit.remarks}</p>}
      </div>

      <div className="glass p-5 rounded-2xl">
        <h2 className="font-semibold text-white text-[14.5px] mb-4">Distribution Breakdown</h2>
        <ProfitDistributionTable distribution={distribution} />
      </div>
    </DashboardLayout>
  );
};

export default ProfitDetails;