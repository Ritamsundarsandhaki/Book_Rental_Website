import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Admin_main from "./pages/Admin/Admin.main";
import Shopkeeper_main from "./pages/shopkeeper/Shopkeeper.main";
import ProtectedRoute from './components/ProtectedRoute';
import User_main from "./pages/User/User.main";
import Login from "./pages/Open/Login";
import Home from "./pages/Open/Home";
import Cart from "./pages/Open/cart";
import Ebook from "./pages/Open/Ebook";
import Product from "./pages/Open/Product";
import Product_details from "./pages/Open/product_details";

function App() {
  // Mock authentication state
  const isAuthenticated = "wihfdjasasan";
  const userRole = "user"; // "admin" or "shopkeeper"

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/ebook" element={<Ebook/>} />
        <Route path="/product" element={<Product/>} />
        <Route path="/product/*" element={<Product_details/>} />

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
      <Route
          path="/user/*"
          element={
            <ProtectedRoute
              element={<User_main/>}
              isAuthenticated={isAuthenticated}
              allowedRoles={["user"]}
              userRole={userRole}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
