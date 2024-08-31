// src/components/AdminDashboard.js
import React from 'react';
import { MainContent } from '../styles/StyledComponents';
import RefundManagement from './RefundManagement';
import PaymentHistory from './PaymentHistory';
import AffiliateMarketingStatusDashboard from './AffiliateMarketingStatusDashboard';

const AdminDashboard = () => {
  return (
    <MainContent>
      <RefundManagement />
      <PaymentHistory />
      <AffiliateMarketingStatusDashboard />
    </MainContent>
  );
};

export default AdminDashboard;
