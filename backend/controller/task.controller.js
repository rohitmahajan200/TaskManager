import { Task } from "../model/task.model.js";

export const createTask=async(req,res)=>{
    try {
        console.log("req obj ",req);
        const {title,description,assignto,status}=req.body;
        const newTask=await Task.create({title,description,assignto,status});
        if(newTask){
            return res
            .status(201)
            .json({"message":"New task created",data:newTask});
        }
        else{
            return res
            .status(500)
            .json({"message":"Some thing went wrong we are checking",error:newTask});
        }
    } catch (error) {        
        return res
            .status(400)
            .json({"message":error.message});
    }
}

export const getTasks=async(req,res)=>{
    try {
        const {assignto="",status=""}=req.body;
        let allTasks;
        if(assignto!="" && status!=""){
            allTasks=await Task.find({$and:[{assignto:assignto},{status:status}]});
        }
        else if(assignto=="" && status!=""){
            allTasks=await Task.find({status:status});
        }
        else if(assignto!="" && status==""){
            allTasks=await Task.find({assignto:assignto});
        }
        else{
            allTasks=await Task.find({});
        }
        
        if(allTasks){
            return res
            .status(200)
            .json({"message":"tasks are fetched",data:allTasks});
        }
        else{
            return res
            .status(400)
            .json({"message":"Some thing is wrong please check",error:allTasks});
        }
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({"message":"Some went wrong with server we are checking"});
    }
}