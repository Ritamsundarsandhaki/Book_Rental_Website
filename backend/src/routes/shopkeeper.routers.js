import express from "express"
import { signup ,login,addProduct} from "../controllers/shopkeeper.controller.js";
 

const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/addproduct",addProduct)


export default Router;