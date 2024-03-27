import { Document, Schema, Types, model, models } from "mongoose";

const activitySchema = new Schema(
  {
    entityType: {
      type: String,
      default: "",
      enum: ["Category", "Brand", "Car", "Order"],
    },
    entityTitle: String,
    entityId: String,
    actionType: {
      type: String,
      default: "",
      enum: ["Create", "Update", "Delete"],
    },
    userId: { type: Types.ObjectId, ref: "User" },
    userImage: String,
    userFullName: String,
  },
  { timestamps: true }
);

const activityModel = models.Activity || model("Activity", activitySchema); //

export default activityModel;
