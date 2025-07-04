import { Task } from "../model/task.model.js";
import { useParams } from "react-router-dom";
import { User } from "../model/user.model.js";
export const createTask = async (req, res) => {
  try {
    const { title, description, assignto, status } = req.body;
    if (
      [title, description, assignto, status].some(
        (item) => !item.toString().trim()
      )
    ) {
      return res
        .status(400)
        .json({ message: "All fileds are required", success: false });
    }
    const newTask = await Task.create({ title, description, assignto, status });

    if (newTask) {
      return res
        .status(201)
        .json({ message: "New task created", data: newTask, success: true });
    } else {
      return res
        .status(500)
        .json({
          message: "Some thing went wrong we are checking",
          error: newTask,
          success: false,
        });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});

    if (allTasks) {
      return res
        .status(200)
        .json({ message: "tasks are fetched", data: allTasks });
    } else {
      return res
        .status(400)
        .json({ message: "Some thing is wrong please check", error: allTasks });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some went wrong with server we are checking" });
  }
};

export const getFilterTasks = async (req, res) => {
  try {
    let allTasks;
    const { filter } = req.query;
    console.log(filter);
    const statusList = ["to-do", "in-process", "done"];

    if (statusList.includes(filter.toLowerCase())) {
      allTasks = await Task.find({ status: filter });
    } else if (filter) {
      allTasks = await Task.find({ assignto: filter });
    } else {
      allTasks = await Task.find();
    }

    console.log("Filter task ", allTasks);
    if (allTasks) {
      return res
        .status(200)
        .json({ message: "tasks are fetched", data: allTasks });
    } else {
      return res
        .status(400)
        .json({ message: "Some thing is wrong please check", error: allTasks });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some went wrong with server we are checking" });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("params=>", id, " change", status);
    const task = await Task.findById(id);
    task.status = status;
    await task.save({ validateBeforeSave: false });
    return res
      .status(201)
      .json({ message: "Satus has been changed", data: task });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Somethign went wrong while changing status" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletetask = await Task.findByIdAndDelete(id);
    if (deletetask) {
      return res.status(200).json({ message: "tasks is deleted" });
    } else {
      return res
        .status(500)
        .json({ message: "Some went wrong with server we are checking" });
    }
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ message: "Some thing is wrong please check" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if ([name, email, password, role].some((item) => !item.toString().trim())) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Invalid Email Fromat", success: false });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Invalid Password Format", success: false });
    }

    const newUser = await User.create({ name, email, password, role });
    console.log("new user=>", newUser);

    if (newUser) {
      return res
        .status(201)
        .json({ message: "User created", data: newUser, success: true });
    }
    return res
      .status(500)
      .json({ message: "Internal Error while creating user", success: false });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      const isValidPassword = await user.isPasswordCorrect(password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "incorrect password." });
      }
      const token = await user.genrateToken();

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      return res
        .status(200)
        .cookie("token", token, options)
        .cookie("role", user.role, options)
        .json({
          message: "User login successfully",
          data: user,
          success: true,
        });
    } else {
      return res
        .status(400)
        .json({ message: "User not exist", data: null, success: false });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({
        message: "Somethignwent wrong while login",
        data: null,
        success: false,
      });
  }
};

export const logout = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    return res
      .status(200)
      .clearCookie("token", options)
      .clearCookie("role", options)
      .json({ message: "user logged out", data: null, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(501)
      .json({ message: "Somethignwent wrong while logout", success: false });
  }
};
