
import React from 'react';
import './EmergencyCard.css';

const EmergencyCard: React.FC = () => {
  const emergencyInfo = {
    police: {
      general: '100',
      tourist: '+91-11-23747445'
    },
    ambulance: '108',
    embassies: {
      us: '+91-11-2419-8000',
      uk: '+91-11-2419-2100',
      australia: '+91-11-4139-9900',
      canada: '+91-11-4178-2000'
    },
    hospitals: [
      {
        name: 'Apollo Hospital',
        phone: '+91-11-2692-5858',
        address: 'Sarita Vihar, Delhi-Mathura Road, New Delhi'
      },
      {
        name: 'Fortis Hospital',
        phone: '+91-11-4277-6222',
        address: 'Okhla road, Sukhdev Vihar Metro Station, New Delhi'
      }
    ]
  };
  
  const downloadEmergencyCard = () => {
    // In a real implementation, this would use html2pdf.js
    // For mock purposes, we'll just alert the user
    alert('Emergency card downloaded!');
  };
  
  return (
    <div className="emergency-card card">
      <h3 className="emergency-title">Emergency Information</h3>
      
      <div className="emergency-content">
        <div className="emergency-section">
          <h4 className="section-label">Emergency Numbers</h4>
          <div className="emergency-numbers">
            <div className="emergency-item">
              <span className="item-label">Police (General):</span>
              <span className="item-value">{emergencyInfo.police.general}</span>
            </div>
            <div className="emergency-item">
              <span className="item-label">Tourist Police:</span>
              <span className="item-value">{emergencyInfo.police.tourist}</span>
            </div>
            <div className="emergency-item">
              <span className="item-label">Ambulance:</span>
              <span className="item-value">{emergencyInfo.ambulance}</span>
            </div>
          </div>
        </div>
        
        <div className="emergency-section">
          <h4 className="section-label">Embassy Contacts</h4>
          <div className="embassy-contacts">
            <div className="emergency-item">
              <span className="item-label">US Embassy:</span>
              <span className="item-value">{emergencyInfo.embassies.us}</span>
            </div>
            <div className="emergency-item">
              <span className="item-label">UK Embassy:</span>
              <span className="item-value">{emergencyInfo.embassies.uk}</span>
            </div>
            <div className="emergency-item">
              <span className="item-label">Australian Embassy:</span>
              <span className="item-value">{emergencyInfo.embassies.australia}</span>
            </div>
            <div className="emergency-item">
              <span className="item-label">Canadian Embassy:</span>
              <span className="item-value">{emergencyInfo.embassies.canada}</span>
            </div>
          </div>
        </div>
        
        <div className="emergency-section">
          <h4 className="section-label">Hospitals</h4>
          <div className="hospitals-list">
            {emergencyInfo.hospitals.map((hospital, index) => (
              <div key={index} className="hospital-card">
                <h5 className="hospital-name">{hospital.name}</h5>
                <p className="hospital-phone">{hospital.phone}</p>
                <p className="hospital-address">{hospital.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <button 
        className="btn btn-primary download-btn"
        onClick={downloadEmergencyCard}
      >
        Download Emergency Card
      </button>
    </div>
  );
};

export default EmergencyCard;
