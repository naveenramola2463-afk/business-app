import formatCurrency from '../../utils/formatCurrency';
import { TrendingUp } from 'lucide-react';

const InvestmentSummary = ({ total }) => {
  return (
    <div className="glass p-5 rounded-2xl flex items-center gap-4">
      <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
        <TrendingUp size={19} className="text-emerald-400" />
      </div>
      <div>
        <p className="text-[12.5px] text-[#9aa0b4]">Total Investment</p>
        <p className="text-xl font-semibold text-white tabular">{formatCurrency(total)}</p>
      </div>
    </div>
  );
};

export default InvestmentSummary;