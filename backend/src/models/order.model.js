import mongoose from "mongoose";

const orderschema= mongoose.Schema(
    {
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
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
        shopkeeperId:[{
            type:mongoose.Schema.Types.ObjectId,
            req:"Shoopkeeper",
        }]
    }
)

const Order = mongoose.model("order", orderschema);
export default Order;