
// src/App.js
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from 'react-icons/fa';
import AdminDashboard from './components/AdminDashboard';
import AffiliateMarketingStatusDashboard from './components/AffiliateMarketingStatusDashboard';
import GlobalStyles from './styles/GlobalStyles';
import { AppContainer, Header } from './styles/StyledComponents';

const App = () => {
  return (
    <AppContainer>
      <GlobalStyles />
      <Header>
        <h1><FaUserCircle /> Affiliate Commission Management</h1>
      </Header>
      <AdminDashboard />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </AppContainer>
  );
};

export default App;
