
import React from 'react';
import EmergencyCard from '../components/emergency/EmergencyCard';
import BackButton from '../components/common/BackButton';
import './PageStyles.css';
import './PageBackground.css';

const EmergencyPage: React.FC = () => {
  return (
    <div className="page-background emergency-background">
      <div className="page-overlay">
        <div className="container page-content">
          <BackButton />
          <h1 className="page-title">Emergency Information</h1>
          
          <section className="page-section">
            <p className="page-description">
              Keep important emergency contacts and information handy during your travels. 
              Download your emergency card for offline access.
            </p>
            
            <EmergencyCard />
          </section>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
