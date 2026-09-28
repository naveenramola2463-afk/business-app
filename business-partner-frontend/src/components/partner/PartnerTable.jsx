import { Trash2 } from 'lucide-react';
import EmptyState from '../common/EmptyState';

const PartnerTable = ({ partners, onRemove }) => {
  if (!partners || partners.length === 0) {
    return <EmptyState message="No partners added yet" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-[#5a6172] border-b border-white/[0.08]">
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Email</th>
            <th className="py-2 pr-4 font-medium">Joined</th>
            {onRemove && <th className="py-2 pr-4 font-medium">Action</th>}
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => (
            <tr key={partner.partner_id} className="border-b border-white/[0.05]">
              <td className="py-3 pr-4 text-[#e8eaee]">{partner.name}</td>
              <td className="py-3 pr-4 text-[#9aa0b4]">{partner.email}</td>
              <td className="py-3 pr-4 text-[#5a6172]">
                {new Date(partner.joined_at).toLocaleDateString('en-IN')}
              </td>
              {onRemove && (
                <td className="py-3 pr-4">
                  <button
                    onClick={() => onRemove(partner.partner_id)}
                    className="text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerTable;