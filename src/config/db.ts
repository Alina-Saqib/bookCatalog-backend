import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGO_URI;

export const db = () => {
  if (!URI) {
    console.error("MongoDB URI is not defined.");
    return;
  }

  mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
