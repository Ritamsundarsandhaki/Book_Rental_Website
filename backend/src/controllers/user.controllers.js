import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generatetooken } from "../lib/util.js";
import OrderModel from "../models/order.model.js"

export const signup = async (req, res, next) => {
  const { fullName, emailId, mobileNo, password, proffilePic, address } =
    req.body;
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
    const user = await User.findOne({ emailId, mobileNo });
    if (user) {
      const error = new Error("User already exist");
      error.statusCode = 409;
      next(error);
      return;
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({
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
    const user = await User.findOne({ emailId });
    if (!user) {
      const error = new Error("invalide email or password");
      error.statusCode = 404;
      next(error);
    }
    const ispassword = await bcrypt.compare(password, user.password);

    if (!ispassword) {
      const error = new Error("invalide email or password");
      error.statusCode = 404;
      next(error);
      return;
    }

    console.log(user._id);
    const dataset = {
      id: user._id,
      type: "user",
    };
    console.log(dataset);
    generatetooken(dataset, res);
    res.status(200).json({ message: "Wellcome Back" });
  } catch (error) {
    next(error);
  }
};

export const rent = (req, res, next) => {
  const { id } = req.body; // Get ID from query parameter
  console.log("ID:", id);
};


export const Order=async(req,res,next)=>{
  const {userid,bookId,rentalDuration,totalPrice,deliveryAddresh,shopkeeperId}= req.body

  try{
    if(!userid||!bookId||!rentalDuration||!totalPrice||!deliveryAddresh||!shopkeeperId){
      const error = new Error("All Filds are required");
      error.statusCode = 400;
      next(error);
    }

    const newOrderModel = new OrderModel({
      userid,
      bookId,
      rentalDuration,
      totalPrice,
      deliveryAddresh,
      shopkeeperId
    });

    await newOrderModel.save();
    res.status(200).json({ message: "Order Placed Sucssfully" });
  }
  catch(error){
    next(error);
  }
}