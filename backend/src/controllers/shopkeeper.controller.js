import bcrypt from "bcrypt";
import Shopkeeper from "../models/shopkeeper.model.js";
import generateToken from "../lib/util.js";
import Product from '../models/prodect.model.js';
import OrderModel from '../models/order.model.js';
import cloudinary from "../lib/cloudinary.set.js";
import fs from 'fs';

export const signup = async (req, res, next) => {
  const { fullName, emailId, mobileNo, password, proffilePic, addresh } =
    req.body;
    console.log(req.body)
  try {
    if (!fullName || !emailId || !mobileNo || !password) {
      const error = new Error("All Filds are required");
      error.statusCode = 400;
      next(error);
    }
    if (password.length < 8) {
      const error = new Error("Atlist 8 character required");
      error.statusCode = 400;
      next(error);
    }
    const shopkeeper = await Shopkeeper.findOne({ emailId, mobileNo });
    if (shopkeeper) {
      const error = new Error("User already exist");
      error.statusCode = 409;
      next(error);
      return;
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newShopkeeper = await Shopkeeper.create({
      fullName,
      emailId,
      password: hashedpassword,
      mobileNo,
    });

    res.status(201).json({ message: `user created` });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { emailId, password } = req.body;

  try {
    if (!emailId || !password) {
      const error = new Error("All Filds are required");
      error.statusCode = 400;
      next(error);
    }
    if (password.length < 8) {
      const error = new Error("Atlist 8 character required");
      error.statusCode = 400;
      next(error);
    }
    const shopkeeper = await Shopkeeper.findOne({ emailId });
    if (!shopkeeper) {
      const error = new Error("invalide email or password");
      error.statusCode = 404;
      next(error);
    }
    const ispassword = await bcrypt.compare(password, shopkeeper.password);

    if (!ispassword) {
      const error = new Error("invalide email or password");
      error.statusCode = 404;
      next(error);
      return;
    }

    console.log(shopkeeper._id);
    const dataset = {
      id: shopkeeper._id,
      type: "shopkeeper",
    };
    console.log(dataset);
    generateToken(dataset,res)
    res.status(200).json({ message: "Wellcome Back" });
  } catch (error) {
    next(error);
  }
};


export const addProduct = async (req, res, next) => {

  if (!req.file && (!req.files || req.files.length === 0)) {
    return res.status(400).send({ error: 'No files uploaded or invalid file type' });
}

// Handle single or multiple file uploads
const files = req.file ? [req.file] : req.files;

// Upload files to Cloudinary
const uploadResults = await Promise.all(files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
        folder: 'uploads',
        resource_type: 'image'
    });

    // Remove the local file after upload
    fs.unlinkSync(file.path);
    return result.secure_url;
}));

console.log(uploadResults)
  const { title, author, genrey, stock, price, detail } = req.body;
  const ShopkeeperId = req.decode_Data._id; // Get Shopkeeper ID from decoded token

  try {
    if (!title || !author || !stock || !price || !detail || !genrey) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    // Create new product
    const newProduct = new Product({
      title,
      author,
      stock,
      price,
      detail,
      genrey,
      ShopkeeperId,
      imageOfBook:uploadResults
    });

    await newProduct.save();

    // Update Shopkeeper schema with new product
    const updatedShopkeeper = await Shopkeeper.findByIdAndUpdate(
      ShopkeeperId,
      { $push: { products: newProduct._id } }, // Push product reference to shopkeeper's products array
      { new: true } // Return updated shopkeeper document
    );

    if (!updatedShopkeeper) {
      return next(new Error("Shopkeeper not found"));
    }

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
      shopkeeper: updatedShopkeeper
    });

  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {

  const { title, author, genrey, stock, price, detail ,productId} = req.body;
  const ShopkeeperId = req.decode_Data._id; // Get Shopkeeper ID from decoded token

  try {
      // Find the product
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ error: "Product not found" });
      }

      // Ensure only the shopkeeper who added the product can update it
      if (product.ShopkeeperId.toString() !== ShopkeeperId.toString()) {
          return res.status(403).json({ error: "Unauthorized to update this product" });
      }

      // Update only text fields (images remain unchanged)
      product.title = title || product.title;
      product.author = author || product.author;
      product.genrey = genrey || product.genrey;
      product.stock = stock || product.stock;
      product.price = price || product.price;
      product.detail = detail || product.detail;

      // Save updated product
      await product.save();

      res.status(200).json({
          message: "Product updated successfully",
          product
      });

  } catch (error) {
      next(error);
  }
};


