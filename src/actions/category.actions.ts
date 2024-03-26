"use server";

import connectToDatabase from "@/DB/connection";
import categoryModel from "@/DB/models/Category.Model";
import slugify from "slugify";
import { checkUser } from "./user.actions";
import { ICreateCategoryParams, IUpdateCategoryParams } from "@/typings";
import userModel from "@/DB/models/User.model";

export const getAllCategories = async () => {
  await connectToDatabase();
  const categories = await categoryModel.find().populate([
    {
      path: "createdBy",
      select: "firstName lastName",
    },
  ]);

  return JSON.parse(JSON.stringify(categories));
};

export const getCategoryById = async (id: string) => {
  try {
    await connectToDatabase();

    const category = await categoryModel
      .findById(id)
      .populate([{ path: "createdBy", select: "firstName lastName" }]);

    if (!category) throw new Error("Cannot Find This Category");

    return {
      success: true,
      message: `Done`,
      results: JSON.parse(JSON.stringify(category)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};



export const createCategory = async (categoryData: ICreateCategoryParams) => {
  try {
    const userId = await checkUser();
    await connectToDatabase();

    categoryData.name = categoryData.name.toLowerCase();
    const isCategoryExist = await categoryModel.findOne({
      name: categoryData.name,
    });

    if (isCategoryExist) {
      throw new Error(`Category ${categoryData.name} already exists`);
    }

    categoryData.slug = slugify(categoryData.name);
    categoryData.createdBy = userId!;
    const newCategory = await categoryModel.create(categoryData);
    return {
      success: true,
      message: `Category ${newCategory.name} Created successfully`,
      results: newCategory,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateCategory = async (
  categoryId: string,
  categoryData: IUpdateCategoryParams
) => {
  try {
    await connectToDatabase();
    const userId = await checkUser();
    const categoryToUpdate = await categoryModel.findById(categoryId);

    if (!categoryToUpdate) throw new Error("Cannot find this category");
    if (categoryToUpdate?.createdBy.toString() !== userId?.toString())
      throw new Error("Unauthorized");

    const newCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      {
        ...categoryData,
      },
      {
        new: true,
      }
    );
    return {
      success: true,
      message: `Category ${newCategory?.name} Updated successfully`,
      results: JSON.parse(JSON.stringify(categoryData)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteCategory = async (categoryId: string) => {
  const userId = await checkUser();
  await connectToDatabase();
  const categoryToDelete = await categoryModel.findById(categoryId);
  if (!categoryToDelete) throw new Error("Cannot Find This Category");
  if (categoryToDelete.createdBy !== userId) throw new Error("Unauthorized");

  await categoryModel.findByIdAndDelete(categoryId);

  return { success: true, message: "Deleted" };
};
