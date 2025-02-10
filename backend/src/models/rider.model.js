import mongoose from "mongoose";

const riderschema = mongoose.Schema({
  riderName: {
    type: String,
    require: true,
  },
  emailId: {
    type: String,
    require: true,
  },

  MobileNo: {
    type: String,
    require: true,
  },

  MobileNo: {
    type: String,
    require: true,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  bikeNo: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Rider = mongoose.model("rider", riderschema);
export default Rider;
