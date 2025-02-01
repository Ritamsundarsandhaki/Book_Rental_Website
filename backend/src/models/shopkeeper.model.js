import mongoose from "mongoose";

const shopkeeperschema = mongoose.Schema({
  fullnamer: {
    type: String,
    require: true,
  },
  emailId: {
    type: String,
    require: true,
  },
  mobileNo: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  proffilePic: {
    type: String,
  },
  rentelHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  product :[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"product"
    }
  ],
  payment:{
    upiId:{
      type:String,
    },
    amount:{
        type:Number,
        require:true,
        default:0,
    }
  },
  addresh:{
    type: String,
    require:true,
  }

});

const Shopkeeper=mongoose.model("Shopkeeper",shopkeeperschema);

export default Shopkeeper;
