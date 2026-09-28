import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import BusinessCard from '../../components/business/BusinessCard';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import businessService from '../../services/businessService';
import partnerRequestService from '../../services/partnerRequestService';
import useAuth from '../../hooks/useAuth';

const Businesses = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestingId, setRequestingId] = useState(null);

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await businessService.getAllBusiness();
      setBusinesses(data);

      if (user?.role !== 'admin') {
        const requests = await partnerRequestService.getMyRequests();
        setMyRequests(requests);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load businesses');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBusinesses();
  }, [fetchBusinesses]);

  const handleJoinRequest = async (businessId) => {
    setRequestingId(businessId);
    try {
      await partnerRequestService.sendRequest(businessId);
      fetchBusinesses();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send request');
    } finally {
      setRequestingId(null);
    }
  };

  const getRequestStatus = (businessId) => {
    const req = myRequests.find((r) => r.business_id === businessId);
    return req?.status;
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#e8eaee]">Businesses</h1>
          <p className="text-[#8890a0] text-[13.5px] mt-1">Manage all your partnership businesses</p>
        </div>

        <Link
          to="/business/create"
          className="flex items-center gap-2 bg-[#6c63ff] text-white px-4 py-2 rounded-md text-[13.5px] font-medium hover:bg-[#5a52e0]"
        >
          <Plus size={17} />
          New Business
        </Link>
      </div>

      {loading && <Loader />}

      {!loading && error && (
        <div className="bg-[#fb7185]/10 border border-[#fb7185]/25 text-[#fb7185] text-[13.5px] p-3 rounded-lg">{error}</div>
      )}

      {!loading && !error && businesses.length === 0 && (
        <EmptyState message="No businesses yet. Create your first one!" />
      )}

      {!loading && !error && businesses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {businesses.map((business) => (
            <div key={business.id} className="relative">
              <BusinessCard business={business} />
              {user?.role !== 'admin' && (
                <div className="mt-2">
                  {getRequestStatus(business.id) === 'pending' ? (
                    <span className="text-[12px] text-amber-400">Request pending…</span>
                  ) : getRequestStatus(business.id) === 'accepted' ? (
                    <span className="text-[12px] text-emerald-400">You're a partner</span>
                  ) : (
                    <button
                      onClick={() => handleJoinRequest(business.id)}
                      disabled={requestingId === business.id}
                      className="text-[12px] text-indigo-400 hover:text-indigo-300 font-medium disabled:opacity-50"
                    >
                      {requestingId === business.id ? 'Sending…' : 'Request to Join'}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Businesses;