import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import EmptyState from '../common/EmptyState';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TransactionTable = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <EmptyState message="No transactions found" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-[#5a6172] border-b border-white/[0.08]">
            <th className="py-2 pr-4 font-medium">Type</th>
            <th className="py-2 pr-4 font-medium">Description</th>
            <th className="py-2 pr-4 font-medium">Amount</th>
            <th className="py-2 pr-4 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b border-white/[0.05]">
              <td className="py-3 pr-4">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full capitalize border ${
                    t.type === 'credit'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                  }`}
                >
                  {t.type === 'credit' ? (
                    <ArrowUpRight size={11} />
                  ) : (
                    <ArrowDownRight size={11} />
                  )}
                  {t.type}
                </span>
              </td>
              <td className="py-3 pr-4 text-[#9aa0b4]">{t.description || '-'}</td>
              <td
                className={`py-3 pr-4 font-medium tabular ${
                  t.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {t.type === 'credit' ? '+' : '-'}
                {formatCurrency(t.amount)}
              </td>
              <td className="py-3 pr-4 text-[#5a6172]">{formatDate(t.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;