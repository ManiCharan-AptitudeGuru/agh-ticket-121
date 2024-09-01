import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { Card, Title, Table, Button } from '../styles/StyledComponents';

const NotificationsTab = ({ notifications = [], clearNotification }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filterNotifications = () => {
    switch (activeTab) {
      case 'refunds':
        return notifications.filter(n => n.type === 'refund');
      case 'monthly':
        return notifications.filter(n => n.type === 'monthly');
      case 'negative':
        return notifications.filter(n => n.type === 'negative');
      default:
        return notifications;
    }
  };

  return (
    <Card>
      <Title><FaBell /> Notifications</Title>
      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", columnGap:"5px"}}>
        <Button onClick={() => setActiveTab('all')} active={activeTab === 'all'}>All</Button>
        <Button onClick={() => setActiveTab('refunds')} active={activeTab === 'refunds'}>Refunds</Button>
        <Button onClick={() => setActiveTab('monthly')} active={activeTab === 'monthly'}>Monthly Reports</Button>
        <Button onClick={() => setActiveTab('negative')} active={activeTab === 'negative'}>Negative Balance</Button>
        </div>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Affiliate</th>
            <th>Type</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterNotifications().map((notification) => (
            <tr key={notification.id}>
              <td>{notification.date}</td>
              <td>{notification.affiliate}</td>
              <td>{notification.type}</td>
              <td>{notification.message}</td>
              <td>
                <Button onClick={() => clearNotification(notification.id)}>Clear</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default NotificationsTab;