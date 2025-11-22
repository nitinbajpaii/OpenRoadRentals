# Open Road Rentals - React Application

A modern React-based vehicle rental application for hill station adventures, converted from the original HTML/CSS/JavaScript implementation.

## Features

- **User Authentication**: Login and signup functionality with localStorage
- **Vehicle Booking**: Browse and book cars and bikes for hill station trips
- **Responsive Design**: Mobile-friendly interface with modern UI
- **Booking Management**: Complete booking flow with confirmation
- **Contact System**: Integrated contact form with Web3Forms
- **Route Protection**: Authentication-based access control

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.js       # Navigation header with auth state
│   ├── Footer.js       # Site footer
│   └── VehicleCard.js  # Vehicle display component
├── pages/              # Page components
│   ├── Home.js         # Landing page with search
│   ├── Login.js        # User authentication
│   ├── Signup.js       # User registration
│   ├── Booking.js      # Vehicle booking interface
│   ├── Confirmation.js # Booking confirmation
│   ├── About.js        # Company information
│   └── Contact.js      # Contact form
├── services/           # Business logic
│   ├── authService.js  # Authentication handling
│   └── bookingService.js # Booking management
├── utils/              # Utilities and data
│   └── vehicleData.js  # Vehicle and location data
└── styles/             # Global styles
    └── globals.css     # CSS variables and base styles
```

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   cd react-open-road-rentals
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Key Components

### Authentication System
- **Login/Signup**: Form validation and localStorage-based auth
- **Protected Routes**: Booking requires authentication
- **User State Management**: Persistent login state across sessions

### Booking System
- **Vehicle Selection**: Cars and bikes with detailed information
- **Date Validation**: Prevents past dates and invalid ranges
- **Price Calculation**: Dynamic pricing based on rental duration
- **Booking Confirmation**: Detailed receipt with print functionality

### Data Management
- **localStorage**: User data and booking persistence
- **Service Layer**: Separated business logic from components
- **Data Validation**: Client-side form validation throughout

## Backend Integration

The React frontend is designed to work with your existing backend APIs. To integrate:

1. **Replace localStorage with API calls** in service files:
   - `authService.js` - Update login/signup methods
   - `bookingService.js` - Update booking CRUD operations

2. **Add API configuration**:
   ```javascript
   // src/config/api.js
   export const API_BASE_URL = 'http://your-backend-url/api';
   ```

3. **Update service methods** to use fetch/axios:
   ```javascript
   // Example API integration
   login: async (email, password) => {
     const response = await fetch(`${API_BASE_URL}/auth/login`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     });
     return response.json();
   }
   ```

## Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your web server or hosting platform:
   - Netlify: Drag and drop the build folder
   - Vercel: Connect your GitHub repository
   - Traditional hosting: Upload build contents to public_html

3. **Configure routing** for single-page application:
   - Add `_redirects` file for Netlify: `/* /index.html 200`
   - Configure server to serve `index.html` for all routes

## Differences from Original

### Improvements Made:
- **Component-based architecture** for better maintainability
- **React Router** for client-side navigation
- **Hooks-based state management** replacing vanilla JS
- **Modular CSS** with component-specific styles
- **Better error handling** and form validation
- **Responsive design** improvements
- **Code reusability** through shared components

### Preserved Features:
- **Exact same visual design** and user experience
- **All original functionality** maintained
- **Same data structure** for easy backend integration
- **Identical business logic** and validation rules
- **Same external integrations** (Web3Forms for contact)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.