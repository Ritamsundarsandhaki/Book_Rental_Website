import { Routes, Route, NavLink } from "react-router-dom";
import User_profile from "./User.profile";
import User_address from "./User.address";
import User_payment from "./User.payment";
import User_notification from "./User.notification";
import User_order from "./User.order";

function User_main() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[18%] h-screen fixed left-0 top-0 bg-white text-gray-800 flex flex-col p-5 shadow-lg border-r border-gray-300">
        <h2 className="text-2xl font-bold mb-5 text-[#2C6E49]">User Dashboard</h2>
        <nav className="flex flex-col gap-3">
          {[
            { path: "profile", label: "Profile" },
            { path: "mannage-address", label: "Manage Address" },
            { path: "payment", label: "Payment" },
            { path: "notification", label: "Notifications" },
            { path: "order", label: "Orders" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#EAF4EC] text-[#2C6E49] font-bold"
                    : "hover:bg-gray-200"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg m-4 ml-[20%]">
        <Routes>
          <Route path="/user/profile" element={<User_profile />} />
          <Route path="mannage-address" element={<User_address />} />
          <Route path="payment" element={<User_payment />} />
          <Route path="notification" element={<User_notification />} />
          <Route path="order" element={<User_order />} />
        </Routes>
      </div>
    </div>
  );
}

export default User_main;