import formatCurrency from '../../utils/formatCurrency';
import { DollarSign } from 'lucide-react';

const ProfitSummary = ({ profit }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
          <DollarSign size={20} className="text-yellow-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 capitalize">{profit.type}</p>
          <p className="text-xl font-bold text-gray-800">
            {formatCurrency(profit.total_amount)}
          </p>
        </div>
      </div>
      {profit.remarks && (
        <p className="text-sm text-gray-500">{profit.remarks}</p>
      )}
    </div>
  );
};

export default ProfitSummary;