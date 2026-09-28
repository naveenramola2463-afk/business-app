import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PartnerTable from '../../components/partner/PartnerTable';
import Loader from '../../components/common/Loader';
import businessService from '../../services/businessService';
import partnerService from '../../services/partnerService';

const Partners = () => {
  const [businesses, setBusinesses] = useState([]);
  const [businessId, setBusinessId] = useState('');
  const [partners, setPartners] = useState([]);
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

  const fetchPartners = useCallback(async () => {
    if (!businessId) return;
    try {
      setLoading(true);
      setError('');
      const data = await partnerService.getPartnersByBusiness(businessId);
      setPartners(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load partners');
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPartners();
  }, [fetchPartners]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-white mb-6">Partners</h1>

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
        <div className="glass p-5 rounded-2xl">
          <PartnerTable partners={partners} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Partners;