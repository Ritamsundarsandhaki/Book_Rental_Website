import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function ShopkeeperSidebar() {
  return (
    <div className="w-64 h-screen bg-white text-gray-800 shadow-xl border-r border-gray-200 flex flex-col fixed top-0 left-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-5 rounded-b-lg shadow-md">
        <h2 className="text-xl font-semibold">Shopkeeper Panel</h2>
      </div>

      {/* Navigation */}
      <ul className="mt-6 space-y-2 px-4 flex-1">
        {[
          { path: "/shopkeeper", icon: "📊", label: "Dashboard" },
          { path: "/shopkeeper/order", icon: "📦", label: "Orders" },
          { path: "/shopkeeper/product", icon: "🛍", label: "Products" },
          { path: "/shopkeeper/setting", icon: "⚙️", label: "Settings" },
          { path: "/shopkeeper/withdraw", icon: "💰", label: "Withdraw" },
        ].map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-lg text-gray-700 font-medium hover:bg-green-50 hover:text-green-600 transition-all"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="px-4 py-4">
        <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white p-3 rounded-lg hover:bg-red-700 transition-all">
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default ShopkeeperSidebar;
