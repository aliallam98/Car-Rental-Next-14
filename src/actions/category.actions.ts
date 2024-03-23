"use server";

import connectToDatabase from "@/DB/connection";
import categoryModel from "@/DB/models/Category.Model";
import slugify from "slugify";
import { checkUser } from "./user.actions";
import { ICreateCategoryParams, IUpdateCategoryParams } from "@/typings";

export const getAllCategories = async () => {
  await connectToDatabase();
  const categories = await categoryModel.find({});
  return categories;
};

export const getCategoryById = async (id: string) => {
  await connectToDatabase();

  const category = await categoryModel.findById(id);

  if (!category) throw new Error("Cannot Find This Category");

  return category;
};

export const createCategory = async (categoryData: ICreateCategoryParams) => {
  const userId = await checkUser();
  await connectToDatabase();
  categoryData.slug = slugify(categoryData.name);
  categoryData.createdBy = userId!;
  const newCategory = await categoryModel.create(categoryData);
  return newCategory;
};
export const updateCategory = async (
  categoryId: string,
  categoryData: IUpdateCategoryParams
) => {
  await connectToDatabase();
  const userId = await checkUser();
  const categoryToUpdate = await categoryModel.findById(categoryId);
  if (!categoryToUpdate) throw new Error("Cannot find this category");
  if (categoryToUpdate.createdBy !== userId) throw new Error("Unauthorized");

  const newCategory = await categoryModel.findByIdAndUpdate(
    categoryId,
    {
      ...categoryData,
    },
    {
      new: true,
    }
  );
  return newCategory;
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
