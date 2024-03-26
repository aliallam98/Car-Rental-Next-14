"use server";

import connectToDatabase from "@/DB/connection";
import carModel from "@/DB/models/Car.model";
import slugify from "slugify";
import { checkUser } from "./user.actions";
import categoryModel from "@/DB/models/Category.Model";
import brandModel from "@/DB/models/Brand.Model";

export const getAllCars = async () => {
  await connectToDatabase();
  const cars = await carModel.find({});

  return cars;
};

export const getCarById = async (id: string) => {
  await connectToDatabase();

  const car = await carModel.findById(id);

  if (!car) throw new Error("Cannot Find This car");

  return car;
};

export const createCar = async (carData: any) => {
  try {
    const userId = await checkUser();
    await connectToDatabase();

    //check category
    carData.name = carData.name.toLowerCase();
    const isCategoryExist = await categoryModel.findById(carData.categoryId);
    if (!isCategoryExist) {
      throw new Error("Cannot find category");
    }

    //check brand
    const isBrandExist = await brandModel.findById(carData.brandId);
    if (!isBrandExist) {
      throw new Error("Cannot find category");
    }

    carData.slug = slugify(carData.name);
    carData.createdBy = userId;
    const newCar = await carModel.create(carData);

    return {
      success: true,
      message: "Created",
      results: JSON.parse(JSON.stringify(newCar)),
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updateCar = async (
  carId: string,
  carData: any,
  userId: string
) => {
  await connectToDatabase();

  const carToUpdate = await carModel.findById(carId);
  if (!carToUpdate) throw new Error("Cannot find this car");
  if (carToUpdate.createdBy !== userId) throw new Error("Unauthorized");

  const newCar = await carModel.findByIdAndUpdate(carId, carData, {
    new: true,
  });
  return { success: true, message: "Created", results: newCar };
};

export const deleteCar = async (carId: string, userId: string) => {
  await connectToDatabase();

  const carToDelete = await carModel.findById(carId);

  if (!carToDelete) throw new Error("Cannot Find This car");
  if (carToDelete.createdBy !== userId) throw new Error("Unauthorized");

  await carModel.findByIdAndDelete(carId);

  return { success: true, message: "Deleted" };
};

export const getCarBySlug = async (slug: String) => {
  try {
    await connectToDatabase();
    const carToFind = await carModel.findOne({ slug });
    if (!carToFind) {
      throw new Error("Could not find this Doc");
    }
    return {
      success: true,
      message: "Done",
      results: JSON.parse(JSON.stringify(carToFind)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getCarsByCategorySlug = async (slug: string) => {
  try {
    await connectToDatabase();
    const categoryToFind = await categoryModel.findOne({ slug });

    if (!categoryToFind) throw new Error("Cannot Find This Category");

    const cars = await carModel.find({ categoryId: categoryToFind._id });

    return {
      success: true,
      message: `Done`,
      results: JSON.parse(JSON.stringify(cars)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const getCarsByBrandSlug = async (slug: string) => {
  try {
    await connectToDatabase();
    const brandToFind = await brandModel.findOne({ slug });

    console.log(brandToFind,slug);
    

    if (!brandToFind) throw new Error("Cannot Find This brand");

    const cars = await carModel.find({ brandId: brandToFind._id });

    return {
      success: true,
      message: `Done`,
      results: JSON.parse(JSON.stringify(cars)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
