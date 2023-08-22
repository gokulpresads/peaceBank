import React from 'react';
import styles from './accountSummary.module.css';

const AccountSummary = ({ accountNumber, balance, recentTransactions }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.summaryTitle}>Account Summary</h2>
      <p className={styles.accountInfo}>Account Number: {accountNumber}</p>
      <p className={styles.accountInfo}>Balance: ${balance}</p>

      <h3 className={styles.recentTransactions}>Recent Transactions</h3>
      <table className={styles.transactionTable}>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Description</th>
            <th>To Account Number</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map((transaction, index) => (
            <tr className={styles.transactionRow} key={index}>
              <td>{transaction.dateTime}</td>
              <td>{transaction.description}</td>
              <td>{transaction.toAccount}</td>
              <td>${transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountSummary;
