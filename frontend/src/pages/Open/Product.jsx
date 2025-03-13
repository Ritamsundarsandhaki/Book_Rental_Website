import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import banner2 from "../../assets/banner2.jpg";
import "../../css/product.css";

function Product() {
  const [openDropdowns, setOpenDropdowns] = useState({
    category: true,
    genre: true,
    format: true,
    author: true,
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = (section) => {
    setOpenDropdowns((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4500/api/home"); // Corrected API URL
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products); // Correctly access the 'products' array
        } else {
          console.error("Expected an array but got:", response.data);
          setProducts([]); // Fallback to empty array if the response is not an array
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setProducts([]); // Fallback to empty array if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["Fiction", "Non-Fiction", "Science Fiction", "Mystery", "Biography"];
  const genres = ["Thriller", "Fantasy", "Romance", "Horror", "History"];
  const formats = ["Hardcover", "Paperback", "eBook", "Audiobook"];
  const authors = ["J.K. Rowling", "George R.R. Martin", "Stephen King", "Agatha Christie"];

  const renderDropdown = (title, key, items) => (
    <div className="mb-4 border rounded-xl shadow-lg p-4 bg-white hover:shadow-2xl">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDropdown(key)}>
        <p className="text-xl font-semibold">{title}</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          className={`h-5 w-5 transition-transform duration-500 ${openDropdowns[key] ? "rotate-180" : "rotate-0"}`}>
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>
      <ul className={`overflow-hidden transition-all duration-1000 ease-in-out ${openDropdowns[key] ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2 p-2">
            <input type="checkbox" className="w-4 h-4" />
            <label className="text-gray-700">{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className="banner h-35 w-full bg-top mt-3 flex flex-row justify-between items-center text-blue-100"
        style={{ backgroundImage: `url(${banner2})` }}>
        <h1 className="max-laptop:text-4xl min-tablet:text-3xl font-serif pl-5 ml-2 max-mobile:text-2xl">
          Discover our favorite upcoming release!
        </h1>
        <div className="mt-2 bg-red-600 h-22 w-22 bg-opacity-50 px-4 py-1 rounded-[50%] flex items-center mr-40 max-mobile:mr-7">
          <p className="text-1.3xl text-center">Coming Soon</p>
        </div>
      </div>

      <div className="heading container mx-auto h-52 text-center mt-7">
        <h1 className="text-6xl pt-4 font-serif font-extralight text-[#000000] max-mobile:text-3xl">All Books</h1>
        <p className="pt-4 min-laptop:px-44 min-desktop:px-40 font-serif text-[#404040]">
          Discover your favorite book: You will find a wide range of selected books from bestsellers to newcomers.
        </p>
      </div>

      <div className="product-master max-mobile:items-center min-h-70 w-auto flex mx-1 mt-4">
        <div className="product-master-part1 min-h-40 w-[30%] p-4 sticky top-0 h-screen overflow-y-auto">
          {renderDropdown("Category", "category", categories)}
          {renderDropdown("Genres", "genre", genres)}
          {renderDropdown("Format", "format", formats)}
          {renderDropdown("Authors", "author", authors)}
        </div>

        <div className="product-master-part2 min-h-40 w-[80%]">
          <div className="product-header h-12 w-full flex items-center justify-between mx-auto">
            <p className="ml-7">Showing {products.length} results</p>
            <select className="mr-12 h-7 w-42 border text-center rounded-2xl">
              <option value="">Default Sorted</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-xl mt-4">Loading products...</p>
          ) : (
            <div className="actual-product min-h-70 text-center grid grid-cols-3 gap-1 max-mobile:grid-cols-1">
              {products.map((product) => (
                <div key={product._id} className="card h-140 w-90 flex-col items-center justify-evenly rounded-xl relative hover:shadow-2xl">
                  <img src={product.imageOfBook[0]} alt={product.title} className="h-100 w-85 mx-auto pt-2 rounded-2xl hover:scale-110" />
                  <h1 className="text-2xl mt-3">{product.title}</h1>
                  <p className="text-xl">author:{product.author}</p>
                  <h4 className="text-2xl font-bold text-[#16a855]">₹{product.price}</h4>
                  <button className="h-11 w-[90%] bg-[#027A36] rounded-3xl mt-2 flex items-center justify-center mx-auto text-white">
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
