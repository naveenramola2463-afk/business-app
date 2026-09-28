const express = require('express');
const router = express.Router();

const partnerController = require('../controllers/partner.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, partnerController.addPartner);
router.get('/business/:business_id', authMiddleware, partnerController.getPartnersByBusiness);
router.get('/available-users/:business_id', authMiddleware, partnerController.getAvailableUsers);
router.delete('/:id', authMiddleware, partnerController.removePartner);

module.exports = router;