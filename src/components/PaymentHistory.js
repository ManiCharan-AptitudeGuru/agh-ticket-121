
import React from 'react';
import { FaHistory } from 'react-icons/fa';
import { Card, Title, Table } from '../styles/StyledComponents';
import { paymentHistory } from '../utils/dummyData';

const PaymentHistory = () => {
  return (
    <Card>
      <Title><FaHistory /> Payment History</Title>
      <Table>
        <thead>
          <tr>
            <th>Affiliate</th>
            <th>Total Commissions Reversed</th>
            <th>Outstanding Balance</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
            <tr key={index}>
              <td>{payment.affiliate}</td>
              <td>${payment.totalCommissionsReversed.toFixed(2)}</td>
              <td>${payment.outstandingBalance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default PaymentHistory;
