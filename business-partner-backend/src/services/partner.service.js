const partnerRepository = require('../repositories/partner.repository');
const userRepository = require('../repositories/user.repository');
const businessRepository = require('../repositories/business.repository');
const businessService = require('./business.service');

const addPartner = async ({ user_id, business_id }) => {
  const user = await userRepository.findUserById(user_id);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const business = await businessRepository.getBusinessById(business_id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }

  const existingPartner = await partnerRepository.findPartner(user_id, business_id);
  if (existingPartner) {
    const error = new Error('User is already a partner in this business');
    error.statusCode = 400;
    throw error;
  }

  const partnerId = await partnerRepository.addPartner({ user_id, business_id });
  return await partnerRepository.getPartnerById(partnerId);
};

const getPartnersByBusiness = async (business_id, user) => {
  await businessService.getBusinessByIdForUser(business_id, user);
  return await partnerRepository.getPartnersByBusiness(business_id);
};

const removePartner = async (id) => {
  const partner = await partnerRepository.getPartnerById(id);
  if (!partner) {
    const error = new Error('Partner not found');
    error.statusCode = 404;
    throw error;
  }
  await partnerRepository.removePartner(id);
  return true;
};

const getAvailableUsers = async (business_id) => {
  const business = await businessRepository.getBusinessById(business_id);
  if (!business) {
    const error = new Error('Business not found');
    error.statusCode = 404;
    throw error;
  }
  return await partnerRepository.getAvailableUsers(business_id);
};

module.exports = {
  addPartner,
  getPartnersByBusiness,
  removePartner,
  getAvailableUsers
};