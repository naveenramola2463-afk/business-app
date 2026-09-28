import { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const BusinessForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Business Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g. My Trading Business"
        required
      />

            <div className="mb-4">
        <label className="block text-[13px] font-medium text-[#8890a0] mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description about this business"
          rows={3}
          className="w-full px-3 py-2 bg-[#0f1117] border border-[#2a2f3b] rounded-md text-[13.5px] text-[#e8eaee] placeholder-[#5a6172] focus:outline-none focus:ring-1 focus:ring-[#6c63ff] focus:border-[#6c63ff]"
        />
      </div>

      <Button type="submit" loading={loading}>
        {initialData ? 'Update Business' : 'Create Business'}
      </Button>
    </form>
  );
};

export default BusinessForm;