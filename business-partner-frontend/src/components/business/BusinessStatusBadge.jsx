import Badge from '../common/Badge';

const BusinessStatusBadge = ({ status = 'active' }) => {
  return <Badge variant={status === 'active' ? 'success' : 'default'}>{status}</Badge>;
};

export default BusinessStatusBadge;