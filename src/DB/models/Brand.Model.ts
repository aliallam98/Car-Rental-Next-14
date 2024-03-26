import { Document, Schema, Types, model, models } from "mongoose";

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: String,
    imageUrl: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    strict: true,
  }
);

const brandModel = models.Brand || model("Brand", brandSchema); //

export default brandModel;
