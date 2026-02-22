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

    const vehiclesToFilter =
      vehicleType === 'car' ? vehicleData.cars : vehicleData.bikes;

    setFilteredVehicles(vehiclesToFilter);
    setShowFiltered(true);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 2000);
  };

  const featuredVehicles = [
    ...vehicleData.cars.slice(0, 2),
    ...vehicleData.bikes.slice(0, 2)
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>Your Journey, Our Ride</h1>
          <p>Find best cars and bikes for hill stations.</p>

          <form onSubmit={handleSearchSubmit}>

            <select
              name="vehicleType"
              value={searchForm.vehicleType}
              onChange={handleInputChange}
            >
              <option value="">Select Vehicle</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>

            <input
              type="date"
              name="pickupDate"
              value={searchForm.pickupDate}
              onChange={handleInputChange}
              min={minDate}
            />

            <input
              type="date"
              name="returnDate"
              value={searchForm.returnDate}
              onChange={handleInputChange}
              min={searchForm.pickupDate || minDate}
            />

            <select
              name="location"
              value={searchForm.location}
              onChange={handleInputChange}
            >
              <option value="">Select Location</option>
              {locations.map(loc => (
                <option key={loc}>{loc}</option>
              ))}
            </select>

            <button type="submit">Search</button>

          </form>

        </div>
      </section>

      {/* FEATURED */}
      <section className="container">
        <h2>Featured Vehicles</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" }}>
          {featuredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

      </section>

      {/* FILTERED */}
      {showFiltered && (
        <section className="container">
          <h2>Search Results</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "20px" }}>
            {filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

        </section>
      )}

      {/* POPUP */}
      {showPopup && (
        <div style={{ position: "fixed", top: "20px", right: "20px", background: "green", color: "white", padding: "10px" }}>
          Search Complete!
        </div>
      )}

    </div>
  );
};

export default Home;