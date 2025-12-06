import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("Mongoose Connected");
  } catch (error) {
    console.log("Mongoose Error:", error);
    process.exit(1);
  }
};
