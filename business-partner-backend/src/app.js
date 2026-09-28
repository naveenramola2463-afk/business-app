const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// ---- Global Middleware ----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- Test Route (check karne ke liye ki server chal raha hai) ----
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Business Partner Backend API is running 🚀'
  });
});

// ---- Routes (abhi sirf test route hai, aage yahan saari routes add karenge) ----
 app.use('/api/auth', require('./routes/auth.routes'));
 app.use('/api/partners', require('./routes/partner.routes'));
 app.use('/api/partner-requests', require('./routes/partnerRequest.routes'));
 app.use('/api/business', require('./routes/business.routes'));
 app.use('/api/investments', require('./routes/investment.routes'));
 app.use('/api/profits', require('./routes/profit.routes'));
 app.use('/api/wallet', require('./routes/wallet.routes'));
 app.use('/api/transactions', require('./routes/transaction.routes'));

// ---- 404 Handler (jo route exist nahi karta uske liye) ----

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});
app.use(errorMiddleware);

module.exports = app;