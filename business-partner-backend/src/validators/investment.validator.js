const validateAddInvestment = (req, res, next) => {
  const { partner_id, business_id, amount } = req.body;

  if (!partner_id || !business_id || !amount) {
    return res.status(400).json({
      success: false,
      message: 'partner_id, business_id and amount are required'
    });
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be a valid number greater than 0'
    });
  }

  next();
};

module.exports = {
  validateAddInvestment
};