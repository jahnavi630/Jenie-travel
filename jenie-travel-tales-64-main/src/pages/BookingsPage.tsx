
import React, { useEffect, useState } from 'react';
import TransportBooking from '../components/transport/TransportBooking';
import LeafletMap from '../components/maps/LeafletMap';
import BackButton from '../components/common/BackButton';
import './PageStyles.css';
import './PageBackground.css';

const BookingsPage: React.FC = () => {
  const [travelDetails, setTravelDetails] = useState<any>(null);
  
  useEffect(() => {
    // Get travel details from localStorage if available
    const storedDetails = localStorage.getItem('travelDetails');
    if (storedDetails) {
      setTravelDetails(JSON.parse(storedDetails));
    }
  }, []);
  
  return (
    <div className="page-background bookings-background">
      <div className="page-overlay">
        <div className="container page-content">
          <BackButton />
          <h1 className="page-title">Bookings</h1>
          
          {travelDetails && (
            <>
              <div className="alert-card">
                <h3>Your Travel Plan</h3>
                <p>Starting Point: <strong>{travelDetails.startingPoint}</strong></p>
                <p>Destination: <strong>{travelDetails.destination}</strong></p>
                <p>Budget: <strong>${travelDetails.budget}</strong></p>
              </div>
              
              {/* Show LeafletMap with demo coordinates */}
              <div className="travel-route-map card">
                <h3>Your Route</h3>
                <LeafletMap
                  startPoint={{
                    name: travelDetails.startingPoint,
                    coordinates: [20.5937, 78.9629] // Default to center of India
                  }}
                  endPoint={{
                    name: travelDetails.destination,
                    coordinates: [28.6139, 77.2090] // Default to Delhi
                  }}
                />
              </div>
            </>
          )}
          
          <section className="page-section">
            <h2 className="section-title">Find and Book Transport</h2>
            <TransportBooking />
          </section>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
