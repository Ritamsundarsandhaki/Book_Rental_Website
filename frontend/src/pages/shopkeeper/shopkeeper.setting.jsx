import React, { useEffect, useState } from "react";
import axios from "../../components/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShopkeeperSettings() {
  const [shopkeeper, setShopkeeper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopkeeperProfile();
  }, []);

  const fetchShopkeeperProfile = async () => {
    try {
      const response = await axios.get("/api/shopkeeper/myprofil");
      setShopkeeper(response.data.shopkeeper);
    } catch (error) {
      toast.error("Error fetching shopkeeper profile");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Shopkeeper Profile</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading profile...</p>
      ) : shopkeeper ? (
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-xl">
          <p className="text-lg font-semibold">Email: <span className="text-gray-700">{shopkeeper.emailId}</span></p>
          <p className="text-lg font-semibold">Mobile: <span className="text-gray-700">{shopkeeper.mobileNo}</span></p>
          <p className="text-lg font-semibold">Payment Amount: <span className="text-gray-700">${shopkeeper.payment.amount}</span></p>
          
          <h2 className="text-xl font-bold mt-6">Rental History</h2>
          {shopkeeper.rentelHistory.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700">
              {shopkeeper.rentelHistory.map((orderId, index) => (
                <li key={index}>Order ID: {orderId}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No rental history found.</p>
          )}

          <h2 className="text-xl font-bold mt-6">Products</h2>
          {shopkeeper.products.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700">
              {shopkeeper.products.map((productId, index) => (
                <li key={index}>Product ID: {productId}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No shopkeeper profile found.</p>
      )}
    </div>
  );
}

export default ShopkeeperSettings;
