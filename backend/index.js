import express from 'express';
import { connectToDB } from './db/dbConfig.js';
import { router } from './routes/task.route.js';
import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config({ path: './config.env' });
const app=express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173/',
  credentials: true 
}));

app.use("/",router);
connectToDB()
.then(()=>{
    app.listen(5000,()=>{
        console.log("Server is runnging fine on port 5000");
    })
});

