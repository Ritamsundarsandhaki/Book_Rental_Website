import bcrypt from "bcrypt";
import Rider from "../models/rider.model.js";
import { ge } from "../lib/util.js";

export const signup = async (req, res, next) => {
  const { riderName, emailId, mobileNo, password, latitude, longitude, bikeNo } = req.body;
  console.log(req.body);
  
  try {
    if (!riderName || !emailId || !mobileNo || !password || !bikeNo) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }
    
    if (password.length < 8) {
      const error = new Error("At least 8 characters required");
      error.statusCode = 400;
      return next(error);
    }
    
    // Check for duplicate email, mobile number, or bike number
    const existingRider = await Rider.findOne({
      $or: [{ emailId }, { mobileNo }, { bikeNo }],
    });
    
    if (existingRider) {
      let duplicateField = existingRider.emailId === emailId ? "Email" : 
                           existingRider.mobileNo === mobileNo ? "Mobile Number" : "Bike Number";
      const error = new Error(`${duplicateField} already exists`);
      error.statusCode = 409;
      return next(error);
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newRider = await Rider.create({
      riderName,
      emailId,
      password: hashedPassword,
      mobileNo,
      bikeNo,
    });
    
    res.status(201).json({ message: `Rider created successfully` });
  } catch (error) {
    next(error);
  }
};
  


export const login=async(req,res,next)=>{
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
    const rider = await Rider.findOne({ emailId,password });
    if (!rider) {
      const error = new Error("invalide email or password");
      error.statusCode = 404;
      next(error);
    }
    const ispassword = await bcrypt.compare(password, rider.password);

    if (!ispassword) {
      const error = new Error("invalide email or password");
      error.statusCode = 404;
      next(error);
      return;
    }

    console.log(rider._id);
    const dataset = {
      id: rider._id,
      type: "rider",
    };
    console.log(dataset);
    generatetooken(dataset, res);
    res.status(200).json({ message: "Wellcome Back" });
  } catch (error) {
    next(error);
  }
}