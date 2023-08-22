import './App.css';
import RegisterForm from './components/user-management/register/register';
import OpenSavingsAccountForm from './components/user-management/new-account/newAccount';
import ChangePasswordPage from './components/user-management/change-password/changePassword';
import AccountSummary from './components/account-management/account-summary/accountSummary';
import AccountStatement from './components/account-management/account-statement/accountStatement';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const accountNumber = '1234567890';
  const balance = 5000;
  const recentTransactions = [
    { dateTime: '2023-08-21 14:30:00', description: 'Purchase', toAccount: '9876543210', amount: -100 },
    { dateTime: '2023-08-22 09:15:00', description: 'Deposit', toAccount: '1234567890', amount: 300 },
    // ... other transactions
];

  return (
    <Router>
      <div className='app-container'>
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className='nav-container'>
            <NavLink className="navbar-brand nav-link" to="/">
              Peace Bank
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/register"
                    activeClassName="active"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/new-account"
                    activeClassName="active"
                  >
                    New Account
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/change-password"
                    activeClassName="active"
                  >
                    Change Password
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/account-summary"
                    activeClassName="active"
                  >
                    Account Summary
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/account-statement"
                    activeClassName="active"
                  >
                    Account Statement
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>


        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/new-account" element={<OpenSavingsAccountForm />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/account-summary" element={<AccountSummary
                                                    accountNumber={accountNumber}
                                                    balance={balance}
                                                    recentTransactions={recentTransactions}
                                                  />} />
          <Route path="/account-statement" element={<AccountStatement />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
