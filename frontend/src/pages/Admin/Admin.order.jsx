import React from "react";

function Admin_order() {
  // Sample order data
  const orders = [
    { id: "#1024", customer: "John Doe", status: "Completed", total: "$120" },
    { id: "#1025", customer: "Jane Smith", status: "Pending", total: "$85" },
    { id: "#1026", customer: "Michael Brown", status: "Cancelled", total: "$60" },
    { id: "#1027", customer: "Emily Davis", status: "Shipped", total: "$150" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Management</h1>

      {/* Order Table */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">{order.customer}</td>
                <td
                  className={`border p-2 ${
                    order.status === "Completed"
                      ? "text-green-500"
                      : order.status === "Pending"
                      ? "text-yellow-500"
                      : order.status === "Cancelled"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="border p-2">{order.total}</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">
                    View
                  </button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin_order;
