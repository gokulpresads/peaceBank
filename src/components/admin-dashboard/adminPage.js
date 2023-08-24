import React, { useState, useEffect } from 'react';
import styles from './adminPage.module.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [requests, setRequests] = useState([]);
    const [approvedCustomers, setApprovedCustomers] = useState([]);

    useEffect(() => {
        // Fetch approval requests from the server
        fetchApprovalRequests();
        fetchApprovedCustomers();
    }, []);

    const fetchApprovedCustomers = async () => {
        try {
            const response = await fetch('/api/approved-customers'); // Replace with your API endpoint
            if (response.ok) {
                const data = await response.json();
                setApprovedCustomers(data);
            } else {
                console.error('Failed to fetch approved customers');
            }
        } catch (error) {
            console.error('An error occurred while fetching approved customers', error);
        }
    };

    const fetchApprovalRequests = async () => {
        try {
            const response = await fetch('/api/approval-requests'); // Replace with your API endpoint
            if (response.ok) {
                const data = await response.json();
                setRequests(data);
            } else {
                console.error('Failed to fetch approval requests');
            }
        } catch (error) {
            console.error('An error occurred while fetching approval requests', error);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            const response = await fetch(`/api/approve-request/${requestId}`, {
                method: 'PUT', // Replace with appropriate HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Approved' }), // Send status change to server
            });

            if (response.ok) {
                // Update local state after successful approval
                const updatedRequests = requests.map((request) =>
                    request.id === requestId ? { ...request, status: 'Approved' } : request
                );
                setRequests(updatedRequests);
            } else {
                console.error('Failed to approve request');
            }
        } catch (error) {
            console.error('An error occurred while approving request', error);
        }
    };

    const handleDisapprove = async (requestId) => {
        try {
            const response = await fetch(`/api/approve-request/${requestId}`, {
                method: 'PUT', // Replace with appropriate HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Disapproved' }), // Send status change to server
            });

            if (response.ok) {
                // Update local state after successful disapproval
                const updatedRequests = requests.map((request) =>
                    request.id === requestId ? { ...request, status: 'Disapproved' } : request
                );
                setRequests(updatedRequests);
            } else {
                console.error('Failed to disapprove request');
            }
        } catch (error) {
            console.error('An error occurred while disapproving request', error);
        }
    };

    const pendingRequestCount = requests.filter(request => request.status !== 'Approved' && request.status !== 'Disapproved').length;

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
            {activeTab === 'pending' ? (
                <div>
                    <div className={styles.requestList}>
                        {requests.map((request) => (
                            <div key={request.id} className={styles.requestItem}>
                                {/* Display request information */}
                                <div className={styles.requestInfo}>
                                    <p>Name: {request.name}</p>
                                    <p>Account Type: {request.accountType}</p>
                                </div>
                                {/* Approve/Disapprove buttons */}
                                <div>
                                    {request.status === 'Approved' ? (
                                        <span className="badge badge-success" style={{ color: "white" }}>Approved</span>
                                    ) : request.status === 'Disapproved' ? (
                                        <span className="badge badge-danger" style={{ color: "white" }}>Disapproved</span>
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
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.customerList}>
                    {approvedCustomers.map((customer) => (
                        <div key={customer.id} className={styles.customerItem}>
                            <p>Name: {customer.name}</p>
                            <p>Account Type: {customer.accountType}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;