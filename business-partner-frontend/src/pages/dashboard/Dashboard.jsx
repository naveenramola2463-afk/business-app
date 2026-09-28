import { useState, useEffect, useCallback } from 'react';
import useAuth from '../../hooks/useAuth';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Loader from '../../components/common/Loader';
import StatCard from '../../components/dashboard/StatCard';
import InvestmentChart from '../../components/dashboard/InvestmentChart';
import InvestmentDistribution from '../../components/dashboard/InvestmentDistribution';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import businessService from '../../services/businessService';
import investmentService from '../../services/investmentService';
import profitService from '../../services/profitService';
import formatCurrency from '../../utils/formatCurrency';
import { Building2, TrendingUp, DollarSign, Wallet as WalletIcon } from 'lucide-react';

const monthLabel = (date) => date.toLocaleString('en-US', { month: 'short' });

const computeTrend = (current, previous) => {
  if (previous === 0 && current === 0) return { value: '—', positive: true };
  if (previous === 0) return { value: '+100%', positive: true };
  const change = ((current - previous) / previous) * 100;
  return { value: `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`, positive: change >= 0 };
};

const Dashboard = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [investmentTrend, setInvestmentTrend] = useState(null);
  const [profitTrend, setProfitTrend] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [activities, setActivities] = useState([]);

  const [selectedBusinessId, setSelectedBusinessId] = useState('');
  const [distributionData, setDistributionData] = useState([]);
  const [distributionTotal, setDistributionTotal] = useState(0);

  const loadDistribution = useCallback(async (businessId) => {
    if (!businessId) return;
    try {
      const data = await investmentService.getInvestmentsByBusiness(businessId);
      const byPartner = {};
      data.investments.forEach((inv) => {
        byPartner[inv.partner_name] = (byPartner[inv.partner_name] || 0) + Number(inv.amount);
      });
      const total = Number(data.total_investment);
      const dist = Object.entries(byPartner).map(([name, amount]) => ({
        name,
        amount,
        percentage: total > 0 ? ((amount / total) * 100).toFixed(1) : 0
      }));
      setDistributionData(dist);
      setDistributionTotal(total);
    } catch {
      setDistributionData([]);
      setDistributionTotal(0);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const businessList = await businessService.getAllBusiness();
        setBusinesses(businessList);

        let investSum = 0;
        let profitSum = 0;
        const allInvestments = [];
        const allProfits = [];

        for (const b of businessList) {
          const investData = await investmentService.getInvestmentsByBusiness(b.id);
          investSum += Number(investData.total_investment);
          investData.investments.forEach((inv) =>
            allInvestments.push({ ...inv, businessName: b.name })
          );

          const profits = await profitService.getProfitsByBusiness(b.id);
          profits.forEach((p) => {
            profitSum += Number(p.total_amount);
            allProfits.push({ ...p, businessName: b.name });
          });
        }

        setTotalInvestment(investSum);
        setTotalProfit(profitSum);

        // ---- Monthly chart (last 6 months) ----
        const now = new Date();
        const months = [];
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: monthLabel(d), amount: 0 });
        }
        allInvestments.forEach((inv) => {
          const d = new Date(inv.invested_at);
          const key = `${d.getFullYear()}-${d.getMonth()}`;
          const bucket = months.find((m) => m.key === key);
          if (bucket) bucket.amount += Number(inv.amount);
        });
        setChartData(months);

        // ---- Trend: this month vs last month (investment) ----
        const thisMonthInv = months[months.length - 1].amount;
        const lastMonthInv = months[months.length - 2]?.amount || 0;
        setInvestmentTrend(computeTrend(thisMonthInv, lastMonthInv));

        // ---- Trend: profit this month vs last month ----
        const isSameMonth = (dateStr, offset) => {
          const d = new Date(dateStr);
          const ref = new Date(now.getFullYear(), now.getMonth() - offset, 1);
          return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
        };
        const thisMonthProfit = allProfits
          .filter((p) => isSameMonth(p.created_at, 0))
          .reduce((s, p) => s + Number(p.total_amount), 0);
        const lastMonthProfit = allProfits
          .filter((p) => isSameMonth(p.created_at, 1))
          .reduce((s, p) => s + Number(p.total_amount), 0);
        setProfitTrend(computeTrend(thisMonthProfit, lastMonthProfit));

        // ---- Recent activity feed ----
        const activityList = [
          ...allInvestments.map((inv) => ({
            type: 'investment',
            businessName: inv.businessName,
            amount: inv.amount,
            date: inv.invested_at
          })),
          ...allProfits.map((p) => ({
            type: 'profit',
            businessName: p.businessName,
            amount: p.total_amount,
            date: p.created_at
          }))
        ]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setActivities(activityList);

        // ---- Default distribution business ----
        if (businessList.length > 0) {
          setSelectedBusinessId(businessList[0].id);
          await loadDistribution(businessList[0].id, businessList);
        }
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [loadDistribution]);

  const handleSelectBusiness = (id) => {
    setSelectedBusinessId(id);
    loadDistribution(id, businesses);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{user?.name}</span> 👋
          </h1>
          <p className="text-[#9aa0b4] text-[13.5px] mt-1">
            Here's what's happening with your businesses today.
          </p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Businesses"
              value={businesses.length}
              icon={Building2}
              gradient="from-indigo-500 to-purple-600"
            />
            <StatCard
              title="Total Investment"
              value={formatCurrency(totalInvestment)}
              icon={TrendingUp}
              gradient="from-emerald-500 to-teal-600"
              trend={investmentTrend}
            />
            <StatCard
              title="Total Profit"
              value={formatCurrency(totalProfit)}
              icon={DollarSign}
              gradient="from-amber-500 to-orange-600"
              trend={profitTrend}
            />
            <StatCard
              title="Businesses You Manage"
              value={businesses.length}
              icon={WalletIcon}
              gradient="from-violet-500 to-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <InvestmentChart data={chartData} />
            </div>
            <div className="lg:col-span-1">
              <InvestmentDistribution
                businesses={businesses}
                selectedBusinessId={selectedBusinessId}
                onSelectBusiness={handleSelectBusiness}
                data={distributionData}
                total={distributionTotal}
              />
            </div>
            <div className="lg:col-span-1">
              <RecentTransactions activities={activities} />
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;