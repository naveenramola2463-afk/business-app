const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-[13px] font-medium text-[#8890a0] mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-[#0f1117] border rounded-md text-[13.5px] text-[#e8eaee] placeholder-[#5a6172] focus:outline-none focus:ring-1 focus:ring-[#6c63ff] focus:border-[#6c63ff] transition-colors ${
          error ? 'border-[#fb7185]' : 'border-[#2a2f3b]'
        }`}
        {...props}
      />
      {error && <p className="text-[#fb7185] text-xs mt-1.5">{error}</p>}
    </div>
  );
};

export default Input;