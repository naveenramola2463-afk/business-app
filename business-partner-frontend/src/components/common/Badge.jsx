const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-white/[0.05] text-[#8890a0] border-[#2a2f3b]',
    success: 'bg-[#34d399]/10 text-[#34d399] border-[#34d399]/25',
    danger: 'bg-[#fb7185]/10 text-[#fb7185] border-[#fb7185]/25',
    warning: 'bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/25',
    info: 'bg-[#6c63ff]/10 text-[#9d97ff] border-[#6c63ff]/25'
  };

  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default Badge;