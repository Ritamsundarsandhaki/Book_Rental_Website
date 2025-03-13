import React, { useEffect, useState } from "react";
import axios from "../../components/Axios";
import { FiPlusCircle } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShopkeeperProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genrey: "",
    stock: "",
    price: "",
    detail: "",
    images: [null, null, null],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/shopkeeper/showproduct");
      setProducts(response.data.products || []);
    } catch (error) {
      toast.error("Error fetching products");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (index, file) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = file;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (formData.images.includes(null)) {
      toast.error("Please upload all three images.");
      return;
    }

    setSubmitting(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        formDataToSend.append(key, formData[key]);
      }
    });

    formData.images.forEach((file) => {
      formDataToSend.append("images", file);
    });

    try {
      await axios.post("/api/shopkeeper/addproduct", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      fetchProducts();
      setShowForm(false);
      setFormData({
        title: "",
        author: "",
        genrey: "",
        stock: "",
        price: "",
        detail: "",
        images: [null, null, null],
      });
    } catch (error) {
      toast.error("Error adding product");
    }
    setSubmitting(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Manage Products</h1>
      
      <div className="text-center mb-6">
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center mx-auto hover:bg-blue-700 transition">
          <FiPlusCircle className="mr-2" /> {showForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 gap-4">
            <input type="text" name="title" value={formData.title} placeholder="Title" className="p-3 border rounded-lg shadow-sm" onChange={handleChange} required />
            <input type="text" name="author" value={formData.author} placeholder="Author" className="p-3 border rounded-lg shadow-sm" onChange={handleChange} required />
            <input type="text" name="genrey" value={formData.genrey} placeholder="Genre" className="p-3 border rounded-lg shadow-sm" onChange={handleChange} required />
            <input type="number" name="stock" value={formData.stock} placeholder="Stock" className="p-3 border rounded-lg shadow-sm" onChange={handleChange} required />
            <input type="number" name="price" value={formData.price} placeholder="Price" className="p-3 border rounded-lg shadow-sm" onChange={handleChange} required />
            <textarea name="detail" value={formData.detail} placeholder="Details" className="p-3 border rounded-lg shadow-sm" onChange={handleChange} required></textarea>

            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <input key={index} type="file" accept="image/png, image/jpeg" className="p-2 border rounded-lg" onChange={(e) => handleFileChange(index, e.target.files[0])} required />
              ))}
            </div>

            <button type="submit" className="bg-green-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition disabled:opacity-50" disabled={submitting}>
              {submitting ? "Adding..." : <><FiPlusCircle className="mr-2" /> Add Product</>}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="text-center p-4 text-gray-500">Loading products...</div>
        ) : (
          products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="border rounded-xl shadow-lg bg-white p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <img src={product.imageOfBook?.[0] || "/placeholder.jpg"} alt="Product" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
                <p className="text-gray-600 text-lg font-medium">${product.price}</p>
                <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 w-full">No products found.</div>
          )
        )}
      </div>
    </div>
  );
}

export default ShopkeeperProduct;
