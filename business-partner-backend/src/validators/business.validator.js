const validateCreateBusiness = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Business name is required'
    });
  }

  next();
};

module.exports = {
  validateCreateBusiness
};