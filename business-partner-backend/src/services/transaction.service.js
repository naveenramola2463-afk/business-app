const transactionRepository = require('../repositories/transaction.repository');
const walletRepository = require('../repositories/wallet.repository');

// Partner ki saari transactions lao (wallet ke through)
const getTransactionsByPartnerId = async (partner_id) => {
  const wallet = await walletRepository.getWalletByPartnerId(partner_id);

  if (!wallet) {
    const error = new Error('Wallet not found for this partner');
    error.statusCode = 404;
    throw error;
  }

  return await transactionRepository.getTransactionsByWallet(wallet.id);
};

module.exports = {
  getTransactionsByPartnerId
};