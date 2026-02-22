// Authentication service to handle user login/signup
export const authService = {
  // Get current user from localStorage (no auto-login)
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      // Clear corrupted data
      localStorage.removeItem('currentUser');
      return null;
    }
  },

  // Login user
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const currentUser = {
        name: user.name,
        email: user.email,
        phone: user.phone
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return { success: true, user: currentUser };
    }
    
    return { success: false, message: 'Invalid email or password' };
  },

  // Register new user
  signup: (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }
    
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('currentUser');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('currentUser');
  }
};