// Investment ke ratio ke hisaab se profit distribute karta hai
// investments = [{ partner_id: 1, amount: 5000 }, { partner_id: 2, amount: 3000 }]
// totalProfit = 2000
const calculateProfitDistribution = (investments, totalProfit) => {
  // Total investment nikalo
  const totalInvestment = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);

  if (totalInvestment <= 0) {
    throw new Error('Total investment must be greater than 0');
  }

  // Har partner ka share percentage aur amount calculate karo
  const distribution = investments.map((inv) => {
    const percentage = (Number(inv.amount) / totalInvestment) * 100;
    const shareAmount = (Number(inv.amount) / totalInvestment) * totalProfit;

    return {
      partner_id: inv.partner_id,
      share_percentage: Number(percentage.toFixed(2)),
      share_amount: Number(shareAmount.toFixed(2))
    };
  });

  return distribution;
};

module.exports = {
  calculateProfitDistribution
};