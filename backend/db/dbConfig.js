import mongoose from "mongoose";

export const connectToDB=async()=>{
    try {
        //const connectionInstance=await mongoose.connect(process.env.DB_URI);//use this for safe preactice
        const connectionInstance=await mongoose.connect("mongodb+srv://testuser:Rohit3939@cluster0.h2ljr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0/");
        console.log("Database connected on host",connectionInstance.connection.host);
    } catch (error) {
        console.log("error while connecting DB",error);
    }
}