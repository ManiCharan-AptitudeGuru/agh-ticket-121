// src/utils/dummyData.js
export let affiliateEarnings = [
    { product: 'Product A', date: '2024-08-15', amountRefunded: 100, commissionImpact: -10 },
    { product: 'Product B', date: '2024-08-16', amountRefunded: 50, commissionImpact: -5 },
    { product: 'Product C', date: '2024-08-17', amountRefunded: 200, commissionImpact: -20 },
  ];
  
  export let refunds = [
    { affiliate: 'John Doe', originalCommission: 50, adjustment: -10 },
    { affiliate: 'Jane Smith', originalCommission: 75, adjustment: -15 },
    { affiliate: 'Bob Johnson', originalCommission: 100, adjustment: -20 },
  ];
  
  export let paymentHistory = [
    { affiliate: 'John Doe', totalCommissionsReversed: 100, outstandingBalance: 50 },
    { affiliate: 'Jane Smith', totalCommissionsReversed: 150, outstandingBalance: -25 },
    { affiliate: 'Bob Johnson', totalCommissionsReversed: 200, outstandingBalance: 0 },
  ];
  
  export const addRefund = (newRefund) => {
    refunds.push(newRefund);
    // Update payment history
    const existingPayment = paymentHistory.find(p => p.affiliate === newRefund.affiliate);
    if (existingPayment) {
      existingPayment.totalCommissionsReversed += Math.abs(newRefund.adjustment);
      existingPayment.outstandingBalance += newRefund.adjustment;
    } else {
      paymentHistory.push({
        affiliate: newRefund.affiliate,
        totalCommissionsReversed: Math.abs(newRefund.adjustment),
        outstandingBalance: newRefund.adjustment
      });
    }
  };
  