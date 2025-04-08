import express from "express";
import { config } from "dotenv";
config();
import { connectDB } from "./config/dbConfig";

const app = express();
app.use(express.json());

connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
