import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, gradient, trend }) => {
  return (
    <div className="relative overflow-hidden glass rounded-2xl p-5">
      <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${gradient}`} />

      <div className="relative flex items-center gap-3.5">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon size={19} className="text-white" />
        </div>
        <div>
          <p className="text-[12.5px] text-[#9aa0b4]">{title}</p>
          <p className="text-xl font-semibold text-white tabular">{value}</p>
        </div>
      </div>

      {trend && (
        <p
          className={`relative mt-3 text-[12px] flex items-center gap-1 ${
            trend.value === '—'
              ? 'text-[#5a6172]'
              : trend.positive
              ? 'text-emerald-400'
              : 'text-rose-400'
          }`}
        >
          {trend.value !== '—' && (trend.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />)}
          {trend.value}
          <span className="text-[#5a6172]">this month</span>
        </p>
      )}
    </div>
  );
};

export default StatCard;