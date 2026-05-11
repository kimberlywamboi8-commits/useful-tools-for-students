import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // For now, we simulate a login check
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  if (!isAuthenticated) {
    // If not logged in, send them to a "Login" page or Home
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;