import express from "express"
import { login, signup ,rent,Order} from "../controllers/user.controllers.js";


const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post('/order',Order)


export default Router;


