import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InvestmentChart = ({ data }) => {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-sm">↗</span>
        </div>
        <h3 className="text-[14.5px] font-semibold text-white">Investment Overview</h3>
      </div>

      {(!data || data.length === 0) ? (
        <div className="h-56 flex items-center justify-center text-[13px] text-[#5a6172]">
          No investment data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={230}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="investGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#5a6172' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#5a6172' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#12151c', border: '1px solid #21252f', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#e8eaee' }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8b7bf7"
              strokeWidth={2.5}
              fill="url(#investGradient)"
              dot={{ r: 4, fill: '#8b7bf7', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default InvestmentChart;