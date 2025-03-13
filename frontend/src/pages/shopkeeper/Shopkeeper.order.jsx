import React, { useEffect, useState } from "react";
import axios from "../../components/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShopkeeperOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/shopkeeper/ShopkeeperOrders");
      setOrders(response.data.orders);
    } catch (error) {
      toast.error("Error fetching orders");
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post("/api/shopkeeper/updateorderstatus", { orderId, status: newStatus });
      toast.success(`Order status updated to "${newStatus}"`);
      
      // Update order status instantly in UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Shopkeeper Orders</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-xl shadow-lg bg-white p-4">
              <h3 className="font-semibold text-lg text-gray-800">Order ID: {order._id}</h3>
              <p className="text-gray-600">Customer: {order.userid?.fullName} ({order.userid?.emailId})</p>
              <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
              
              {/* Status Badge */}
              <p className={`px-3 py-1 mt-2 inline-block rounded-lg text-white text-sm font-semibold ${
                order.status === "pending" ? "bg-yellow-500" :
                order.status === "conform" ? "bg-blue-500" :
                order.status === "delivered" ? "bg-green-500" :
                order.status === "return" ? "bg-red-500" : "bg-gray-500"
              }`}>
                {order.status.toUpperCase()}
              </p>

              {/* Book Details */}
              <div className="mt-4">
                {order.bookId.map((book) => (
                  <div key={book._id} className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg shadow-md">
                    <img src={book.imageOfBook?.[0] || "/default-book.jpg"} alt={book.title} className="w-16 h-24 object-cover rounded-md" />
                    <div>
                      <h4 className="text-lg font-medium">{book.title}</h4>
                      <p className="text-gray-600">Author: {book.author}</p>
                      <p className="text-sm text-gray-500">Price: ${book.price}/day</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Update Dropdown */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700">Update Status:</label>
                <select
                  className="p-2 border rounded-lg w-full mt-1"
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="conform">Conform</option>
                  <option value="delivered">Delivered</option>
                  <option value="return">Return</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
}

export default ShopkeeperOrder;