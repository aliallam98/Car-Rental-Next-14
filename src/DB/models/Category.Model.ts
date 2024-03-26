import { Document, Schema, Types, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    slug: String,
    imageUrl: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    strict: true,
    toJSON:{virtuals:true}
  }
);



const categoryModel =  models.Category || model("Category", categorySchema); //

export default categoryModel;
