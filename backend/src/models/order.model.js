import mongoose from "mongoose";

const orderschema= mongoose.Schema(
    {
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },bookId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
        },
        status:{
            type:String,
            emum:[
                "pending","accept","shipped","out for delivery","delivered","pickup","sucess",
            ],
            default:"pending",
        },
        rentalDuration:{
            type:Number,
            require:true,
        },
        totalPrice:{
            type:Number,
            require:true,
        },
        deliveryAddresh:{
            type:String,
            require:true,
        },
        riderId:{
            type:String
        
        },
        shopkeeperId:{
            type:mongoose.Schema.Types.ObjectId,
            req:"Shoopkeeper",
        }
    }
)