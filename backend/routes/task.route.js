import { Router } from "express";
import { createTask, getTasks } from "../controller/task.controller.js";

export const router=Router();

router.get("/task",getTasks);
router.post("/",createTask);