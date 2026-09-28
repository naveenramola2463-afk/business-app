const TransactionFilter = ({ filter, onFilterChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      {['all', 'credit', 'debit'].map((type) => (
        <button
          key={type}
          onClick={() => onFilterChange(type)}
          className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium capitalize transition-colors ${
            filter === type
              ? 'bg-indigo-500 text-white'
              : 'bg-white/[0.04] text-[#8890a0] hover:bg-white/[0.08]'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TransactionFilter;