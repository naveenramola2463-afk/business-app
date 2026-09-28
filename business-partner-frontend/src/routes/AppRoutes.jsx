import { Routes, Route, Navigate } from 'react-router-dom';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Dashboard
import Dashboard from '../pages/dashboard/Dashboard';

// Business pages
import Businesses from '../pages/business/Businesses';
import CreateBusiness from '../pages/business/CreateBusiness';
import BusinessDetails from '../pages/business/BusinessDetails';

// Investment pages
import Investments from '../pages/investment/Investments';
import AddInvestment from '../pages/investment/AddInvestment';

// Profit pages
import Profit from '../pages/profit/Profit';
import ProfitDetails from '../pages/profit/ProfitDetails';

// Wallet pages
import Wallet from '../pages/wallet/Wallet';
import Transactions from '../pages/wallet/Transactions';

// Partner pages
import Partners from '../pages/partner/Partners';
import PartnerDetails from '../pages/partner/PartnerDetails';

// Profile page
import Profile from '../pages/profile/Profile';

import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Business Routes */}
      <Route
        path="/business"
        element={
          <ProtectedRoute>
            <Businesses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/business/create"
        element={
          <ProtectedRoute>
            <CreateBusiness />
          </ProtectedRoute>
        }
      />
      <Route
        path="/business/:id"
        element={
          <ProtectedRoute>
            <BusinessDetails />
          </ProtectedRoute>
        }
      />

      {/* Investment Routes */}
      <Route
        path="/investments"
        element={
          <ProtectedRoute>
            <Investments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/investments/add"
        element={
          <ProtectedRoute>
            <AddInvestment />
          </ProtectedRoute>
        }
      />

      {/* Profit Routes */}
      <Route
        path="/profit"
        element={
          <ProtectedRoute>
            <Profit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profit/:id"
        element={
          <ProtectedRoute>
            <ProfitDetails />
          </ProtectedRoute>
        }
      />

      {/* Wallet Routes */}
      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />

      {/* Partner Routes */}
      <Route
        path="/partners"
        element={
          <ProtectedRoute>
            <Partners />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partners/:id"
        element={
          <ProtectedRoute>
            <PartnerDetails />
          </ProtectedRoute>
        }
      />

      {/* Profile Route */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Default route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;