import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ProfitSummary from '../../components/profit/ProfitSummary';
import ProfitDistributionTable from '../../components/profit/ProfitDistributionTable';
import Loader from '../../components/common/Loader';
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
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profit Details</h1>

      <div className="max-w-sm mb-6">
        <ProfitSummary profit={profit} />
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Distribution Breakdown</h2>
        <ProfitDistributionTable distribution={distribution} />
      </div>
    </DashboardLayout>
  );
};

export default ProfitDetails;