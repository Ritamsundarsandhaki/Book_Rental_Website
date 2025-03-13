import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import banner3 from '../../assets/banner3.jpg'
import axios from "../../components/Axios";

import '../../css/home.css'
import { NavLink } from 'react-router-dom';


const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [products,setproducts] = useState([''])
  
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
      title: "Summer Reading Sale",
      subtitle: "Discover Your Next Adventure",
      offer: "50% OFF on Fiction Books",
      accentColor: "from-[#FF6B6B] to-[#FF8E8E]",
      emoji: "📖"
    },
    {
      image: "https://wallpapercave.com/wp/wp4430599.jpg",
      title: "Back to School Special",
      subtitle: "Textbooks & Educational Materials",
      offer: "Buy 2 Get 1 Free",
      accentColor: "from-[#4ECDC4] to-[#45B7AF]",
      emoji: "🎓"
    },
    {
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6",
      title: "Premium Membership",
      subtitle: "Exclusive Benefits & Savings",
      offer: "30% Extra Discount",
      accentColor: "from-[#FF9F1C] to-[#FFBF69]",
      emoji: "🎁"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const imageZoom = {
    hidden: { scale: 1.1 },
    visible: { scale: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  const textSlide = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
  };

  const offerSpring = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: 'spring', bounce: 0.5 } }
  };

  return (
    <div className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden">
      <AnimatePresence mode='wait'>
        <motion.div
          key={activeIndex}
          variants={imageZoom}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute inset-0 bg-black/30"
        >
          <img 
            src={slides[activeIndex].image} 
            alt="Banner" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl relative text-center">
            <AnimatePresence mode='wait'> 
              <motion.div
                key={activeIndex + 'content'}
                variants={textSlide}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.span
                  animate={{
                    rotate: [0, 15, -15, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'mirror'
                  }}
                  className="text-4xl xs:text-5xl mb-3 sm:mb-4 inline-block"
                >
                  {slides[activeIndex].emoji}
                </motion.span>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg px-2"
                >
                  {slides[activeIndex].title}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg xs:text-xl sm:text-2xl mb-4 sm:mb-6 font-medium text-gray-200 px-4"
                >
                  {slides[activeIndex].subtitle}
                </motion.p>
                
                <motion.div
                  animate={{ 
                    y: [-5, 5, -5],
                    scale: [1, 1.05, 1],
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: "linear"
                  }}
                  className={`bg-gradient-to-r ${slides[activeIndex].accentColor} p-3 sm:p-4 rounded-full inline-block shadow-xl border-2 border-white/20 mx-2 bg-[length:200%_200%]`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4">
                    <motion.span
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-3xl sm:text-4xl"
                    >
                      🎉
                    </motion.span>
                    
                    <motion.span
                      variants={offerSpring}
                      className="text-xl xs:text-2xl sm:text-3xl font-bold text-white drop-shadow-md whitespace-nowrap"
                    >
                      {slides[activeIndex].offer}
                    </motion.span>
                    
                    <motion.span
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl sm:text-4xl"
                    >
                      ✨
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((slide, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            animate={{
              scale: index === activeIndex ? [1, 1.2, 1] : 1,
              transition: { repeat: Infinity, duration: 1.5 }
            }}
            className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? `scale-125 ${slide.accentColor.split(' ')[0].replace('from-', 'bg-')}`
                : 'bg-white/30 hover:bg-white/70'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const StatsSlider = () => {
  const statistics = [
    { number: "1200+", title: "Happy Customers", icon: "😊" },
    { number: "37+", title: "Book Stores", icon: "📚" },
    { number: "50K+", title: "Books Available", icon: "📖" },
    { number: "98%", title: "Satisfaction Rate", icon: "⭐" },
    // Duplicate for continuous scroll
    { number: "1200+", title: "Happy Customers", icon: "😊" },
    { number: "37+", title: "Book Stores", icon: "📚" },
    { number: "50K+", title: "Books Available", icon: "📖" },
    { number: "98%", title: "Satisfaction Rate", icon: "⭐" }
  ];

  return (
    <div className="h-[20vh] bg-[#F9F5F0] overflow-hidden relative">
      <div className="absolute inset-0 flex items-center">
        <motion.div
          className="flex"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            duration: 60, // Slower scroll duration
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[50vw] sm:w-[33vw] lg:w-[25vw] px-4 text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="text-4xl sm:text-5xl">{stat.icon}</div>
              <div className="text-5xl sm:text-6xl font-bold text-[#2C6E49]">
                {stat.number}
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {stat.title}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};


const fech =async () => {
  
}



const genres = [
  { name: "Fiction", image: "https://content.jdmagicbox.com/rep/b2b/fiction-books/fiction-books-2.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit" },
  { name: "Mystery", image: "https://images.squarespace-cdn.com/content/v1/53d9a06de4b084c4e8089ce0/622a9df6-d057-4b9f-8193-6a2bcd67894f/9780593356159-us.jpg" },
  { name: "Romance", image: "https://static.independent.co.uk/2025/02/06/10/41/indian-books.png?width=1200&height=900&fit=crop" },
  { name: "Science Fiction", image: "https://ik.imagekit.io/panmac/tr:f-auto,w-740,pr-true//bcd02f72-b50c-0179-8b4b-5e44f5340bd4/b8d219b0-2eca-4da8-82f3-70e0f4d01906/Best%20fiction%20feb%2025.webp" },
  { name: "Biography", image: "https://www.rd.com/wp-content/uploads/2022/03/best-books-of-2023-so-far-opener.png" },
  { name: "Fantasy", image: "https://ik.imagekit.io/panmac/tr:f-auto,w-740,pr-true//bcd02f72-b50c-0179-8b4b-5e44f5340bd4/0f1f0d30-298a-4a98-b1e5-76f304ca40a8/The-best-short-books.webp" },
];

const bannerData = {
  image: banner3,
  title: "Explore New Worlds",
  subtitle: "Your adventure starts here",
  buttonText: "Shop Now",
};

const authors = [
  {
    id: 1,
    name: "Sarah Mitchell",
    bio: "Bestselling author of 'The Silent Echo' and 'Whispers in the Dark'.",
    books: "5 Published Books",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "James Donovan",
    bio: "Renowned for his gripping thrillers and intricate plots.",
    books: "7 Published Books",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Emily Grayson",
    bio: "Master of romance and heartfelt storytelling.",
    books: "10 Published Books",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Michael Chen",
    bio: "Pioneer in science fiction and futuristic narratives.",
    books: "8 Published Books",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
]
const AnimatedBanner = () => {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {/* Image with hover zoom effect */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={bannerData.image}
          alt="Banner"
          className="w-full h-full object-cover transition-transform"
        />
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-center bg-black/40">
        <motion.div
          className="max-w-2xl"
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl font-bold drop-shadow-lg px-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {bannerData.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl mt-2 font-medium text-gray-200 px-4"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {bannerData.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mt-6 px-6 py-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] shadow-lg transition-all"
          >
            {bannerData.buttonText}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    text: "I absolutely love the books I purchased from this store! The quality is amazing, and the delivery was super fast.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Jane Smith",
    text: "The collection here is fantastic. I found books that I couldn't find anywhere else. Highly recommended!",
    rating: 4,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Alice Johnson",
    text: "Great customer service and an amazing selection of books. I'll definitely be coming back for more!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Michael Brown",
    text: "The books arrived in perfect condition, and I love the personalized recommendations. A great experience overall!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
];
function Home() {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Fetch products from API
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get("api/home");
      console.log(response.data)
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchProducts();
}, []);
  return (
    <>
      <Navbar />
      <Banner />
      <StatsSlider />
      <section className="section3 py-12 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
              This Week's Highlights
            </h1>
            <button className="px-6 py-3 bg-[#2C6E49] text-white rounded-full hover:bg-[#1E5631] transition-colors">
              Browse All
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {products.map((product) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-80 w-full overflow-hidden group">
                  <img 
                    src={product.imageOfBook[0]                    } 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5">
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z"/>
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{product.title}</h3>
                  <p className="text-gray-600 text-sm">{product.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-green-600">{product.price}</span>
                    <NavLink to={`/product/${product._id}`}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-[#2C6E49] text-white rounded-full hover:bg-[#1E5631] transition-colors"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add
                    </motion.button>
                    </NavLink>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-12">
      <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">All Genres Available</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {genres.map((genre, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all"
          >
            <img src={genre.image} alt={genre.name} className="w-full h-40 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{genre.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
      </section>

      <section className="section3 py-12 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex  sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
              This Week's Highlights
            </h1>
            <button className="px-6 py-3 bg-[#2C6E49] text-white rounded-full hover:bg-[#1E5631] transition-colors">
              Browse All
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {products.map((product) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-80 w-full overflow-hidden group">
                  <img 
                    src={product.imageOfBook[0]} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5">
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z"/>
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{product.title}</h3>
                  <p className="text-gray-600 text-sm">{product.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                    <NavLink to={`/product/${product._id}`}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-[#2C6E49] text-white rounded-full hover:bg-[#1E5631] transition-colors"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add
                    </motion.button>
                    </NavLink>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <AnimatedBanner/>
            
      <section className="section3 py-12 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex  sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
              This Week's Highlights
            </h1>
            <button className="px-6 py-3 bg-[#2C6E49] text-white rounded-full hover:bg-[#1E5631] transition-colors">
              Browse All
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {products.map((product) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-80 w-full overflow-hidden group">
                  <img 
                    src={product.imageOfBook[0]} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5">
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z"/>
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{product.title}</h3>
                  <p className="text-gray-600 text-sm">{product.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                    <NavLink to={`/product/${product._id}`}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-[#2C6E49] text-white rounded-full hover:bg-[#1E5631] transition-colors"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add
                    </motion.button>
                    </NavLink>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-8 lg:px-16">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex  sm:flex-row items-center justify-between mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-0">
              Featured Products
            </h1>
            <button className="px-6 py-3 bg-[#2C6E49] text-white rounded-full hover:bg-[#1E5631] transition-colors">
              Browse All
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="horizontal-scroll-container">
            {products.map((product) => (
              <motion.div 
                key={product._id}
                className="horizontal-scroll-item bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                {/* Product Image */}
                <div className="relative h-60 w-full overflow-hidden group">
                  <img 
                    src={product.imageOfBook[0]} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5">
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z"/>
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{product.title}</h3>
                  <p className="text-gray-600 text-sm">{product.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                    <NavLink to={`/product/${product._id}`}>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-[#2C6E49] text-white rounded-full hover:bg-[#1E5631] transition-colors"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add
                    </motion.button>
                    </NavLink>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="authors-section">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Authors
            </h2>
            <p className="text-lg text-gray-600">
              Discover the brilliant minds behind your favorite books.
            </p>
          </div>

          {/* Authors Grid */}
          <div className="authors-grid">
            {authors.map((author) => (
              <motion.div
                key={author.id}
                className="author-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Author Image */}
                <img
                  src={author.image}
                  alt={author.name}
                  className="author-image"
                />

                {/* Author Name */}
                <h3 className="author-name">{author.name}</h3>

                {/* Author Bio */}
                <p className="author-bio">{author.bio}</p>

                {/* Author Books */}
                <p className="author-books">{author.books}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Hear from our happy readers and their experiences.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Testimonial Image */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-image"
                />

                {/* Testimonial Name */}
                <h3 className="testimonial-name">{testimonial.name}</h3>

                {/* Testimonial Text */}
                <p className="testimonial-text">"{testimonial.text}"</p>

                {/* Testimonial Rating */}
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    
    </>
  );
}

export default Home;