import mongoose, { Schema, Types, model } from "mongoose";

const bookingSchema = new Schema(
  {
    fullName: { type: String, required: true, lowercase: true },
    mobilePhone: {
      type: String,
      required: true,
    },
    specialRequest:String,
    rentalStartDate: { type:Date,required:true, min:Date.now()},
    rentalEndDate: { type:Date,required:true, min:Date.now()},
    carId:{type:Types.ObjectId,ref:"Car",required:true}
    ,
    status:{
      type:String,
      default:"Pending",
      enum:["Pending", "Received"]
    }
  },
  { timestamps: true }
);

const bookingModel = mongoose.models.Booking || model("Booking", bookingSchema);

export default bookingModel;
