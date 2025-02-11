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
  console.log(req.decode_Data._id)
 const userId = req.decode_Data._id;
  const {  bookId, rentalDuration, totalPrice, deliveryAddress, } = req.body;
  const bookdata = await Product.findOne({_id:bookId});
  console.log(bookdata)
 const shopkeeperId=bookdata.ShopkeeperId
  try {
    if (!userId || !bookId || !rentalDuration || !totalPrice || !deliveryAddress || !shopkeeperId) {
      console.log(userId,bookId,rentalDuration,totalPrice,deliveryAddress,shopkeeperId)
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    await OrderModel.create({
      userId,
      bookId,
      rentalDuration,
      totalPrice,
      deliveryAddress,
      shopkeeperId,
    });

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    next(error);
  }
};
