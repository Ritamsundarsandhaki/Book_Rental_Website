import bcrypt from "bcrypt";
import Shopkeeper from "../models/shopkeeper.model.js";
import { generatetooken } from "../lib/util.js";
import Prodect from "../models/prodect.model.js";

export const signup = async (req, res, next) => {
  const { fullName, emailId, mobileNo, password, proffilePic, addresh } =
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
    generatetooken(dataset, res);
    res.status(200).json({ message: "Wellcome Back" });
  } catch (error) {
    next(error);
  }
};

export const addproduct = async (req, res, next) => {
  const { title, author, genery, stock, price, detail } = req.body;
  try{
    if(!title||!author||!stock||!price ||!detail||!genery){
        const error = new Error("All Filds are required");
        error.statusCode = 400;
        next(error);
    }
    
    const product = await product.create({
        title,
        author,
        stock,
        genery,
        price,
        detail
      });
      
  }
catch(error){
 next(error)
}
};
