import { Router } from "express";
import { changeStatus, createTask, deleteTask, getTasks,getFilterTasks, register, login, logout } from "../controller/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
export const router=Router();

router.get("/task",authMiddleware,getTasks);
router.post("/",authMiddleware,createTask);
router.post("/task/:id",changeStatus);
router.delete("/task/:id",deleteTask);
router.get("/task/filter",getFilterTasks);
router.post("/login",login);
router.post("/register",register);
router.post('/logout',logout);
