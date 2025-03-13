import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../components/Axios";
import { motion } from "framer-motion";
import loginImage from "../../assets/banner4.jpg";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ emailId: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("user");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateInputs = () => {
    let newErrors = {};
    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email ID is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = "Enter a valid email!";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      toast.error("Please fix the errors before submitting!");
      return;
    }
    setLoading(true);

    try {
      const endpoint = userType === "user" ? "/api/user/login" : "/api/shopkeeper/login";
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, message } = response.data;
      toast.success(message || "Login successful!");

      // Store token and userType in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);

      // Redirect after login
      setTimeout(() => {
        if (userType === "user") {
          navigate("/");
        } else {
          navigate("/shopkeeper");
        }
      }, 2000);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || "Login failed!");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Toaster position="top-center" />
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden p-6 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative mb-6">
          <img src={loginImage} alt="Login" className="w-full h-40 object-cover rounded-lg shadow-sm" />
          <h2 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xl font-semibold text-white bg-green-600 bg-opacity-80 px-4 py-2 rounded-lg shadow-md">
            Welcome Back
          </h2>
        </div>

        <div className="flex mb-4 space-x-2">
          <button
            className={`w-1/2 py-2 text-lg font-medium rounded-lg ${
              userType === "user" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setUserType("user")}
          >
            User
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-medium rounded-lg ${
              userType === "shopkeeper" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => setUserType("shopkeeper")}
          >
            Shopkeeper
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((field, index) => (
            <motion.div key={field} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 transition-all bg-gray-50 text-gray-700 ${
                  errors[field] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
                }`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
