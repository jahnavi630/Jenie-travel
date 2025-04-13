
import React from 'react';
import TravelChat from './TravelChat';
import PackingAssistant from './PackingAssistant';
import EmergencyKitScanner from './EmergencyKitScanner';
import TimelineGenerator from './TimelineGenerator';
import WeatherAdvisor from './WeatherAdvisor';
import CalendarMock from './CalendarMock';
import TravelFilter from './TravelFilter';
import BudgetOptimizer from './BudgetOptimizer';
import TravelTrivia from './TravelTrivia';
import '../../styles/jenie.css';

const JenieAssistant: React.FC = () => {
  return (
    <div className="jenie-tools-container">
      <div className="jenie-grid">
        {/* Conversational Travel Planner */}
        <div className="jenie-tool-card travel-chat-card">
          <div className="card-header">
            <h3 className="card-title">🧠 Travel Chat</h3>
            <p className="card-description">Ask Jenie to plan your perfect trip</p>
          </div>
          <div className="card-content">
            <TravelChat />
          </div>
        </div>

        {/* Smart Packing Assistant */}
        <div className="jenie-tool-card packing-card">
          <div className="card-header">
            <h3 className="card-title">📦 Packing Assistant</h3>
            <p className="card-description">Get personalized packing suggestions</p>
          </div>
          <div className="card-content">
            <PackingAssistant />
          </div>
        </div>

        {/* Emergency Kit Scanner */}
        <div className="jenie-tool-card emergency-card">
          <div className="card-header">
            <h3 className="card-title">🛑 Emergency Kit Scanner</h3>
            <p className="card-description">Check if your emergency kit is complete</p>
          </div>
          <div className="card-content">
            <EmergencyKitScanner />
          </div>
        </div>

        {/* AI Travel Timeline Generator */}
        <div className="jenie-tool-card timeline-card">
          <div className="card-header">
            <h3 className="card-title">📅 Travel Timeline</h3>
            <p className="card-description">Generate a day-by-day itinerary</p>
          </div>
          <div className="card-content">
            <TimelineGenerator />
          </div>
        </div>

        {/* Live Weather + Travel Safety Advice */}
        <div className="jenie-tool-card weather-card">
          <div className="card-header">
            <h3 className="card-title">🌦️ Weather Advisor</h3>
            <p className="card-description">Get real-time weather and safety tips</p>
          </div>
          <div className="card-content">
            <WeatherAdvisor />
          </div>
        </div>

        {/* Google Calendar Integration */}
        <div className="jenie-tool-card calendar-card">
          <div className="card-header">
            <h3 className="card-title">📆 Save to Calendar</h3>
            <p className="card-description">Export your travel plans to your calendar</p>
          </div>
          <div className="card-content">
            <CalendarMock />
          </div>
        </div>

        {/* Family/Solo Travel Filter */}
        <div className="jenie-tool-card filter-card">
          <div className="card-header">
            <h3 className="card-title">🧑‍👩‍👧 Travel Filter</h3>
            <p className="card-description">Personalize recommendations for solo or family travel</p>
          </div>
          <div className="card-content">
            <TravelFilter />
          </div>
        </div>

        {/* Smart Budget Optimization */}
        <div className="jenie-tool-card budget-card">
          <div className="card-header">
            <h3 className="card-title">💸 Budget Optimizer</h3>
            <p className="card-description">Smart tips to save money on your trip</p>
          </div>
          <div className="card-content">
            <BudgetOptimizer />
          </div>
        </div>

        {/* Travel Trivia */}
        <div className="jenie-tool-card trivia-card">
          <div className="card-header">
            <h3 className="card-title">🎮 Travel Trivia</h3>
            <p className="card-description">Discover interesting facts about destinations</p>
          </div>
          <div className="card-content">
            <TravelTrivia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JenieAssistant;
