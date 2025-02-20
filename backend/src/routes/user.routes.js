import express from "express"
import { login, signup ,Order,MyOrder,UpdateOrderStatusByUser} from "../controllers/user.controllers.js";
import TokenGard from "../middleware/user.auth.middleware.js";


const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post('/order',TokenGard,Order)
Router.get("/myorder",TokenGard,MyOrder)
Router.post("/ordupdate",TokenGard,UpdateOrderStatusByUser)


export default Router;


