import dotenv from "dotenv";
import express from "express";
import cors from 'cors'
import { db } from "./config/db";
import bookRoutes from './routes/bookRoutes'
dotenv.config();

const app = express();

//cors
app.use(cors());

//for json data
app.use(express.json());


const PORT = process.env.PORT;
//connect to db
db();

//routes
app.use('/api',bookRoutes);

app.listen(PORT,()=>{
    console.log(`Port is working on ${PORT}`);
})
