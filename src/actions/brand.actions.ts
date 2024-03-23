"use server"

import connectToDatabase from "@/DB/connection";
import brandModel from "@/DB/models/Brand.Model";
import { ICreateBrandParams, IUpdateBrandParams } from "@/typings";
import slugify from "slugify";
import { checkUser } from "./user.actions";

export const getAllBrands = async () => {
    await connectToDatabase()
    const brands = await brandModel.find({})

    return brands
};

export const getBrandById = async (id:string) => {
    await connectToDatabase()

    const brand = await brandModel.findById(id)

    if(!brand) throw new Error("Cannot Find This brand")

    return brand
};

export const createBrand = async (brandData:ICreateBrandParams) => {
    const userId = await checkUser()

    await connectToDatabase()

    brandData.slug = slugify(brandData.name)
    brandData.createdBy = userId

    const newBrand = await brandModel.create(brandData)
    return {success:true,message:"Created",results:newBrand}
};

export const updateBrand = async (brandId:string,brandData:IUpdateBrandParams) => {
    const userId = await checkUser()

    await connectToDatabase()

    const brandToUpdate = await brandModel.findById(brandId)
    if(!brandToUpdate) throw new Error("Cannot find this brand")
    if(brandToUpdate.createdBy !== userId) throw new Error("Unauthorized")

    const newBrand = await brandModel.findByIdAndUpdate(brandId,brandData,{new:true})
    return {success:true,message:"Created",results:newBrand}
};


export const deleteBrand = async (brandId:string,userId:string) => {
    await connectToDatabase()

    const brandToDelete = await brandModel.findById(brandId)

    if(!brandToDelete) throw new Error("Cannot Find This brand")
    if(brandToDelete.createdBy !== userId) throw new Error("Unauthorized")
    await brandModel.findByIdAndDelete(brandId)

    return {success:true,message:"Deleted"}
};


