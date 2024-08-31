// src/components/AffiliateMarketingStatusDashboard.js
import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { Card, Title, Table } from '../styles/StyledComponents';
import { affiliateEarnings } from '../utils/dummyData';

const AffiliateMarketingStatusDashboard = () => {
  return (
    <Card>
      <Title><FaChartLine /> Affiliate Marketing Status</Title>
      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Date</th>
            <th>Amount Refunded</th>
            <th>Commission Impact</th>
          </tr>
        </thead>
        <tbody>
          {affiliateEarnings.map((earning, index) => (
            <tr key={index}>
              <td>{earning.product}</td>
              <td>{earning.date}</td>
              <td>${earning.amountRefunded.toFixed(2)}</td>
              <td>${earning.commissionImpact.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default AffiliateMarketingStatusDashboard;