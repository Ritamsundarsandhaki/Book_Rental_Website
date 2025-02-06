import React from "react";

function Admin_dashbord() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Orders Card */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Total Orders</h2>
          <p className="text-4xl mt-2">120</p>
        </div>

        {/* Products Card */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Total Products</h2>
          <p className="text-4xl mt-2">250</p>
        </div>

        {/* Users Card */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Total Users</h2>
          <p className="text-4xl mt-2">75</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Orders</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border p-2">#1024</td>
              <td className="border p-2">John Doe</td>
              <td className="border p-2 text-green-500">Completed</td>
              <td className="border p-2">$120</td>
            </tr>
            <tr className="text-center">
              <td className="border p-2">#1025</td>
              <td className="border p-2">Jane Smith</td>
              <td className="border p-2 text-yellow-500">Pending</td>
              <td className="border p-2">$85</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin_dashbord;
