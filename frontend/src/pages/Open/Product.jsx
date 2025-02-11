import React, { useState } from "react";
import banner2 from "../../assets/banner2.jpg";
import "../../css/product.css";

function Product() {
  const [openDropdowns, setOpenDropdowns] = useState({
    category: true, // Open by default
    genre: true, // Open by default
    format: true, // Open by default
    author: true, // Open by default
  });

  const toggleDropdown = (section) => {
    setOpenDropdowns((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Sample data
  const categories = ["Fiction", "Non-Fiction", "Science Fiction", "Mystery", "Biography"];
  const genres = ["Thriller", "Fantasy", "Romance", "Horror", "History"];
  const formats = ["Hardcover", "Paperback", "eBook", "Audiobook"];
  const authors = ["J.K. Rowling", "George R.R. Martin", "Stephen King", "Agatha Christie"];

  // Dummy product data
  const products = [
    {
      id: 1,
      image: "https://demo2.themelexus.com/bokifa/wp-content/uploads/2024/09/product-24-1-520x728.jpg",
      title: "A Prayer For Own Meany",
      author: "ritam ss",
      price: "₹ 120",
    },
    {
      id: 2,
      image: "https://demo2.themelexus.com/bokifa/wp-content/uploads/2024/09/product-24-1-520x728.jpg",
      title: "Another Book Title",
      author: "Author Name",
      price: "₹ 150",
    },
    {
      id: 2,
      image: "https://demo2.themelexus.com/bokifa/wp-content/uploads/2024/09/product-24-1-520x728.jpg",
      title: "Another Book Title",
      author: "Author Name",
      price: "₹ 150",
    },
    {
      id: 2,
      image: "https://demo2.themelexus.com/bokifa/wp-content/uploads/2024/09/product-24-1-520x728.jpg",
      title: "Another Book Title",
      author: "Author Name",
      price: "₹ 150",
    },
    // Add more products as needed
  ];

  // Reusable Dropdown Section
  const renderDropdown = (title, key, items) => (
    <div className="mb-4 border rounded-xl shadow-lg p-4 bg-white  hover:shadow-2xl">
      {/* Dropdown Header */}
      <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleDropdown(key)}>
        <p className="text-xl font-semibold">{title}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={`h-5 w-5 transition-transform duration-500 ${
            openDropdowns[key] ? "rotate-180" : "rotate-0"
          }`}
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>

      {/* Dropdown Content */}
      <ul
        className={`overflow-hidden transition-all duration-[1000ms] ease-in-out ${
          openDropdowns[key] ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
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
      {/* Banner Section */}
      <div
        className="banner h-35 w-full bg-top mt-3 flex flex-row justify-between items-center text-blue-100"
        style={{ backgroundImage: `url(${banner2})` }}
      >
        <h1 className="max-laptop:text-4xl  min-tablet:text-3xl font-serif pl-5 ml-2 max-mobile:text-2xl max-tablet:text-3xl min-desktop:text-4xl ">
          Discover our favorite upcoming release!
        </h1>
        <div className="mt-2 bg-red-600 h-22 w-22 bg-opacity-50 px-4 py-1 rounded-[50%] flex items-center mr-40 max-mobile:mr-7 max-tablet:mr-10">
          <p className="text-1.3xl text-center">Coming Soon</p>
        </div>
      </div>

      {/* Heading Section */}
      <div className="heading container mx-auto h-52 text-center mt-7">
        <h1 className="text-6xl pt-4 font-serif font-extralight text-[#000000] max-mobile:text-3xl">
          All Books
        </h1>
        <p className="pt-4 min-laptop:px-44 min-desktop:px-40 font-serif text-[#404040]">
          Discover your favorite book: You will find a wide range of selected
          books from bestsellers to newcomers, children's books to crime novels,
          or thrillers to science fiction novels.
        </p>
      </div>

      {/* Product Section */}
      <div className="product-master max-mobile:items-center min-h-70 w-auto flex mx-1 mt-4 max-mobile:ml-5 max-mobile:mr-2">
        {/* Sidebar: Filters */}
        <div className="product-master-part1 min-h-40  w-[30%] p-4 sticky top-0 h-screen overflow-y-auto   mobile:display-none">
          {renderDropdown("Category", "category", categories)}
          {renderDropdown("Genres", "genre", genres)}
          {renderDropdown("Format", "format", formats)}
          {renderDropdown("Authors", "author", authors)}
        </div>

        {/* Product List Section */}
        <div className="product-master-part2 min-h-40  w-[80%] max-tablet:w-3xl max-tablet:ml-1">
          <div className="product-header h-12  w-full flex items-center justify-between mx-auto">
            <p className="ml-7">Showing 1–12 of 32 results</p>
            <select name="" id="" className="mr-12 h-7 w-42 border text-center rounded-2xl">
              <option value="">Default Sorted</option>
            </select>
          </div>
          <div className="actual-product min-h-70  text-center grid grid-cols-3 gap-1 max-mobile:grid-cols-1 max-mobile:mr-8 max-tablet:grid-cols-2 ">
            {products.map((product) => (
              <div key={product.id} className="card h-140 w-90  flex-col items-center justify-evenly rounded-xl relative hover:shadow-2xl overflow-x-hidden ">
                <img src={product.image} alt={product.title} className="h-100 w-85 mx-auto pt-2 rounded-2xl hover:scale-110" />
                <div className="wishlist absolute right-5 top-5 h-9 w-9 bg-amber-50 flex items-center justify-center rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5 z-10">
                    <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
                  </svg>
                </div>

                <div className="card-rating h-7 w-44 mx-auto flex items-center justify-evenly bg-amber-50 border rounded-2xl absolute left-0.5 right-1 bottom-36">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-5 w-5">
                      <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/>
                    </svg>
                  ))}
                </div>
                <h1 className="text-2xl mt-3">{product.title}</h1>
                <p className="text-xl">{product.author}</p>
                <h4 className="text-2xl font-bold text-[#16a855]">{product.price}</h4>
                <button className="h-11 w-[90%] bg-[#027A36] rounded-3xl mt-2 flex items-center justify-center mx-auto text-white add_to_cart-btn hover:bg-black ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="h-7 w-7 mr-7 text-white ">
                    <path d="M423.3 440.7c0 25.3-20.3 45.6-45.6 45.6s-45.8-20.3-45.8-45.6 20.6-45.8 45.8-45.8c25.4 0 45.6 20.5 45.6 45.8zm-253.9-45.8c-25.3 0-45.6 20.6-45.6 45.8s20.3 45.6 45.6 45.6 45.8-20.3 45.8-45.6-20.5-45.8-45.8-45.8zm291.7-270C158.9 124.9 81.9 112.1 0 25.7c34.4 51.7 53.3 148.9 373.1 144.2 333.3-5 130 86.1 70.8 188.9 186.7-166.7 319.4-233.9 17.2-233.9z"/>
                  </svg>
                  Add To cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;