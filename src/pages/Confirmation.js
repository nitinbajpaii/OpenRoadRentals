import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { bookingService } from '../services/bookingService';
import './Confirmation.css';

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);

    const bookingId = searchParams.get('id');
    if (!bookingId) {
      navigate('/booking');
      return;
    }

    const bookingData = bookingService.getBookingById(bookingId);
    if (!bookingData) {
      navigate('/booking');
      return;
    }

    setBooking(bookingData);
  }, [searchParams, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (!booking || !currentUser) {
    return (
      <div className="confirmation-page">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  const subtotal = booking.vehicle.price * booking.days;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;

  return (
    <div className="confirmation-page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Booking Confirmation</h1>
          <p className="page-subtitle">Your adventure is confirmed! Here are your booking details</p>
        </div>
      </div>
      
      <section className="confirmation-section">
        <div className="container">
          <div className="confirmation-container">
            <div className="confirmation-header">
              <h2>Thank You for Your Booking!</h2>
              <p>Your reservation has been confirmed and is ready to go.</p>
            </div>
            
            <div className="confirmation-content">
              <div className="booking-id">
                <p>Booking Reference:</p>
                <span>{booking.id}</span>
              </div>
              
              <div className="booking-details">
                <div className="detail-column">
                  <div className="detail-group">
                    <h3>Vehicle Details</h3>
                    <div className="vehicle-image">
                      <img src={booking.vehicle.image} alt={booking.vehicle.name} />
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Vehicle:</div>
                      <div className="detail-value">{booking.vehicle.name}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Daily Rate:</div>
                      <div className="detail-value">₹{booking.vehicle.price.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="detail-group">
                    <h3>Rental Information</h3>
                    <div className="detail-item">
                      <div className="detail-label">Pickup Date:</div>
                      <div className="detail-value">{formatDate(booking.pickupDate)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Return Date:</div>
                      <div className="detail-value">{formatDate(booking.returnDate)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Duration:</div>
                      <div className="detail-value">{booking.days} day{booking.days > 1 ? 's' : ''}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Pickup Location:</div>
                      <div className="detail-value">{booking.location}</div>
                    </div>
                  </div>
                </div>
                
                <div className="detail-column">
                  <div className="detail-group">
                    <h3>Customer Information</h3>
                    <div className="detail-item">
                      <div className="detail-label">Name:</div>
                      <div className="detail-value">{currentUser.name}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Email:</div>
                      <div className="detail-value">{currentUser.email}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Phone:</div>
                      <div className="detail-value">{currentUser.phone || 'Not provided'}</div>
                    </div>
                  </div>
                  
                  <div className="detail-group">
                    <h3>Payment Summary</h3>
                    <div className="price-summary">
                      <div className="price-item">
                        <div>Daily Rate:</div>
                        <div>₹{booking.vehicle.price.toLocaleString()}</div>
                      </div>
                      <div className="price-item">
                        <div>Number of Days:</div>
                        <div>{booking.days} day{booking.days > 1 ? 's' : ''}</div>
                      </div>
                      <div className="price-item">
                        <div>Subtotal:</div>
                        <div>₹{subtotal.toLocaleString()}</div>
                      </div>
                      <div className="price-item">
                        <div>Taxes & Fees (18%):</div>
                        <div>₹{taxes.toLocaleString()}</div>
                      </div>
                      <div className="price-total">
                        <div>Total Amount:</div>
                        <div>₹{total.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="btn print-btn" onClick={handlePrint}>
                  Print Confirmation
                </button>
                <Link to="/" className="btn home-btn">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Confirmation;