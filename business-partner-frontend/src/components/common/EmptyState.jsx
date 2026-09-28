import { Inbox } from 'lucide-react';

const EmptyState = ({ message = 'No data found' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center mb-3">
        <Inbox size={18} className="text-[#5a6172]" />
      </div>
      <p className="text-[#5a6172] text-[13px]">{message}</p>
    </div>
  );
};

export default EmptyState;