import { Link } from 'react-router-dom';
import EmptyState from '../common/EmptyState';
import BusinessStatusBadge from './BusinessStatusBadge';

const BusinessTable = ({ businesses }) => {
  if (!businesses || businesses.length === 0) {
    return <EmptyState message="No businesses found" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-200">
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Description</th>
            <th className="py-2 pr-4 font-medium">Status</th>
            <th className="py-2 pr-4 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((b) => (
            <tr key={b.id} className="border-b border-gray-100">
              <td className="py-3 pr-4 text-gray-800 font-medium">{b.name}</td>
              <td className="py-3 pr-4 text-gray-600">{b.description || '-'}</td>
              <td className="py-3 pr-4">
                <BusinessStatusBadge status="active" />
              </td>
              <td className="py-3 pr-4">
                <Link to={`/business/${b.id}`} className="text-blue-600 hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessTable;