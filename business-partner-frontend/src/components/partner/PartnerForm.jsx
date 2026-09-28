import { useState } from 'react';
import Button from '../common/Button';

const PartnerForm = ({ availableUsers, onSubmit, loading = false }) => {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) return;
    onSubmit({ user_id: userId });
    setUserId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block text-[13px] font-medium text-[#9aa0b4] mb-1.5">
          Select a user
        </label>

        {availableUsers.length === 0 ? (
          <p className="text-[13px] text-[#5a6172]">
            All registered users are already partners in this business.
          </p>
        ) : (
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[13.5px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" className="bg-[#12151c]">Choose a user…</option>
            {availableUsers.map((u) => (
              <option key={u.id} value={u.id} className="bg-[#12151c]">
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        )}
      </div>

      {availableUsers.length > 0 && (
        <Button type="submit" loading={loading}>
          Add as Partner
        </Button>
      )}
    </form>
  );
};

export default PartnerForm;