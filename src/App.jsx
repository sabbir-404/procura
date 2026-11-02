import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './layouts/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';

// Procurement & Core Pages
import Dashboard from './pages/Dashboard';
import Requisitions from './pages/Requisitions';
import CreateRequisition from './pages/CreateRequisition';
import Tenders from './pages/tenders/Tenders';
import AnonymousEvaluation from './pages/tenders/AnonymousEvaluation';
import Suppliers from './pages/Suppliers';
import Quotations from './pages/Quotations';
import PurchaseOrders from './pages/PurchaseOrders';
import Approvals from './pages/Approvals';
import Analytics from './pages/Analytics';
import Notifications from './pages/notifications/Notifications';
import Settings from './pages/settings/Settings';

// Vendor Portal Pages
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorTenders from './pages/vendor/VendorTenders';
import SubmitBid from './pages/vendor/SubmitBid';
import MyBids from './pages/vendor/MyBids';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Standalone Authentication Screen */}
            <Route path="/login" element={<Login />} />

            {/* Main Application Shell with Shared Layout */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="requisitions" element={<Requisitions />} />
              <Route path="requisitions/create" element={<CreateRequisition />} />
              
              {/* Tenders & Anonymous Bidding */}
              <Route path="tenders" element={<Tenders />} />
              <Route path="tenders/:id/evaluation" element={<AnonymousEvaluation />} />
              
              {/* Vendor Portal */}
              <Route path="vendor/dashboard" element={<VendorDashboard />} />
              <Route path="vendor/tenders" element={<VendorTenders />} />
              <Route path="vendor/tenders/:id/submit-bid" element={<SubmitBid />} />
              <Route path="vendor/my-bids" element={<MyBids />} />

              {/* Vendors, Orders, Approvals, Intelligence */}
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="quotations" element={<Quotations />} />
              <Route path="purchase-orders" element={<PurchaseOrders />} />
              <Route path="approvals" element={<Approvals />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="settings" element={<Settings />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
