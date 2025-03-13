import mongoose from "mongoose";
import Shopkeeper from "./shopkeeper.model.js";
import { type } from "os";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  MRP_price: {
    type: Number,
    required: true,
  },
  Rental_Price:{
    type:Number,
    required:true
  },
  detail: {
    type: String,
  },
  imageOfBook: [{ type: String }],
  shopkeeperId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Shopkeeper", 
    required: true,
  },
  views: { 
    type: Number, 
    default: 0,
  },
  reviews: [
    {
      username: {
        type: String,
        required: true,
      },
      star: {
        type: Number,
        required: true,
        min: 1,
        max: 5, // Ensuring the rating is between 1 and 5
      },
      reviewContent: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now, // Adds a timestamp for each review
      },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
