import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import BusinessForm from '../../components/business/BusinessForm';
import businessService from '../../services/businessService';

const CreateBusiness = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);
    try {
      await businessService.createBusiness(formData);
      navigate('/business');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create business');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
            <h1 className="text-2xl font-semibold text-[#e8eaee] mb-6">Create New Business</h1>

      <div className="max-w-lg bg-[#12151c] border border-[#21252f] p-6 rounded-xl">
        {error && (
          <div className="bg-[#fb7185]/10 border border-[#fb7185]/25 text-[#fb7185] text-[13.5px] p-3 rounded-lg mb-4">{error}</div>
        )}
        <BusinessForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </DashboardLayout>
  );
};

export default CreateBusiness;