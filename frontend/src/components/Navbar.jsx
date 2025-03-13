import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaRegHeart, FaOpencart, FaMagnifyingGlass } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(2);
  const [cartCount, setCartCount] = useState(5);
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-[15vh] w-full bg-[#f5faf7] flex items-center justify-between px-6 shadow-md"
      >
        {/* Logo Section */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="flex-shrink-0"
        >
          <img src={logo} alt="Company Logo" className="h-[180px] w-[180px] object-contain" />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="w-[49%] flex items-center gap-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.select
            className="min-w-[120px] w-[25%] md:w-[20%] lg:w-[12%] bg-[#EAF4EC] text-gray-800 rounded-3xl px-3 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2C6E49]"
            whileFocus={{ scale: 1.05 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <option value="">All</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="science">Science</option>
          </motion.select>

          <motion.input
            type="text"
            placeholder="Search Book..."
            className="w-[80%] h-12 rounded-full px-4 bg-[#EAF4EC] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2C6E49]"
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#1E5631",
              transition: { type: "spring", stiffness: 300 },
            }}
            className="h-12 w-[27%] rounded-full bg-[#2C6E49] text-white transition flex items-center justify-center font-bold"
          >
            <FaMagnifyingGlass className="mr-2" />
            Submit
          </motion.button>
        </motion.div>

        {/* Icons Section */}
        <div className="flex items-center gap-6 text-gray-700">
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
            <NavLink to='/user'>
            <FaUser className="text-2xl cursor-pointer hover:text-[#2C6E49]" aria-label="User" />
            </NavLink>
          </motion.div>

          {/* Wishlist Icon */}
          <motion.div whileHover={{ scale: 1.2 }} className="relative cursor-pointer">
            <FaRegHeart className="text-2xl hover:text-[#2C6E49]" aria-label="Wishlist" />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  key="wishlist-counter"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute -top-2 -right-2 bg-[#E63946] text-white text-xs font-bold rounded-full px-2 py-[1px]"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Cart Icon */}
          <motion.div whileHover={{ scale: 1.2 }} className="relative cursor-pointer">
            <FaOpencart className="text-2xl hover:text-[#2C6E49]" aria-label="Cart" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="cart-counter"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute -top-2 -right-2 bg-[#E63946] text-white text-xs font-bold rounded-full px-2 py-[1px]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Login Button */}
          <motion.button
            onClick={() => navigate("/login")}
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#1E5631",
              transition: { type: "spring", stiffness: 300 },
            }}
            className="px-4 py-2 rounded-full bg-[#2C6E49] text-white font-semibold shadow-md hover:bg-[#1E5631] transition"
          >
            Login
          </motion.button>
        </div>
      </motion.nav>

      {/* Bottom Navbar */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-[10vh] flex items-center justify-items-start shadow-xl"
      >
        <div className="h-[7vh] w-[35%] flex items-center justify-evenly text-[1.3rem]">
          {["Home", "Product", "Genre", "E-Book", "shopkeeper_signup"].map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
              <NavLink
                to={item === "Home" ? "/" : `/${item.toLowerCase().replace("-", "_")}`}
                className={({ isActive }) =>
                  isActive ? "text-[#2C6E49] font-bold border-b-2 border-[#2C6E49]" : "text-gray-700"
                }
              >
                {item}
              </NavLink>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;
