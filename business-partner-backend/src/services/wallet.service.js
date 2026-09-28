const walletRepository = require('../repositories/wallet.repository');
const transactionRepository = require('../repositories/transaction.repository');
const partnerRepository = require('../repositories/partner.repository');

// Sirf apna wallet, ya admin kisi ka bhi
const getWalletByPartnerId = async (partner_id, user) => {
  const partner = await partnerRepository.getPartnerById(partner_id);
  if (!partner) {
    const error = new Error('Partner not found');
    error.statusCode = 404;
    throw error;
  }

  if (user.role !== 'admin' && partner.user_id !== user.id) {
    const error = new Error('You do not have access to this wallet');
    error.statusCode = 403;
    throw error;
  }

  let wallet = await walletRepository.getWalletByPartnerId(partner_id);
  if (!wallet) {
    wallet = { partner_id: Number(partner_id), balance: 0 };
  }
  return wallet;
};

const getTransactionHistory = async (partner_id, user) => {
  const partner = await partnerRepository.getPartnerById(partner_id);
  if (!partner) {
    const error = new Error('Partner not found');
    error.statusCode = 404;
    throw error;
  }

  if (user.role !== 'admin' && partner.user_id !== user.id) {
    const error = new Error('You do not have access to this wallet');
    error.statusCode = 403;
    throw error;
  }

  const wallet = await walletRepository.getWalletByPartnerId(partner_id);
  if (!wallet) return [];
  return await transactionRepository.getTransactionsByWallet(wallet.id);
};

module.exports = {
  getWalletByPartnerId,
  getTransactionHistory
};