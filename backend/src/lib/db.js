  import mongoose from "mongoose"

 export const connectDb=async()=>{
    try{
        const connnection =await mongoose.connect(process.env.MONGO_URL);
        console.log( "succesfully connected RWB");
        
    }
    catch(error)
    {
        console.log( "mongooseerror",error);
        
    }
 }
