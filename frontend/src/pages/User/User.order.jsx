import React, { useEffect, useState } from "react";
import axios from "../../components/Axios";

function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/user/myorder"); // Fetch user's orders
        setOrders(response.data.orders);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading orders...</p>;
  if (error) return <p className="text-red-500 text-center text-lg">{error}</p>;
  if (orders.length === 0) return <p className="text-center text-lg">No orders found.</p>;

  // Function to get order status style
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "shipped":
        return "bg-blue-500 text-white";
      case "delivered":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="max-w-4xl max-h-[80vh] overflow-y-auto mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">My Orders</h2>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="p-5 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
            <p className="text-gray-600 dark:text-gray-400">Rental Duration: {order.rentalDuration} days</p>
            <p className="text-green-600 dark:text-green-400 font-bold">Total Price: ${order.totalPrice}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Delivery Address:</strong> {order.deliveryAddress}</p>

            {/* Order Status Tracker */}
            <div className={`inline-block px-4 py-1 rounded-lg font-semibold ${getStatusStyle(order.status)}`}>
              {order.status.toUpperCase()}
            </div>

            {/* Books List */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.bookId.map((book) => (
                <div key={book._id} className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                  <img src={book.imageOfBook[0]} alt={book.title} className="w-16 h-24 object-cover rounded-md" />
                  <div>
                    <h4 className="text-lg font-medium">{book.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{book.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Price: ${book.price}/day</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserOrder;
