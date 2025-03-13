import React, { useEffect, useState } from "react";
import axios from "../../components/Axios";

const ShopkeeperDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/api/shopkeeper/dashboard", {
          withCredentials: true, // Include authentication
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!dashboardData || !dashboardData.shopkeeper) {
    return <p className="text-center text-red-500">Failed to load dashboard data.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Shopkeeper Dashboard</h2>

      {/* Shopkeeper Profile */}
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold">Shopkeeper Profile</h3>
        <p className="text-gray-700"><strong>Name:</strong> {dashboardData.shopkeeper?.fullName || "N/A"}</p>
        <p className="text-gray-700"><strong>Email:</strong> {dashboardData.shopkeeper?.emailId || "N/A"}</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-white shadow-md rounded-md text-center">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-xl font-bold">{dashboardData.totalProducts ?? 0}</p>
        </div>

        <div className="p-4 bg-white shadow-md rounded-md text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-xl font-bold">{dashboardData.totalOrders ?? 0}</p>
        </div>

        <div className="p-4 bg-white shadow-md rounded-md text-center">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-xl font-bold text-yellow-500">{dashboardData.pendingOrders ?? 0}</p>
        </div>

        <div className="p-4 bg-white shadow-md rounded-md text-center">
          <h3 className="text-lg font-semibold">Completed Orders</h3>
          <p className="text-xl font-bold text-green-500">{dashboardData.completedOrders ?? 0}</p>
        </div>

        <div className="p-4 bg-white shadow-md rounded-md col-span-3 text-center">
          <h3 className="text-lg font-semibold">Total Earnings</h3>
          <p className="text-2xl font-bold text-blue-500">₹{dashboardData.totalEarnings ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopkeeperDashboard;
