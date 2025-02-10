import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Shopkeeper from '../models/shopkeeper.model.js';
const TokenGard = async (req,res,next) => {
    console.log(req)
    try{
        const token = req.cookies.token;
        console.log(token);
        if(!token){
            const error = new Error("Access Denied");
            error.statusCode = 401;
            next(error);
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            const error = new Error("Access Denied Token Expires");
            error.statusCode = 401;
            next(error);
        }
        if(decode.type=='user'){
            console.log("in user")
            const user = await User.findById(decode.id).select("-password");
            if(!user){
                const error = new Error("User not Found");
            error.statusCode = 404;
            next(error);
            }
            req.decode_Data  =user;
            next();
        }
        else if(decode.type=='shopkeeper'){
            const shopkeeper = await Shopkeeper.findById(decode.id).select("-password");
            if(!shopkeeper){
                const error = new Error("shopkeeper not Found");
            error.statusCode = 404;
            next(error);
            }
            req.decode_Data  =shopkeeper;
            next();
        }
    }
    catch(error){
        next(error)
    }
   
}

export default TokenGard;