import Shopkeeper from "../models/shopkeeper.model.js";
import Product from '../models/prodect.model.js'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../lib/util.js";
import { validationResult, body } from "express-validator";
import sendOTPEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from "../lib/cloudinary.set.js";
import fs from 'fs';

export const signup = async (req, res) => {
  // Indian-specific validation rules
  await Promise.all([
    body("fullName")
      .trim()
      .matches(/^[a-zA-Z\s]{2,50}$/)
      .withMessage("Full name should contain only alphabets and spaces, with at least 2 characters.")
      .run(req),

    body("emailId").trim().isEmail().withMessage("Invalid email format").run(req),

    body("mobileNo")
      .trim()
      .matches(/^[6-9]\d{9}$/)
      .withMessage("Mobile number must start with 6-9 and be exactly 10 digits long.")
      .run(req),

    body("password")
      .isLength({ min: 6 })
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
      .withMessage("Password must be at least 6 characters long and contain letters and numbers.")
      .run(req),

    body("address.city").notEmpty().withMessage("City is required").run(req),

    body("address.pinCode")
      .matches(/^\d{6}$/)
      .withMessage("Pin code must be exactly 6 digits.")
      .run(req),

    body("address.state").notEmpty().withMessage("State is required").run(req),

    body("upiId")
      .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/)
      .withMessage("Invalid UPI ID format. Example: example@upi")
      .run(req),
  ]);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, emailId, mobileNo, password, profilePic, address, upiId } = req.body;

    // Check if the email already exists
    const existingShopkeeper = await Shopkeeper.findOne({ emailId });
    if (existingShopkeeper) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Create a new Shopkeeper instance
    const newShopkeeper = new Shopkeeper({
      fullName,
      emailId,
      mobileNo,
      password: hashedPassword,
      profilePic,
      address,
      payment: { upiId, amount: 0 },
      otp,
      otpExpiry,
      isVerified: false, // User must verify OTP
    });

    // Save to database
    await newShopkeeper.save();


    const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; background: #ffffff; padding: 20px; margin: 20px auto; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
        .header { text-align: center; padding-bottom: 10px; border-bottom: 2px solid #007bff; }
        h2 { color: #333; }
        p { color: #555; line-height: 1.6; }
        .otp-box { font-size: 24px; font-weight: bold; color: #007bff; background: #f8f9fa; padding: 10px; display: inline-block; border-radius: 5px; margin: 10px auto; }
        .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #777; }
      </style>
    </head>
    <body>
      <div class="container">
      <img src="https://res.cloudinary.com/dfvo6ctew/image/upload/v1740745926/uploads/czstifpapxxshr5xqkhw.png" 
     alt="Read & Return Logo" 
     style="height: 150px; width: 150px; display: block; margin: auto;" />

        <div class="header">
          <h2>🔐 OTP Verification</h2>
        </div>
        
        <p>Hello <strong>${fullName}</strong>,</p>
        
        <p>Thank you for signing up! To complete your registration, please use the One-Time Password (OTP) below:</p>
        
        <div style="text-align: center;">
          <span class="otp-box">${otp}</span>
        </div>

        <p>This OTP is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>

        <p>Regards,</p>
        <p><strong>Read & Return</strong></p>

        <div class="footer">
          <p>&copy; 2025 Read & Return | All Rights Reserved</p>
        </div>
      </div>
    </body>
    </html>
  `;
    // Send OTP via email
    await sendOTPEmail(emailId, otp,emailTemplate);

    res.status(201).json({
      message: "OTP sent to email. Please verify your account.",
      shopkeeperId: newShopkeeper._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Verify OTP API
export const verifyOTP = async (req, res) => {
  try {
    const { shopkeeperId, otp } = req.body;

    const shopkeeper = await Shopkeeper.findById(shopkeeperId);
    if (!shopkeeper) {
      return res.status(400).json({ message: "Invalid user." });
    }

    if (shopkeeper.isVerified) {
      return res.status(400).json({ message: "Account already verified." });
    }

    if (shopkeeper.otp !== otp || new Date() > shopkeeper.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Mark user as verified
    shopkeeper.isVerified = true;
    shopkeeper.otp = null;
    shopkeeper.otpExpiry = null;
    await shopkeeper.save();

    // Generate JWT token
    const token = jwt.sign({ id: shopkeeper._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Account verified successfully.",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const login = async (req, res) => {
  // Validate email and password input
  await Promise.all([
    body("emailId").trim().isEmail().withMessage("Invalid email format").run(req),
    body("password")
      .isLength({ min: 6 })
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
      .withMessage("Password must be at least 6 characters long and contain letters and numbers.")
      .run(req),
  ]);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { emailId, password } = req.body;

    // Find shopkeeper by email
    const shopkeeper = await Shopkeeper.findOne({ emailId });
    if (!shopkeeper) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check if account is verified
    if (!shopkeeper.isVerified) {
      return res.status(400).json({ message: "Account is not verified. Please verify your email." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, shopkeeper.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate and set token as HTTP-only cookie
    generateToken({ id: shopkeeper._id,type:"shopkeeper" }, res);

    res.status(200).json({
      message: "Login successful.",
      shopkeeper: {
        id: shopkeeper._id,
        fullName: shopkeeper.fullName,
        emailId: shopkeeper.emailId,
        mobileNo: shopkeeper.mobileNo,
        profilePic: shopkeeper.profilePic,
        address: shopkeeper.address,
        payment: shopkeeper.payment,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const addProduct = async (req, res, next) => {
  try {
    // Validate request body
    await Promise.all([
      body("title").trim().notEmpty().withMessage("Title is required").run(req),
      body("author").trim().notEmpty().withMessage("Author is required").run(req),
      body("genre").trim().notEmpty().withMessage("Genre is required").run(req),
      body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer").run(req),
      body("MRP_price").isFloat({ min: 0 }).withMessage("MRP Price must be a positive number").run(req),
      body("Rental_Price").isFloat({ min: 0 }).withMessage("Rental Price must be a positive number").run(req),
      body("detail").optional().trim().run(req),
    ]);

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ensure exactly 3 files are uploaded
    const files = req.files;
    if (!files || files.length !== 3) {
      return res.status(400).json({ error: "Exactly 3 images are required" });
    }

    // Upload files to Cloudinary & store paths to delete later
    let uploadedImages = [];
    let filePaths = [];

    for (const file of files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "uploads",
          resource_type: "image",
        });

        uploadedImages.push(result.secure_url);
        filePaths.push(file.path); // Store local file path for deletion
      } catch (uploadError) {
        return res.status(500).json({ error: "Image upload failed", details: uploadError });
      }
    }

    // Delete local files after successful upload
    filePaths.forEach((filePath) => {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    });

    const { title, author, genre, stock, MRP_price, Rental_Price, detail } = req.body;
    const shopkeeperId = req.decode_Data._id; // Extract Shopkeeper ID from token

    // Check if shopkeeper exists
    const shopkeeper = await Shopkeeper.findById(shopkeeperId);
    if (!shopkeeper) {
      return res.status(404).json({ error: "Shopkeeper not found" });
    }

    // Create new product
    const newProduct = new Product({
      title,
      author,
      genre,
      stock,
      MRP_price,
      Rental_Price,
      detail,
      shopkeeperId,
      imageOfBook: uploadedImages, // Store exactly 3 uploaded image URLs
    });

    await newProduct.save();

    // Update Shopkeeper schema with new product
    shopkeeper.products.push(newProduct._id);
    await shopkeeper.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};





export const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    // Validate request body
    await Promise.all([
      body("title").optional().trim().notEmpty().withMessage("Title is required").run(req),
      body("author").optional().trim().notEmpty().withMessage("Author is required").run(req),
      body("genre").optional().trim().notEmpty().withMessage("Genre is required").run(req),
      body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be a non-negative integer").run(req),
      body("MRP_price").optional().isFloat({ min: 0 }).withMessage("MRP Price must be a positive number").run(req),
      body("Rental_Price").optional().isFloat({ min: 0 }).withMessage("Rental Price must be a positive number").run(req),
      body("detail").optional().trim().run(req),
    ]);

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Extract data from request body
    const { title, author, genre, stock, MRP_price, Rental_Price, detail } = req.body;
    
    let updatedData = { title, author, genre, stock, MRP_price, Rental_Price, detail };

    // If images are uploaded, update images
    if (req.files && req.files.length > 0) {
      // Upload new images to Cloudinary
      let uploadedImages = [];
      let filePaths = [];

      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "uploads",
            resource_type: "image",
          });

          uploadedImages.push(result.secure_url);
          filePaths.push(file.path); // Store local file path for deletion
        } catch (uploadError) {
          return res.status(500).json({ error: "Image upload failed", details: uploadError });
        }
      }

      // Delete local files after successful upload
      filePaths.forEach((filePath) => {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      });

      // Delete old images from Cloudinary
      if (product.imageOfBook.length > 0) {
        for (const oldImage of product.imageOfBook) {
          const publicId = oldImage.split("/").pop().split(".")[0]; // Extract public ID
          await cloudinary.uploader.destroy(`uploads/${publicId}`);
        }
      }

      updatedData.imageOfBook = uploadedImages; // Store new images
    }

    // Update product in database
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};