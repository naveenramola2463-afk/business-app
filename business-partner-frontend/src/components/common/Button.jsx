const Button = ({ children, type = 'button', onClick, variant = 'primary', loading = false, disabled = false, ...props }) => {
  const baseClasses = 'w-full py-2 px-4 rounded-md text-[13.5px] font-medium transition-all duration-150 focus:outline-none';

  const variants = {
    primary: 'bg-[#6c63ff] text-white hover:bg-[#5a52e0] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]',
    secondary: 'bg-white/[0.04] text-[#c8cdd6] border border-[#2a2f3b] hover:bg-white/[0.07]',
    danger: 'bg-[#fb7185]/10 text-[#fb7185] border border-[#fb7185]/25 hover:bg-[#fb7185]/15'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...props}
    >
      {loading ? 'Please wait…' : children}
    </button>
  );
};

export default Button;