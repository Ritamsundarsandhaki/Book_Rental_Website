import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import Product from "../models/prodect.model.js";
import generateToken from "../lib/util.js";
import OrderModel from "../models/order.model.js";

export const signup = async (req, res, next) => {
  const { fullName, emailId, mobileNo, password, profilePic, address } = req.body;

  try {
    if (!fullName || !emailId || !mobileNo || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }
    if (password.length < 8) {
      const error = new Error("At least 8 characters required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ $or: [{ emailId }, { mobileNo }] });
    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      emailId,
      password: hashedPassword,
      mobileNo,
      profilePic,
      address,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { emailId, password } = req.body;

  try {
    if (!emailId || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }
    if (password.length < 8) {
      const error = new Error("At least 8 characters required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 404;
      return next(error);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 404;
      return next(error);
    }

    const dataset = { id: user._id, type: "user" };
    generateToken(dataset,res)
    res.status(200).json({ message: "Welcome back" });
  } catch (error) {
    next(error);
  }
};

export const rent = (req, res, next) => {
  const { id } = req.body;
  console.log("ID:", id);
  res.status(200).json({ message: `Renting process initiated for book ID: ${id}` });
};


export const Order = async (req, res, next) => {
  try {
    const userId = req.decode_Data._id; // Extract user ID from token
    const { bookId, rentalDuration } = req.body;

    // Validate input
    if (!userId || !Array.isArray(bookId) || bookId.length === 0 || !rentalDuration) {
      return res.status(400).json({ message: "All fields are required and bookId must be a non-empty array" });
    }

    // Fetch user details to check if address exists
    const userData = await User.findById(userId);
    if (!userData || !userData.address) {
      return res.status(400).json({ message: "User address not found" });
    }
   
    const deliveryAddress = userData.address;
    console.log(deliveryAddress)
    let totalPrice = 0;
    let shopkeeperIds = new Set(); // Unique shopkeepers
    let booksToUpdate = [];

    // Fetch all books in a single query
    const books = await Product.find({ _id: { $in: bookId } });

    // Check if all books exist and are in stock
    for (let book of books) {
      if (book.stock <= 0) {
        return res.status(400).json({ message: `Book "${book.title}" is out of stock` });
      }
      totalPrice += book.price * rentalDuration; // Calculate total price
      shopkeeperIds.add(book.ShopkeeperId.toString()); // Store unique shopkeeper IDs
      booksToUpdate.push(book);
    }
      
    // Convert Set to array
    shopkeeperIds = [...shopkeeperIds];

    // Create new order
    const newOrder = new OrderModel({
      userId,
      bookId,
      rentalDuration,
      totalPrice,
      deliveryAddresh:deliveryAddress,
      shopkeeperId: shopkeeperIds, // Store multiple shopkeepers
    });

    await newOrder.save();

    // Reduce stock for each ordered book
    for (let book of booksToUpdate) {
      book.stock -= 1;
      await book.save();
    }

    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (error) {
    next(error);
  }
};
