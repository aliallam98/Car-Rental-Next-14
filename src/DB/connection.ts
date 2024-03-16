import mongoose from "mongoose"

 const dbUrl = process.env.DB_URL as string
 let cached = (global as any).mongoose || {conn : null , promise:null}

const connectToDatabase = async () =>{

    if(!dbUrl) throw new Error("DB url is not exist")


    if(cached.conn) return cached.conn

    cached.process = cached.promise ||  await mongoose.connect(dbUrl,{
        dbName : "Car-Rental"
    }).then(()=>console.log("DB Is Connected")).catch(()=>console.log("Failed To Connect"))

    cached.conn = await cached.process
    return cached.conn

}

export default connectToDatabase