import { Link } from 'react-router-dom';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import EmptyState from '../common/EmptyState';

const ProfitHistory = ({ profits }) => {
  if (!profits || profits.length === 0) {
    return <EmptyState message="No profit history yet" />;
  }

  return (
    <div className="space-y-2">
      {profits.map((p) => (
        <Link
          key={p.id}
          to={`/profit/${p.id}`}
          className="flex items-center justify-between glass p-4 rounded-xl hover:bg-white/[0.05] transition-colors"
        >
          <div>
            <p className="font-medium text-white text-[13.5px] capitalize">{p.type}</p>
            <p className="text-[11.5px] text-[#5a6172]">{formatDate(p.created_at)}</p>
          </div>
          <p className="font-semibold text-white tabular">{formatCurrency(p.total_amount)}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProfitHistory;