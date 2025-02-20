import express from "express"
import { login, signup ,Order,MyOrder} from "../controllers/user.controllers.js";
import TokenGard from "../middleware/user.auth.middleware.js";


const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post('/order',TokenGard,Order)
Router.get("/myorder",TokenGard,MyOrder)


export default Router;


