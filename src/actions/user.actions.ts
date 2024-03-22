"use server";

import connectToDatabase from "@/DB/connection";
import userModel from "@/DB/models/User.model";
import { handleError } from "@/lib/utils";
import { ICreateUserParams } from "@/typings";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const createUser = async (userData: ICreateUserParams) => {
  try {
    await connectToDatabase();
    const isEmailExist = await userModel.findOne({
      email: userData.email,
    });
    if (isEmailExist)
      return {
        success: false,
        message: "This email Already Exist",
      };

    const newUser = await userModel.create(userData);
    return {
      success: true,
      message: "User Created",
      results: newUser,
    };
  } catch (error) {
    handleError(error);
  }
};
export const updateUser = async (
  clerkId: string,
  userData: ICreateUserParams
) => {
  try {
    await connectToDatabase();
    const updatedUser = userModel.findByIdAndUpdate({ clerkId }, userData, {
      new: true,
    });
    if (!updateUser)
      return { success: false, message: "Failed To Find This user" };
    return {
      success: true,
      message: "User Created",
      results: updatedUser,
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const userToDelete: any = userModel.findOne({ clerkId });
    if (!userToDelete) {
      return { success: false, message: "Failed To Find This user" };
    }

    const id = userToDelete._id;

    // Unlink relationships
    //  await Promise.all([

    //     // Update the 'events' collection to remove references to the user
    //     // eventModel.updateMany(
    //     //   { _id: { $in: userToDelete.events } },
    //     //   { $pull: { organizer: userToDelete._id } }
    //     // ),

    //     // Update the 'orders' collection to remove references to the user
    //     // orderModel.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
    //   ])

    // Delete user
    const deletedUser = await userModel.findByIdAndDelete(id);
    revalidatePath("/");

    return deletedUser ? deletedUser : null;
  } catch (error) {
    handleError(error);
  }
};

export const checkUser = async () => {
  try {
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
    return userId;
  } catch (error) {
    handleError(error);
  }
};
