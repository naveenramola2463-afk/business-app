import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Mail, Lock } from 'lucide-react';
import authBg from '../../assets/background.webp';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center lg:justify-end px-5 sm:px-10 lg:px-20 py-10 relative"
      style={{ backgroundImage: `url(${authBg})` }}
    >
      <div className="absolute inset-0 bg-black/35 lg:bg-gradient-to-r lg:from-black/10 lg:via-black/25 lg:to-black/55 pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/30">
            B
          </div>
          <span className="text-lg font-semibold text-white">
            Biz<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Partner</span>
          </span>
        </div>

        <p className="text-[12px] font-medium tracking-wide text-indigo-300 mb-1">WELCOME BACK</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-1.5 drop-shadow-lg">Log in</h2>
        <p className="text-[13.5px] text-[#d5d9e2] mb-7 drop-shadow">
          Log in to manage your businesses and partnerships.
        </p>

        {error && (
          <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[13px] p-3 rounded-lg mb-4 backdrop-blur-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[13px] font-medium text-[#d5d9e2] mb-1.5">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a9bb]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full pl-9 pr-3 py-2.5 bg-white/[0.08] border border-white/[0.18] rounded-lg text-[13.5px] text-white placeholder-[#a3a9bb] backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white/[0.12] transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[13px] font-medium text-[#d5d9e2] mb-1.5">Password</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a9bb]" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2.5 bg-white/[0.08] border border-white/[0.18] rounded-lg text-[13.5px] text-white placeholder-[#a3a9bb] backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white/[0.12] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[13.5px] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-indigo-500/30"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="text-center text-[13px] text-[#d5d9e2] mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-300 font-medium hover:text-indigo-200">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;