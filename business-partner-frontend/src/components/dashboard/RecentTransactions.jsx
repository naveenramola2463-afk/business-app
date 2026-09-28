import { Link } from 'react-router-dom';
import { Plus, PieChart as PieIcon, ArrowRight } from 'lucide-react';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

const RecentTransactions = ({ activities }) => {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm">◷</span>
          </div>
          <h3 className="text-[14.5px] font-semibold text-white">Recent Activity</h3>
        </div>
        <Link to="/business" className="flex items-center gap-1 text-[12.5px] text-indigo-400 hover:text-indigo-300">
          View All <ArrowRight size={13} />
        </Link>
      </div>

      {(!activities || activities.length === 0) ? (
        <div className="h-40 flex items-center justify-center text-[13px] text-[#5a6172]">
          No recent activity yet
        </div>
      ) : (
        <div className="space-y-1">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.05] last:border-0">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    a.type === 'investment' ? 'bg-emerald-500/15' : 'bg-indigo-500/15'
                  }`}
                >
                  {a.type === 'investment' ? (
                    <Plus size={15} className="text-emerald-400" />
                  ) : (
                    <PieIcon size={15} className="text-indigo-400" />
                  )}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-white">
                    {a.type === 'investment' ? 'Investment Added' : 'Profit Distributed'}
                  </p>
                  <p className="text-[11.5px] text-[#5a6172]">{a.businessName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-medium text-emerald-400 tabular">
                  + {formatCurrency(a.amount)}
                </p>
                <p className="text-[11px] text-[#5a6172]">{formatDate(a.date)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;