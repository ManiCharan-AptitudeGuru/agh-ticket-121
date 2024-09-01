// AdminNotifications.js (New Component)
import React from 'react';
import { FaClipboardList } from 'react-icons/fa';
import { Card, Title, Table, Button } from '../styles/StyledComponents';

const AdminNotifications = ({ notifications, clearNotification }) => {
  return (
    <Card>
      <Title><FaClipboardList /> Admin Batch Notifications</Title>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Message</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr key={notification.id}>
              <td>{notification.date}</td>
              <td>{notification.message}</td>
              <td>
                <details>
                  <summary>View Details</summary>
                  <ul>
                    {notification.details.map((detail, index) => (
                      <li key={index}>
                        Affiliate: {detail.affiliate}, Adjustment: ${Math.abs(detail.adjustment).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </details>
              </td>
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

export default AdminNotifications;