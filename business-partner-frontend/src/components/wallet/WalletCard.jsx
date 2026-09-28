import formatCurrency from '../../utils/formatCurrency';

const WalletCard = ({ wallet }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
      <span className="text-sm text-gray-500">Partner ID: {wallet.partner_id}</span>
      <span className="font-semibold text-gray-800">{formatCurrency(wallet.balance)}</span>
    </div>
  );
};

export default WalletCard;