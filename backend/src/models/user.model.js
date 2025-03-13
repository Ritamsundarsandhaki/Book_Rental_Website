import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true, // Fixed "require" → "required"
    },
    emailId: {
      type: String,
      required: true, // Fixed "require" → "required"
    },
    mobileNo: {
      type: String,
      required: true, // Fixed "require" → "required"
    },
    password: {
      type: String,
      required: true, // Fixed "require" → "required"
    },
    profilePic: { // Fixed "proffilePic" → "profilePic"
      type: String,
    },
    rentalHistory: [ // Fixed "rentelHistory" → "rentalHistory"
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    address: {
      type: String,
      required: true, // Fixed "require" → "required"
      default: null,
    },
    preference: [], // Fixed "prefrence" → "preference"
  }
);

const User = mongoose.model("User", userSchema);

export default User;
