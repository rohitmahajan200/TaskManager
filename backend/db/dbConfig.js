import mongoose from "mongoose";

export const connectToDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(process.env.DB_URI);
        console.log("Database connected on host",connectionInstance.connection.host);
    } catch (error) {
        console.log("error while connecting DB");
    }
}