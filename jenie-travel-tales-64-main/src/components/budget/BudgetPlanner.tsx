
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Slider } from "../ui/slider";
import './BudgetPlanner.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPlanner: React.FC = () => {
  const [totalBudget, setTotalBudget] = useState<number>(1000);
  const [stay, setStay] = useState<number>(40);
  const [food, setFood] = useState<number>(30);
  const [travel, setTravel] = useState<number>(20);
  const [activities, setActivities] = useState<number>(10);
  
  const [stayAmount, setStayAmount] = useState<number>(0);
  const [foodAmount, setFoodAmount] = useState<number>(0);
  const [travelAmount, setTravelAmount] = useState<number>(0);
  const [activitiesAmount, setActivitiesAmount] = useState<number>(0);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);
  
  // Calculate actual amounts based on percentages
  useEffect(() => {
    const calculatedStayAmount = (totalBudget * stay) / 100;
    const calculatedFoodAmount = (totalBudget * food) / 100;
    const calculatedTravelAmount = (totalBudget * travel) / 100;
    const calculatedActivitiesAmount = (totalBudget * activities) / 100;
    
    setStayAmount(calculatedStayAmount);
    setFoodAmount(calculatedFoodAmount);
    setTravelAmount(calculatedTravelAmount);
    setActivitiesAmount(calculatedActivitiesAmount);
    
    const totalSpent = calculatedStayAmount + calculatedFoodAmount + calculatedTravelAmount + calculatedActivitiesAmount;
    setRemainingBudget(totalBudget - totalSpent);
  }, [totalBudget, stay, food, travel, activities]);
  
  // Update slider backgrounds based on their values
  useEffect(() => {
    document.documentElement.style.setProperty('--stay-percent', `${stay}%`);
    document.documentElement.style.setProperty('--food-percent', `${food}%`);
    document.documentElement.style.setProperty('--travel-percent', `${travel}%`);
    document.documentElement.style.setProperty('--activities-percent', `${activities}%`);
  }, [stay, food, travel, activities]);
  
  const chartData = {
    labels: ['Stay', 'Food', 'Travel', 'Activities'],
    datasets: [
      {
        data: [stay, food, travel, activities],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const handleSliderChange = (
    value: number,
    category: 'stay' | 'food' | 'travel' | 'activities'
  ) => {
    // Update the selected category
    switch (category) {
      case 'stay':
        setStay(value);
        break;
      case 'food':
        setFood(value);
        break;
      case 'travel':
        setTravel(value);
        break;
      case 'activities':
        setActivities(value);
        break;
    }
    
    // Calculate total percentage
    const totalPercentage = 
      (category !== 'stay' ? stay : value) + 
      (category !== 'food' ? food : value) + 
      (category !== 'travel' ? travel : value) + 
      (category !== 'activities' ? activities : value);
    
    // If total exceeds 100%, adjust other values
    if (totalPercentage > 100) {
      const excess = totalPercentage - 100;
      const otherCategories = ['stay', 'food', 'travel', 'activities'].filter(c => c !== category);
      
      // Calculate total of other categories
      const otherTotal = otherCategories.reduce((sum, cat) => {
        switch (cat) {
          case 'stay': return sum + stay;
          case 'food': return sum + food;
          case 'travel': return sum + travel;
          case 'activities': return sum + activities;
          default: return sum;
        }
      }, 0);
      
      // Reduce each category proportionally
      otherCategories.forEach(cat => {
        const currentValue = (() => {
          switch (cat) {
            case 'stay': return stay;
            case 'food': return food;
            case 'travel': return travel;
            case 'activities': return activities;
            default: return 0;
          }
        })();
        
        if (otherTotal > 0) {
          const reduction = Math.round((currentValue / otherTotal) * excess);
          const newValue = Math.max(0, currentValue - reduction);
          
          switch (cat) {
            case 'stay': setStay(newValue); break;
            case 'food': setFood(newValue); break;
            case 'travel': setTravel(newValue); break;
            case 'activities': setActivities(newValue); break;
          }
        }
      });
    }
  };
  
  return (
    <div className="budget-planner card">
      <h3 className="budget-planner-title">Smart Budget Planner</h3>
      
      <div className="budget-input">
        <label htmlFor="total-budget">Total Budget ($)</label>
        <input
          type="number"
          id="total-budget"
          className="form-control"
          value={totalBudget}
          onChange={(e) => setTotalBudget(Math.max(0, parseInt(e.target.value) || 0))}
        />
      </div>
      
      <div className="budget-allocation">
        <div className="budget-chart">
          <Pie data={chartData} />
        </div>
        
        <div className="budget-sliders">
          <div className="form-group slider-group">
            <label>
              Stay: {stay}%
              <span className="amount">(${Math.round(stayAmount)})</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={stay}
              onChange={(e) => handleSliderChange(parseInt(e.target.value), 'stay')}
              className="slider stay-slider"
            />
          </div>
          
          <div className="form-group slider-group">
            <label>
              Food: {food}%
              <span className="amount">(${Math.round(foodAmount)})</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={food}
              onChange={(e) => handleSliderChange(parseInt(e.target.value), 'food')}
              className="slider food-slider"
            />
          </div>
          
          <div className="form-group slider-group">
            <label>
              Travel: {travel}%
              <span className="amount">(${Math.round(travelAmount)})</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={travel}
              onChange={(e) => handleSliderChange(parseInt(e.target.value), 'travel')}
              className="slider travel-slider"
            />
          </div>
          
          <div className="form-group slider-group">
            <label>
              Activities: {activities}%
              <span className="amount">(${Math.round(activitiesAmount)})</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={activities}
              onChange={(e) => handleSliderChange(parseInt(e.target.value), 'activities')}
              className="slider activities-slider"
            />
          </div>
        </div>
      </div>
      
      <div className="budget-table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Stay</TableCell>
              <TableCell>{stay}%</TableCell>
              <TableCell>${Math.round(stayAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell>{food}%</TableCell>
              <TableCell>${Math.round(foodAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Travel</TableCell>
              <TableCell>{travel}%</TableCell>
              <TableCell>${Math.round(travelAmount)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Activities</TableCell>
              <TableCell>{activities}%</TableCell>
              <TableCell>${Math.round(activitiesAmount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="budget-summary">
        <div className="total-spent">
          <span>Total Allocated:</span>
          <span>${Math.round(totalBudget - remainingBudget)}</span>
        </div>
        
        <div className="remaining-budget">
          <span>Unallocated Budget:</span>
          <span className={remainingBudget < 0 ? 'negative' : ''}>
            ${Math.round(remainingBudget)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
