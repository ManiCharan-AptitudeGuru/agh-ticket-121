import React from 'react';
import { MainContent } from '../styles/StyledComponents';
import RefundManagement from './RefundManagement';
import PaymentHistory from './PaymentHistory';
import AffiliateMarketingStatusDashboard from './AffiliateMarketingStatusDashboard';
import NotificationsTab from './NotificationsTab';
import AdminNotifications from './AdminNotifications';

const AdminDashboard = ({ notifications, clearNotification, addNotification }) => {
  return (
    <MainContent>
      <RefundManagement addNotification={addNotification} />
      <NotificationsTab notifications={notifications} clearNotification={clearNotification} />
      <AdminNotifications notifications={notifications.filter(n => n.type === 'admin_batch')} clearNotification={clearNotification} />
      <PaymentHistory />
      <AffiliateMarketingStatusDashboard />
    </MainContent>
  );
};

export default AdminDashboard;