export const deleteProduct = async (req, res, next) => {
    
  const { productId} = req.body;
  const ShopkeeperId = req.decode_Data._id; // Get Shopkeeper ID from decoded token

  try {
      // Find the product
      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ error: "Product not found" });
      }

      // Ensure only the shopkeeper who added the product can update it
      if (product.ShopkeeperId.toString() !== ShopkeeperId.toString()) {
          return res.status(403).json({ error: "Unauthorized to update this product" });
      }

      const delet = await Product.findByIdAndDelete(productId);

      res.status(200).json({
          message: "Product deleted successfully",
          delet
      });

  } catch (error) {
      next(error);
  }
};
export const showproduct = async (req, res, next) => {
  try {
    const ShopkeeperId = req.decode_Data._id; // Extract shopkeeper's ID from token

    // Find the shopkeeper and populate the 'products' field correctly
    const shopkeeper = await Shopkeeper.findById(ShopkeeperId).populate("products");

    if (!shopkeeper) {
      return res.status(404).json({ message: "Shopkeeper not found" });
    }

    // Check if the shopkeeper has products
    if (!shopkeeper.products || shopkeeper.products.length === 0) {
      return res.status(200).json({ message: "No products found for this shopkeeper", products: [] });
    }

    // Log the populated products to verify
    console.log("Populated Products:", shopkeeper.products);

    res.status(200).json({
      message: "Products retrieved successfully",
      products: shopkeeper.products, // Send all products associated with this shopkeeper
    });
  } catch (error) {
    next(error);
  }
};

export const ShopkeeperOrders = async (req, res, next) => {
  try {
    const shopkeeperId = req.decode_Data._id; // Extract shopkeeper ID from token

    if (!shopkeeperId) {
      return res.status(400).json({ message: "Shopkeeper ID is required" });
    }

    console.log(shopkeeperId);
    
    // Fetch all orders that contain products from this shopkeeper
    const orders = await OrderModel.find({ shopkeeperId: shopkeeperId })
      .populate("bookId") // Populate book details
      .populate("userid", "fullName emailId") // Populate user details
      .populate("shopkeeperId", "fullName emailId"); // Populate shopkeeper details
    
    console.log(orders);

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this shopkeeper" });
    }

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  
  } catch (error) {
    next(error);
  }
};


export const UpdateOrderStatus = async (req, res, next) => {
  try {
    const shopkeeperId = req.decode_Data._id; // Extract shopkeeper ID from token
    const { orderId, status } = req.body; // Get order ID and new status from request

    const validStatuses = ["pending", "conform", "delivered", "return", "accepted"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    // Find and update order status
    const order = await OrderModel.findOneAndUpdate(
      { _id: orderId, shopkeeperId: shopkeeperId },
      { status: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found or unauthorized" });
    }

    // If status is "conform", add order ID to shopkeeper's rental history
    if (status === "conform") {
      await Shopkeeper.findByIdAndUpdate(shopkeeperId, {
        $push: { rentelHistory: orderId }
      });
    }

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    next(error);
  }
};


export const ShopkeeperProfile = async (req, res, next) => {
  try {
    const shopkeeperId = req.decode_Data._id;
    
    const shopkeeper = await Shopkeeper.findById(shopkeeperId).select("-password");
    if (!shopkeeper) {
      return res.status(404).json({ message: "Shopkeeper not found" });
    }
    
    res.status(200).json({ message: "Shopkeeper profile retrieved successfully", shopkeeper });
  } catch (error) {
    next(error);
  }
};

