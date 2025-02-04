import express from "express"
import { login, signup ,rent} from "../controllers/user.controllers.js";


const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)



export default Router;


