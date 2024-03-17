import { Schema, model, models, Types } from "mongoose";

const categorySchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: String,
    imageUrl: { type: String, required: true },
    // createdBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timeStamp: true,
    strict: true,
  }
);

const categoryModel = model("Category", categorySchema);

export default categoryModel;
