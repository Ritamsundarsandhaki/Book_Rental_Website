import React from "react";
import { Link } from "react-router-dom";

function Shopkeeper_sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Shopkeeper Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/shopkeeper/dashbord"
            className="block p-2 rounded hover:bg-gray-700"
          >
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/shopkeeper/order"
            className="block p-2 rounded hover:bg-gray-700"
          >
            📦 Orders
          </Link>
        </li>
        <li>
          <Link
            to="/shopkeeper/product"
            className="block p-2 rounded hover:bg-gray-700"
          >
            🛍 Products
          </Link>
        </li>
        <li>
          <Link
            to="/shopkeeper/setting"
            className="block p-2 rounded hover:bg-gray-700"
          >
            ⚙️ Settings
          </Link>
        </li>
        <li>
          <Link
            to="/shopkeeper/withdrow"
            className="block p-2 rounded hover:bg-gray-700"
          >
            💰 Withdraw
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Shopkeeper_sidebar;
