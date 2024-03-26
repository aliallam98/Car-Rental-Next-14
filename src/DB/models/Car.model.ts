import { Document, Schema, Types, model, models } from "mongoose";

const carSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    slug: String,
    imagesUrl: [{ type: String, required: true }],
    modelYear: { type: Number, required: true },
    seater: { type: Number, required: true },
    powerHorse: { type: Number, required: true },
    kilometersIncluded: { type: Number, required: true },
    rentalCost: { type: Number, required: true },
    relatedVideo: String,
    isOnSale:Boolean,
    discountByPercent:Number,
    discountByAmount:Number,
    createdBy: { type: Types.ObjectId, ref: "User" },
    categoryId: { type: Types.ObjectId, ref: "Category" },
    brandId: { type: Types.ObjectId, ref: "Brand" },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const carModel = models.Car ||   model("Car", carSchema) ; // ||

export default carModel;
