import bcrypt from "bcrypt";
import Shopkeeper from "../models/shopkeeper.model.js";
import generateToken from "../lib/util.js";
import Product from '../models/prodect.model.js'

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

  const { title, author, genrey, stock, price, detail,} = req.body;
  const ShopkeeperId = req.decode_Data._id
  console.log(ShopkeeperId)

  try {
    if (!title || !author || !stock || !price || !detail || !genrey) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }
    const id ='67a09679573b9eae3cf48e19'
    const newProduct = new Product({
      title,
      author,
      stock,
      price,
      detail,
      genrey,
      ShopkeeperId // Assuming authentication middleware sets req.user
    });

    await newProduct.save();
    const updateProduct = await Shopkeeper.findByIdAndUpdate(id, {  $push: { product: newProduct._id },},)
    console.log(updateProduct)
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    next(error);
  }
};
