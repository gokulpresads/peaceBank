import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './register.module.css';

const RegisterForm = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [confirmLoginPassword, setConfirmLoginPassword] = useState('');
    const [transactionPassword, setTransactionPassword] = useState('');
    const [confirmTransactionPassword, setConfirmTransactionPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [loginPasswordsMatch, setLoginPasswordsMatch] = useState(true);
    const [transactionPasswordsMatch, setTransactionPasswordsMatch] = useState(true);


    const handlePasswordChange = (password) => {
        if (password.length < 8) {
            setPasswordStrength('Weak');
        } else if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) {
            setPasswordStrength('Strong');
        } else {
            setPasswordStrength('Moderate');
        }
    };

    const handleConfirmLoginPasswordChange = (password) => {
        setConfirmLoginPassword(password);
        setLoginPasswordsMatch(password === loginPassword);
    };

    const handleConfirmTransactionPasswordChange = (password) => {
        setConfirmTransactionPassword(password);
        setTransactionPasswordsMatch(password === transactionPassword);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if any field is empty
        if (
            !accountNumber ||
            !loginPassword ||
            !confirmLoginPassword ||
            !transactionPassword ||
            !confirmTransactionPassword ||
            !otp
        ) {
            alert('Please fill in all fields.');
            return;
        }
        // Check if login passwords match
        if (loginPassword !== confirmLoginPassword) {
            alert('Login passwords do not match.');
            return;
        }

        // Check if transaction passwords match
        if (transactionPassword !== confirmTransactionPassword) {
            alert('Transaction passwords do not match.');
            return;
        }
        // Reset form fields
        setAccountNumber('');
        setLoginPassword('');
        setConfirmLoginPassword('');
        setTransactionPassword('');
        setConfirmTransactionPassword('');
        setOtp('');

        alert('Registered successfully!');
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>Register for Internet Banking</h2>
                <form onSubmit={handleSubmit} className={styles.customForm}>
                    <div className="mb-3">
                        <label htmlFor="accountNumber" className="form-label">Account Number</label>
                        <input type="text" className="form-control" id="accountNumber" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Set Login Password</label>
                        <input type="password" className="form-control" id="loginPassword" value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value); handlePasswordChange(e.target.value); }} />
                        {passwordStrength && (
                            <small className={`form-text ${passwordStrength === 'Weak' ? 'text-danger' : passwordStrength === 'Moderate' ? 'text-warning' : 'text-success'}`}>
                                Password Strength: {passwordStrength}
                            </small>
                        )}
                    </div>

                    <div className={`mb-3 ${loginPasswordsMatch ? '' : 'has-error'}`}>
                        <label htmlFor="confirmLoginPassword" className="form-label">Confirm Login Password</label>
                        <input
                            type="password"
                            className={`form-control ${loginPasswordsMatch ? '' : 'is-invalid'}`}
                            id="confirmLoginPassword"
                            value={confirmLoginPassword}
                            onChange={(e) => handleConfirmLoginPasswordChange(e.target.value)}
                        />
                        {!loginPasswordsMatch && (
                            <div className="invalid-feedback">Passwords do not match.</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="transactionPassword" className="form-label">Set Transaction Password</label>
                        <input type="password" className="form-control" id="transactionPassword" value={transactionPassword} onChange={(e) => { setTransactionPassword(e.target.value); handlePasswordChange(e.target.value); }} />
                    </div>

                    <div className={`mb-3 ${transactionPasswordsMatch ? '' : 'has-error'}`}>
                        <label htmlFor="confirmTransactionPassword" className="form-label">Confirm Transaction Password</label>
                        <input
                            type="password"
                            className={`form-control ${transactionPasswordsMatch ? '' : 'is-invalid'}`}
                            id="confirmTransactionPassword"
                            value={confirmTransactionPassword}
                            onChange={(e) => handleConfirmTransactionPasswordChange(e.target.value)}
                        />
                        {!transactionPasswordsMatch && (
                            <div className="invalid-feedback">Passwords do not match.</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label">OTP</label>
                        <input type="text" className="form-control" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit" className={`btn btn-primary ${styles.customButton}`}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
