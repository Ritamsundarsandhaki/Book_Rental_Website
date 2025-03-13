import express from "express"
import { signup ,verifyOTP,login,addProduct,updateProduct} from "../controllers/shopkeeper.controller.js";
import TokenGard from "../middleware/user.auth.middleware.js";
import { uploadMiddleware } from "../middleware/upload..middleware.js";
 

const Router = express.Router();

Router.post("/signup",signup);
Router.post('/verify',verifyOTP);
Router.post("/login",login);
Router.post("/add-product",TokenGard,(req,res,next)=>{
    uploadMiddleware(3)(req,res,next)},addProduct);
Router.post("/updeted-product",TokenGard,(req,res,next)=>{
        uploadMiddleware(3)(req,res,next)},updateProduct);
    


export default Router;