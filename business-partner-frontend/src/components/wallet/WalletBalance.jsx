import formatCurrency from '../../utils/formatCurrency';
import { Wallet as WalletIcon } from 'lucide-react';

const WalletBalance = ({ balance }) => {
  return (
    <div className="relative overflow-hidden glass rounded-2xl p-6">
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-25 bg-gradient-to-br from-indigo-500 to-purple-600" />
      <div className="relative flex items-center gap-2 mb-2 text-[#9aa0b4]">
        <WalletIcon size={17} />
        <span className="text-[13px]">Wallet Balance</span>
      </div>
      <p className="relative text-3xl font-semibold text-white tabular">{formatCurrency(balance)}</p>
    </div>
  );
};

export default WalletBalance;