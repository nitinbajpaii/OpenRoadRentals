import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

    // Save search data to localStorage for booking page
    localStorage.setItem('homeSearchData', JSON.stringify(searchForm));

    // Filter vehicles based on search criteria
    const vehiclesToFilter = vehicleType === 'car' ? vehicleData.cars : vehicleData.bikes;
    setFilteredVehicles(vehiclesToFilter);
    setShowFiltered(true);

    setShowPopup(true);
    
    setTimeout(() => {
      setShowPopup(false);
      document.getElementById('filtered-results').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };

  const featuredVehicles = [
    ...vehicleData.cars.slice(0, 2),
    ...vehicleData.bikes.slice(0, 2)
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Your Journey, Our Ride</h1>
          <p>Experience the thrill of hill station roads with our premium cars and bikes.</p>

          <div className="search-bar">
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <div className="search-group">
                <label htmlFor="vehicleType">Vehicle Type</label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={searchForm.vehicleType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                </select>
              </div>

              <div className="search-group">
                <label htmlFor="pickupDate">Pickup Date</label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={searchForm.pickupDate}
                  onChange={handleInputChange}
                  required
                  min={minDate}
                />
              </div>

              <div className="search-group">
                <label htmlFor="returnDate">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={searchForm.returnDate}
                  onChange={handleInputChange}
                  required
                  min={searchForm.pickupDate || minDate}
                />
              </div>

              <div className="search-group">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  name="location"
                  value={searchForm.location}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="search-btn">Search Vehicles</button>
            </form>
          </div>
        </div>
      </section>

      {/* Filtered Results */}
      {showFiltered && (
        <section className="filtered-results" id="filtered-results">
          <div className="container">
            <h2 className="section-title">
              Search Results for {searchForm.vehicleType}s in {searchForm.location}
            </h2>
            <div className="vehicle-grid">
              {filteredVehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Vehicles */}
      <section className="featured-vehicles" id="featured">
        <div className="container">
          <h2 className="section-title">Featured Vehicles</h2>
          <div className="vehicle-grid">
            {featuredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Hill Stations */}
      <section className="hill-stations">
        <div className="container">
          <h2 className="section-title">Top Hill Stations</h2>
          <div className="station-grid">
            {hillStations.map(station => (
              <div key={station.name} className="station-card">
                <div className="station-img">
                  <img src={station.image} alt={station.name} />
                </div>
                <div className="station-info">
                  <h3>{station.name}</h3>
                  <p>{station.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popup */}
      {showPopup && (
        <div className="popup-modal">
          <div className="popup-content">
            <h2>Search Complete!</h2>
            <p>Found {filteredVehicles.length} {searchForm.vehicleType}(s) available in {searchForm.location}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
