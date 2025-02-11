import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

function Admin_dashboard() {
  // Order Data for 12 Months
  const orderData = [
    { month: "Jan", orders: 50, color: "#FF6384" },
    { month: "Feb", orders: 80, color: "#36A2EB" },
    { month: "Mar", orders: 65, color: "#FFCE56" },
    { month: "Apr", orders: 90, color: "#4BC0C0" },
    { month: "May", orders: 120, color: "#9966FF" },
    { month: "Jun", orders: 150, color: "#FF9F40" },
    { month: "Jul", orders: 170, color: "#FF6384" },
    { month: "Aug", orders: 160, color: "#36A2EB" },
    { month: "Sep", orders: 140, color: "#FFCE56" },
    { month: "Oct", orders: 180, color: "#4BC0C0" },
  
  ];

  // User Data for 12 Months
  const userData = [
    { month: "Jan", users: 10, color: "#FF6384" },
    { month: "Feb", users: 20, color: "#36A2EB" },
    { month: "Mar", users: 18, color: "#FFCE56" },
    { month: "Apr", users: 25, color: "#4BC0C0" },
    { month: "May", users: 40, color: "#9966FF" },
    { month: "Jun", users: 50, color: "#FF9F40" },
    { month: "Jul", users: 65, color: "#FF6384" },
    { month: "Aug", users: 55, color: "#36A2EB" },
    { month: "Sep", users: 45, color: "#FFCE56" },
    { month: "Oct", users: 70, color: "#4BC0C0" },
  
  ];

  return (
    <div className="p-6 bg-white" >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 ">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md shadow-slate-600">
          <h2 className="text-2xl font-semibold">Total Orders</h2>
          <p className="text-4xl mt-2">1550</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md  shadow-slate-600">
          <h2 className="text-2xl font-semibold">Total Products</h2>
          <p className="text-4xl mt-2">250</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md  shadow-slate-600">
          <h2 className="text-2xl font-semibold">Total Users</h2>
          <p className="text-4xl mt-2">500+</p>
        </div>
        <div className="bg-amber-600 text-white p-6 rounded-lg shadow-md  shadow-slate-600">
          <h2 className="text-2xl font-semibold">Total Librarians</h2>
          <p className="text-4xl mt-2">230+</p>
        </div>
      </div>

      {/* Order Charts Section */}
      <div className="mt-8 grid grid-cols-2 gap-6">
        {/* Pie Chart for Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center  shadow-slate-600">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Orders by Month</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={orderData}
              dataKey="orders"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {orderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Line Chart for Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center  shadow-slate-600">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Order Trends Over 10 Months</h2>
          <LineChart width={500} height={300} data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#FF6384" strokeWidth={3} />
          </LineChart>
        </div>
      </div>

      {/* User Charts Section */}
      <div className="mt-8 grid grid-cols-2 gap-6">
        {/* Pie Chart for Users */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center  shadow-slate-600">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Users Growth by Month</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={userData}
              dataKey="users"
              nameKey="month"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {userData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Line Chart for Users */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center  shadow-slate-600">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">User Growth Over Months</h2>
          <LineChart width={500} height={300} data={userData}>
            <CartesianGrid strokeDasharray="1 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#36A2EB" strokeWidth={3}  />
          </LineChart>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="mt-8  shadow-slate-600">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Orders</h2>
        <table className="w-full border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Month</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border p-2">#1024</td>
              <td className="border p-2">John Doe</td>
              <td className="border p-2">Feb</td>
              <td className="border p-2 text-green-500">Completed</td>
              <td className="border p-2">₹120</td>
            </tr>
            <tr className="text-center">
              <td className="border p-2">#1025</td>
              <td className="border p-2">Jane Smith</td>
              <td className="border p-2">Mar</td>
              <td className="border p-2 text-yellow-500">Pending</td>
              <td className="border p-2">₹85</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin_dashboard;



