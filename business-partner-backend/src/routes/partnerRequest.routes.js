const express = require('express');
const router = express.Router();

const partnerRequestController = require('../controllers/partnerRequest.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, partnerRequestController.sendRequest);
router.get('/business/:business_id', authMiddleware, partnerRequestController.getPendingRequests);
router.get('/my-requests', authMiddleware, partnerRequestController.getMyRequests);
router.patch('/:id/respond', authMiddleware, partnerRequestController.respondToRequest);

module.exports = router;