// Global Error Handler
// Express automatically iss function ko call karta hai jab koi error next(err) se pass hoti hai
// ya kahin uncaught error throw hoti hai

const errorMiddleware = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorMiddleware;