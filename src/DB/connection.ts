import mongoose from "mongoose";

const dbUrl = process.env.DB_URL as string;
let cached = (global as any).mongoose || { conn: null, promise: null };

const connectToDatabase = async () => {
  if (!dbUrl) throw new Error("DB url is not exist");

  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    (await mongoose
      .connect(dbUrl, {
        dbName: "Car-Rental",
      })
      .then((mongoose) => {
        console.log("DB Is Connected");
        return mongoose;
      })
      .catch(() => console.log("Failed To Connect")));

  cached.conn = await cached.promise;

  return cached.conn;
};

export default connectToDatabase;
