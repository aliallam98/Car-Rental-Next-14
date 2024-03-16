import carModel from "@/DB/models/Car.model";

export const getAllCars = async () => {
    await connectToDatabase()
    const cars = await carModel.find({})

    return cars
};

export const getCarById = async (id:string) => {
    await connectToDatabase()

    const car = await carModel.findById(id)

    if(!car) throw new Error("Cannot Find This car")

    return car
};

export const createCar = async (carData:any,userId:string) => {
    await connectToDatabase()

    carData.slug = slugify(carData.title)
    carData.createdBy = userId

    const newCar= await carModel.create(carData)
    return {success:true,message:"Created",results:newCar}
};

export const updateCar = async (carId:string,carData:any,userId:string) => {
    await connectToDatabase()

    const carToUpdate = await carModel.findById(carId)
    if(!carToUpdate) throw new Error("Cannot find this car")
    if(carToUpdate.createdBy !== userId) throw new Error("Unauthorized")

    const newCar = await findByIdAndUpdate(carId,carData,{new:true})
    return {success:true,message:"Created",results:newCar}
};


export const deleteCar = async (carId:string,userId:string) => {
    await connectToDatabase()

    const carToDelete = await carModel.findById(carId)

    if(!carToDelete) throw new Error("Cannot Find This car")
    if(carToDelete.createdBy !== userId) throw new Error("Unauthorized")

    await carModel.findByIdAndDelete(carId)

    return {success:true,message:"Deleted"}
};


