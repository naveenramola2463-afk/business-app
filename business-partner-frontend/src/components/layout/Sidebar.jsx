import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, TrendingUp, Wallet, Users, User, Sparkles, X } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Business', path: '/business', icon: Building2 },
  { name: 'Investments', path: '/investments', icon: TrendingUp },
  { name: 'Profit', path: '/profit', icon: TrendingUp },
  { name: 'Wallet', path: '/wallet', icon: Wallet },
  { name: 'Partners', path: '/partners', icon: Users },
  { name: 'Profile', path: '/profile', icon: User }
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto w-64 glass rounded-none lg:rounded-3xl h-screen lg:h-[calc(100vh-2rem)] lg:top-4 flex flex-col p-4 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-2 py-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/30">
              B
            </div>
            <span className="text-[15px] font-semibold text-white">
              Biz<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Partner</span>
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-[#9aa0b4] hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/25 to-purple-500/15 text-white border border-indigo-400/20 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                      : 'text-[#9aa0b4] hover:bg-white/[0.05] hover:text-white'
                  }`
                }
              >
                <Icon size={16.5} strokeWidth={2} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="glass rounded-2xl p-4 mt-4 hidden sm:block">
          <Sparkles size={16} className="text-indigo-400 mb-2" />
          <p className="text-[12.5px] text-[#c8cdd6] leading-snug italic">
            "Better Partners, Build Bigger Dreams"
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;