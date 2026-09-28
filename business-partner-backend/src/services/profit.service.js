const profitRepository = require('../repositories/profit.repository');
const investmentRepository = require('../repositories/investment.repository');
const walletRepository = require('../repositories/wallet.repository');
const transactionRepository = require('../repositories/transaction.repository');
const businessRepository = require('../repositories/business.repository');
const businessService = require('./business.service');
const { calculateProfitDistribution } = require('../utils/calculation');

// Naya profit create karo aur automatically distribute karo
const createProfitAndDistribute = async ({ business_id, total_amount, type, remarks }) => {
  const business = await businessRepository.getBusinessById(business_id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }

  const investments = await investmentRepository.getInvestmentsByBusiness(business_id);

  if (!investments || investments.length === 0) {
    const error = new Error('No investments found for this business, cannot distribute profit');
    error.statusCode = 400;
    throw error;
  }

  const investmentMap = {};
  investments.forEach((inv) => {
    if (!investmentMap[inv.partner_id]) {
      investmentMap[inv.partner_id] = 0;
    }
    investmentMap[inv.partner_id] += Number(inv.amount);
  });

  const investmentList = Object.keys(investmentMap).map((partner_id) => ({
    partner_id: Number(partner_id),
    amount: investmentMap[partner_id]
  }));

  const profitId = await profitRepository.createProfit({
    business_id,
    total_amount,
    type: type || 'profit',
    remarks
  });

  const distribution = calculateProfitDistribution(investmentList, Number(total_amount));

  await profitRepository.saveProfitDistribution(profitId, distribution);

  for (const dist of distribution) {
    let wallet = await walletRepository.getWalletByPartnerId(dist.partner_id);

    if (!wallet) {
      const walletId = await walletRepository.createWallet(dist.partner_id);
      wallet = { id: walletId, balance: 0 };
    }

    const newBalance = Number(wallet.balance) + Number(dist.share_amount);
    await walletRepository.updateBalance(wallet.id, newBalance);

    await transactionRepository.createTransaction({
      wallet_id: wallet.id,
      type: 'credit',
      amount: dist.share_amount,
      description: `Profit distribution from business ID ${business_id} (Profit ID: ${profitId})`
    });
  }

  const profit = await profitRepository.getProfitById(profitId);
  const distributionDetails = await profitRepository.getDistributionByProfitId(profitId);

  return {
    profit,
    distribution: distributionDetails
  };
};

// Business ki saari profit history dikhao (access check ke saath)
const getProfitsByBusiness = async (business_id, user) => {
  await businessService.getBusinessByIdForUser(business_id, user);
  return await profitRepository.getProfitsByBusiness(business_id);
};

// Ek profit ki poori distribution details dikhao
const getProfitDetails = async (profit_id) => {
  const profit = await profitRepository.getProfitById(profit_id);
  if (!profit) {
    const error = new Error('Profit entry not found');
    error.statusCode = 404;
    throw error;
  }

  const distribution = await profitRepository.getDistributionByProfitId(profit_id);
  return { profit, distribution };
};

module.exports = {
  createProfitAndDistribute,
  getProfitsByBusiness,
  getProfitDetails
};