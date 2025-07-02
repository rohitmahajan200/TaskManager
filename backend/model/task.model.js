import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    assignto:{
        type:String,
        required:true,
        lowercase:true,
        index:true
    },
    status:{
        type:String,
        lowercase:true,
        enum:["to-do","in-process","done"],
        index:true
    }
},{
    timestamps:true
});

export const Task=mongoose.model("Task",taskSchema);