import connectToDatabase from "@/DB/connection"
import bookingModel from "@/DB/models/Booking.Model"


export const getAllBookings = async()=>{
 const bookings = await bookingModel.find({})

 return bookings
}

export const getBookingById = async(bookingId:string)=>{
    const booking = await bookingModel.findById(bookingId)
    if(!booking) throw new Error("Cannot find this booking")

    return {success:true,message:"Done",results:booking}
}

export const createBooking = async(bookingData:any)=>{
    await connectToDatabase()
    const newBooking = await bookingModel.create(bookingData)
    return {success:true,message:"You Request Has Sent",results:newBooking}
}
export const updateBooking = async(bookingData:any,bookingId:string)=>{
    await connectToDatabase()
    const bookingToUpdate = await bookingModel.findById(bookingId)
    if(!bookingToUpdate) throw new Error("Cannot find this booking")
    const newBooking = await bookingModel.findByIdAndUpdate(bookingData)
    return {success:true,message:"You Request Has Sent",results:newBooking}
}



export const deleteBooking = async(bookingId:string)=>{
    const bookingToDelete = await bookingModel.findById(bookingId)
    if(!bookingToDelete) throw new Error("Cannot find this booking")

    await bookingModel.findByIdAndDelete(bookingId)

    return {success:true,message:"Deleted"}
}