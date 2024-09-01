// src/utils/dummyData.js
let affiliateEarnings = [
  { id: 1, affiliate: 'John Doe', product: 'Product A', date: '2024-08-15', amountRefunded: 100, commissionImpact: -10 },
  { id: 2, affiliate: 'Jane Smith', product: 'Product B', date: '2024-08-16', amountRefunded: 50, commissionImpact: -5 },
  { id: 3, affiliate: 'Bob Johnson', product: 'Product C', date: '2024-08-17', amountRefunded: 200, commissionImpact: -20 },
];

let refunds = [
  { id: 1, affiliate: 'John Doe', originalCommission: 50, adjustment: -10, date: '2024-08-15' },
  { id: 2, affiliate: 'Jane Smith', originalCommission: 75, adjustment: -15, date: '2024-08-16' },
  { id: 3, affiliate: 'Bob Johnson', originalCommission: 100, adjustment: -20, date: '2024-08-17' },
];

let paymentHistory = [
  { id: 1, affiliate: 'John Doe', totalCommissionsReversed: 100, outstandingBalance: 50, date: '2024-08-31' },
  { id: 2, affiliate: 'Jane Smith', totalCommissionsReversed: 150, outstandingBalance: -25, date: '2024-08-31' },
  { id: 3, affiliate: 'Bob Johnson', totalCommissionsReversed: 200, outstandingBalance: 0, date: '2024-08-31' },
];

let notifications = [
  { id: 1, affiliate: 'John Doe', type: 'refund', message: 'A refund of $100 has impacted your commission.', date: '2024-08-15' },
  { id: 2, affiliate: 'Jane Smith', type: 'monthly', message: 'Your monthly report is ready. Total refunds: $50.', date: '2024-08-31' },
  { id: 3, affiliate: 'Bob Johnson', type: 'negative', message: 'Your account has a negative balance of $20.', date: '2024-08-17' },
];

let adminNotifications = [];

export const addAdminNotification = (newNotification) => {
  adminNotifications.push(newNotification);
};

export const batchAdminNotifications = () => {
  if (adminNotifications.length === 0) return null;

  const batchedNotification = {
    id: notifications.length + 1,
    type: 'admin_batch',
    date: new Date().toISOString().split('T')[0],
    message: `${adminNotifications.length} refunds processed affecting ${new Set(adminNotifications.map(n => n.affiliate)).size} affiliates.`,
    details: adminNotifications
  };

  notifications.push(batchedNotification);
  adminNotifications = [];

  return batchedNotification;
};

export const addRefund = (newRefund) => {
  const refundId = refunds.length + 1;
  const refundDate = new Date().toISOString().split('T')[0];
  const fullRefund = { ...newRefund, id: refundId, date: refundDate };
  refunds.push(fullRefund);

  const existingPayment = paymentHistory.find(p => p.affiliate === newRefund.affiliate);
  if (existingPayment) {
    existingPayment.totalCommissionsReversed += Math.abs(newRefund.adjustment);
    existingPayment.outstandingBalance += newRefund.adjustment;
  } else {
    paymentHistory.push({
      id: paymentHistory.length + 1,
      affiliate: newRefund.affiliate,
      totalCommissionsReversed: Math.abs(newRefund.adjustment),
      outstandingBalance: newRefund.adjustment,
      date: refundDate
    });
  }

  const notification = {
    id: notifications.length + 1,
    affiliate: newRefund.affiliate,
    type: 'refund',
    message: `A refund of $${Math.abs(newRefund.adjustment)} has impacted your commission.`,
    date: refundDate
  };
  notifications.push(notification);

  const updatedPayment = paymentHistory.find(p => p.affiliate === newRefund.affiliate);
  if (updatedPayment && updatedPayment.outstandingBalance < 0) {
    notifications.push({
      id: notifications.length + 1,
      affiliate: newRefund.affiliate,
      type: 'negative',
      message: `Your account has a negative balance of $${Math.abs(updatedPayment.outstandingBalance)}. This will be deducted from future payouts.`,
      date: refundDate
    });
  }

  affiliateEarnings.push({
    id: affiliateEarnings.length + 1,
    affiliate: newRefund.affiliate,
    product: 'Unknown',
    date: refundDate,
    amountRefunded: Math.abs(newRefund.adjustment),
    commissionImpact: newRefund.adjustment
  });

  addAdminNotification({
    affiliate: newRefund.affiliate,
    adjustment: newRefund.adjustment,
    date: refundDate
  });

  if (adminNotifications.length >= 5) {
    batchAdminNotifications();
  }

  return notification;
};

export const generateMonthlyReport = () => {
  const reportDate = new Date().toISOString().split('T')[0];
  const affiliates = [...new Set(refunds.map(r => r.affiliate))];

  affiliates.forEach(affiliate => {
    const affiliateRefunds = refunds.filter(r => r.affiliate === affiliate);
    const totalRefunds = affiliateRefunds.reduce((sum, r) => sum + Math.abs(r.adjustment), 0);

    notifications.push({
      id: notifications.length + 1,
      affiliate: affiliate,
      type: 'monthly',
      message: `Your monthly report is ready. Total refunds: $${totalRefunds.toFixed(2)}.`,
      date: reportDate
    });
  });
};

export const forceBatchAdminNotifications = () => {
  if (adminNotifications.length > 0) {
    return batchAdminNotifications();
  }
  return null;
};

export { affiliateEarnings, refunds, paymentHistory, notifications };