import mongoose from "mongoose";
import Shopkeeper from "./shopkeeper.model.js";

const productschema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  genery: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  detail: {
    type: String,
  },
  imageOfBook:[{type:String}],
  ShopkeeperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shopkeeper",
    require: true,
  },viewes:{
    type:Number,
    default:0,
  }
});

const Product = mongoose.model("Product", productschema);

export default Product;
