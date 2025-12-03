import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from  'dotenv';

import { connectDB } from './db.js';

connectDB();
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get("/users", (req, res) => {
    res.json({
        message : "Users Api WOrking"
    });

})

app.listen(5000, () =>console.log("Server Running on Port 5000"));