import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isAuthenticated, allowedRoles, userRole }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect unauthorized users
  }

  return element; // Render the protected component
};

export default ProtectedRoute;
