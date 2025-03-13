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
import Product_details from "./pages/Open/Product_details";
import Signup from "./pages/Open/Signup";
import Shopkeeper_signup from "./pages/Open/Shopkeeper_signup";
import Footer from "./components/Footer";

function App() {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userType") || "gest"; 
  // const userRole = 'admin'
  return (
    <>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shopkeeper_signup" element={<Shopkeeper_signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart/:bookId" element={<Cart />} />
        <Route path="/ebook" element={<Ebook />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<Product_details />} />

        {/* Protected Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute
              element={<Admin_main />}
              isAuthenticated={!!token}
              allowedRoles={["admin"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/shopkeeper/*"
          element={
            <ProtectedRoute
              element={<Shopkeeper_main />}
              isAuthenticated={!!token}
              allowedRoles={["shopkeeper"]}
              userRole={userRole}
            />
          }
        />
        <Route
          path="/user/*"
          element={
            <ProtectedRoute
              element={<User_main />}
              isAuthenticated={!!token}
              allowedRoles={["user"]}
              userRole={userRole}
            />
          }
        />
      </Routes>
    </Router>
   
    </>
  );
}

export default App;
