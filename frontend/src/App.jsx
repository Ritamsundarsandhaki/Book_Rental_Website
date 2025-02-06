import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Admin_main from "./pages/Admin/Admin.main";
import Shopkeeper_main from "./pages/shopkeeper/Shopkeeper.main";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Mock authentication state
  const isAuthenticated = "wihfdjasasan";
  const userRole = "admin"; // "admin" or "shopkeeper"

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<h1>Welcome to the Book Rental Website</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />

        {/* Protected Admin Route */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute
              element={<Admin_main/>}
              isAuthenticated={isAuthenticated}
              allowedRoles={["admin"]}
              userRole={userRole}
            />
          }
        />

        {/* Protected Shopkeeper Route */}
        <Route
          path="/shopkeeper/*"
          element={
            <ProtectedRoute
              element={<Shopkeeper_main/>}
              isAuthenticated={isAuthenticated}
              allowedRoles={["shopkeeper"]}
              userRole={userRole}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
