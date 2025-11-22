// Booking service to handle vehicle bookings
export const bookingService = {
  // Generate booking ID
  generateBookingId: () => {
    return 'BK' + Date.now().toString().slice(-8);
  },

  // Save booking to localStorage
  saveBooking: (booking) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return booking;
  },

  // Get booking by ID
  getBookingById: (id) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.find(b => b.id === id);
  },

  // Get all bookings for current user
  getUserBookings: (userEmail) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.filter(b => b.user.email === userEmail);
  },

  // Create new booking
  createBooking: (bookingData) => {
    const booking = {
      id: bookingService.generateBookingId(),
      ...bookingData,
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };
    
    return bookingService.saveBooking(booking);
  }
};