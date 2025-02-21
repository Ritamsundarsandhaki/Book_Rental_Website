import express from "express"
import { signup ,login,addProduct, showproduct,ShopkeeperOrders,UpdateOrderStatus,ShopkeeperProfile,updateProduct,deleteProduct} from "../controllers/shopkeeper.controller.js";
import TokenGard from "../middleware/user.auth.middleware.js";
import { uploadMiddleware } from "../middleware/upload..middleware.js";
 

const Router = express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.post("/addproduct",TokenGard,(req,res,next)=>{
    uploadMiddleware(3)(req,res,next)
},addProduct)
Router.post('/updateProduct',TokenGard,updateProduct);
Router.delete('/deleteProduct',TokenGard,deleteProduct)
Router.get("/showproduct",TokenGard, showproduct)
Router.get("/ShopkeeperOrders",TokenGard,ShopkeeperOrders)
Router.post("/UpdateOrderStatus",TokenGard,UpdateOrderStatus)
Router.get("/myprofil",TokenGard,ShopkeeperProfile)


export default Router;