"use server";

import connectToDatabase from "@/DB/connection";
import { checkUser } from "./user.actions";
import activityModel from "@/DB/models/Activity.Model";
import { currentUser } from "@clerk/nextjs";
import userModel from "@/DB/models/User.model";
import { ACTIONS_TYPE, ENTITY_TYPE } from "@/typings";

interface IProps {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  actionType: ACTIONS_TYPE;
}

export const createActivityLogs = async ({
  actionType,
  entityId,
  entityTitle,
  entityType,
}: IProps) => {
  try {
    await connectToDatabase();
    const user = await currentUser();
    const userId = user?.publicMetadata.userId as string;
    if (!userId) {
      throw new Error("unauthorized");
    }
    await connectToDatabase();

    const isExist = await userModel.findById(userId);

    if (!isExist) {
      throw new Error("User not found");
    }

    console.log(isExist);

    const newActivity = await activityModel.create({
      userId: isExist._id,
      userFullName: `${isExist.firstName} - ${isExist.lastName}`,
      userImage: isExist.image,
      entityId,
      entityTitle,
      entityType,
      actionType,
    });
    return {
      success: true,
      message: "Activity Done",
      results: JSON.parse(JSON.stringify(newActivity)),
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to create activity" };
  }
};

export const getAllOrgActivities = async () => {
  try {
    await connectToDatabase();
    await checkUser();
    const activities = await activityModel.find({});

    return {
      success: true,
      message: "Activity Done",
      results: JSON.parse(JSON.stringify(activities)),
    };
  } catch (error) {}
};
