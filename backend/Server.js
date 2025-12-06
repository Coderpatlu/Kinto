import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import auth from "./Routes/auth.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares must be first
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", auth);

app.listen(5000, () => console.log("Server Running on Port 5000"));