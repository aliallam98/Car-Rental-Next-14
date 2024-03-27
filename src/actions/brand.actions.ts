"use server";

import connectToDatabase from "@/DB/connection";
import brandModel from "@/DB/models/Brand.Model";
import { ICreateBrandParams, IUpdateBrandParams } from "@/typings";
import slugify from "slugify";
import { checkUser } from "./user.actions";
import { handleError } from "@/lib/utils";
import { ACTIONS_TYPE, ENTITY_TYPE } from "../typings";
import { createActivityLogs } from "./activity.action";
import { revalidatePath } from "next/cache";

export const getAllBrands = async () => {
  await connectToDatabase();
  const brands = await brandModel.find({}).populate([
    {
      path: "createdBy",
      select: "firstName lastName",
    },
  ]);
  return JSON.parse(JSON.stringify(brands));
};

export const getBrandById = async (id: string) => {
  await connectToDatabase();

  const brand = await brandModel.findById(id);

  if (!brand) throw new Error("Cannot Find This brand");

  return brand;
};

export const createBrand = async (brandData: ICreateBrandParams) => {
  try {
    const userId = await checkUser();
    await connectToDatabase();
    brandData.name = brandData.name.toLowerCase();
    const isNameExist = await brandModel.findOne({ name: brandData.name });
    if (isNameExist) {
      throw new Error(`This Brand Name${isNameExist.name} already exists`);
    }
    brandData.slug = slugify(brandData.name);
    brandData.createdBy = userId;

    const newBrand = await brandModel.create(brandData);

    const ac = await createActivityLogs({
      entityId: newBrand._id,
      entityTitle: newBrand.name,
      actionType: ACTIONS_TYPE.Create,
      entityType: ENTITY_TYPE.Brand,
    });

    console.log("Activity", ac);

    return {
      success: true,
      message: `Brand ${newBrand.name} created successfully`,
      results: JSON.parse(JSON.stringify(newBrand)),
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateBrand = async (
  brandId: string,
  brandData: IUpdateBrandParams
) => {
  const userId = await checkUser();

  await connectToDatabase();

  const brandToUpdate = await brandModel.findById(brandId);
  if (!brandToUpdate) throw new Error("Cannot find this brand");
  if (brandToUpdate.createdBy !== userId) throw new Error("Unauthorized");

  const newBrand = await brandModel.findByIdAndUpdate(brandId, brandData, {
    new: true,
  });

  await createActivityLogs({
    entityId: brandToUpdate._id,
    entityTitle: brandToUpdate.name,
    actionType: ACTIONS_TYPE.Update,
    entityType: ENTITY_TYPE.Brand,
  });

  
  revalidatePath(`/dashboard/brands/${brandId}`);
  revalidatePath("/dashboard/brands/");
  revalidatePath("/dashboard/brand/");
  return { success: true, message: "Created", results: newBrand };
};

export const deleteBrand = async (brandId: string) => {
  try {
    await connectToDatabase();
    const userId = await checkUser();

    const brandToDelete = await brandModel.findById(brandId);

    if (!brandToDelete) throw new Error("Cannot Find This brand");
    if (brandToDelete.createdBy.toString() !== userId?.toString())
      throw new Error("Unauthorized");

    await brandModel.findByIdAndDelete(brandId);

    await createActivityLogs({
      entityId: brandToDelete._id,
      entityTitle: brandToDelete.name,
      actionType: ACTIONS_TYPE.Delete,
      entityType: ENTITY_TYPE.Brand,
    });
    revalidatePath("/dashboard/brands");
    revalidatePath("/brand");
    return { success: true, message: "Deleted" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
};
