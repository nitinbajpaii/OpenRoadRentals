import React, { useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import { vehicleData, locations, hillStations } from '../utils/vehicleData';
import './Home.css';

const Home = () => {
  const [searchForm, setSearchForm] = useState({
    vehicleType: '',
    pickupDate: '',
    returnDate: '',
    location: ''
  });

  const [showPopup, setShowPopup] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const handleInputChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const { vehicleType, pickupDate, returnDate, location } = searchForm;

    if (!vehicleType || !pickupDate || !returnDate || !location) {
      alert('Please fill all fields');
      return;
    }

    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    today.setHours(0, 0, 0, 0);

    if (returnD < pickup) {
      alert('Return date cannot be before pickup date');
      return;
    }

    localStorage.setItem('homeSearchData', JSON.stringify(searchForm));

    const vehiclesToFilter =
      vehicleType === 'car' ? vehicleData.cars : vehicleData.bikes;

    setFilteredVehicles(vehiclesToFilter);
    setShowFiltered(true);

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      document
        .getElementById('filtered-results')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };

  const featuredVehicles = [
    ...vehicleData.cars.slice(0, 2),
    ...vehicleData.bikes.slice(0, 2)
  ];

  return (
    <div className="home">
      {/* your full JSX remains same */}
    </div>
  );
};

export default Home;