const investmentRepository = require('../repositories/investment.repository');
const partnerRepository = require('../repositories/partner.repository');
const businessRepository = require('../repositories/business.repository');
const businessService = require('./business.service');
const walletRepository = require('../repositories/wallet.repository');
const transactionRepository = require('../repositories/transaction.repository');

const addInvestment = async ({ partner_id, business_id, amount }) => {
  const partner = await partnerRepository.getPartnerById(partner_id);
  if (!partner) {
    const error = new Error('Partner not found');
    error.statusCode = 404;
    throw error;
  }

  const business = await businessRepository.getBusinessById(business_id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }

  if (partner.business_id !== Number(business_id)) {
    const error = new Error('This partner does not belong to the given business');
    error.statusCode = 400;
    throw error;
  }

  const investmentId = await investmentRepository.addInvestment({ partner_id, business_id, amount });
  const investment = await investmentRepository.getInvestmentById(investmentId);

  let wallet = await walletRepository.getWalletByPartnerId(partner_id);
  if (!wallet) {
    const walletId = await walletRepository.createWallet(partner_id);
    wallet = { id: walletId, balance: 0 };
  }

  const newBalance = Number(wallet.balance) + Number(amount);
  await walletRepository.updateBalance(wallet.id, newBalance);

  await transactionRepository.createTransaction({
    wallet_id: wallet.id,
    type: 'credit',
    amount: amount,
    description: `Investment added to business ID ${business_id}`
  });

  return investment;
};

// Ab access check ke saath
const getInvestmentsByBusiness = async (business_id, user) => {
  await businessService.getBusinessByIdForUser(business_id, user);

  const investments = await investmentRepository.getInvestmentsByBusiness(business_id);
  const total = await investmentRepository.getTotalInvestmentByBusiness(business_id);

  return {
    total_investment: Number(total),
    investments
  };
};

module.exports = {
  addInvestment,
  getInvestmentsByBusiness
};