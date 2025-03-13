import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../components/Axios";

function Cart() {
  const { bookId } = useParams(); // Extract bookId from URL
  const navigate = useNavigate();
  console.log(bookId)
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rentalDuration, setRentalDuration] = useState(1); // Default rental duration

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/detail/${bookId}`);
        if (response.data.success) {
          setBook(response.data.product);
        } else {
          setError("Book not found");
        }
      } catch (err) {
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  // Handle order submission
  const handleOrder = async () => {
    try {
      const response = await axios.post("/api/user/order", {
        bookId: [bookId], // Send as an array
        rentalDuration,
      });

      if (response.status === 201) {
        alert("Order placed successfully!");
        navigate("/user/order"); // Redirect to orders page
      }
    } catch (err) {
      alert(err.response?.data?.message || "Order failed. Try again!");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading book details...</p>;
  if (error) return <p className="text-red-500 text-center text-lg">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Cart</h2>

      <div className="flex flex-col items-center">
        <img
          src={book.imageOfBook[0]}
          alt={book.title}
          className="w-40 h-60 object-cover rounded-lg shadow-md"
        />
        <h3 className="text-xl font-semibold mt-4">{book.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">by {book.author}</p>
        <p className="text-green-600 dark:text-green-400 font-bold text-xl">${book.price}/day</p>
      </div>

      <div className="mt-6">
        <label className="block text-lg font-medium">Rental Duration (days):</label>
        <input
          type="number"
          value={rentalDuration}
          onChange={(e) => setRentalDuration(Number(e.target.value))}
          className="w-full p-2 mt-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          min="1"
        />
      </div>

      <button
        onClick={handleOrder}
        className="w-full mt-6 p-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition"
      >
        Place Order
      </button>
    </div>
  );
}

export default Cart;
