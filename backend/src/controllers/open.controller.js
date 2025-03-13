import jwt from "jsonwebtoken";
import Product from "../models/prodect.model.js";
import User from "../models/user.model.js";

export const Home = async (req, res, next) => {
    try {
        const { productId } = req.body; // Accept product ID from the request body
        let userId = null;

        // Check if token is provided
        const token = req.cookies.token;
        if (token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            userId = decode.id; // Extract user ID from token
            console.log("Authenticated User ID:", userId);
        }

        let filter = {};
        if (productId) {
            filter._id = productId; // Filter products by the given product ID
        }

        // Fetch product(s)
        const products = await Product.find(filter)
            .sort({ viewes: -1 })
            .limit(8)
            .lean();

        console.log("Products fetched:", products.length);

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
                products: []
            });
        }

        // If user is authenticated, update preferences
        if (userId && req.body) {
            const viewedGenres = [...new Set(products.map(product => req.body))];

            await User.findByIdAndUpdate(userId, {
                $addToSet: { prefrence: { $each: viewedGenres } } // Avoid duplicate genres
            });

            console.log(`Updated user ${userId} preferences with:`, viewedGenres);
        }

        res.status(200).json({
            success: true,
            message: "Fetched products successfully",
            products
        });

    } catch (error) {
        console.error("Error in Home Controller:", error);
        res.status(500).json({
            success: false,
            message: "Server error, please try again later",
            error: error.message
        });
    }
};



 
 

export const Search = async (req, res, next) => {
    try {
        const { title, author, genery ,} = req.body; // Get search input from request body

        // Create a dynamic filter object
        let filter = {};

        if (title) {
            filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
        }
        if (author) {
            filter.author = { $regex: author, $options: "i" };
        }
        if (genery) {
            filter.genery = { $regex: genery, $options: "i" };
        }

        // Fetch products matching the filter
        const products = await Product.find(filter).lean();
        console.log(products);
        

        res.status(200).json({
            success: true,
            message: "Search results fetched successfully",
            products
        });

    } catch (error) {
        console.error("Error in Search Controller:", error);

        res.status(500).json({
            success: false,
            message: "Server error, please try again later",
            error: error.message
        });
    }
};

export const detail = async (req, res, next) => {
    try {
      const { productId } = req.params; // Get ID from URL params
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      res.json({
        success: true,
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error, please try again later",
        error: error.message,
      });
    }
  };