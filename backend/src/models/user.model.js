import mongoose from "mongoose";
 const userschema= new mongoose.Schema(
    {
        fullName:{
            type:String,
            require: true,
        },
        emailId:{
            type:String,
            require:true,
        },
        mobileNo:{
            type:String,
            require:true,
        },
        password:{
            type:String,
            require:true,
        },
        proffilePic:{
            type:String,
        },
        rentelHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Order'
            }
        ],address:{
            type: String,
            require:true,
            default:null,
          }
    }
 )

 const User= mongoose.model("User",userschema)

 export default User;