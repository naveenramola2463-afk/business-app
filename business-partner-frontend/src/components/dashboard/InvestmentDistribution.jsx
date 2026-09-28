import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import formatCurrency from '../../utils/formatCurrency';

const COLORS = ['#8b7bf7', '#4f8ff7', '#34d399', '#fbbf24', '#fb7185', '#22d3ee'];

const InvestmentDistribution = ({ businesses, selectedBusinessId, onSelectBusiness, data, total }) => {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-sm">◐</span>
          </div>
          <h3 className="text-[14.5px] font-semibold text-white">Investment Distribution</h3>
        </div>

        <select
          value={selectedBusinessId}
          onChange={(e) => onSelectBusiness(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-[12px] text-[#c8cdd6] focus:outline-none"
        >
          {businesses.map((b) => (
            <option key={b.id} value={b.id} className="bg-[#12151c]">
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {(!data || data.length === 0) ? (
        <div className="h-40 flex items-center justify-center text-[13px] text-[#5a6172]">
          No investments in this business yet
        </div>
      ) : (
        <>
          <div className="relative h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={78}
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-lg font-semibold text-white tabular">{formatCurrency(total)}</p>
              <p className="text-[11px] text-[#5a6172]">Total Investment</p>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {data.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-[12.5px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-[#c8cdd6]">{d.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-white">{d.percentage}%</span>
                  <span className="text-[#5a6172] tabular">{formatCurrency(d.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InvestmentDistribution;