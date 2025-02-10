import express from "express"
import { signup ,login,addProduct} from "../controllers/shopkeeper.controller.js";
import TokenGard from "../middleware/user.auth.middleware.js";
 

const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/addproduct",TokenGard,addProduct)


export default Router;