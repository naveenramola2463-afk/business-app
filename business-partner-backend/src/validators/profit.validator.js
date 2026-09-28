const validateCreateProfit = (req, res, next) => {
  const { business_id, total_amount } = req.body;

  if (!business_id || !total_amount) {
    return res.status(400).json({
      success: false,
      message: 'business_id and total_amount are required'
    });
  }

  if (isNaN(total_amount) || Number(total_amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'total_amount must be a valid number greater than 0'
    });
  }

  next();
};

module.exports = {
  validateCreateProfit
};