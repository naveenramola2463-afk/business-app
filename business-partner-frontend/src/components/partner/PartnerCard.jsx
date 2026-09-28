import { User } from 'lucide-react';

const PartnerCard = ({ partner }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
        <User size={18} className="text-purple-600" />
      </div>
      <div>
        <p className="font-medium text-gray-800 text-sm">{partner.name}</p>
        <p className="text-xs text-gray-500">{partner.email}</p>
      </div>
    </div>
  );
};

export default PartnerCard;