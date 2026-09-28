import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import investmentService from '../../services/investmentService';

const AddInvestment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ business_id: '', partner_id: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await investmentService.addInvestment(formData);
      navigate('/investments');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add investment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-white mb-6">Add Investment</h1>

      <div className="max-w-lg glass p-6 rounded-2xl">
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[13.5px] p-3 rounded-lg mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Business ID"
            name="business_id"
            value={formData.business_id}
            onChange={handleChange}
            placeholder="Enter business ID"
            required
          />
          <Input
            label="Partner ID"
            name="partner_id"
            value={formData.partner_id}
            onChange={handleChange}
            placeholder="Enter partner ID"
            required
          />
          <Input
            label="Amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g. 5000"
            required
          />
          <Button type="submit" loading={loading}>
            Add Investment
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddInvestment;