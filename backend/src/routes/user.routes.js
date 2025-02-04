import express from "express"
import { login, signup ,rent,Order} from "../controllers/user.controllers.js";
import TokenGard from "../middleware/user.auth.middleware.js";


const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post('/order',Order)
Router.post('/test',TokenGard)


export default Router;


