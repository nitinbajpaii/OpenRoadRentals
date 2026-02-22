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
      vehicleType === 'car'
        ? vehicleData.cars
        : vehicleData.bikes;

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

        <div className="container hero-content">

          <h1>Your Journey, Our Ride</h1>

          <p>
            Experience the thrill of hill station roads with our premium cars and bikes.
          </p>


          {/* SEARCH CARD */}
          <div className="search-bar">

            <form
              className="search-form"
              onSubmit={handleSearchSubmit}
            >

              {/* VEHICLE TYPE */}
              <div className="search-group">

                <label>Vehicle Type</label>

                <select
                  name="vehicleType"
                  value={searchForm.vehicleType}
                  onChange={handleInputChange}
                >

                  <option value="">Select Vehicle Type</option>

                  <option value="car">Car</option>

                  <option value="bike">Bike</option>

                </select>

              </div>


              {/* PICKUP DATE */}
              <div className="search-group">

                <label>Pickup Date</label>

                <input
                  type="date"
                  name="pickupDate"
                  value={searchForm.pickupDate}
                  onChange={handleInputChange}
                  min={minDate}
                />

              </div>


              {/* RETURN DATE */}
              <div className="search-group">

                <label>Return Date</label>

                <input
                  type="date"
                  name="returnDate"
                  value={searchForm.returnDate}
                  onChange={handleInputChange}
                  min={searchForm.pickupDate || minDate}
                />

              </div>


              {/* LOCATION */}
              <div className="search-group">

                <label>Location</label>

                <select
                  name="location"
                  value={searchForm.location}
                  onChange={handleInputChange}
                >

                  <option value="">Select Location</option>

                  {locations.map(loc => (

                    <option key={loc}>
                      {loc}
                    </option>

                  ))}

                </select>

              </div>


              {/* BUTTON */}
              <button
                type="submit"
                className="search-btn"
              >
                Search Vehicles
              </button>


            </form>

          </div>

        </div>

      </section>


      {/* FEATURED */}
      <section className="featured-vehicles">

        <div className="container">

          <h2 className="section-title">
            Featured Vehicles
          </h2>

          <div className="vehicle-grid">

            {featuredVehicles.map(vehicle => (

              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
              />

            ))}

          </div>

        </div>

      </section>


      {/* FILTERED */}
      {showFiltered && (

        <section className="filtered-results">

          <div className="container">

            <h2 className="section-title">
              Search Results
            </h2>

            <div className="vehicle-grid">

              {filteredVehicles.map(vehicle => (

                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                />

              ))}

            </div>

          </div>

        </section>

      )}


      {/* POPUP */}
      {showPopup && (

        <div className="popup-modal">

          <div className="popup-content">

            Search Complete!

          </div>

        </div>

      )}

    </div>

  );

};

export default Home;