import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import EmptyState from '../common/EmptyState';

const InvestmentTable = ({ investments }) => {
  if (!investments || investments.length === 0) {
    return <EmptyState message="No investments recorded yet" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-[#5a6172] border-b border-white/[0.08]">
            <th className="py-2 pr-4 font-medium">Partner</th>
            <th className="py-2 pr-4 font-medium">Amount</th>
            <th className="py-2 pr-4 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv) => (
            <tr key={inv.id} className="border-b border-white/[0.05]">
              <td className="py-3 pr-4 text-[#e8eaee]">{inv.partner_name}</td>
              <td className="py-3 pr-4 text-white font-medium tabular">
                {formatCurrency(inv.amount)}
              </td>
              <td className="py-3 pr-4 text-[#5a6172]">{formatDate(inv.invested_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentTable;