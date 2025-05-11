import React, { useState, useRef } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import MedicalRecord from './MedicalRecord';
import RequestMedicalExcuse from './RequestMedicalExecuse';

import './patientprofile.css';

const PatientProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [activePage, setActivePage] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState({
    name: "Selim Abotaleb",
    email: "Selimabotaleb@gmail.com",
    phone: "01209914522",
    age: 22,
    major: "Computer Science",
    id: "200013292",
    university: "Your University Name",
    academicYear: "3rd Year"
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPatient({
          ...patient,
          profileImage: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: value
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
    console.log("Saved changes:", patient);
  };

  const goToHome = () => {
    navigate('/');
  };

  const logout = () => {
    navigate('/logIn');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'MedicalRecord':
        return <MedicalRecord />;
      case 'RequestMedicalExcuse':
        return <RequestMedicalExcuse />;
      case 'profile':
      default:
        return (
          <div className="profile-content">
            <div className="profile-header">
              <div className="profile-image-container" onClick={triggerFileInput}>
                <div className="profile-image-overlay">Change Photo</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              <div>
                <h2>{patient.name}</h2>
                <p className="profile-title">{patient.major} Student</p>
              </div>
            </div>

            <div className="rating-box">
              <img src="iscon-identification 1.png" alt="ID" className="icon" />
              Student ID: {patient.id}
            </div>

            <div className="contact-box">
              <div className="contact-header">
                <h3>Contact</h3>
                {isEditing ? (
                  <button onClick={saveChanges} className="save-btn">Save</button>
                ) : (
                  <button onClick={toggleEdit} className="edit-btn">Edit</button>
                )}
              </div>
              
              {isEditing ? (
                <>
                  <div className="editable-field">
                    <img src="phone-call.png" alt="Phone" className="icon" />
                    <input
                      type="text"
                      name="phone"
                      value={patient.phone}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="editable-field">
                    <img src="iscon-identification 1.png" alt="ID" className="icon" />
                    <span>{patient.id}</span>
                  </div>
                  <div className="editable-field">
                    <img src="mail.png" alt="Email" className="icon" />
                    <input
                      type="email"
                      name="email"
                      value={patient.email}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <img src="phone-call.png" alt="Phone" className="icon" />
                    {patient.phone}
                  </p>
                  <p>
                    <img src="iscon-identification 1.png" alt="ID" className="icon" />
                    {patient.id}
                  </p>
                  <p>
                    <img src="mail.png" alt="Email" className="icon" />
                    {patient.email}
                  </p>
                </>
              )}
            </div>

            <div className="details-box">
              <h3>Student Details</h3>
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Major:</strong> {patient.major}</p>
              <p><strong>University:</strong> {patient.university}</p>
              <p><strong>Academic Year:</strong> {patient.academicYear}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="sidebar-item" onClick={goToHome}>
          <img src="icon-home.png" alt="Home" className="sidebar-icon" />
          <span>Home</span>
        </div>
        <div className="sidebar-item" onClick={() => setActivePage('profile')}>
          <img src="icon-User.png" alt="Profile" className="sidebar-icon" />
          <span>My Profile</span>
        </div>
        <div className="sidebar-item" onClick={() => setActivePage('MedicalRecord')}>
          <img src="icon-report.png" alt="Medical Record" className="sidebar-icon" />
          <span>Medical Record</span>
        </div>
        <div className="sidebar-item" onClick={() => setActivePage('RequestMedicalExcuse')}>
          <img src="icon-event.png" alt="Request Excuse" className="sidebar-icon" />
          <span>Request Medical Excuse</span>
        </div>
        <div className="sidebar-logout" onClick={logout}>
          <img src="logout 1.png" alt="Logout" className="sidebar-icon" />
          <span>Logout</span>
        </div>
      </div>
      <div className="main-content">
        {renderContent()}
        <Routes>
          <Route path="/MedicalRecord" element={<MedicalRecord />} />
          <Route path="/RequestMedicalExcuse" element={<RequestMedicalExcuse />} />
          <Route path="*" element={<Navigate to="/PatientProfile" />} />
        </Routes>
      </div>
    </div>
  );
};

export default PatientProfile;