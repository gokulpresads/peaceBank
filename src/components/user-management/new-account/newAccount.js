import styles from './newAccount.module.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OpenSavingsAccountForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        fathersName: '',
        mobileNumber: '',
        email: '',
        aadharNumber: '',
        dob: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        permanentSameAsMailing: false,
        permanentAddressLine1: '',
        permanentAddressLine2: '',
        permanentLandmark: '',
        permanentCity: '',
        permanentState: '',
        permanentPincode: '',
        occupationType: '',
        sourceOfIncome: '',
        grossAnnualIncome: '',
        wantDebitCard: false,
        agreeToTerms: false,
    });

    const [mandatoryFieldsFilled, setMandatoryFieldsFilled] = useState(true);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const mandatoryFields = ['title', 'firstName', 'lastName', 'fathersName', 'mobileNumber', 'aadharNumber', 'dob', 'addressLine1', 'city', 'state', 'pincode', 'occupationType', 'sourceOfIncome', 'grossAnnualIncome', 'agreeToTerms'];
    
        const areAllMandatoryFieldsFilled = mandatoryFields.every((field) => formData[field].trim() !== '');
    
        if (!areAllMandatoryFieldsFilled || !formData.agreeToTerms) {
            setMandatoryFieldsFilled(false);
            return; // Stop further processing
        }
    
        setTimeout(() => {
            alert("Form submitted successfully!"); // Display a success message
            setFormData({  // Reset form fields on successful submission
                title: '',
                firstName: '',
                middleName: '',
                lastName: '',
                fathersName: '',
                mobileNumber: '',
                email: '',
                aadharNumber: '',
                dob: '',
                addressLine1: '',
                addressLine2: '',
                landmark: '',
                city: '',
                state: '',
                pincode: '',
                permanentSameAsMailing: false,
                permanentAddressLine1: '',
                permanentAddressLine2: '',
                permanentLandmark: '',
                permanentCity: '',
                permanentState: '',
                permanentPincode: '',
                occupationType: '',
                sourceOfIncome: '',
                grossAnnualIncome: '',
                wantDebitCard: false,
                agreeToTerms: false,
            });
            setMandatoryFieldsFilled(false); // Reset the mandatory fields status
        }, 1000); 
    };
    

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>Open a Savings Account</h2>
                <form onSubmit={handleSubmit} className={styles.customForm}>
                    <div className="mb-3">
                        <label htmlFor="title" className={styles.formLabel}>Title*</label>
                        <select
                            className={`form-select ${styles.formSelect}`}
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Title</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms">Ms</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="middleName"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fathersName" className="form-label">Father's Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fathersName"
                            name="fathersName"
                            value={formData.fathersName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobileNumber" className="form-label">Mobile Number*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="aadharNumber" className="form-label">Aadhar Number*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="aadharNumber"
                            name="aadharNumber"
                            value={formData.aadharNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">Date of Birth*</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <h4>Residential Address</h4>
                        <div className="mb-3">
                            <label htmlFor="addressLine1" className="form-label">Address Line 1*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="addressLine1"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressLine2" className="form-label">Address Line 2</label>
                            <input
                                type="text"
                                className="form-control"
                                id="addressLine2"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="landmark" className="form-label">Landmark</label>
                            <input
                                type="text"
                                className="form-control"
                                id="landmark"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="state" className="form-label">State*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pincode" className="form-label">Pincode*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="pincode"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="permanentSameAsMailing"
                                name="permanentSameAsMailing"
                                checked={formData.permanentSameAsMailing}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label" htmlFor="permanentSameAsMailing">Permanent address same as mailing address</label>
                        </div>
                    </div>
                    {!formData.permanentSameAsMailing && (
                        <div>
                            <h4>Permanent Address</h4>
                            <div className="mb-3">
                                <label htmlFor="permanentAddressLine1" className="form-label">Address Line 1*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="permanentAddressLine1"
                                    name="permanentAddressLine1"
                                    value={formData.permanentAddressLine1}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="permanentAddressLine2" className="form-label">Address Line 2</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="permanentAddressLine2"
                                    name="permanentAddressLine2"
                                    value={formData.permanentAddressLine2}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="permanentLandmark" className="form-label">Landmark</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="permanentLandmark"
                                    name="permanentLandmark"
                                    value={formData.permanentLandmark}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="permanentCity" className="form-label">City*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="permanentCity"
                                    name="permanentCity"
                                    value={formData.permanentCity}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="permanentState" className="form-label">State*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="permanentState"
                                    name="permanentState"
                                    value={formData.permanentState}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="permanentPincode" className="form-label">Pincode*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="permanentPincode"
                                    name="permanentPincode"
                                    value={formData.permanentPincode}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="occupationType" className="form-label">Occupation Type*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="occupationType"
                            name="occupationType"
                            value={formData.occupationType}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sourceOfIncome" className="form-label">Source of Income*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="sourceOfIncome"
                            name="sourceOfIncome"
                            value={formData.sourceOfIncome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="grossAnnualIncome" className="form-label">Gross Annual Income*</label>
                        <input
                            type="text"
                            className="form-control"
                            id="grossAnnualIncome"
                            name="grossAnnualIncome"
                            value={formData.grossAnnualIncome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="agreeToTerms"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleInputChange}
                                required
                            />
                            <label className={`${styles.formCheckLabel} form-check-label`} htmlFor="agreeToTerms">
                                I agree to terms and conditions.
                            </label>
                        </div>
                    </div>
                    {!mandatoryFieldsFilled && (
                        <div className={`alert alert-danger ${styles.alert}`} role="alert">
                            Please fill in all mandatory fields.
                        </div>
                    )}
                    <button type="submit" className={`btn btn-primary ${styles.customButton}`}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OpenSavingsAccountForm;

