import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import BusinessStatusBadge from './BusinessStatusBadge';

const BusinessCard = ({ business }) => {
  return (
    <Link
      to={`/business/${business.id}`}
      className="bg-[#12151c] border border-[#21252f] p-5 rounded-xl hover:border-[#2a2f3b] hover:bg-[#171b24] transition-colors block"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 bg-[#6c63ff]/10 rounded-lg flex items-center justify-center">
          <Building2 size={17} className="text-[#9d97ff]" />
        </div>
        <BusinessStatusBadge status="active" />
      </div>

      <h3 className="font-medium text-[#e8eaee] mb-1 text-[14.5px]">{business.name}</h3>
      <p className="text-[13px] text-[#5a6172] line-clamp-2">
        {business.description || 'No description provided'}
      </p>
    </Link>
  );
};

export default BusinessCard;