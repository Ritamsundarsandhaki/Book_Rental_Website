import mongoose from "mongoose";

const shopkeeperSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  rentalHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  payment: {
    upiId: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
  },
  isVerified: {
    type: Boolean,
    default: false, 
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
}, { timestamps: true }); 

const Shopkeeper = mongoose.model("Shopkeeper", shopkeeperSchema);

export default Shopkeeper;
