const businessRepository = require('../repositories/business.repository');
const partnerRepository = require('../repositories/partner.repository');

const createBusiness = async ({ name, description, created_by }) => {
  const businessId = await businessRepository.createBusiness({ name, description, created_by });
  return await businessRepository.getBusinessById(businessId);
};

const getAllBusiness = async (user) => {
  if (user.role === 'admin') {
    return await businessRepository.getAllBusiness();
  }
  return await businessRepository.getBusinessesByUserId(user.id);
};

const getBusinessByIdForUser = async (id, user) => {
  const business = await businessRepository.getBusinessById(id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }

  const isAdmin = user.role === 'admin';
  const isCreator = business.created_by === user.id;

  if (!isAdmin && !isCreator) {
    const membership = await partnerRepository.findPartner(user.id, id);
    if (!membership) {
      const error = new Error('You do not have access to this business');
      error.statusCode = 403;
      throw error;
    }
  }

  return business;
};

const getBusinessById = async (id) => {
  const business = await businessRepository.getBusinessById(id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }
  return business;
};

const updateBusiness = async (id, { name, description }) => {
  const business = await businessRepository.getBusinessById(id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }
  await businessRepository.updateBusiness(id, { name, description });
  return await businessRepository.getBusinessById(id);
};

const deleteBusiness = async (id) => {
  const business = await businessRepository.getBusinessById(id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }
  await businessRepository.deleteBusiness(id);
  return true;
};

module.exports = {
  createBusiness,
  getAllBusiness,
  getBusinessById,
  getBusinessByIdForUser,
  updateBusiness,
  deleteBusiness
};