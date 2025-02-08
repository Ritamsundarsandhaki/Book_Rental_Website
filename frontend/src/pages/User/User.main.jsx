import { Routes, Route, Navigate } from "react-router-dom";
import User_profile from "./User.profile";
import User_address from "./User.address";
import User_payment from "./User.payment";
import User_notification from "./User.notification";
import User_order from "./User.order";


function User_main() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <Routes>

          <Route path="profile" element={<User_profile/>} />
          <Route path="mannage-address" element={<User_address/>} /> 
          <Route path="payment" element={<User_payment/>} />
          <Route path="notification" element={<User_notification/>} />
          <Route path="order" element={<User_order/>} />
        </Routes>
      </div>
    </div>
  );
}

export default User_main;
