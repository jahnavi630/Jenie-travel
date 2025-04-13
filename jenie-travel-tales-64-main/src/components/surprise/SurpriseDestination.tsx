
import React, { useState } from 'react';
import './SurpriseDestination.css';
import LeafletMap from '../maps/LeafletMap';

interface Destination {
  destination: string;
  description: string;
  topThingsToDo: string[];
  idealTime: string;
  estimatedBudget: string;
  highlight: string;
  imageUrl: string;
  vibe: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const SurpriseDestination: React.FC = () => {
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const surpriseDestinations: Destination[] = [
    {
      destination: "Ziro Valley, Arunachal Pradesh",
      description: "Nestled in the lush hills of Arunachal, Ziro Valley is a tranquil escape famous for its rice fields, Apatani tribe, and music festivals.",
      topThingsToDo: [
        "Attend the Ziro Music Festival in September",
        "Explore Talley Valley Wildlife Sanctuary and spot clouded leopards",
        "Visit the traditional Apatani villages and learn about their unique nose plugs tradition"
      ],
      idealTime: "September to November",
      estimatedBudget: "₹12,000 - ₹16,000",
      highlight: "The valley is home to the Apatani tribe, known for sustainable farming practices and vibrant cultural traditions",
      imageUrl: "https://source.unsplash.com/1600x900/?ziro valley,arunachal,travel",
      vibe: "🌾🎵🌄",
      coordinates: {
        lat: 27.6350,
        lng: 93.8266
      }
    },
    {
      destination: "Santorini, Greece",
      description: "A breathtaking volcanic island known for its stunning white buildings with blue domes, perched on cliffs overlooking the Aegean Sea.",
      topThingsToDo: [
        "Watch the sunset from Oia - arrive early to secure a good spot",
        "Explore ancient ruins at Akrotiri, the 'Pompeii of Greece'",
        "Take a catamaran cruise around the caldera with stops for swimming"
      ],
      idealTime: "April to early June or September to October",
      estimatedBudget: "$1,500 - $2,500",
      highlight: "The island was formed by one of the largest volcanic eruptions in history, about 3,600 years ago",
      imageUrl: "https://source.unsplash.com/1600x900/?santorini,greece,travel",
      vibe: "🏝️🌅🍷",
      coordinates: {
        lat: 36.3932,
        lng: 25.4615
      }
    },
    {
      destination: "Kyoto, Japan",
      description: "The cultural heart of Japan, Kyoto enchants visitors with its thousands of classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.",
      topThingsToDo: [
        "Visit the Fushimi Inari Shrine early morning to avoid crowds and photograph the iconic red torii gates",
        "Experience a traditional tea ceremony at Camellia tea ceremony in the Higashiyama district",
        "Rent a kimono and stroll through the historic Gion district, possibly spotting a geisha"
      ],
      idealTime: "March-May for cherry blossoms or October-November for autumn colors",
      estimatedBudget: "$1,200 - $2,000",
      highlight: "Kyoto was spared from bombing during WWII due to its cultural significance, preserving much of its historical architecture",
      imageUrl: "https://source.unsplash.com/1600x900/?kyoto,japan,travel",
      vibe: "🏯🍵🌸",
      coordinates: {
        lat: 35.0116,
        lng: 135.7681
      }
    },
    {
      destination: "Coorg, Karnataka",
      description: "Known as the Scotland of India, Coorg captivates with its misty hills, coffee plantations, and the unique culture of the Kodava people.",
      topThingsToDo: [
        "Trek to Tadiandamol Peak for panoramic views of the Western Ghats",
        "Take a plantation tour at Tata Coffee and learn about sustainable coffee farming",
        "White-water raft on the Barapole River during monsoon season"
      ],
      idealTime: "October to March, though monsoon (June-September) offers lush landscapes",
      estimatedBudget: "₹8,000 - ₹12,000",
      highlight: "Coorg is India's largest coffee-producing region and one of the world's best coffee growing areas",
      imageUrl: "https://source.unsplash.com/1600x900/?coorg,karnataka,travel",
      vibe: "☕🌧️🌿",
      coordinates: {
        lat: 12.4244,
        lng: 75.7382
      }
    },
    {
      destination: "Cappadocia, Turkey",
      description: "A fairytale landscape of unique rock formations, underground cities, and hot air balloons floating over a surreal terrain.",
      topThingsToDo: [
        "Take a hot air balloon ride at sunrise - book at least 3 months in advance",
        "Explore the underground city of Derinkuyu, which could shelter 20,000 people",
        "Stay in an authentic cave hotel for a unique accommodation experience"
      ],
      idealTime: "April to June or September to October for mild weather and balloon flights",
      estimatedBudget: "$800 - $1,500",
      highlight: "Some of the 'fairy chimneys' were hollowed out as refuges by early Christians fleeing Roman persecution",
      imageUrl: "https://source.unsplash.com/1600x900/?cappadocia,turkey,travel",
      vibe: "🎈🏜️✨",
      coordinates: {
        lat: 38.6431,
        lng: 34.8307
      }
    }
  ];
  
  const generateSurprise = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * surpriseDestinations.length);
      setDestination(surpriseDestinations[randomIndex]);
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="surprise-destination card">
      <h3 className="surprise-title">Feeling Adventurous?</h3>
      
      <button 
        className="btn btn-accent surprise-btn"
        onClick={generateSurprise}
        disabled={loading}
      >
        {loading ? 'Finding Magic...' : 'Surprise Me!'}
      </button>
      
      {destination && (
        <div className="destination-card">
          <div className="destination-image-container">
            <img 
              src={destination.imageUrl} 
              alt={destination.destination} 
              className="destination-image"
              onError={(e) => {
                // Fallback in case the image doesn't load
                (e.target as HTMLImageElement).src = 'https://source.unsplash.com/1600x900/?travel,landscape';
              }}
            />
            <div className="destination-vibe">{destination.vibe}</div>
          </div>
          
          <div className="destination-content">
            <h4 className="destination-name">{destination.destination}</h4>
            <p className="destination-description">{destination.description}</p>
            
            <LeafletMap
              startPoint={{
                name: "Your Location",
                coordinates: [20.5937, 78.9629] // Default to center of India
              }}
              endPoint={{
                name: destination.destination,
                coordinates: [destination.coordinates.lat, destination.coordinates.lng]
              }}
              height="400px"
            />
            
            <div className="destination-details">
              <div className="detail-item">
                <h5>Top Things to Do</h5>
                <ul className="things-to-do">
                  {destination.topThingsToDo.map((thing, index) => (
                    <li key={index}>{thing}</li>
                  ))}
                </ul>
              </div>
              
              <div className="detail-item">
                <h5>Best Time to Visit</h5>
                <p>{destination.idealTime}</p>
              </div>
              
              <div className="detail-item">
                <h5>Estimated Budget</h5>
                <p>{destination.estimatedBudget}</p>
              </div>
              
              <div className="detail-item">
                <h5>Highlight</h5>
                <p>{destination.highlight}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurpriseDestination;
