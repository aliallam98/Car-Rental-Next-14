"use server";

import connectToDatabase from "@/DB/connection";
import bookingModel from "@/DB/models/Booking.Model";
import { checkUser } from "./user.actions";

export const getAllBookings = async () => {
  await connectToDatabase();
  const bookings = await bookingModel.find({});
  return JSON.parse(JSON.stringify(bookings));
};

export const getBookingById = async (bookingId: string) => {
  await connectToDatabase();

  const booking = await bookingModel.findById(bookingId);
  if (!booking) throw new Error("Cannot find this booking");

  return {
    success: true,
    message: "Done",
    results: JSON.parse(JSON.stringify(booking)),
  };
};

export const createBooking = async (bookingData: any) => {
  await connectToDatabase();
  bookingData.status = bookingData.status ? "Received" : "Pending"; 
  const newBooking = await bookingModel.create(bookingData);
  return {
    success: true,
    message: "You Request Has Sent",
    results: JSON.parse(JSON.stringify(newBooking)),
  };
};

export const updateBooking = async (bookingData: any, bookingId: string) => {
  try {
    await checkUser();
    await connectToDatabase();


    const bookingToUpdate = await bookingModel.findById(bookingId);
    if (!bookingToUpdate) throw new Error("Cannot find this booking");
    bookingData.status = bookingData.status ? "Received" : "Pending";


    await bookingModel.findByIdAndUpdate(bookingId,{...bookingData});
    return {
      success: true,
      message: "Updated",
    };
  } catch (error: any) {
    return {
      success: true,
      message: error.message,
    };
  }
};

export const deleteBooking = async (bookingId: string) => {
  const bookingToDelete = await bookingModel.findById(bookingId);
  if (!bookingToDelete) throw new Error("Cannot find this booking");
  await bookingModel.findByIdAndDelete(bookingId);

  return { success: true, message: "Deleted" };
};
