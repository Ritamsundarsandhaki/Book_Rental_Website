import express from "express"
import { login, signup ,Order} from "../controllers/user.controllers.js";
import TokenGard from "../middleware/user.auth.middleware.js";


const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post('/order',TokenGard,Order)


export default Router;


