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
  const { title, author, genrey, stock, price, detail } = req.body;
  const ShopkeeperId = req.decode_Data._id; // Get Shopkeeper ID from decoded token

  try {
    if (!title || !author || !stock || !price || !detail || !genrey) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    // Create new product
    const newProduct = new Product({
      title,
      author,
      stock,
      price,
      detail,
      genrey,
      ShopkeeperId,
    });

    await newProduct.save();

    // Update Shopkeeper schema with new product
    const updatedShopkeeper = await Shopkeeper.findByIdAndUpdate(
      ShopkeeperId,
      { $push: { products: newProduct._id } }, // Push product reference to shopkeeper's products array
      { new: true } // Return updated shopkeeper document
    );

    if (!updatedShopkeeper) {
      return next(new Error("Shopkeeper not found"));
    }

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
      shopkeeper: updatedShopkeeper
    });

  } catch (error) {
    next(error);
  }
};


export const showproduct = async (req, res, next) => {
  try {
    const ShopkeeperId = req.decode_Data._id; // Extract shopkeeper's ID from token

    // Find the shopkeeper and populate the 'products' field correctly
    const shopkeeper = await Shopkeeper.findById(ShopkeeperId).populate("products");

    if (!shopkeeper) {
      return res.status(404).json({ message: "Shopkeeper not found" });
    }

    // Check if the shopkeeper has products
    if (!shopkeeper.products || shopkeeper.products.length === 0) {
      return res.status(200).json({ message: "No products found for this shopkeeper", products: [] });
    }

    // Log the populated products to verify
    console.log("Populated Products:", shopkeeper.products);

    res.status(200).json({
      message: "Products retrieved successfully",
      products: shopkeeper.products, // Send all products associated with this shopkeeper
    });
  } catch (error) {
    next(error);
  }
};

