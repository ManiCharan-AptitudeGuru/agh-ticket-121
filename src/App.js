import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';
import AdminDashboard from './components/AdminDashboard';
import GlobalStyles from './styles/GlobalStyles';
import { AppContainer, Header, MainContent } from './styles/StyledComponents';
import { notifications, generateMonthlyReport, forceBatchAdminNotifications } from './utils/dummyData';

const App = () => {
  const [currentNotifications, setCurrentNotifications] = useState(notifications);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchData();

    const monthlyInterval = setInterval(() => {
      generateMonthlyReport();
      setCurrentNotifications([...notifications]);
    }, 30000); 
    const batchInterval = setInterval(() => {
      const batchedNotification = forceBatchAdminNotifications();
      if (batchedNotification) {
        setCurrentNotifications(prevNotifications => [...prevNotifications, batchedNotification]);
      }
    }, 60000);

    return () => {
      clearInterval(monthlyInterval);
      clearInterval(batchInterval);
    };
  }, []);

  const clearNotification = (id) => {
    setCurrentNotifications(currentNotifications.filter(n => n.id !== id));
  };

  const addNotification = (newNotification) => {
    setCurrentNotifications([...currentNotifications, newNotification]);
  };

  if (isLoading) {
    return (
      <AppContainer>
        <GlobalStyles />
        <Header>
          <h1><FaUserCircle /> Affiliate Commission Management</h1>
        </Header>
        <MainContent>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </MainContent>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <GlobalStyles />
      <Header>
        <h1><FaUserCircle /> Affiliate Commission Management</h1>
      </Header>
      <MainContent>
        <AdminDashboard 
          notifications={currentNotifications}
          clearNotification={clearNotification}
          addNotification={addNotification}
        />
      </MainContent>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </AppContainer>
  );
};

export default App;