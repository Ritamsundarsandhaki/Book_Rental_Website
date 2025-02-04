import express from "express"
import { signup ,login,addproduct} from "../controllers/shopkeeper.controller.js";
 

const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/addproduct",addproduct)


export default Router;