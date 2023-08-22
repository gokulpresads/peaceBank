import React, { useState } from 'react';
import styles from './accountStatement.module.css';

const AccountStatement = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statementData, setStatementData] = useState([]); 

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/account-statement?startDate=${startDate}&endDate=${endDate}`);
            if (response.ok) {
                const data = await response.json();
                setStatementData(data);
            } else {
                console.error('Failed to fetch account statement data');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.statementTitle}>Account Statement</h2>
            <form onSubmit={handleSubmit} className={styles.dateSelector}>
                <input
                    type="date"
                    className={styles.dateInput}
                    value={startDate}
                    onChange={handleStartDateChange}
                    required
                />
                <span>to</span>
                <input
                    type="date"
                    className={styles.dateInput}
                    value={endDate}
                    onChange={handleEndDateChange}
                    required
                />
                <button type="submit" className={styles.submitButton}>
                    Submit
                </button>
            </form>
            <div className={styles.tableContainer}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>Name</th>
                            <th>Account Type</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statementData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.accountNumber}</td>
                                <td>{data.name}</td>
                                <td>{data.accountType}</td>
                                <td>{data.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountStatement;
