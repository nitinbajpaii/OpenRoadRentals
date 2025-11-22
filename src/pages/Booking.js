// UPDATED BOOKING COMPONENT WITH BACK-DATE LOCK

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { bookingService } from '../services/bookingService';
import { vehicleData, locations } from '../utils/vehicleData';
import VehicleCard from '../components/VehicleCard';
import './Booking.css';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, setIntendedRoute } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem('bookingActiveTab');
    if (saved) return saved;
    
    const homeSearch = localStorage.getItem('homeSearchData');
    if (homeSearch) {
      const searchData = JSON.parse(homeSearch);
      return searchData.vehicleType || 'car';
    }
    
    return 'car';
  });
  const [selectedVehicle, setSelectedVehicle] = useState(() => {
    const saved = localStorage.getItem('bookingSelectedVehicle');
    return saved ? JSON.parse(saved) : null;
  });
  const [bookingForm, setBookingForm] = useState(() => {
    const saved = localStorage.getItem('bookingForm');
    const homeSearch = localStorage.getItem('homeSearchData');
    
    if (saved) {
      return JSON.parse(saved);
    } else if (homeSearch) {
      const searchData = JSON.parse(homeSearch);
      return {
        pickupDate: searchData.pickupDate || '',
        returnDate: searchData.returnDate || '',
        location: searchData.location || ''
      };
    }
    
    return {
      pickupDate: '',
      returnDate: '',
      location: ''
    };
  });
  const [errors, setErrors] = useState({});

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  useEffect(() => {
    if (!isAuthenticated()) {
      const currentPath = `/booking${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      setIntendedRoute(currentPath);
      navigate('/login');
      return;
    }

    const vehicleId = searchParams.get('vehicle');
    if (vehicleId) {
      const allVehicles = [...vehicleData.cars, ...vehicleData.bikes];
      const vehicle = allVehicles.find(v => v.id === vehicleId);
      if (vehicle) {
        setSelectedVehicle(vehicle);
        setActiveTab(vehicleId.startsWith('car') ? 'car' : 'bike');
      }
    }
  }, [searchParams, isAuthenticated, navigate, setIntendedRoute]);

  const handleInputChange = (e) => {
    const updatedForm = {
      ...bookingForm,
      [e.target.name]: e.target.value
    };
    setBookingForm(updatedForm);
    localStorage.setItem('bookingForm', JSON.stringify(updatedForm));

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    localStorage.setItem('bookingSelectedVehicle', JSON.stringify(vehicle));
  };

  const calculateDays = () => {
    if (bookingForm.pickupDate && bookingForm.returnDate) {
      const start = new Date(bookingForm.pickupDate);
      const end = new Date(bookingForm.returnDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    if (selectedVehicle) return selectedVehicle.price * calculateDays();
    return 0;
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!bookingForm.pickupDate) {
      newErrors.pickupDate = 'Please select a pickup date';
    } else if (new Date(bookingForm.pickupDate) < today) {
      newErrors.pickupDate = 'Pickup date cannot be in the past';
    }

    if (!bookingForm.returnDate) {
      newErrors.returnDate = 'Please select a return date';
    } else if (new Date(bookingForm.returnDate) < today) {
      newErrors.returnDate = 'Return date cannot be in the past';
    } else if (new Date(bookingForm.returnDate) <= new Date(bookingForm.pickupDate)) {
      newErrors.returnDate = 'Return date must be after pickup date';
    }

    if (!bookingForm.location) newErrors.location = 'Please select a pickup location';
    if (!selectedVehicle) newErrors.vehicle = 'Please select a vehicle';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const days = calculateDays();
    const totalAmount = calculateTotal();

    const booking = bookingService.createBooking({
      vehicle: selectedVehicle,
      pickupDate: bookingForm.pickupDate,
      returnDate: bookingForm.returnDate,
      location: bookingForm.location,
      days,
      totalAmount,
      user: currentUser
    });

    localStorage.removeItem('bookingForm');
    localStorage.removeItem('bookingSelectedVehicle');
    localStorage.removeItem('bookingActiveTab');
    navigate(`/confirmation?id=${booking.id}`);
  };



  const currentVehicles = activeTab === 'car' ? vehicleData.cars : vehicleData.bikes;

  return (
    <div className="booking-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Book Your Vehicle</h1>
          <p className="page-subtitle">Choose your perfect ride for an unforgettable hill station adventure</p>
        </div>
      </div>

      <section className="booking-section">
        <div className="container">
          <div className="booking-content">

            {/* Vehicle Selection */}
            <div className="vehicle-selection">
              <h3>Select Your Vehicle</h3>

              <div className="vehicle-tabs">
                <div className={`vehicle-tab ${activeTab === 'car' ? 'active' : ''}`} onClick={() => {
                  setActiveTab('car');
                  localStorage.setItem('bookingActiveTab', 'car');
                }}>Cars</div>
                <div className={`vehicle-tab ${activeTab === 'bike' ? 'active' : ''}`} onClick={() => {
                  setActiveTab('bike');
                  localStorage.setItem('bookingActiveTab', 'bike');
                }}>Bikes</div>
              </div>

              <div className="vehicle-list">
                {currentVehicles.map(vehicle => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isSelectable={true}
                    isSelected={selectedVehicle?.id === vehicle.id}
                    onSelect={handleVehicleSelect}
                  />
                ))}
              </div>

              {errors.vehicle && <div className="error-message">{errors.vehicle}</div>}
            </div>

            {/* Booking Form */}
            <div className="booking-form">
              <h3>Booking Details</h3>

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="pickupDate">Pickup Date</label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    className="form-control"
                    value={bookingForm.pickupDate}
                    onChange={handleInputChange}
                    required
                    min={minDate}   // BACK DATE LOCK
                  />
                  {errors.pickupDate && <div className="error-message">{errors.pickupDate}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="returnDate">Return Date</label>
                  <input
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    className="form-control"
                    value={bookingForm.returnDate}
                    onChange={handleInputChange}
                    required
                    min={bookingForm.pickupDate || minDate}   // AUTO LOCK BASED ON PICKUP DATE
                  />
                  {errors.returnDate && <div className="error-message">{errors.returnDate}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="location">Pickup Location</label>
                  <select
                    id="location"
                    name="location"
                    className="form-control"
                    value={bookingForm.location}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  {errors.location && <div className="error-message">{errors.location}</div>}
                </div>

                <div className="booking-summary">
                  <h4 className="summary-title">Booking Summary</h4>

                  <div className="summary-item">
                    <span>Selected Vehicle:</span>
                    <span>{selectedVehicle ? selectedVehicle.name : 'Not selected'}</span>
                  </div>

                  <div className="summary-item">
                    <span>Rental Period:</span>
                    <span>{calculateDays()} days</span>
                  </div>

                  <div className="summary-item">
                    <span>Daily Rate:</span>
                    <span>₹{selectedVehicle ? selectedVehicle.price.toLocaleString() : '0'}</span>
                  </div>

                  <div className="summary-item summary-total">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                <button type="submit" className="submit-btn">Confirm Booking</button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
