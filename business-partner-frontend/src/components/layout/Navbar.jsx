import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Search, Bell, ChevronDown, LogOut, User, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="glass rounded-2xl h-16 flex items-center justify-between px-3 sm:px-5 gap-2">
      <button onClick={onMenuClick} className="lg:hidden text-[#9aa0b4] hover:text-white shrink-0">
        <Menu size={20} />
      </button>

      <div className="hidden sm:flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2 w-80 max-w-[40vw]">
        <Search size={15} className="text-[#5a6172]" />
        <input
          type="text"
          placeholder="Search anything…"
          className="bg-transparent text-[13px] text-white placeholder-[#5a6172] focus:outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <button className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#9aa0b4] hover:text-white transition-colors shrink-0">
          <Bell size={16} />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 sm:gap-2.5"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[11px] font-semibold text-white ring-2 ring-white/10 shrink-0">
              {initials}
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className="text-[13px] font-medium text-white">{user?.name}</p>
              <p className="text-[11px] text-[#5a6172] capitalize">{user?.role}</p>
            </div>
            <ChevronDown size={14} className="text-[#5a6172] hidden sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 w-44 glass rounded-xl p-1.5 shadow-2xl z-20">
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-[#c8cdd6] hover:bg-white/[0.06] hover:text-white"
              >
                <User size={14} />
                Profile
              </Link>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] text-rose-400 hover:bg-rose-500/10"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;