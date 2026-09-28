import { useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';

const PartnerDetails = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Partner Details</h1>
      <p className="text-gray-600">Partner ID: {id}</p>
      <p className="text-sm text-gray-400 mt-4">
        (Detailed partner view — investments, profit share, transaction history — can be expanded here later)
      </p>
    </DashboardLayout>
  );
};

export default PartnerDetails;