import mongoose from "mongoose";

const orderschema= mongoose.Schema(
    {
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },bookId:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
        ] ,
        availability:[

        ],
        status:{
            type:String,
            emum:[
                "pending","conform","delivered","return","acepted",
            ],
            default:"pending",
        },
        rentalDuration:{
            type:Number,
            required:true,
        },
        totalPrice:{
            type:Number,
            required:true,
        },
        deliveryAddresh:{
            type:String,
            require:true,
        },
        riderId:{
            type:String
        
        },
        shopkeeperId:[{
            type:mongoose.Schema.Types.ObjectId,
            req:"Shoopkeeper",
        }]
    }
)

const Order = mongoose.model("order", orderschema);
export default Order;