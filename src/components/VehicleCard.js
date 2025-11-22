import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './VehicleCard.css';

const VehicleCard = ({ vehicle, isSelectable = false, isSelected = false, onSelect }) => {
  const { isAuthenticated, setIntendedRoute } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isSelectable && onSelect) {
      onSelect(vehicle);
    }
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      setIntendedRoute(`/booking?vehicle=${vehicle.id}`);
      navigate('/login');
      return;
    }
    navigate(`/booking?vehicle=${vehicle.id}`);
  };

  return (
    <div 
      className={`vehicle-card ${isSelected ? 'selected' : ''} ${isSelectable ? 'selectable' : ''}`}
      onClick={handleClick}
    >
      <div className="vehicle-img">
        <img src={vehicle.image} alt={vehicle.name} />
      </div>
      <div className="vehicle-info">
        <h3>{vehicle.name}</h3>
        {vehicle.description && <p>{vehicle.description}</p>}
        <div className="vehicle-price">₹{vehicle.price.toLocaleString()}/day</div>
        <div className="vehicle-features">
          {vehicle.features.map((feature, index) => (
            <span key={index}>{feature}</span>
          ))}
        </div>
        {!isSelectable && (
          <button onClick={handleBookNow} className="btn">
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default VehicleCard;