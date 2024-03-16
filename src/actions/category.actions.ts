import categoryModel from "@/DB/models/Category.Model";

export const getAllCategories = async () => {
    await connectToDatabase()
    const categories = await categoryModel.find({})

    return categories
};

export const getCategoryById = async (id:string) => {
    await connectToDatabase()

    const category = await categoryModel.findById(id)

    if(!category) throw new Error("Cannot Find This Category")

    return category
};

export const createCategory = async (categoryData:any,userId:string) => {
    await connectToDatabase()

    categoryData.slug = slugify(categoryData.title)
    categoryData.createdBy = userId
    const newCategory = await categoryModel.create(categoryData)
    return {success:true,message:"Created",results:newCategory}
};
export const updateCategory = async (categoryId:string,categoryData:any,userId:string) => {
    await connectToDatabase()

    const categoryToUpdate = await categoryModel.findById(categoryId)
    if(!categoryToUpdate) throw new Error("Cannot find this category")
    if(categoryToUpdate.createdBy !== userId) throw new Error("Unauthorized")

    const newCategory = await findByIdAndUpdate(categoryId,categoryData)
    
};


export const deleteCategory = async (categoryId:string,userId:string) => {
    await connectToDatabase()

    const categoryToDelete = await categoryModel.findById(categoryId)

    if(!categoryToDelete) throw new Error("Cannot Find This Category")
    if(categoryToDelete.createdBy !== userId) throw new Error("Unauthorized")

    await categoryModel.findByIdAndDelete(categoryId)

    return {success:true,message:"Deleted"}
};


