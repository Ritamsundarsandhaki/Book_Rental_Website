import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../../components/Axios";
import { motion } from "framer-motion";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/detail/${productId}`);
        if (response.data.success) {
          setProduct(response.data.product);
          setSelectedImage(response.data.product.imageOfBook[0]);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-center text-lg">Loading product details...</p>;
  if (error) return <p className="text-red-500 text-center text-lg">{error}</p>;
  if (!product) return <p className="text-center text-lg">No product data available.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-2xl flex flex-col md:flex-row gap-12 mt-10"
    >
      <div className="md:w-1/2 flex flex-col items-center">
        <motion.img
          key={selectedImage}
          src={selectedImage}
          alt="Product"
          className="w-full h-[500px] object-cover border-2 border-gray-300 dark:border-gray-700 p-2 rounded-xl shadow-lg transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="flex gap-3 mt-4">
          {product.imageOfBook.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-20 h-20 object-cover cursor-pointer border-2 rounded-lg transition-all hover:shadow-lg ${
                selectedImage === img ? "border-blue-500" : "border-gray-400 dark:border-gray-600"
              }`}
              onClick={() => setSelectedImage(img)}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </div>
      </div>

      <div className="md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400">{product.title}</h2>
        <p className="text-xl text-gray-700 dark:text-gray-300">by {product.author}</p>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{product.detail}</p>

        <div className="flex items-center gap-4">
          <p className="text-green-600 dark:text-green-400 text-3xl font-bold">${product.price}</p>
          <span
            className={`px-5 py-2 text-lg font-semibold rounded-full shadow-md ${
              product.stock > 0 ? "bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200" : "bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300"
            }`}
          >
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </span>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-3 text-lg border-l-4 border-blue-500 dark:border-blue-400">
          <p><strong>Category:</strong> Fiction</p>
          <p><strong>Publisher:</strong> Penguin Books</p>
          <p><strong>Language:</strong> English</p>
          <p><strong>Pages:</strong> 320</p>
          <p><strong>ISBN:</strong> 978-1-2345-6789-0</p>
        </div>

        <div className="flex gap-6 mt-5">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md transition-all"
          >
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#047857" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-green-500 text-white text-lg rounded-lg shadow-md transition-all"
            onClick={() => navigate(`/cart/${productId}`)} // Redirect to the cart page
          >
            Rent Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;
