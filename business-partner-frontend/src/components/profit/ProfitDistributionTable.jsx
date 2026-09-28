import formatCurrency from '../../utils/formatCurrency';
import EmptyState from '../common/EmptyState';

const ProfitDistributionTable = ({ distribution }) => {
  if (!distribution || distribution.length === 0) {
    return <EmptyState message="No distribution data available" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-[#5a6172] border-b border-white/[0.08]">
            <th className="py-2 pr-4 font-medium">Partner</th>
            <th className="py-2 pr-4 font-medium">Share %</th>
            <th className="py-2 pr-4 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {distribution.map((d) => (
            <tr key={d.id} className="border-b border-white/[0.05]">
              <td className="py-3 pr-4 text-[#e8eaee]">{d.partner_name}</td>
              <td className="py-3 pr-4 text-[#9aa0b4] tabular">{d.share_percentage}%</td>
              <td className="py-3 pr-4 text-emerald-400 font-medium tabular">
                {formatCurrency(d.share_amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfitDistributionTable;