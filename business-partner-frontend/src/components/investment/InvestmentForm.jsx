import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const InvestmentForm = ({ partners, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({ partner_id: '', amount: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ partner_id: '', amount: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Partner</label>
        <select
          name="partner_id"
          value={formData.partner_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a partner</option>
          {partners.map((p) => (
            <option key={p.partner_id} value={p.partner_id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

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
  );
};

export default InvestmentForm;