import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import WalletBalance from '../../components/wallet/WalletBalance';
import Loader from '../../components/common/Loader';
import businessService from '../../services/businessService';
import partnerService from '../../services/partnerService';
import walletService from '../../services/walletService';

const Wallet = () => {
  const [businesses, setBusinesses] = useState([]);
  const [businessId, setBusinessId] = useState('');
  const [partners, setPartners] = useState([]);
  const [partnerId, setPartnerId] = useState('');
  const [wallet, setWallet] = useState(null);
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
      const data = await partnerService.getPartnersByBusiness(businessId);
      setPartners(data);
      if (data.length > 0) setPartnerId(data[0].partner_id);
      else setPartnerId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load partners');
    }
  }, [businessId]);

  useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPartners();
  }, [fetchPartners]);

  const fetchWallet = useCallback(async () => {
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
  }, [partnerId]);

  useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchWallet();
  }, [fetchWallet]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-white mb-6">Wallet</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="max-w-xs w-full">
          <label className="block text-[13px] font-medium text-[#9aa0b4] mb-1.5">Select Business</label>
          <select
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[13.5px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {businesses.map((b) => (
              <option key={b.id} value={b.id} className="bg-[#12151c]">
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="max-w-xs w-full">
          <label className="block text-[13px] font-medium text-[#9aa0b4] mb-1.5">Select Partner</label>
          <select
            value={partnerId}
            onChange={(e) => setPartnerId(e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[13.5px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {partners.length === 0 && <option value="" className="bg-[#12151c]">No partners found</option>}
            {partners.map((p) => (
              <option key={p.partner_id} value={p.partner_id} className="bg-[#12151c]">
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && error && (
        <div className="bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[13.5px] p-3 rounded-lg mb-4">{error}</div>
      )}

      {!loading && wallet && (
        <div className="max-w-sm mb-6">
          <WalletBalance balance={wallet.balance} />
        </div>
      )}

      {wallet && partnerId && (
        <Link
          to={`/wallet/transactions?partner_id=${partnerId}`}
          className="text-indigo-400 text-[13px] font-medium hover:text-indigo-300"
        >
          View Transaction History →
        </Link>
      )}
    </DashboardLayout>
  );
};

export default Wallet;