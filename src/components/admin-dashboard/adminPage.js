import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './adminPage.module.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [requests, setRequests] = useState([]);
    const [approvedCustomers, setApprovedCustomers] = useState([]);
    const [transactionInfo, setTransactionInfo] = useState({
        userId: '',
        amount: 0,
        transactionType: '', // 'withdraw' or 'deposit'
    });

    const handleTransaction = async (userId, amount, transactionType) => {
        try {
            const response = await axios.post(`http://localhost:8080/obs/api/${userId}/updatebalance`, {
                amount,
                transactionType,
            });

            if (response.status === 200) {
                console.log('Transaction successful');
                // Clear the transaction info and update the state as needed
                setTransactionInfo({
                    userId: '',
                    amount: 0,
                    transactionType: '',
                });
                fetchApprovedCustomers(); // Refresh the customer list after the transaction
            }
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    };

    useEffect(() => {
        fetchApprovalRequests();
        fetchApprovedCustomers();
    }, []);

    const fetchApprovedCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/obs/api/admin/status'); 
            if (response.status === 200) {
                setApprovedCustomers(response.data);
            }
        } catch (error) {
            console.error('Error fetching approved customers:', error);
        }
    };

    const fetchApprovalRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8080/obs/api/admin'); 
            if (response.status === 200) {
                setRequests(response.data);
            }
        } catch (error) {
            console.error('Error fetching approval requests:', error);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            const response = await axios.put(`http://localhost:8080/obs/api/admin/${requestId}`, { status: true  });
    
            if (response.status === 200) {
                // Update local state after successful approval
                const updatedRequests = requests.map((request) =>
                    request.id === requestId ? { ...request, status: true } : request
                );
                setRequests(updatedRequests);
            } else {
                console.error('Failed to approve request');
            }
        } catch (error) {
            console.error('An error occurred while approving request:', error);
        }
    };
    
    const handleDisapprove = async (requestId) => {
        try {
            const response = await axios.put(`/api/approve-request/${requestId}`, { status: false });
    
            if (response.status === 200) {
                // Update local state after successful disapproval
                const updatedRequests = requests.map((request) =>
                    request.id === requestId ? { ...request, status: false } : request
                );
                setRequests(updatedRequests);
            } else {
                console.error('Failed to disapprove request');
            }
        } catch (error) {
            console.error('An error occurred while disapproving request:', error);
        }
    };
    

    const pendingRequestCount = requests.filter(request => request.status !== true && request.status !== false).length;

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={"admin.png"} alt="Logo" />
            <h2 className={styles.dashboardTitle}>Admin Dashboard</h2>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'pending' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending Requests ({pendingRequestCount})
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'approved' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('approved')}
                >
                    Approved Customers ({approvedCustomers.length})
                </button>
            </div>
            {activeTab === 'pending' && (
                <div className={styles.requestList}>
                    {requests.map((request) => (
                        <div key={request.id} className={styles.requestItem}>
                            {/* Display request information */}
                            <div className={styles.requestInfo}>
                                <div className={styles.requestInfoText}>
                                    <p>Name: {request.name}</p>
                                    <p>Account Type: {request.accountType}</p>
                                </div>
                                <div className={styles.approveButtons}>
                                    {request.status === 'Approved' ? (
                                        <span className={`${styles.statusBadge} badge badge-success`}>Approved</span>
                                    ) : request.status === 'Disapproved' ? (
                                        <span className={`${styles.statusBadge} badge badge-danger`}>Disapproved</span>
                                    ) : (
                                        <React.Fragment>
                                            <button
                                                className={`${styles.approveButton} btn btn-success`}
                                                onClick={() => handleApprove(request.id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className={`${styles.disapproveButton} btn btn-danger`}
                                                onClick={() => handleDisapprove(request.id)}
                                            >
                                                Disapprove
                                            </button>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {activeTab === 'approved' && (
                <div className={styles.customerList}>
                    {approvedCustomers.map((customer) => (
                        <div key={customer.id} className={styles.customerItem}>
                            <p>Name: {customer.name}</p>
                            <p>Account Type: {customer.accountType}</p>
                            {/* Transaction form */}
                            <div className={styles.transactionForm}>
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={transactionInfo.amount}
                                    onChange={(e) =>
                                        setTransactionInfo({ ...transactionInfo, amount: e.target.value })
                                    }
                                />
                                <button
                                    className={`${styles.transactionButton} btn btn-primary`}
                                    onClick={() => handleTransaction(customer.id, transactionInfo.amount, 'withdraw')}
                                >
                                    Withdraw
                                </button>
                                <button
                                    className={`${styles.transactionButton} btn btn-success`}
                                    onClick={() => handleTransaction(customer.id, transactionInfo.amount, 'deposit')}
                                >
                                    Deposit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;